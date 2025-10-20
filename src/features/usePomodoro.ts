import { computed, watch } from "vue";
import { useTimestamp, useStorage } from "@vueuse/core";
import useWebNotification, { type NotificationOption } from "./useWebNotification";

export const ONE_POMODORO_COUNT = 4;

type PomodoroStatus = "start" | "pause" | "stop";
type PomodoroState = "pomodoro" | "shortBreak" | "longBreak";

interface PomodoroConfig  {
  pomodoroTimeSec: number;
  shortBreakTimeSec: number;
  longBreakTimeSec: number;
}

export default function usePomodoro(config?: Partial<PomodoroConfig>){
    const settings: PomodoroConfig = {
        pomodoroTimeSec: config?.longBreakTimeSec ?? 25 * 60,
        shortBreakTimeSec: config?.shortBreakTimeSec ?? 5 * 60,
        longBreakTimeSec: config?.longBreakTimeSec ?? 15*60        
    }

    const status = useStorage<PomodoroStatus>("pomodoro:status", "stop");
    const statePomodoro = useStorage<PomodoroState>("pomodoro:state", "pomodoro");
    const completedPomodoro = useStorage<number>("pomodoro:completed", 0);

    const timestamp = useTimestamp({ interval: 1000 });
    const startedAt = useStorage<number | null>("pomodoro:startedAt", null);
    const pausedRemaining = useStorage<number | null>("pomodoro:pausedRemaining", null);

    const { notify } = useWebNotification();


    const duration = computed(()=> {
        switch(statePomodoro.value) {
            case "shortBreak":
                return settings.shortBreakTimeSec;
            case "longBreak":
                return settings.longBreakTimeSec;
            default:
                return settings.pomodoroTimeSec
        }
    });
    
    const remaining = computed(()=> {
        if(status.value === "stop") return duration.value;
        if(status.value === "pause" && pausedRemaining.value != null)  return pausedRemaining.value;
        if(startedAt.value){
            const elapsed = Math.floor(timestamp.value-startedAt.value) / 1000;
            return Math.max(duration.value - elapsed, 0);
        }
        return duration.value;
    })

    const formattedTime = computed(() => {
        const r = Math.max(0, Math.floor(remaining.value));
        const minutes = Math.floor(r/60);
        const seconds = r % 60;        
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    });

    

    watch(remaining, (val) => {
        if(status.value === "start" && val <= 0) {
            nextState();
        }
    });    

    


    function startPomodoro(){
        startedAt.value = Date.now();
        pausedRemaining.value = null;
        status.value = "start";        
    }


    function pausePomodoro() {
        pausedRemaining.value = remaining.value;
        startedAt.value = null;        
        status.value = "pause";        
    }

    function resumePomodoro() {
        if(pausedRemaining.value != null) {
            startedAt.value = Date.now()-(duration.value-pausedRemaining.value)*1000;
        } else {
            pausedRemaining.value = null;
            status.value = "start";
        }
    }


    function stopPomodoro() {
        startedAt.value = null;
        pausedRemaining.value = null;
        status.value = "stop";
        
    }  

    function getNotificationContent(state: PomodoroState) {
        switch(state) {
            case "longBreak":
                return {
                    title: "Long Break ☕️", 
                    body: "You finished a full cycle! Time for a long rest.", 
                    icon: ""
                };
            case "shortBreak":
                return {
                    title: "Short Break 🏃‍♂️", 
                    body:  "Pomodoro done! Take a short break.", 
                    icon: ""
                };
            default:
                return {
                    title: "Focus Time 🍅", 
                    body: "Back to work! Start your next Pomodor", 
                    icon: ""
                };
        }
    }

    


    function handlePomodoroToggle() {
        const actions = {
            stop: startPomodoro,
            start: pausePomodoro,
            pause: resumePomodoro
        } as const;

        const action = actions[status.value];
        if(action) action();
    }

    function incrementPomodoro() {
        completedPomodoro.value++;
    }

    function nextState(){
        if(statePomodoro.value === "pomodoro") {
            incrementPomodoro();
            statePomodoro.value = completedPomodoro.value % ONE_POMODORO_COUNT === 0 ? "longBreak" : "shortBreak";
        } else {
            statePomodoro.value = "pomodoro";            
        }
        stopPomodoro();        
        notify(getNotificationContent(statePomodoro.value));
    }

    return {
        // state
        status,
        statePomodoro,
        formattedTime,
        // action        
        handlePomodoroToggle,        
        nextState        
    };
}