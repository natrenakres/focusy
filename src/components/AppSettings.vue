<script setup lang="ts">    
    import { ref, shallowRef, type ShallowRef } from 'vue';
    import { useFileSystemAccess } from "@vueuse/core"
    import { IconSettings } from '@tabler/icons-vue';
    
    import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';
    import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
    import AppSettingsForm from './AppSettingsForm.vue';
    import { Button } from './ui/button';
    import { useProjectsStore } from "@/stores/useProjectsStore";


    const isOpen = ref(false);
    const dataType = shallowRef('Text') as ShallowRef<'Text'>;
    const { projectList, importProjectFormFile } = useProjectsStore();
    const { isSupported, data, save, open, fileMIME } = useFileSystemAccess({
        dataType,
        types: [
            {
                description: 'text',
                accept: {
                    'text/plain': ['.json']
                }
            }
        ],
        excludeAcceptAllOption: true
    });

    

    async function onSave() {
        try {
            data.value = JSON.stringify(projectList.value);
            await save();
            isOpen.value = false;
        }
        catch(error: unknown) {
            console.error(error);            
        }
    }

    async function onOpen() {
        try {
            await open();            
            importProjectFormFile(fileMIME.value, data.value);
            isOpen.value = false;
        }
        catch(error: unknown) {
            console.error(error);
        }
    }
</script>

<template>
    <SidebarMenu>
        <SidebarMenuItem>
            <SidebarMenuButton 
                @click="isOpen = true"
                class="data-[slot=sidebar-menu-button]:p-1.5! cursor-pointer">
                <IconSettings class="mr-2 site-5!" />
                <span class="text-base font-medium">Settings</span>
            </SidebarMenuButton>
        </SidebarMenuItem>
    </SidebarMenu>
    <Dialog v-model:open="isOpen">        
        <DialogContent>
            <DialogHeader>
                <DialogTitle>App Settings</DialogTitle>
            </DialogHeader>
            <DialogDescription>
                Change Working hours or export your locale data as json
            </DialogDescription>
            <AppSettingsForm @update:open="isOpen = $event" />            
            <DialogFooter>
                <Button @click="onSave" v-if="isSupported" >Export Data</Button>            
                <Button @click="onOpen"  v-if="isSupported" variant="outline">Import Project</Button>
            </DialogFooter>        
        </DialogContent>
    </Dialog>
</template>