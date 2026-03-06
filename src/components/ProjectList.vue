<script setup lang="ts">
import { computed, ref, watch } from "vue";
import SidebarGroup from './ui/sidebar/SidebarGroup.vue';
import SidebarGroupContent from './ui/sidebar/SidebarGroupContent.vue';
import SidebarMenu from './ui/sidebar/SidebarMenu.vue';
import SidebarMenuItem from './ui/sidebar/SidebarMenuItem.vue';
import SidebarMenuButton from './ui/sidebar/SidebarMenuButton.vue';
import { useProjectsStore, type Project } from '@/stores/useProjectsStore';
import Separator from './ui/separator/Separator.vue';
import SidebarGroupLabel from './ui/sidebar/SidebarGroupLabel.vue';
import { IconEdit } from "@tabler/icons-vue"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import ProjectCreateForm from "./ProjectCreateForm.vue";
import { Button } from "./ui/button";

const { projectList, selectedProject, selectedProjectId, setSelectedProject, inProgressProjects } = useProjectsStore();
const editingProject = ref<Project | null>(null);
const showCompletedProjects = ref(false);

const filteredProjects = computed(() => {
    if (showCompletedProjects.value) {
        return projectList.value;
    }

    return projectList.value.filter((project) => project.status === "in_progress");
});

function openEdit(project: Project) {
    editingProject.value = project;
}


function handleDialogChange(open: boolean) {
    if(!open) {
        editingProject.value = null;
    }
}

function toggleShowCompleted() {
    showCompletedProjects.value = !showCompletedProjects.value;
}

watch([showCompletedProjects, selectedProject], ([showCompleted, currentSelectedProject]) => {
    if (showCompleted) return;
    if (currentSelectedProject?.status !== "completed") return;

    const firstInProgress = inProgressProjects.value[0];
    setSelectedProject(firstInProgress?.id ?? null);
});

</script>

<template>
<SidebarGroup>
    <SidebarGroupLabel class="flex justify-between gap-2">
        <span>Projects</span>
        <Button variant="ghost" size="sm" @click="toggleShowCompleted">
            {{ showCompletedProjects ? "Hide Completed" : "Show Completed" }}
        </Button>
    </SidebarGroupLabel>
    <SidebarGroupContent class="flex flex-col gap-2">        
        <Separator />
        <SidebarMenu>
            <SidebarMenuItem 
                v-for="project in filteredProjects" 
                :key="project.id">
                <SidebarMenuButton                      
                    class="flex justify-between"
                    :style="project.id === selectedProjectId 
                        ? `border: 1px solid ${project.color}; box-shadow: inset 4px 0 0 0 ${project.color};` 
                        : ``"
                    :tooltip="project.name"
                    @click="setSelectedProject(project.id)"
                    :is-active="project.id === selectedProjectId"
                    :aria-current="project.id === selectedProjectId ? 'true' : undefined">
                    <span>{{ project.name }}</span> 
                    <Button variant="ghost" size="icon" @click.stop="openEdit(project)">
                        <IconEdit />
                    </Button>                    
                </SidebarMenuButton>                
            </SidebarMenuItem>
        </SidebarMenu>
    </SidebarGroupContent>
</SidebarGroup>
<Dialog 
    :open="!!editingProject"
    @update:open="handleDialogChange">    
    <DialogContent>
        <DialogHeader>
            <DialogTitle>
                {{ editingProject?.name }} Edit
            </DialogTitle>
            <DialogDescription>Edit and save or cancel or delete the project</DialogDescription>
        </DialogHeader>
        <ProjectCreateForm :project="editingProject" @update:open="handleDialogChange" />
    </DialogContent>
</Dialog>
</template>
