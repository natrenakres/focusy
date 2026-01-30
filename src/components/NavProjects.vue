<script setup lang="ts">
import SidebarGroup from './ui/sidebar/SidebarGroup.vue';
import SidebarGroupContent from './ui/sidebar/SidebarGroupContent.vue';
import SidebarMenu from './ui/sidebar/SidebarMenu.vue';
import SidebarMenuItem from './ui/sidebar/SidebarMenuItem.vue';
import SidebarMenuButton from './ui/sidebar/SidebarMenuButton.vue';
import { IconPlus } from '@tabler/icons-vue';
import    { useProjectsStore } from '@/stores/useProjectsStore';
import Separator from './ui/separator/Separator.vue';
import SidebarGroupLabel from './ui/sidebar/SidebarGroupLabel.vue';
import Button from './ui/button/Button.vue';
const { projectList, selectedProjectId, setSelectedProject } = useProjectsStore();
</script>

<template>
<SidebarGroup>
    <SidebarGroupLabel class="flex justify-between ">
        <span>Projects</span>
        <Button size="icon"  variant="outline">
            <IconPlus />
            <span class="sr-only">Inbox</span>
        </Button>
    </SidebarGroupLabel>
    <SidebarGroupContent class="flex flex-col gap-2">        
        <Separator />
        <SidebarMenu>
            <SidebarMenuItem 
                v-for="project in projectList" 
                :key="project.id">
                <SidebarMenuButton  
                    :style="project.id === selectedProjectId ? `border: 1px solid ${project.color}; box-shadow: inset 4px 0 0 0 ${project.color};` : ``"
                    :tooltip="project.name"
                    @click="setSelectedProject(project.id)"
                    :is-active="project.id === selectedProjectId"
                    :aria-current="project.id === selectedProjectId ? 'true' : undefined">
                    <span>{{ project.name }}</span> 
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    </SidebarGroupContent>
</SidebarGroup>
</template>