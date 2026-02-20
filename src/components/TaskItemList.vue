<script setup lang="tsx">
    import { computed } from 'vue';
    import type { Project } from '@/stores/useProjectsStore';
    import { ItemGroup } from './ui/item';
    import TaskItem from './TaskItem.vue';

    const { project } = defineProps<{
        project: Project
    }>()

    const sortedTasks = computed(() => {
        return [...project.tasks].sort((a, b) => {
            // 2. Completed en altta
            if (a.status === 'completed' && b.status !== 'completed') return 1
            if (a.status !== 'completed' && b.status === 'completed') return -1

            // 3. Diğerleri mevcut sırayı korusun
            return 0
        })
    });

</script>

<template>
    <div class="flex w-full max-w-md flex-col gap-6">
        <ItemGroup class="gap-2">
            <template v-for="task in sortedTasks" :key="task.id">
                <TaskItem :task="task" />                
            </template>
        </ItemGroup>

    </div>

</template>