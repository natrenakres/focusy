import { computed, watch } from "vue";
import { useTimestamp, useStorage, useWebNotification, useTitle } from "@vueuse/core";
import { useSound } from "@vueuse/sound";
import WarnSound from "@/assets/sounds/warning.wav";
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
        pomodoroTimeSec: (config?.pomodoroTimeSec ?? .1) * 60,
        shortBreakTimeSec: (config?.shortBreakTimeSec ?? 0.1) * 60,
        longBreakTimeSec: (config?.longBreakTimeSec ?? 0.1) * 60        
    }
    const title = useTitle();
    console.log("Current title: ", title.value);
    const status = useStorage<PomodoroStatus>("pomodoro:status", "stop");
    const statePomodoro = useStorage<PomodoroState>("pomodoro:state", "pomodoro");
    const completedPomodoro = useStorage<number>("pomodoro:completed", 0);

    const timestamp = useTimestamp({ interval: 1000 });
    const startedAt = useStorage<number | null>("pomodoro:startedAt", null);
    const pausedRemaining = useStorage<number | null>("pomodoro:pausedRemaining", null);

    const { show, close, onError, isSupported } = useWebNotification({
                    title: "Focus Time 🍅",
                    body: "Back to work! Start your next Pomodor", 
                    dir: "auto",
                    renotify: true,
                    lang: "en",
                    tag: "pomodoro-notification"
                });

    

    const { play } = useSound(WarnSound, { volume: 0.5, interrupt: true, onend: () => {
        console.info('Sound ended!')
    } });

    onError((e) => {
        console.error("Notification error:", e);
    });


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
        title.value = formattedTime.value;
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
            status.value = "start";
            pausedRemaining.value = null;
        } else {
            status.value = "start";
        }
    }


    function stopPomodoro() {
        startedAt.value = null;
        pausedRemaining.value = null;
        status.value = "stop";
        
    }  

    async function handleNotification(state: PomodoroState) {
        console.log("Handling notification is supported:", isSupported.value);
        switch(state) {
            case "longBreak":
                await show({
                    title: "Long Break ☕️", 
                    body: "You finished a full cycle! Time for a long rest.",
                    dir: "auto",
                    renotify: true,
                    tag: "pomodoro-notification"
                });
                play();
                title.value = `Long Break`;
            break;            
            case "shortBreak":
                await show({
                    title: "Short Break 🏃‍♂️", 
                    body: "Pomodoro done! Take a short break.",
                    dir: "auto",
                    renotify: true,
                    tag: "pomodoro-notification"
                });
                play();
                title.value = `Short Break`;
            break;            
            default:
                await show({
                    title: "Focus Time 🍅",
                    body: "Back to work! Start your next Pomodor",
                    dir: "auto",
                    renotify: true,
                    lang: "en",
                    tag: "pomodoro-notification"
                });
                play();
                title.value = `Focusy ${formattedTime.value}`;
            break;
        }
    }

    


    function handlePomodoroToggle() {
        const actions = {
            stop: startPomodoro,
            start: pausePomodoro,
            pause: resumePomodoro
        } as const;

        const action = actions[status.value];

        console.log("Handling action for status:", status.value);
        close();
        if(action) action();
    }

    function incrementPomodoro() {
        completedPomodoro.value++;
    }

    async function nextState(){
        await handleState();        
        await handleNotification(statePomodoro.value);
    }
    
    async function handleState(){
        if(statePomodoro.value === "pomodoro") {
            incrementPomodoro();
            statePomodoro.value = completedPomodoro.value % ONE_POMODORO_COUNT === 0 ? "longBreak" : "shortBreak";
        } else {
            statePomodoro.value = "pomodoro";            
        }
        stopPomodoro();
        status.value = "stop";        
        
    }


    return {
        // state
        status,
        statePomodoro,
        formattedTime,
        // action        
        handlePomodoroToggle,        
        nextState,
        handleState      
    };
}