<script setup lang="ts">
import type { Project } from '@/stores/useProjectsStore';
import { toast } from 'vue-sonner';
import PomodoroTimer from './PomodoroTimer.vue';
import ProjectEmpty from './ProjectEmpty.vue';
import ProjectToolbar from './ProjectToolbar.vue';
import TaskItemList from './TaskItemList.vue';
import { useProjectsStore } from '@/stores/useProjectsStore';
import ProjectProgress from './ProjectProgress.vue';

const props = defineProps<{
    project: Project | undefined | null;
}>();

const { incrementActiveTaskPomodoro, selectedProjectTotals, selectedProjectProgress } = useProjectsStore();

function handlePomodoroCompleted() {
    if (!props.project?.id) return;

    const incremented = incrementActiveTaskPomodoro(props.project.id);
    if (incremented) return;

    toast.warning("No active task selected. Pomodoro was not counted.");
}
</script>

<template>
    <div class="flex flex-col gap-4 p-4">
        <template v-if="project">
            <ProjectToolbar />
            <ProjectProgress
                :total-actual-pomodoros="selectedProjectTotals.totalActualPomodoros"
                :total-estimated-pomodoros="selectedProjectTotals.totalEstimatedPomodoros"
                :progress-percent="selectedProjectProgress"
            />
            <PomodoroTimer @pomodoro-completed="handlePomodoroCompleted" />
            <TaskItemList :project="project" />            
        </template>
        <template v-else>
            <ProjectEmpty />
        </template>
    </div>
</template>
