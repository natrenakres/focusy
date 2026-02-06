import { ref } from 'vue';

export type AppSettings = {
    weeklyHours: number;
    dailyHours?: number;
    lunchBreak: number; // in minutes
}

const appSettings = ref<AppSettings>({
    weeklyHours: import.meta.env.VITE_WEEKLY_HOURS ? parseInt(import.meta.env.VITE_WEEKLY_HOURS) : 40,
    dailyHours: import.meta.env.VITE_DAILY_HOURS ? parseInt(import.meta.env.VITE_DAILY_HOURS) : 8,
    lunchBreak: import.meta.env.VITE_LUNCH_BREAK ? parseInt(import.meta.env.VITE_LUNCH_BREAK) : 30,
});


export function useAppSettings() {

    function updateAppSettings(newSettings: Partial<AppSettings>) {
        appSettings.value.weeklyHours = newSettings.weeklyHours ?? appSettings.value.weeklyHours;
        appSettings.value.dailyHours = newSettings.dailyHours ?? appSettings.value.dailyHours;
        appSettings.value.lunchBreak = newSettings.lunchBreak ?? appSettings.value.lunchBreak;
    }

    return {
        appSettings,
        updateAppSettings    
    };
}


