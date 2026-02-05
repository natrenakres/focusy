<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from "@tanstack/vue-form"
import type { Task } from '../stores/useTaskStore';
import useTaskStore from '../stores/useTaskStore';
import { file, z } from "zod";
import { IconTrash, IconCheck, IconPlus, IconMinus } from "@tabler/icons-vue"

import { Card } from './ui/card';
import CardContent from './ui/card/CardContent.vue';
import FieldGroup from './ui/field/FieldGroup.vue';
import { Field, FieldError, FieldLabel } from './ui/field';
import { Input } from './ui/input';
import CardHeader from './ui/card/CardHeader.vue';
import CardTitle from './ui/card/CardTitle.vue';
import { NumberField, NumberFieldContent, NumberFieldIncrement } from './ui/number-field';
import Label from './ui/label/Label.vue';
import NumberFieldDecrement from './ui/number-field/NumberFieldDecrement.vue';
import NumberFieldInput from './ui/number-field/NumberFieldInput.vue';
import { Textarea } from './ui/textarea';
import CardFooter from './ui/card/CardFooter.vue';
import Button from './ui/button/Button.vue';

const { task } = defineProps<{
    task?: Task,
}>();

const TaskFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string(),
    estimatedPomodoroCount: z.number().min(1, "Estimated Pomodoro Count must be at least 1"),
    pomodoroCount: z.number().min(0, "Pomodoro Count must be at least 0"),
});

const form = useForm({
    defaultValues: {
        title: task?.title ?? '',
        estimatedPomodoroCount: task?.estimatedPomodoroCount ?? 1,
        pomodoroCount: task?.pomodoroCount ?? 0,        
        description: task?.description ?? '',
    },
    validators: {
        onSubmit: TaskFormSchema
    },
    onSubmit: async ({ value }) => {
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



const taskForm = ref<TaskFormData>({
    title: task?.title ?? '',
    description: task?.description,
    estimatedPomodoroCount: task?.estimatedPomodoroCount ?? 1,
    pomodoroCount: task?.pomodoroCount,
})

const emit = defineEmits(['update:open']);

function handleSave() {
    emit("update:open", false);
    const { title, description, estimatedPomodoroCount, pomodoroCount } = taskForm.value;
    if (!task)
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

function handleCancel() {
    emit("update:open", false);
}

function handleDescription() {
    isDescOpen.value = !isDescOpen.value;
}
function removeDescription() {
    isDescOpen.value = false;
    if (taskForm) {
        taskForm.value.description = undefined;
    }
}

function handleIcrement() {
    taskForm.value.estimatedPomodoroCount++;
}

function handleDecrement() {
    if (+taskForm.value.estimatedPomodoroCount > 1)
        taskForm.value.estimatedPomodoroCount--;
}
</script>

<template>
    <form @submit.prevent="form.handleSubmit">
        <Card key="open" class="w-full">
            <CardContent class="px-1">
                <FieldGroup>
                    <form.Field name="title">
                        <template #default="{ field }">
                            <Field :data-invalid="isInvalid(field)">
                                <FieldLabel :for="field.name">
                                    Title
                                </FieldLabel>
                                <Input :id="field.name" :model-value="field.state.value"
                                    @input="field.handleChange($event.target.value)" :name="field.name"
                                    autocomplete="off" class="w-full rounded-sm h-8" :aria-invalid="isInvalid(field)" />
                                <FieldError v-if="isInvalid(field)" :errors="field.state.meta.errors" />
                            </Field>
                        </template>
                    </form.Field>
                    <Card class="py-0">                        
                        <CardContent class="grid grid-cols-2 px-1">
                            <form.Field name="pomodoroCount">
                                <template #default="{ field }">
                                    <NumberField 
                                        :model-value="field.state.value" 
                                        @update:model-value="field.handleChange" :id="field.name" :min="0" :max="99">
                                        <Label>Actual Pomodoro</Label>
                                        <NumberFieldContent>
                                            <NumberFieldDecrement />
                                            <NumberFieldInput />
                                            <NumberFieldIncrement />
                                        </NumberFieldContent>
                                    </NumberField>
                                </template>
                            </form.Field>
                            <form.Field name="estimatedPomodoroCount">
                                <template #default="{ field }">
                                    <NumberField  
                                    :model-value="field.state.value" 
                                    @update:model-value="field.handleChange" :id="field.name" :default-value="1" :min="1" :max="99">
                                        <Label>Estimated Pomodoro</Label>
                                        <NumberFieldContent>
                                            <NumberFieldDecrement />
                                            <NumberFieldInput />
                                            <NumberFieldIncrement />
                                        </NumberFieldContent>
                                    </NumberField>
                                </template>
                            </form.Field>

                        </CardContent>
                    </Card>
                    <Card v-if="isDescOpen">
                        <CardHeader>
                            <CardTitle>
                                Description
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form.Field name="description">
                                <template #default="{ field }">
                                    <Field :data-invalid="isInvalid(field)">    
                                        <FieldLabel :for="field.name">
                                            Description
                                        </FieldLabel>
                                        <Textarea :id="field.name" :model-value="field.state.value"
                                            @input="field.handleChange($event.target.value)" :name="field.name"
                                            autocomplete="off" class="w-full rounded-sm" :aria-invalid="isInvalid(field)" />
                                        <FieldError v-if="isInvalid(field)" :errors="field.state.meta.errors" />
                                    </Field>
                                </template> 
                            </form.Field>                            
                        </CardContent>
                    </Card>
                    <div class="flex gap-2 justify-between">
                        <Button v-if="!isDescOpen"  @click="handleDescription" variant="secondary">
                            <IconPlus />
                            Add Description
                        </Button>
                        <Button v-else type="button" @click="removeDescription" variant="secondary">
                            <IconMinus />
                            Remove Description
                        </Button>
                    </div>
                </FieldGroup>
            </CardContent>
            <CardFooter class="flex justify-between">
                <Button @click="handleDelete" variant="destructive" size="icon">
                    <IconTrash />
                </Button>
                <div class="flex gap-2">
                    <Button @click.stop="handleCancel" variant="secondary">
                        Cancel
                    </Button>
                    <Button type="submit">
                        <IconCheck size="16" />
                        Save
                    </Button>
                </div>
            </CardFooter>
        </Card>
    </form>
</template>
