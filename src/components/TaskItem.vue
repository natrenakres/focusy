<script lang="ts" setup>
    import { ref } from 'vue';

    const isActive = ref<boolean>(false);
    const isCompleted = ref<boolean>(false);

    
    function handleItemClick() {
        isActive.value = !isActive.value;
    }

    function handleCompleteTask(){
        isCompleted.value = !isCompleted.value;
    }

</script>


<template>
    <button class="task-item__container" 
        :class="isActive ? 'active' : ''" 
        @click="handleItemClick"
        >
        <button class="task-item__complete-btn"
            :class="isCompleted ? 'completed' : ''"
            @click.stop="handleCompleteTask"
            >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-check-icon lucide-circle-check"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
        </button>
        <div class="task-item__center" 
            :class="isCompleted ? 'completed' : '' "
            >
            <div class="task-item__center-header">
                <h4 class="task-item__center-title">Task Title</h4>
                <p>0/1</p>
            </div>
            <p>Description</p>
        </div>
        <button class="task-item__menu-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-vertical-icon lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
        </button>        
    </button>
</template>

<style lang="css">



.task-item__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-width: 346px;
    border: solid 1px;
    border-radius: var(--sapcing1);
    gap: var(--sapcing1);
    padding: var(--sapcing1) var(--sapcing2); 
    
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

</style>