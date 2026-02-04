<script lang="ts" setup>
    import { ref, computed } from 'vue';
    import type { Task } from '../stores/useTaskStore';
    import TaskItemForm from './TaskItemForm.vue';
    import { IconCircleCheck, IconDotsVertical } from '@tabler/icons-vue';
    import Button from './ui/button/Button.vue';


    const { task } = defineProps<{
        task: Task
    }>();
    
    let isOpen = ref(false); 
    
    function setIsActive() {
        task.isActive = !task.isActive;        
    }    

    function handleOpen() {        
        isOpen.value = !isOpen.value;
    }

    function callback(open: boolean) {
        isOpen.value = open;
    }

    function handleTaskStatus() {
        const classList: string[] = [];
        if (task.isActive) classList.push('border-l-4 border-l-gray-900');
        // Optional: add right-border accents based on category if present
        if ((task as any).category === 'work') classList.push('border-r-2 border-r-lime-400');
        if ((task as any).category === 'personal') classList.push('border-r-2 border-r-fuchsia-500');
        if ((task as any).category === 'side') classList.push('border-r-2 border-r-sky-400');
        return classList.join(' ');
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
    <Transition
      enter-from-class="opacity-0 max-h-0"
      enter-active-class="transition-all duration-300 ease-in-out overflow-hidden"
      enter-to-class="opacity-100 max-h-[500px]"
      leave-from-class="opacity-100 max-h-[500px]"
      leave-active-class="transition-all duration-300 ease-in-out overflow-hidden"
      leave-to-class="opacity-0 max-h-0"
    >
        <a v-if="!isOpen" key="closed" 
            class="flex items-center justify-between w-86.5 border border-solid border-r-2 rounded-md gap-2 py-2 px-3 cursor-pointer text-gray-900 m-0 hover:shadow-inner hover:no-underline" 
            :class="handleTaskStatus()"
            @click="setIsActive"
            >
            <Button @click.stop="setIsCompleted" variant="outline" size="icon" aria-label="Complete Task">
                <IconCircleCheck size="20" />
            </Button>
            <div class="flex-1 flex flex-col" :class="{ 'line-through text-gray-400': isCompleted }">
                <div class="flex items-center gap-3">
                    <h4 class="text-sm font-semibold">{{ task.title }}</h4>   
                    <p class="text-sm text-gray-400 m-0">{{task.pomodoroCount}}<span v-if="task.pomodoroCount">&nbsp;/&nbsp;</span>{{ task.estimatedPomodoroCount }}</p>
                </div>
                <p v-if="task.description" class="text-sm text-gray-400 mt-1"> {{ task.description }}</p>
            </div>
            <Button @click.stop="handleOpen" variant="outline" size="icon" aria-label="Edit Task">
                <IconDotsVertical />
            </Button>        
        </a>
        <TaskItemForm v-else :task="task" @update:open="callback"  />        
    </Transition>
</template>