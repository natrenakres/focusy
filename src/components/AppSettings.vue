<script setup lang="ts">    
    import { IconSettings } from '@tabler/icons-vue';
    import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';
    import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
    import AppSettingsForm from './AppSettingsForm.vue';
    import { ref } from 'vue';

    const open = ref(false);
</script>

<template>
    <SidebarMenu>
        <SidebarMenuItem>
            <SidebarMenuButton 
                @click="open = true"
                class="data-[slot=sidebar-menu-button]:p-1.5! cursor-pointer">
                <IconSettings class="mr-2 site-5!" />
                <span class="text-base font-medium">Settings</span>
            </SidebarMenuButton>
        </SidebarMenuItem>
    </SidebarMenu>
    <Dialog v-model:open="open">        
        <DialogContent>
            <DialogHeader>
                <DialogTitle>App Settings</DialogTitle>
            </DialogHeader>
            <AppSettingsForm @update:open="open = $event" />
        </DialogContent>
    </Dialog>
</template>