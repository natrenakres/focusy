<script lang="ts" setup>
    import { ref } from 'vue';

    const isActive = ref<boolean>(false);
    const isCompleted = ref<boolean>(false);
    const isOpen = ref<boolean>(false);
    const isAddDescription = ref<boolean>(false);

    function handleAddDescription(){
        isAddDescription.value = !isAddDescription.value;
    }
    
    function handleItemClick() {
        isActive.value = !isActive.value;
    }

    function handleCompleteTask(){
        isCompleted.value = !isCompleted.value;
    }

    function handleOpen() {
        isOpen.value = !isOpen.value;
    }

    function handleCancel(){
        isOpen.value = false;
    }

</script>


<template>
    <Transition name="expand">
        <a v-if="!isOpen" key="closed" class="task-item__container" 
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
                <p>Desctiption text</p>
            </div>
            <button class="task-item__menu-btn" @click.stop="handleOpen" >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-vertical-icon lucide-ellipsis-vertical"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
            </button>        
        </a>
        <div v-else key="open" class="task-item__open-container">
            <h2>Task Title</h2>
            <div class="task-item__open-pomodoro-count">
                <h3>Act/Est Pomodoro</h3>
                <div class="task-item__open-pomodoro-select">
                    <input type="number" value="2" />/<input value="4" />
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-up-icon lucide-chevron-up"><path d="m18 15-6-6-6 6"/></svg>
                    </button>                
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down-icon lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                </div>
            </div>
            <textarea v-if="false" rows="3" />
            <div class="task-item__open-content">
                <button>
                    +
                    Add Description
                </button>
                <button>
                    +
                    Add to Project
                </button>
            </div>
            
            <div class="task-item__open-footer">
                <button class="delete-btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
                <div class="action-btn-container">
                    <button class="link" @click.stop="handleCancel" >                    
                        Cancel
                    </button>
                    <button @click.stop="handleOpen">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                        Save
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style lang="css">

.task-item__open-container{
    border: solid 1px var(--color-dark);
    border-radius: var(--sapcing1);
    display: flex;
    flex-direction: column;
    gap: var(--sapcing2);
    padding: var(--sapcing1) var(--sapcing2);
    width: 346px;

    & textarea {
        padding: var(--sapcing2);        
        font: var(--text-small);
        background-color: var(--color-light-gray);
        border-radius: var(--sapcing1);
        border: 0;        
    }

    & textarea:focus-visible {
        outline: none;
    }

    .task-item__open-pomodoro-count{
        display: flex;
        flex-direction: column;
        gap: var(--sapcing1);
        padding: 0;
        margin: 0;

        .task-item__open-pomodoro-select{
            display: flex;
            align-items: center;
            gap: var(--sapcing2);
            
            & input {                
                border-radius: var(--sapcing2);                
                width: 4rem;
                height: 2rem;                
                text-align: center;
            }

            & button {
                display: flex;
                width: 1rem;
                height: 1rem;
                background-color: transparent;
                border: 1px solid var(--color-primary);
                color: var(--color-dark);
                align-items: center;    
                justify-content: center;
            }
        }
    }    

    .task-item__open-content {
        display: flex;
        gap: var(--sapcing2);
        padding: 0;

        & button {
            background-color: transparent;
            color: var(--color-light-gray);
            margin: 0;
            padding: 0;
            border-bottom: 1px solid var(--color-light-gray);
            border-radius: 0;
            text-decoration: none;

            &:hover {                
                color: var(--color-dark);                
            }
        }
    }

    .task-item__open-footer{
        display: flex;
        justify-content: space-between;

        .delete-btn{
            display: flex;
            align-items: center;
            width: 24px;
            height: 24px;
            color: var(--color-teritary);
            background-color: transparent;
            border: 1px solid var(--color-primary);
        }

        .action-btn-container{
            display: flex;
            gap: var(--sapcing4);

            & button {
                display: flex;
                align-items: center;               
            }

            .outline {
                background-color: transparent;
                border: 1px solid var(--color-primary);
                color: var(--color-dark);
            }

            .link {
                background-color: transparent;
                border: 0;
                margin: 0;
                color: var(--color-light-gray);                
                padding: 0;
                border-radius: 0;
                text-decoration: underline;

                &:hover{
                    color: var(--color-dark);
                }
            }
        }
    }
    
}



.task-item__container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 346px;
    border: solid 1px;
    border-radius: var(--sapcing1);
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