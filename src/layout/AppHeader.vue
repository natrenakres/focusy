<script setup lang="ts">
import { ref } from 'vue';
import Separator from '@/components/ui/separator/Separator.vue';
import SidebarTrigger from '@/components/ui/sidebar/SidebarTrigger.vue';
import { useProjectsStore } from '@/stores/useProjectsStore';
import { ButtonGroup } from '@/components/ui/button-group';
import Button from '@/components/ui/button/Button.vue';
import  useSessionStore  from '@/stores/useSessionStore';
import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
const { currentSession, startSession, completeSession, calculateExpectedEndTime } = useSessionStore();
const { selectedProject } = useProjectsStore();
const open = ref(false);
const startTime = ref(new Date().toISOString()); 

</script>

<template>
    <header class="flex h-16 shrink-0 items-center gap-2">
        <div class="flex items-center gap-2 px-4">
          <SidebarTrigger class="-ml-1" />
          <Separator 
            orientation="vertical"
            class="mr-2 data-[orientation=vertical]:h-4" />            
          <h1 class="text-lg font-semibold">{{ selectedProject?.name ?? "Working Session" }}  </h1>
          <Separator 
            orientation="vertical"
            class="mx-2 data-[orientation=vertical]:h-4" />
          <ButtonGroup>
            <Dialog v-model:open="open">
              <DialogTrigger as-child>
                <Button :disabled="!!currentSession?.startTime" variant="outline">Start</Button>            
              </DialogTrigger>              
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Start Focus Session</DialogTitle>
                </DialogHeader>                
                <div class="flex justify-end mt-4 gap-2">
                  <Input 
                    v-model="startTime" 
                    type="time"
                    @change="startTime = new Date().toISOString().split('T')[0] + 'T' + $event.target.value"
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" @click="open = false">Cancel</Button>
                  <Button @click="startSession(selectedProject?.id ?? '', new Date(startTime).getTime()); open = false">Start</Button>
                </DialogFooter>
              </DialogContent>  
            </Dialog>
            <Button :disabled="!currentSession?.startTime" variant="outline" @click="completeSession">Complete</Button>
          </ButtonGroup>
          <Separator             
            orientation="vertical"
            class="mx-2 data-[orientation=vertical]:h-4" />
          <span class="text-sm text-muted-foreground">{{ currentSession?.startTime ? new Date(currentSession.startTime).toLocaleTimeString() : "" }}</span>                    
          <span class="text-sm text-muted-foreground ml-2">{{ currentSession?.startTime ? new Date(calculateExpectedEndTime(currentSession)).toLocaleTimeString() : "" }}</span>

        </div>
      </header>
</template>