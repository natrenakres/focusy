<script setup lang="ts">
import type { Project } from '@/stores/useProjectsStore';
import TaskItem from './TaskItem.vue';
import { Button } from './ui/button';
import { IconPlus } from '@tabler/icons-vue';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import TaskItemForm from './TaskItemForm.vue';
import { ref } from 'vue';
import PomodoroTimer from './PomodoroTimer.vue';
import CreateProjectForm from './CreateProjectForm.vue';
defineProps<{
    project: Project | undefined | null;
}>();
const open = ref(false);

function callback(state: boolean) {
    open.value = state;
}
</script>

<template>
    <div class="flex flex-col gap-4 p-4">
        <template v-if="project">
            <div class="flex items-center gap-2">
                <h2 class="text-2xl font-semibold">Mange {{ project.name }} Project </h2>
                <Dialog v-model:open="open">
                    <DialogTrigger as-child>
                        <Button variant="secondary" size="sm">
                            <IconPlus />
                            Add Task
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>New Task</DialogTitle>
                        </DialogHeader>
                        <TaskItemForm @update:open="callback" />
                    </DialogContent>
                </Dialog>
            </div>
            <div class="grid grid-rows-2 gap-4">
                <PomodoroTimer />
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 ">
                    <TaskItem :task="task" v-for="task in project.tasks" :key="task.id" />
                </div>
            </div>
        </template>
        <template v-else>
            <p class="text-base text-muted-foreground">You have no projects. Please create a project first.</p>
            <CreateProjectForm />
        </template>
    </div>
</template>