<script setup lang="ts">
import { SidebarFooter, SidebarMenuButton } from './ui/sidebar';
import Sidebar from './ui/sidebar/Sidebar.vue';
import SidebarHeader from './ui/sidebar/SidebarHeader.vue';
import SidebarMenu from './ui/sidebar/SidebarMenu.vue';
import SidebarMenuItem from './ui/sidebar/SidebarMenuItem.vue';
import SidebarContent from './ui/sidebar/SidebarContent.vue';
import ProjectList from './ProjectList.vue';
import Separator from "./ui/separator/Separator.vue";
import AppSettings from './AppSettings.vue';
import LogoIcon from "../assets/logo.png";


</script>

<template>
    <Sidebar collapsible="icon" >
        <SidebarHeader class="shadow-md bg-background text-primary">
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton 
                        as-child
                        class="data-[slot=sidebar-menu-button]:p-1.5!">
                        <RouterLink to="/">
                            <img :src="LogoIcon" alt="Focusy Logo" width="24" height="24" />
                            <span class="text-base font-semibold">Focusy</span>
                        </RouterLink>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
        <Separator />
        <SidebarContent>
            <ProjectList  />
        </SidebarContent>
        <SidebarFooter>
            <AppSettings />
        </SidebarFooter>
    </Sidebar>

</template>