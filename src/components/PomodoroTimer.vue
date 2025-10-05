<script lang="ts" setup>
    import { useCountdown } from "@vueuse/core";
    import { shallowRef, computed } from "vue";   

    const initialTime = 25;

    const pomodoroSeconds = shallowRef(initialTime);    
    const { remaining, start, stop, pause, resume } = useCountdown(pomodoroSeconds, {                
        onComplete() {
            console.log("Pmodoro is completed");
        }        
    });

    const pad = (n: number) => String(n).padStart(2, '0')

    const formattedRemaining = computed(()=> {
        const r = Math.max(0, Math.floor(remaining.value)) 
        const minutes = Math.floor(r / 60)
        const seconds = r % 60
        return `${pad(minutes)}:${pad(seconds)}`
    })  

    function startPomodoro() {
        start(pomodoroSeconds);
    }

</script>

<template>
    <div class="pomodoro-timer__container">
        <header class="pomodoro-timer__header">
            <button class="pomodoro-timer__active">Pomodoro</button>
            <button>Short Break</button>
            <button>Long Break</button>
        </header>
        <div class="pomodoro-timer__time-container">
            <span class="pomodoro-timer__timer">{{ formattedRemaining }}</span>
        </div>
        <div class="pomodor-timer__footer">
            <button @click="startPomodoro">START</button>
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
    background-color: hsl(309 100 7 / 36%);
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
}

</style>