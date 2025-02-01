<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <div v-if="imageUrl" class="w-full h-48">
      <img :src="imageUrl" :alt="title" class="w-full h-full object-cover">
    </div>
    <div class="p-4">
      <h3 class="text-xl font-semibold mb-2">{{ title }}</h3>
      <p class="text-gray-600">{{ description }}</p>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  imageUrl?: string
}>()</script>