<script setup lang="ts">
import type { Project } from '@/stores/useProjectsStore';
defineProps<{
  project: Project | undefined;
}>();
</script>

<template>
    <div class="flex flex-col gap-4">
        <h2 class="text-2xl font-semibold">Taks</h2>
        <p class="text-base text-muted-foreground">Project details and tasks will be displayed here.</p>        
        <ul v-if="project">
            <li v-for="task in project.tasks" key="task.id" class="task-list">
                <div class="flex justify-between items-center">
                    <div>
                        <h3 class="text-lg font-medium">{{ task.title }}</h3>
                        <p class="text-sm text-muted-foreground">Estimated Pomodoros: {{ task.estimatedPomodoroCount }}</p>
                    </div>
                    <div>
                        <span 
                            v-if="task.isActive" 
                            class="text-sm font-semibold text-green-600">Active</span>
                        <span 
                            v-else 
                            class="text-sm font-semibold text-red-600">Inactive</span>
                    </div>
                </div>
                
            </li>
        </ul>
        <p v-else>
            <p class="text-base text-muted-foreground">No project selected.</p>
        </p>
    </div>
</template>