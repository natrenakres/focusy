<script setup lang="ts">
import type { Project } from '@/stores/useProjectsStore';
import TaskItem from './TaskItem.vue';
import { Button } from './ui/button';
import { IconPlus } from '@tabler/icons-vue';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import TaskItemForm from './TaskItemForm.vue';
import { ref } from 'vue';
import PomodoroTimer from './PomodoroTimer.vue';
defineProps<{
  project: Project | undefined;
}>();
const open = ref(false);

function callback(state: boolean) {    
    open.value = state;
}
</script>

<template>
    <div class="flex flex-col gap-4">
        <div class="flex items-center gap-2">
            <h2 class="text-2xl font-semibold">Tasks</h2>            
            <Dialog v-model:open="open">
                <DialogTrigger as-child>
                    <Button size="icon">
                        <IconPlus />
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
        <p class="text-base text-muted-foreground">Project details and tasks will be displayed here.</p>        
        <div v-if="project" class="grid grid-rows-2 gap-4">
            <PomodoroTimer />            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 ">
                <TaskItem :task="task" v-for="task in project.tasks" key="task.id" />                
            </div>
        </div>
        <p v-else class="text-base text-muted-foreground">No project selected.</p>        
    </div>
</template>