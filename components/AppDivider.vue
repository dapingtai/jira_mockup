<script setup lang="ts">
defineProps<{
  vertical?: boolean;
  margin?: string;
}>();
</script>

<template>
  <div class="flex items-center" :style="{ margin }">
    <div
      :class="{
        'h-px flex-grow': !vertical,
        'w-px h-full': vertical
      }"
      class="bg-gray-200 dark:bg-gray-700"
    />
    <slot>
      <span class="px-4 text-gray-500 dark:text-gray-400" />
    </slot>
    <div
      :class="{
        'h-px flex-grow': !vertical,
        'w-px h-full': vertical
      }"
      class="bg-gray-200 dark:bg-gray-700"
    />
  </div>
</template>