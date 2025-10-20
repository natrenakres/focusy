<script setup lang="ts">        
    import { ref } from 'vue';
    import type { Task } from '../stores/useTaskStore';
    import useTaskStore from '../stores/useTaskStore';  
    interface TaskFormData {
        title: string
        description?: string    
        estimatedPomodoroCount: number;
        pomodoroCount?: number;
        type: "work" | "side" | "personal" | "none"
    }

    const { createNewTask, deleteTask } = useTaskStore();

    const { task } =  defineProps<{
        task?: Task,        
    }>();

    const taskForm = ref<TaskFormData>({
        title: task?.title ?? '',
        description: task?.description,
        estimatedPomodoroCount: task?.estimatedPomodoroCount ?? 1,
        pomodoroCount: task?.pomodoroCount,
        type: task?.type ?? "none"
    })

    const emit = defineEmits(['update:open']);

    function handleSave(){        
        emit("update:open", false);        
        const { title, type, description, estimatedPomodoroCount, pomodoroCount } = taskForm.value;
        if(!task)
            createNewTask({
                title,
                description,                        
                estimatedPomodoroCount,
                pomodoroCount,
                isActive: false,
                isCompleted: false,
                type
            })        
        else {
            task.title = title;
            task.estimatedPomodoroCount = estimatedPomodoroCount;
            task.pomodoroCount = pomodoroCount;
            task.description = description;
            task.type = type;
        }
    }

    function handleDelete() {
        emit("update:open", false);
        deleteTask(task?.id);
    }

    const isDescOpen = ref<boolean>(task?.description !== undefined);

    function handleCancel(){
        emit("update:open", false);
    }

    function handleDescription(){
        isDescOpen.value = !isDescOpen.value;
    }
    function removeDescription() {
        isDescOpen.value = false;
        if(taskForm) {
            taskForm.value.description = undefined;
        }
    }

    function handleIcrement(){
        taskForm.value.estimatedPomodoroCount++;
    }

    function handleDecrement(){
        if(+taskForm.value.estimatedPomodoroCount > 1) 
            taskForm.value.estimatedPomodoroCount--;
    }
</script>

<template>
    <form @submit.prevent="handleSave">
        <div key="open" class="task-item-form__container">        
            <input type="text" v-model="taskForm.title"  required/> 
            <div class="pomodoro-count">
                <h3>Act/Est Pomodoro</h3>
                <div class="pomodoro-select">
                    <input type="number" min="1" max="9999" v-if="task" v-model="taskForm.pomodoroCount"  required/>
                    <span v-if="task">/</span> 
                    <input type="number" v-model="taskForm.estimatedPomodoroCount" /> 
                    <button type="button" @click="handleIcrement">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-up-icon lucide-chevron-up"><path d="m18 15-6-6-6 6"/></svg>
                    </button>                
                    <button type="button" @click="handleDecrement">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down-icon lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
                    </button>
                </div>
            </div>
                <textarea v-if="isDescOpen" rows="3" v-model="taskForm.description" />
                <div class="content">
                    <button v-if="!isDescOpen"  type="button" @click="handleDescription">
                        +
                        Add Description
                    </button>
                    <button v-else type="button" @click="removeDescription">
                        -
                        Remove Description
                    </button>
                    <select v-model="taskForm.type">                        
                        <option value="none">Select a task Type</option>
                        <option value="work">Work</option>
                        <option value="side">Side Project</option>
                        <option value="personal">Personal</option>
                    </select>
                </div>
                
                <div class="footer">
                    <button type="button" class="delete-btn" @click="handleDelete">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                    <div class="action-btn-container">
                        <button class="link" @click.stop="handleCancel" >                    
                            Cancel
                        </button>
                        <button  type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                            Save
                        </button>
                    </div>
                </div>
        </div>
    </form>
</template>


<style lang="css">
    

.task-item-form__container{
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

    & input {
        width: 100%;
        border-radius: var(--sapcing1);
        height: 2rem;        
    }

    & select {
        border-radius: var(--sapcing1);
        text-align: center;
    }

    .pomodoro-count{
        display: flex;
        flex-direction: column;
        gap: var(--sapcing1);
        padding: 0;
        margin: 0;

        .pomodoro-select{
            display: flex;
            align-items: center;
            gap: var(--sapcing2);
            
            & input {
                width: 4rem;                
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

    .content {
        display: flex;
        gap: var(--sapcing2);
        padding: 0;
        justify-content: space-between;

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

    .footer{
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
</style>