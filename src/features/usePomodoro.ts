import { ref, toRefs } from "vue";

export const ONE_POMODORO_COUNT = 4;

type PomodoroState = {
    status: "start" | "pause" | "stop",
    pomodoroTimeSec: number,
    shortBreakTimeSec: number,
    longBreakTimeSec: number,
    completedPomodoro: number,
    statePomodoro: "pomodoro" | "shortBreak" | "longBreak"
}

const initialState: PomodoroState =  {
    status: "stop",
    pomodoroTimeSec: 25 * 60,
    longBreakTimeSec: 15*60,
    shortBreakTimeSec: 5*60,
    completedPomodoro: 1,
    statePomodoro: "pomodoro"
}

export default function usePomodoro(){
    const state = ref<PomodoroState>(initialState);

    function setStatus(newStatus: "start" | "pause" | "stop") {
        state.value.status = newStatus;
    }

    function setStatePomodoro(newState: "pomodoro" | "shortBreak" | "longBreak") {
        state.value.statePomodoro = newState;
    }

    function incrementCompletedPomodoro(){
        state.value.completedPomodoro++;
    }

    return {
        ...toRefs(state.value),
        setStatus,
        setStatePomodoro,
        incrementCompletedPomodoro
    }
}