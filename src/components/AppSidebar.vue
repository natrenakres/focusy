<script setup lang="ts">
import { SidebarMenuButton } from './ui/sidebar';
import Sidebar from './ui/sidebar/Sidebar.vue';
import SidebarHeader from './ui/sidebar/SidebarHeader.vue';
import SidebarMenu from './ui/sidebar/SidebarMenu.vue';
import SidebarMenuItem from './ui/sidebar/SidebarMenuItem.vue';
import {IconInnerShadowTop} from "@tabler/icons-vue"

</script>

<template>
    <Sidebar>
        <SidebarHeader>
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
    </Sidebar>

</template>