

import { type Ref } from 'vue';
import { useStorage } from '@vueuse/core';
import { useAppSettings } from "@/stores/useAppSettingsStore"

export type SessionStatus =
    | 'running'
    | 'paused'
    | 'completed'
    | 'aborted'
    | 'scheduled'
    | 'interrupted'
    | 'expired'
    | 'idle';

export interface FocusSession {
    id: string;
    projectId: string;    
    startTime: number;
    pausedTime: number | null;
    pauseDurationInSec: number;
    status: SessionStatus;
    endTime: number | null;
    isActive: boolean;
}

const CURRENT_SESSION_KEY = 'current-session';
const SESSION_HISTORY_KEY = 'session-history';


const currentSession: Ref<FocusSession | null> = useStorage<FocusSession | null>(
    CURRENT_SESSION_KEY,
    null
);

const sessionHistory: Ref<FocusSession[]> = useStorage<FocusSession[]>(
    SESSION_HISTORY_KEY,
    []
);

export default function useSessionStore() {
    const { appSettings } = useAppSettings();
    // Here you can add methods to manipulate the session data, e.g., startSession, pauseSession, completeSession, etc.
    function startSession(projectId: string, startTime: number = Date.now()) {
        console.log('Starting session for project:', projectId, 'at time:', new Date(startTime).toTimeString());

        const session: FocusSession = {
            id: crypto.randomUUID(),
            projectId,
            startTime,
            pausedTime: null,
            pauseDurationInSec: 0,
            status: 'running',
            endTime: null,
            isActive: true,
        };
        currentSession.value = session;
    };

    function completeSession() {
        if (!currentSession.value) return;
        
        currentSession.value.status = 'completed';
        currentSession.value.endTime = Date.now();
        currentSession.value.isActive = false;
        
        sessionHistory.value.push(currentSession.value);
        currentSession.value = null;
    }

    function calculateExpectedEndTime(session: FocusSession): number {
        const dailyHoursInMs = (appSettings.value.dailyHours ?? 8) * 3600 * 1000;
        const lunchBreakInMs = (appSettings.value.lunchBreak ?? 0) * 60 * 1000;  
        const totalAllowedTimeInMsec = dailyHoursInMs + lunchBreakInMs;       
        
        const expectedEndTime = session.startTime + totalAllowedTimeInMsec;

        return expectedEndTime;
    }

    return {
        currentSession,
        sessionHistory,
        startSession,
        completeSession,
        calculateExpectedEndTime
    };
}