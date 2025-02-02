<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="fixed inset-0 z-60">
        <div class="absolute inset-0 bg-black bg-opacity-50" @click="$emit('update:modelValue', false)"></div>
        <div class="fixed z-10 mx-auto inset-x-0 top-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl" :class="[ width ? width : 'max-w-lg' ]">
          <div v-if="showHeader" class="p-4 border-b">
            <div class="flex justify-between items-center">
              <h3 class="text-lg font-semibold">{{ title }}</h3>
              <button @click="$emit('update:modelValue', false)" class="text-gray-500 hover:text-gray-700">
                <span class="text-2xl">&times;</span>
              </button>
            </div>
          </div>
          <div class="p-8">
            <slot></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  modelValue: boolean
  showHeader?: boolean
  title: string
  width: string
}>(), {
  showHeader: true,
  title: '',
  width: 'max-w-lg'
})

defineEmits<{
  'update:modelValue': [value: boolean]
}>()</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>