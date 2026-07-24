import { useStorage } from "@vueuse/core";

export type AppSettings = {
    weeklyHours: number;
    dailyHours?: number;
    lunchBreak: number; // in minutes
    pomodoroTimeSec: number
}

const appSettings = useStorage<AppSettings>("focusy:appSettings", {
    weeklyHours: import.meta.env.VITE_WEEKLY_HOURS ? parseInt(import.meta.env.VITE_WEEKLY_HOURS) : 40,
    dailyHours: import.meta.env.VITE_DAILY_HOURS ? parseInt(import.meta.env.VITE_DAILY_HOURS) : 8,
    lunchBreak: import.meta.env.VITE_LUNCH_BREAK ? parseInt(import.meta.env.VITE_LUNCH_BREAK) : 30,
    pomodoroTimeSec: import.meta.env.VITE_POMODORO_TIME_SEC ? parseInt(import.meta.env.VITE_POMODORO_TIME_SEC) : 25
});


export function useAppSettings() {

    function updateAppSettings(newSettings: Partial<AppSettings>) {
        appSettings.value.weeklyHours = newSettings.weeklyHours ?? appSettings.value.weeklyHours;
        appSettings.value.dailyHours = newSettings.dailyHours ?? appSettings.value.dailyHours;
        appSettings.value.lunchBreak = newSettings.lunchBreak ?? appSettings.value.lunchBreak;
        appSettings.value.pomodoroTimeSec =  newSettings.pomodoroTimeSec ?? appSettings.value.pomodoroTimeSec;
    }

    return {
        appSettings,
        updateAppSettings    
    };
}


