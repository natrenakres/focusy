<script lang="ts" setup>
    import { ref } from 'vue';
    import type { Task } from '../stores/useTaskStore';
    import TaskItemForm from './TaskItemForm.vue';


    const { task } = defineProps<{
        task: Task
    }>();
    
    let isOpen = ref(false); 
    
    function setIsActive() {
        task.isActive = !task.isActive;        
    }

    function setIsCompleted(){
        task.isCompleted = !task.isCompleted;        
    }
    

    function handleOpen() {        
        isOpen.value = !isOpen.value;
    }

    function callback(open: boolean) {
        isOpen.value = open;
    }

    function handleTaskStatus() {
        const classList = [];
        console.log(task.type);
        if(task.isActive) classList.push('active')
        if(task.type !== "none") classList.push(task.type);

        return classList.join(' ');
    }

   

</script>


<template>
    <Transition name="expand">
        <a v-if="!isOpen" key="closed" class="task-item__container" 
            :class="handleTaskStatus()"
            @click="setIsActive"
            >
            <button class="task-item__complete-btn"
                :class="task.isCompleted ? 'completed' : ''"
                @click.stop="setIsCompleted"
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-icon lucide-circle-check"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
            </button>
            <div class="task-item__center" 
                :class="task.isCompleted ? 'completed' : '' "
                >
                <div class="task-item__center-header">
                    <h4 class="task-item__center-title">{{ task.title }}</h4>   
                    <p>{{task.pomodoroCount}}<span v-if="task.pomodoroCount">&nbsp;/&nbsp;</span>{{ task.estimatedPomodoroCount }}</p>
                </div>
                <p v-if="task.description"> {{ task.description }}</p>
            </div>
            <button class="task-item__menu-btn" @click.stop="handleOpen" >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-vertical-icon lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
            </button>        
        </a>
        <TaskItemForm v-else :task="task" @update:open="callback"  />        
    </Transition>
</template>

<style lang="css">

.task-item__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 346px;
    border: solid 1px;
    border-radius: var(--sapcing1);
    border-right-width: 2px;
    gap: var(--sapcing1);
    padding: var(--sapcing1) var(--sapcing2); 
    cursor: pointer;
    
    background-color: transparent;
    color: var(--color-dark);
    margin: 0;
    
    &:hover {
        box-shadow: inset 3px 0 0 var(--color-light-gray);
        text-decoration: none;
    }
    
    &.active {
        box-shadow: inset 3px 0 0 var(--color-dark);
    }

    &.work {
        border-right-color: chartreuse;        
    }

    &.personal {
        border-right-color: violet;
    }
    &.side{
        border-right-color: cornflowerblue;
    }

}




.task-item__complete-btn {
    display: flex;
    width: 2rem;
    height: 2rem;
    background-color: transparent;
    border: 1px solid var(--color-primary);
    color: var(--color-dark);
    align-items: center;    
    justify-content: center;
    
    &.completed {
        background-color: var(--color-teritary);
        border: 1px solid var(--color-light);
        color: var(--color-light);
    }
}


.task-item__menu-btn {
    display: flex;
    width: 1rem;
    height: 2rem;
    background-color: transparent;
    border: 1px solid var(--color-primary);
    color: var(--color-dark);
    align-items: center;    
    justify-content: center;
}

.task-item__center {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    &.completed  {
        text-decoration: line-through;
        color: var(--color-light-gray);
    }

    
    

}

.task-item__center-header {
    display: flex;
    align-items: center;
    gap: var(--sapcing2);

}

.task-item__center-title {
    font: var(--text-small-bold);

    
}

.task-item__center p {
    font: var(--text-small);
    color: var(--color-light-gray);
    margin: 0;    
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 500px; /* içerik boyuna göre ayarla */
}
</style>