<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Project } from '@/stores/useProjectsStore';
import { Progress } from './ui/progress';
import PomodoroTimer from './PomodoroTimer.vue';
import ProjectEmpty from './ProjectEmpty.vue';
import ProjectToolbar from './ProjectToolbar.vue';
import TaskItemList from './TaskItemList.vue';
import { useProjectsStore } from '@/stores/useProjectsStore';

const props = defineProps<{
    project: Project | undefined | null;
}>();

const { incrementActiveTaskPomodoro, selectedProjectTotals, selectedProjectProgress } = useProjectsStore();
const progressWarning = ref("");
let warningTimeoutId: ReturnType<typeof setTimeout> | undefined;

const roundedProgress = computed(() => Math.round(selectedProjectProgress.value));

function handlePomodoroCompleted() {
    if (!props.project?.id) return;

    const incremented = incrementActiveTaskPomodoro(props.project.id);
    if (incremented) {
        progressWarning.value = "";
        return;
    }

    progressWarning.value = "No active task selected. Pomodoro was not counted.";
    if (warningTimeoutId) {
        clearTimeout(warningTimeoutId);
    }
    warningTimeoutId = setTimeout(() => {
        progressWarning.value = "";
    }, 2500);
}
</script>

<template>
    <div class="flex flex-col gap-4 p-4">
        <template v-if="project">
            <ProjectToolbar />
            <div class="w-full max-w-md rounded-md border border-border bg-card p-3">
                <div class="mb-2 flex items-center justify-between text-sm">
                    <span class="font-medium">Project Progress</span>
                    <span>{{ roundedProgress }}%</span>
                </div>
                <Progress :model-value="selectedProjectProgress" />
                <p class="mt-2 text-xs text-muted-foreground">
                    {{ selectedProjectTotals.totalActualPomodoros }} / {{ selectedProjectTotals.totalEstimatedPomodoros }} pomodoro
                </p>
                <p v-if="progressWarning" class="mt-1 text-xs text-destructive">
                    {{ progressWarning }}
                </p>
            </div>
            <PomodoroTimer @pomodoro-completed="handlePomodoroCompleted" />
            <TaskItemList :project="project" />            
        </template>
        <template v-else>
            <ProjectEmpty />
        </template>
    </div>
</template>
