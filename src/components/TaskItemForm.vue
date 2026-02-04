<script setup lang="ts">        
    import { ref } from 'vue';
    import type { Task } from '../stores/useTaskStore';
    import useTaskStore from '../stores/useTaskStore';  
    import { z}  from "zod";  
    import { useForm} from "@tanstack/vue-form"
    
    import { Card } from './ui/card';
    import CardContent from './ui/card/CardContent.vue';
    import FieldGroup from './ui/field/FieldGroup.vue';
    import { Field, FieldError, FieldLabel } from './ui/field';
    import { Input } from './ui/input';
import CardHeader from './ui/card/CardHeader.vue';
import CardTitle from './ui/card/CardTitle.vue';

    const TaskFormSchema = z.object({
        title: z.string().min(1, "Title is required"),
        description: z.string().optional(),
        estimatedPomodoroCount: z.number().min(1, "Estimated Pomodoro Count must be at least 1"),
        pomodoroCount: z.number().min(0, "Pomodoro Count must be at least 0").optional(),
    });

    const form = useForm({
        defaultValues: {
            title: '',
            description: '',
            estimatedPomodoroCount: 1,
            pomodoroCount: 0,
        },
        validators: {
            onSubmit: TaskFormSchema
        },
        onSubmit: async ({value}) => {
            console.log("Form Submitted with values:", value);
            // Handle form submission logic here
        }
    });
    function isInvalid(field: any) {
        return field.state.meta.isTouched && !field.state.meta.isValid
    }



    // OLD LOGIC

    interface TaskFormData {
        title: string
        description?: string    
        estimatedPomodoroCount: number;
        pomodoroCount?: number;        
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
    })

    const emit = defineEmits(['update:open']);

    function handleSave(){        
        emit("update:open", false);        
        const { title, description, estimatedPomodoroCount, pomodoroCount } = taskForm.value;
        if(!task)
            createNewTask({
                title,
                description,                        
                estimatedPomodoroCount,
                pomodoroCount,
                isActive: false,                
            })        
        else {
            task.title = title;
            task.estimatedPomodoroCount = estimatedPomodoroCount;
            task.pomodoroCount = pomodoroCount;
            task.description = description;            
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
    <Card key="open">  
        <CardContent>
            <form @submit.prevent="form.handleSubmit">
                <FieldGroup>
                    <form.Field name="title">
                        <template #default="{ field }">
                            <Field :data-invalid="isInvalid(field)">
                                <FieldLabel :for="field.name">
                                    Title
                                </FieldLabel>
                                <Input :id="field.name" :model-value="field.state.value"
                                    @input="field.handleChange($event.target.value)"
                                    :name="field.name"
                                    autocomplete="off" 
                                    class="w-full rounded-sm h-8" 
                                    :aria-invalid="isInvalid(field)" />
                                <FieldError v-if="isInvalid(field)" :errors="field.state.meta.errors" />
                            </Field>
                        </template>
                    </form.Field>
                </FieldGroup>
                
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Act/Est Pomodoro
                        </CardTitle> 
                    </CardHeader>                    
                    <CardContent>
                        <input type="number" min="1" max="9999" v-if="task" v-model="taskForm.pomodoroCount" required class="w-16 text-center rounded-sm h-8"/>
                        <span v-if="task">/</span> 
                        <input type="number" v-model="taskForm.estimatedPomodoroCount" class="w-16 text-center rounded-sm h-8"/> 
                        <button type="button" @click="handleIcrement" class="w-4 h-4 bg-transparent border border-[#20A39E] text-[#23001E] flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-up-icon lucide-chevron-up"><path d="m18 15-6-6-6 6"/></svg>
                        </button>                
                        <button type="button" @click="handleDecrement" class="w-4 h-4 bg-transparent border border-[#20A39E] text-[#23001E] flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down-icon lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
                        </button>
                    </CardContent>
                </Card>
                <textarea v-if="isDescOpen" rows="3" v-model="taskForm.description" class="p-2 text-sm bg-gray-100 rounded-sm border-0 focus-visible:outline-none" />
                <div class="flex gap-2 justify-between">
                    <button v-if="!isDescOpen" type="button" @click="handleDescription" class="bg-transparent text-gray-400 m-0 p-0 border-b border-gray-400 rounded-none hover:text-[#23001E]">
                        +
                        Add Description
                    </button>
                    <button v-else type="button" @click="removeDescription" class="bg-transparent text-gray-400 m-0 p-0 border-b border-gray-400 rounded-none hover:text-[#23001E]">
                        -
                        Remove Description
                    </button>                
                </div>
                
                <div class="flex justify-between">
                    <button type="button" class="w-6 h-6 text-[#EF5B5B] bg-transparent border border-[#20A39E] flex items-center justify-center" @click="handleDelete">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2-icon lucide-trash-2"><path d="M10 11v6"/><path d="M14 11v6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                    </button>
                    <div class="flex gap-6">
                        <button class="bg-transparent border-0 m-0 text-gray-400 p-0 rounded-none underline hover:text-[#23001E]" @click.stop="handleCancel">                    
                            Cancel
                        </button>
                        <button type="submit" class="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5"/></svg>
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </CardContent>      
    </Card>
</template>
