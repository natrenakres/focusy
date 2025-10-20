<script setup lang="ts">
    import { ref } from 'vue';  
    import TaskItemForm from './TaskItemForm.vue';    
    

    const isOpen = ref<boolean>(false);
    
    
    function handleClick(){
        isOpen.value = !isOpen.value;
    }




</script>

<template>
    <button @click="handleClick" v-if="!isOpen">   
        Add New Task
    </button>
    <TaskItemForm v-else @update:open="handleClick" />

</template>

<style lang="css">

</style>