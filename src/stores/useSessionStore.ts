

import { type Ref } from 'vue';
import { useStorage } from '@vueuse/core';

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
    taskId: string;    
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
    return {
        currentSession,
        sessionHistory,
    };
}