<script setup lang="ts">
import { ref } from 'vue';
import { Button } from './ui/button';
import { IconPlus } from '@tabler/icons-vue';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import TaskItemForm from './TaskItemForm.vue';
import ProjectCreateForm from './ProjectCreateForm.vue';


const openAddProject = ref(false);
const openAddTask = ref(false);

function callback(state: boolean) {
    openAddTask.value = state;
}

function callbackOpenAddProject(state: boolean) {
    openAddProject.value = state;
}

</script>

<template>
    <div class="flex items-center gap-2">                
        <Dialog v-model:open="openAddProject">
            <DialogTrigger>
                <Button variant="secondary" size="sm">
                    <IconPlus />
                    Add Project
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Project</DialogTitle>
                    <DialogDescription>Add new project to manage your work</DialogDescription>
                </DialogHeader>
                <ProjectCreateForm @update:open="callbackOpenAddProject" />
            </DialogContent>
        </Dialog>
        <Dialog v-model:open="openAddTask">
            <DialogTrigger as-child>
                <Button variant="secondary" size="sm">
                    <IconPlus />
                    Add Task
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Task</DialogTitle>
                    <DialogDescription>Add new Task to project</DialogDescription>
                </DialogHeader>
                <TaskItemForm @update:open="callback" />                
            </DialogContent>
        </Dialog>
    </div>
</template>