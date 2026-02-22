<script setup lang="ts">
import { ref } from "vue";
import { IconArrowUpRight, IconFolderCode }  from "@tabler/icons-vue"
import { useFileSystemAccess } from "@vueuse/core"
import { Button } from '@/components/ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import ProjectCreateForm from "./ProjectCreateForm.vue";
import { useProjectsStore  } from "@/stores/useProjectsStore";

const { isSupported, data, open, fileMIME } = useFileSystemAccess();
const { importProjectFormFile } = useProjectsStore();

const openAddProject = ref(false);

function callbackOpenAddProject(state: boolean) {
    openAddProject.value = state;
}

async function onOpen() {
  try {    
    await open();
    importProjectFormFile(fileMIME.value, data.value);    
  } 
  catch(error: unknown) {
    console.error(error);
  }
}


</script>

<template>
  <Empty>
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <IconFolderCode />
      </EmptyMedia>
      <EmptyTitle>No Projects Yet</EmptyTitle>
      <EmptyDescription>
        You haven't created any projects yet. Get started by creating your first
        project.
      </EmptyDescription>
    </EmptyHeader>
    <EmptyContent>
      <div class="flex gap-2">
        <Dialog v-model:open="openAddProject">
            <DialogTrigger>
                <Button>Create Project</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>New Project</DialogTitle>
                </DialogHeader>
                <ProjectCreateForm @update:open="callbackOpenAddProject" />
            </DialogContent>
        </Dialog>        
        <Button v-if="isSupported" variant="outline" @click="onOpen">
          Import Project
        </Button>
      </div>
    </EmptyContent>
    <Button variant="link" as-child class="text-muted-foreground" size="sm">
      <a target="_blank" href="https://github.com/natrenakres/focusy/docs/index.md">
        Learn More <IconArrowUpRight />
      </a>
    </Button>
  </Empty>
</template>
