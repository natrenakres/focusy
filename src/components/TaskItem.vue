<script lang="ts" setup>
    import { ref, computed } from 'vue';
    import type { Task } from '../stores/useTaskStore';    
    import { IconCircleCheck, IconDotsVertical } from '@tabler/icons-vue';
    import Button from './ui/button/Button.vue';    
    import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from './ui/item';
    import { Badge } from './ui/badge';
    import { Dialog, DialogTitle, DialogTrigger, DialogContent, DialogHeader, DialogDescription } from './ui/dialog';
    import TaskItemForm from './TaskItemForm.vue';

    const { task } = defineProps<{
        task: Task
    }>();
    
    let isOpen = ref(false);     

    function callback(open: boolean) {
        isOpen.value = open;
    }

    const isCompleted = computed(() => task.status === "completed");

    function setIsCompleted() {
        if(task.status === "completed")
            task.status = "not_started"
        else
            task.status = "completed"        
    }
   

</script>


<template>   
    <Item :variant="isCompleted ? 'muted' : 'outline' ">
        <ItemMedia>
            <Button @click.stop="setIsCompleted" variant="outline" size="icon" aria-label="Complete Task">
                <IconCircleCheck />
            </Button>
        </ItemMedia>
        <ItemContent>
            <ItemTitle>{{ task.title }} <Badge variant="secondary">{{task.pomodoroCount}}</Badge> <Badge>{{ task.estimatedPomodoroCount }}</Badge></ItemTitle>
            <ItemDescription v-if="task.description">{{ task.description }}</ItemDescription>
        </ItemContent>
        <ItemActions>
            <Dialog v-model:open="isOpen">
                <DialogTrigger as-child>
                    <Button variant="outline" size="icon" aria-label="Edit Task">
                        <IconDotsVertical />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit: {{ task.title }}</DialogTitle>
                        <DialogDescription>Edit task and save. You can also delete the task from project.</DialogDescription>
                    </DialogHeader>
                    <TaskItemForm @update:open="callback" :task="task" />
                </DialogContent>
            </Dialog>            
        </ItemActions>        
    </Item>        
    
</template>