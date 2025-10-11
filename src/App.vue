<script setup lang="ts">
  import TheFooter from './layout/TheFooter.vue';
  import PomodoroTimer from './components/PomodoroTimer.vue';
  import TaskItem from './components/TaskItem.vue';
</script>

<template>  
  <header>
    <h1 class="logo">Focusy</h1>
    <nav>
      <ul>
        <li>
          <a href="#">Pomodoro</a>
        </li>
        <li>
          <a href="#">TextDif</a>
        </li>
      </ul>
    </nav>
  </header>
  <main>
    <PomodoroTimer />
    <div class="task-list">
        <TaskItem />
    </div>
  </main>
  <TheFooter />  
</template>

<style lang="css">

.task-list {
  padding: var(--sapcing3) 0; 
}
</style>
