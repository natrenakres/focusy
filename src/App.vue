<script setup lang="ts">
  import TheFooter from './layout/TheFooter.vue';
  import TheHeader from './layout/TheHeader.vue';
  import PomodoroTimer from './components/PomodoroTimer.vue';  
</script>

<template>  
  <TheHeader />
  <main class="p-4">    
    <PomodoroTimer />    
  </main>
  <TheFooter />  
</template>

<style lang="css">

.task-list {
  padding: var(--sapcing3) 0; 
}
</style>
