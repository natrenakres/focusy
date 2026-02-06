<script setup lang="ts">
import AppSidebar from './components/AppSidebar.vue';
import SidebarInset from './components/ui/sidebar/SidebarInset.vue';
import SidebarProvider from './components/ui/sidebar/SidebarProvider.vue';
import AppHeader from './layout/AppHeader.vue';
import { useProjectsStore } from './stores/useProjectsStore';
import ProjectContent from './components/ProjectContent.vue';

const { projectList, selectedProject } = useProjectsStore();

</script>

<template>  
  <SidebarProvider>
    <AppSidebar />
    <SidebarInset>
      <AppHeader />
      <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
          <ProjectContent 
            v-if="projectList.length > 0" 
            :project="selectedProject ?? projectList[0]" />
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
