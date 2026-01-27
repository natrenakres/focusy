<script lang="ts" setup>    
    import usePomodoro from "../features/usePomodoro";    
    const { status, statePomodoro, formattedTime, handlePomodoroToggle, nextState, handleState } = usePomodoro({
        pomodoroTimeSec: import.meta.env.VITE_POMODORO_TIME_SEC,
        shortBreakTimeSec: import.meta.env.VITE_SHORT_BREAK_TIME_SEC,
        longBreakTimeSec: import.meta.env.VITE_LONG_BREAK_TIME_SEC,
    });    
    import { IconPlayerSkipForward } from "@tabler/icons-vue";
    import Button from "./ui/button/Button.vue";
</script>

<template>
    <div class="flex flex-col items-center bg-accent max-w-86.5 p-4 text-light text-white rounded-md" :class="statePomodoro !== 'pomodoro' ? 'bg-primary' : ''">    
        <header class="flex gap-1 justify-start">
            <Button @click="handleState" :class="[
                'font-bold p-1 m-1 bg-transparent hover:bg-transparent hover:underline text-sm cursor-pointer',
                statePomodoro === 'pomodoro' ? 'font-bold bg-gray-200 hover:bg-gray-300 text-black' : '']">Pomodoro</Button>
            <Button @click="handleState" :class="[
                'p-1 m-1 bg-transparent hover:bg-transparent hover:underline text-sm cursor-pointer',
                statePomodoro === 'shortBreak' ? 'font-bold bg-gray-200 hover:bg-gray-300 text-black' : '']">Short Break</Button>
            <Button @click="handleState" :class="[
                'p-1 m-1 bg-transparent hover:bg-transparent hover:underline text-sm cursor-pointer',
                statePomodoro === 'longBreak' ? 'font-bold bg-gray-200 text-black' : ''
                ]">Long Break</Button>
        </header>
        <div class="w-full h-full flex justify-center items-center p-10">
            <span class="text-[6.25rem] font-bold leading-18">{{ formattedTime }}</span>
        </div>
        <div class="flex justify-center items-center gap-4">
            <Button @click="handlePomodoroToggle" :class="[
                'bg-primary text-light font-bold p-2 rounded-md cursor-pointer',
                statePomodoro !== 'pomodoro' ? 'bg-warning hover:bg-warning hover:underline text-dark font-bold' : '']" 
               >
                {{ status === "start" ? "PAUSE" :  "START"}}
            </Button>
            <Button v-if="status === 'start'" 
                class="bg-transparent hover:bg-transparent cursor-pointer" 
                @click="nextState" variant="outline" size="icon-lg">
                <IconPlayerSkipForward />
            </Button>
        </div>
    </div>
</template>