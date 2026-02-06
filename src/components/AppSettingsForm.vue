<script setup lang="ts">
import { z } from 'zod';
import { useForm } from '@tanstack/vue-form';
import { useAppSettings } from '@/stores/useAppSettingsStore';
import { Card, CardContent, CardFooter } from './ui/card';
import { FieldGroup, FieldLabel, FieldError } from './ui/field';
import { Input } from './ui/input';
import Button from './ui/button/Button.vue';
import { IconCheck } from '@tabler/icons-vue';

const { appSettings, updateAppSettings } = useAppSettings();

console.log("Current app settings:", appSettings.value);

const emit = defineEmits(['update:open']);
const AppSettingsFormSchema = z.object({
    weeklyHours: z.number().min(1, "Weekly hours must be at least 1"),
    dailyHours: z.number().min(1, "Daily hours must be at least 1"),    
    lunchBreak: z.number().min(0, "Lunch break cannot be negative").max(180, "Lunch break cannot exceed 3 hours"),
});

const form = useForm({
    defaultValues: {
        weeklyHours: appSettings.value.weeklyHours,
        dailyHours: appSettings.value.dailyHours,
        lunchBreak: appSettings.value.lunchBreak,
    },
    validators: {
        onSubmit: AppSettingsFormSchema
    },
    onSubmit: async ({ value } : {value: any}) => {        
        updateAppSettings(value);    
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
                    <form.Field name="weeklyHours">
                        <template #default="{ field }">
                            <FieldLabel :for="field.name">
                                Weekly Hours
                            </FieldLabel>
                            <Input type="number" :id="field.name" :model-value="field.state.value"
                                @input="field.handleChange(+$event.target.value)" :name="field.name"
                                autocomplete="off" class="w-full rounded-sm h-8"  />
                            <FieldError v-if="isInvalid(field)"  :errors="field.state.meta.errors" />
                        </template>
                    </form.Field>
                    <form.Field name="dailyHours">
                        <template #default="{ field }">
                            <FieldLabel :for="field.name">
                                Daily Hours
                            </FieldLabel>
                            <Input type="number" :id="field.name" :model-value="field.state.value"
                                @input="field.handleChange(+$event.target.value)" :name="field.name"
                                autocomplete="off" class="w-full rounded-sm h-8"  />
                            <FieldError v-if="isInvalid(field)"  :errors="field.state.meta.errors" />
                        </template>
                    </form.Field>   
                    <form.Field name="lunchBreak">
                        <template #default="{ field }">
                            <FieldLabel :for="field.name">
                                Lunch Break (minutes)
                            </FieldLabel>
                            <Input type="number" :id="field.name" :model-value="field.state.value"
                                @input="field.handleChange(+$event.target.value)" :name="field.name"
                                autocomplete="off" class="w-full rounded-sm h-8"  />
                            <FieldError v-if="isInvalid(field)"  :errors="field.state.meta.errors" />
                        </template>
                    </form.Field>                 
                </FieldGroup>
            </CardContent>
            <CardFooter class="flex justify-end gap-2">
                <Button variant="outline" @click.prevent="handleCancel">Cancel</Button>
                <Button type="submit"><IconCheck class="mr-2"/> Save</Button>
            </CardFooter>
        </Card>
    </form>

</template>