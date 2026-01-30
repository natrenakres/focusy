<script setup lang="ts">
import {IconInnerShadowTop} from "@tabler/icons-vue"
import { SidebarMenuButton } from './ui/sidebar';
import Sidebar from './ui/sidebar/Sidebar.vue';
import SidebarHeader from './ui/sidebar/SidebarHeader.vue';
import SidebarMenu from './ui/sidebar/SidebarMenu.vue';
import SidebarMenuItem from './ui/sidebar/SidebarMenuItem.vue';
import SidebarContent from './ui/sidebar/SidebarContent.vue';
import NavProjects from './NavProjects.vue';
import Separator from "./ui/separator/Separator.vue";

</script>

<template>
    <Sidebar>
        <SidebarHeader class="shadow-md bg-background text-primary">
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton 
                        as-child
                        class="data-[slot=sidebar-menu-button]:p-1.5!">
                        <a href="#">
                            <IconInnerShadowTop class="site-5!" />
                            <span class="text-base font-semibold">Focusy</span>
                        </a>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarHeader>
        <Separator />
        <SidebarContent>
            <NavProjects  />
        </SidebarContent>
    </Sidebar>

</template>