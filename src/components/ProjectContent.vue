<script setup lang="ts">
import type { Project } from '@/stores/useProjectsStore';
import TaskItem from './TaskItem.vue';
defineProps<{
  project: Project | undefined;
}>();
</script>

<template>
    <div class="flex flex-col gap-4">
        <h2 class="text-2xl font-semibold">Tasks</h2>
        <p class="text-base text-muted-foreground">Project details and tasks will be displayed here.</p>        
        <ul v-if="project">
            <li v-for="task in project.tasks" key="task.id" class="task-list">
                <TaskItem :task="task" />                
            </li>
        </ul>
        <p v-else class="text-base text-muted-foreground">No project selected.</p>
        
    </div>
</template>