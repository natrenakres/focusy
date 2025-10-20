<script setup lang="ts">
  import TheFooter from './layout/TheFooter.vue';
  import PomodoroTimer from './components/PomodoroTimer.vue';
  import TaskItem from './components/TaskItem.vue';
  import CreateTaskButton from './components/CreateTaskButton.vue';
  import useTaskStore from './stores/useTaskStore';

  const { taskList } = useTaskStore();

  
</script>

<template>  
  <header>
    <h1 class="logo">Focusy</h1>    
  </header>
  <main>
    <PomodoroTimer />
    <CreateTaskButton />
    <div class="task-list">
        <TaskItem v-for="task in taskList" :task="task" />
    </div>
  </main>
  <TheFooter />  
</template>

<style lang="css">

.task-list {
  padding: var(--sapcing3) 0; 
}
</style>
