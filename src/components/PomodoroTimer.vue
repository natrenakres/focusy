<script lang="ts" setup>
    import { useCountdown } from "@vueuse/core";
    import { computed, watch } from "vue";   
    import usePomodoro, { ONE_POMODORO_COUNT} from "../features/usePomodoro";
    
    const { status, pomodoroTimeSec, shortBreakTimeSec, longBreakTimeSec, statePomodoro, completedPomodoro, setStatus, setStatePomodoro, incrementCompletedPomodoro  } = usePomodoro();

    let pomodoroSeconds = computed(()=> {
        if(statePomodoro.value === "pomodoro") {
            return  pomodoroTimeSec.value
        }

        if(statePomodoro.value === "longBreak") {
            return longBreakTimeSec.value;
        }

        if(statePomodoro.value === "shortBreak") {
            return shortBreakTimeSec.value;
        }

        return pomodoroTimeSec.value;
    });

    const { remaining, start, stop, pause, resume } = useCountdown(pomodoroSeconds.value, {                        
        onComplete() {            
            stopPomodoro();
            if(statePomodoro.value === "pomodoro") {
                incrementCompletedPomodoro();
            }
            handleStatePomodoro();
        }
    });

    watch(statePomodoro, (newState)=> {
        if(newState === "pomodoro") {
            remaining.value = pomodoroTimeSec.value;            
        }
        if(newState === "longBreak") {
            remaining.value = longBreakTimeSec.value;
        }
        if(newState === "shortBreak") {
            remaining.value = shortBreakTimeSec.value;
        }
    })

    const pad = (n: number) => String(n).padStart(2, '0')

    const formattedRemaining = computed(()=> {
        const r = Math.max(0, Math.floor(remaining.value)) 
        const minutes = Math.floor(r / 60)
        const seconds = r % 60
        return `${pad(minutes)}:${pad(seconds)}`
    })  

    function startPomodoro() {
        setStatus("start")
        start(pomodoroSeconds);
    }

    function pausePomodoro(){
        setStatus("pause");
        pause();
    }

    function resumePomodoro(){
        setStatus("start");
        resume();
    }

    function stopPomodoro(){
        setStatus("stop");
        stop();
    }

    function handleForward(){
        if(statePomodoro.value === "pomodoro") {
            incrementCompletedPomodoro();
        }
        handleStatePomodoro();
        handlePomodor();
    }

    function handleStatePomodoro(){
        if(statePomodoro.value === "pomodoro") {
            if(completedPomodoro.value % ONE_POMODORO_COUNT === 0) {
                setStatePomodoro("longBreak")
                
            } else {
                setStatePomodoro("shortBreak");
                
            }
        } else {
            setStatePomodoro("pomodoro");            
        }        
    }

    function handlePomodor(){
        switch(status.value) {
            case "stop": 
                startPomodoro();
                break;
            case "start": 
                pausePomodoro();
                break;
            case "pause":
                resumePomodoro();
                break;
        }
    }

</script>

<template>
    <div class="pomodoro-timer__container" :class="statePomodoro !== 'pomodoro' ? 'break' : ''">    
        <header class="pomodoro-timer__header">
            <button :class="statePomodoro === 'pomodoro' ? 'pomodoro-timer__active' : '' ">Pomodoro</button>
            <button :class="statePomodoro === 'shortBreak' ? 'pomodoro-timer__active' : ''">Short Break</button>
            <button :class="statePomodoro === 'longBreak' ? 'pomodoro-timer__active' : ''">Long Break</button>
        </header>
        <div class="pomodoro-timer__time-container">
            <span class="pomodoro-timer__timer">{{ formattedRemaining }}</span>            
        </div>
        <div class="pomodor-timer__footer">
            <button @click="handlePomodor" :class="statePomodoro !== 'pomodoro' ? 'button-break' : ''">
                {{ status === "start" ? "PAUSE" :  "START" }}                
            </button>            
            <button v-if="status === 'start'" class="pomodoro-timer__forward" @click="handleForward">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-skip-forward-icon lucide-skip-forward"><path d="M21 4v16"/><path d="M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z"/></svg>
            </button>
        </div>
    </div>
</template>

<style lang="css">

.pomodoro-timer__container {
    display: flex;
    flex-direction: column;    
    align-items: center;
    background-color: var(--color-teritary);
    max-width: 346px;
    padding: var(--sapcing3) var(--sapcing1);
    color: var(--color-light);
    border-radius: var(--sapcing1);
}

.break {
    background-color: var(--color-primary);
}

.pomodoro-timer__header {
    display: flex;
    padding: 0;
    margin: 0;
    gap: var(--sapcing1);    
    justify-content: start;
}

.pomodoro-timer__header button {
    padding: var(--sapcing1);
    margin: var(--sapcing1);
    background-color: transparent;
    font: var(--text-small);

}

.pomodoro-timer__header .pomodoro-timer__active {
    font: var(--text-paragraph-bold);    
    background-color: var(--color-light-gray)
}

.pomodoro-timer__time-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: var(--sapcing6);    
}

.pomodoro-timer__timer {
    font: var(--text-timer);
}

.pomodor-timer__footer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--sapcing3);
}

.button-break {
    background-color: var(--color-secondary);
    color: var(--color-dark);
    font: var(--text-paragraph-bold);
}

.pomodoro-timer__forward {
    background: transparent;
    margin: 0;
}

</style>