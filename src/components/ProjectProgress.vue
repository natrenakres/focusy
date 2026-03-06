<script setup lang="ts">
import { computed } from "vue";
import { Progress } from "./ui/progress";

const props = defineProps<{
  totalActualPomodoros: number;
  totalEstimatedPomodoros: number;
  progressPercent: number;
}>();

const roundedProgress = computed(() => Math.round(props.progressPercent));
</script>

<template>
  <div class="w-full max-w-md rounded-md border border-border bg-card p-3">
    <div class="flex items-center gap-3 text-sm">
      <span class="shrink-0 text-muted-foreground">
        {{ totalActualPomodoros }} / {{ totalEstimatedPomodoros }}
      </span>
      <Progress class="min-w-0 flex-1" :model-value="progressPercent" />
      <span class="shrink-0 font-medium">{{ roundedProgress }}%</span>
    </div>
  </div>
</template>
