<script setup lang="ts">
import { z } from 'zod';
import { useForm } from '@tanstack/vue-form';
import { useProjectsStore } from '@/stores/useProjectsStore';
import { Card, CardContent, CardFooter } from './ui/card';
import { FieldGroup, FieldLabel, FieldError } from './ui/field';
import { Input } from './ui/input';
import Button from './ui/button/Button.vue';
import { IconCheck } from '@tabler/icons-vue';

const {createNewProject } = useProjectsStore();

const emit = defineEmits(['update:open']);


const ProjectFormSchema = z.object({
    name: z.string().min(1, "Project name is required"),    
    color: z.string().min(1, "Project color is required"),
    type: z.string().min(1, "Project type is required"),
});

const form = useForm({
    defaultValues: {
        name: '',        
        color: '#FF5733',
        type: "none",
    },
    validators: {
        onSubmit: ProjectFormSchema
    },
    onSubmit: async ({ value } : {value: any}) => {
        console.log("Creating new project with values:", value);
        createNewProject(value);    
        emit("update:open", false);    
    },
});

function handleCancel() {
    emit("update:open", false);
}

function isInvalid(field: any) {
    return field.state.meta.isTouched && !field.state.meta.isValid
}


</script>

<template>
    <form @submit.prevent="form.handleSubmit">
        <Card class="w-full">
            <CardContent>
                <FieldGroup>
                    <form.Field name="name">
                        <template #default="{ field }">
                            <FieldLabel :for="field.name">
                                Project Name
                            </FieldLabel>
                            <Input :id="field.name" :model-value="field.state.value"
                                @input="field.handleChange($event.target.value)" :name="field.name"
                                autocomplete="off" class="w-full rounded-sm h-8"  />
                            <FieldError v-if="isInvalid(field)"  :errors="field.state.meta.errors" />
                        </template>
                    </form.Field>
                    <form.Field name="color">
                        <template #default="{ field }">
                            <FieldLabel :for="field.name">
                                Project Color
                            </FieldLabel>
                            <Input type="color" :id="field.name" :model-value="field.state.value"
                                @input="field.handleChange($event.target.value)" :name="field.name"
                                autocomplete="off" class="w-16 h-8 p-0 border-0" />
                        </template>
                    </form.Field>
                    <form.Field name="type">
                        <template #default="{ field }">
                            <FieldLabel :for="field.name">
                                Project Type
                            </FieldLabel>
                            <select :id="field.name" :value="field.state.value"
                                @change="field.handleChange(field.state.value)" :name="field.name"
                                class="w-full rounded-sm h-8" >
                                <option value="none">None</option>
                                <option value="work">Work</option>
                                <option value="side">Side Project</option>
                                <option value="personal">Personal</option>
                            </select>
                        </template>
                    </form.Field>
                </FieldGroup>
            </CardContent>
            <CardFooter class="flex justify-end space-x-2">
                <Button @click.stop="handleCancel" variant="secondary">
                        Cancel
                    </Button>
                    <Button type="submit">
                        <IconCheck size="16" />
                        Save
                    </Button>
            </CardFooter>
        </Card>
    </form>    
</template>