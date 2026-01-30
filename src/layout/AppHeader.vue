<script setup lang="ts">
import Separator from '@/components/ui/separator/Separator.vue';
import SidebarTrigger from '@/components/ui/sidebar/SidebarTrigger.vue';
import { useProjectsStore } from '@/stores/useProjectsStore';

const { selectedProject } = useProjectsStore();
</script>

<template>
    <header class="flex h-16 shrink-0 items-center gap-2">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator 
            orientation="vertical"
            class="mr-2 data-[orientation=vertical]:h-4" />            
          <h1 class="text-lg font-semibold">{{ selectedProject?.name ?? "Project Title" }}  </h1>
        </div>
      </header>
</template>