import { ref, computed, watch } from "vue";
import { useCountdown, useStorage } from "@vueuse/core";

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

    const startedAt = useStorage<number | null>("pomodoro:startedAt", null);
    const persistedRemaining = useStorage<number | null>("pomodoro:remaining", null);


    const currentDuration = computed(()=> {
        switch(statePomodoro.value) {
            case "shortBreak":
                return settings.shortBreakTimeSec;
            case "longBreak":
                return settings.longBreakTimeSec;
            default:
                return settings.pomodoroTimeSec
        }
    });
    const { remaining, start, stop, pause, resume } = useCountdown(currentDuration.value, { 
        onComplete() {
            handleComplete();
        }
    });


    const now = Date.now();
    if(startedAt.value && status.value === "start") {
        const elapsedSec = Math.floor(now-startedAt.value) / 1000;
        const remainingSec = Math.max(0, (persistedRemaining.value ?? currentDuration.value));

        if(remainingSec <= 0) {
            handleComplete();
        } else {
            remaining.value = remainingSec;
            start(remainingSec);
        }
    } else if(persistedRemaining.value) {
        remaining.value = persistedRemaining.value;
    }

    watch(remaining, (val) => persistedRemaining.value = Math.floor(val));
    watch(statePomodoro, () => {        
        remaining.value = currentDuration.value
        persistedRemaining.value = currentDuration.value;
    });

    const formattedTime = computed(() => {
        const r = Math.max(0, Math.floor(remaining.value));
        const min = String(Math.floor(r / 60)).padStart(2, "0");
        const sec = String(r % 60).padStart(2, "0");
        return `${min}:${sec}`;
    });

    function handleComplete(){
        stopPomodoro();
        if(statePomodoro.value === "pomodoro") {
            incrementPomodoro();
        }
        nextState();
    }

    function nextState(){
        if(statePomodoro.value === "pomodoro") {
            statePomodoro.value = completedPomodoro.value % ONE_POMODORO_COUNT === 0 ? "longBreak" : "shortBreak";
        } else {
            statePomodoro.value = "pomodoro";
        }
    }





    function startPomodoro(){
        status.value = "start";
        startedAt.value = Date.now();
        remaining.value = currentDuration.value;
        persistedRemaining.value = currentDuration.value;
        start(currentDuration.value);
    }

    function resumePomodoro() {
        status.value = "start";
        startedAt.value = Date.now();
        resume();
    }

    function pausePomodoro() {
        status.value = "pause";
        pause();
    }

    function stopPomodoro() {
        status.value = "stop";
        startedAt.value = null;
        stop();
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