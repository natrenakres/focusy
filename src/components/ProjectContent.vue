<script setup lang="ts">
import type { Project } from '@/stores/useProjectsStore';
import PomodoroTimer from './PomodoroTimer.vue';
import ProjectEmpty from './ProjectEmpty.vue';
import ProjectToolbar from './ProjectToolbar.vue';
import TaskItemList from './TaskItemList.vue';

defineProps<{
    project: Project | undefined | null;
}>();

</script>

<template>
    <div class="flex flex-col gap-4 p-4">
        <template v-if="project">
            <ProjectToolbar />
            <PomodoroTimer />
            <TaskItemList :project="project" />            
        </template>
        <template v-else>
            <ProjectEmpty />
        </template>
    </div>
</template>