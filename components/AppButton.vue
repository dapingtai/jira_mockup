<template>
  <button
    :class="[
      'px-4 py-2 rounded-lg font-medium transition-colors',
      variant === 'primary' ? 'bg-blue-500 text-white hover:bg-blue-600' :
      variant === 'secondary' ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' :
      variant === 'danger' ? 'bg-red-500 text-white hover:bg-red-600' :
      'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
      size === 'sm' ? 'text-sm' :
      size === 'lg' ? 'text-lg' :
      'text-base',
      fullWidth ? 'w-full' : '',
      className
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'default'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  fullWidth?: boolean
  className?: string
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  disabled: false,
  fullWidth: false,
  className: ''
})

defineEmits<{
  click: []
}>()
</script>