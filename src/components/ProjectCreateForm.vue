<script setup lang="ts">
import { z } from 'zod';
import { IconTrash} from "@tabler/icons-vue";
import { useForm } from '@tanstack/vue-form';
import { projectTypes, useProjectsStore, type Project, type ProjectType } from '@/stores/useProjectsStore';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogCancel, AlertDialogAction, AlertDialogDescription } from './ui/alert-dialog';
import { Card, CardContent, CardFooter } from './ui/card';
import { FieldGroup, FieldLabel, FieldError } from './ui/field';
import { Input } from './ui/input';
import Button from './ui/button/Button.vue';
import { IconCheck } from '@tabler/icons-vue';


const { project } = defineProps<{
    project?: Project | null
}>();


const { createNewProject, deleteProject } = useProjectsStore();
const emit = defineEmits(['update:open']);


const ProjectFormSchema = z.object({
    name: z.string().min(1, "Project name is required"),
    color: z.string().min(1, "Project color is required"),
    type: z.enum(projectTypes),
});
type ProjectFormValues = Pick<Project, "name" | "color" | "type">;

const form = useForm({
    defaultValues: {
        name: project?.name ?? '',
        color: project?.color ?? '#FF5733',
        type: project?.type ?? "none",
    } as ProjectFormValues,
    validators: {
        onSubmit: ProjectFormSchema
    },
    onSubmit: async ({ value }: { value: ProjectFormValues }) => {
        if (!project) {            
            createNewProject(value);
            emit("update:open", false);
        } else {            
            project.name = value.name;
            project.type = value.type;
            project.color = value.color;
            project.lastEdited = Date.now();
            emit("update:open", false)
        }
    },
});

function handleDelete() {
    emit("update:open", false);
    deleteProject(project?.id);
}

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
                                @input="field.handleChange($event.target.value)" :name="field.name" autocomplete="off"
                                class="w-full rounded-sm h-8" />
                            <FieldError v-if="isInvalid(field)" :errors="field.state.meta.errors" />
                        </template>
                    </form.Field>
                    <form.Field name="color">
                        <template #default="{ field }">
                            <FieldLabel :for="field.name">
                                Project Color
                            </FieldLabel>
                            <Input type="color" :id="field.name" :model-value="field.state.value"
                                @input="field.handleChange($event.target.value)" :name="field.name" autocomplete="off"
                                class="w-16 h-8 p-0 border-0" />
                        </template>
                    </form.Field>
                    <form.Field name="type">
                        <template #default="{ field }">
                            <FieldLabel :for="field.name">
                                Project Type
                            </FieldLabel>
                            <select :id="field.name" :value="field.state.value"
                                @change="e => field.handleChange((e.target as HTMLSelectElement).value as ProjectType)"
                                class="w-full rounded-sm h-8">
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
                <AlertDialog v-if="project">   
                    <AlertDialogTrigger as-child>
                        <Button variant="destructive" size="icon">
                            <IconTrash />
                        </Button>
                        </AlertDialogTrigger>
                    <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure to delete the project {{ project.name }}?</AlertDialogTitle>                        
                        <AlertDialogDescription>Delete permenantyl the project</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction class="bg-accent hover:bg-accent/85" @click="handleDelete">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <Button @click.stop="handleCancel" variant="secondary" type="button">
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