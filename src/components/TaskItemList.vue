<script setup lang="tsx">
    import type { Project } from '@/stores/useProjectsStore';
    import { ItemGroup } from './ui/item';
    import TaskItem from './TaskItem.vue';

    defineProps<{
        project: Project
    }>()

</script>

<template>
    <div class="flex w-full max-w-md flex-col gap-6">
        <ItemGroup class="gap-2">
            <template v-for="task in project.tasks" :key="task.id">
                <TaskItem :task="task" />                
            </template>
        </ItemGroup>

    </div>

</template>