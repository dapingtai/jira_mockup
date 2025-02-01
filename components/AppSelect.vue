<template>
  <div>
    <div class="flex gap-2 items-center mb-1">
      <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-1">
        {{ label }}
      </label>
      <p v-if="helpText" class="text-xs text-gray-500 opacity-75">{{ helpText }}</p>
    </div>
    <div class="relative">
      <select
        :id="id"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
        :disabled="disabled"
        :class="[
          'block w-full rounded border border-gray-300 px-2 py-2 text-gray-400',
          'focus:border-blue-500 focus:ring-blue-500',
          error ? 'border-red-300' : 'border-gray-300',
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white',
          className
        ]"
      >
        <option v-if="placeholder" value="" disabled selected class="text-gray-400">{{ placeholder }}</option>
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
interface Option {
  value: string
  label: string
}

interface Props {
  modelValue: string
  options: Option[]
  label?: string
  placeholder?: string
  disabled?: boolean
  error?: string
  helpText?: string
  className?: string
  id?: string
}

withDefaults(defineProps<Props>(), {
  options: () => [],
  placeholder: '',
  disabled: false,
  className: '',
  id: () => `select-${Math.random().toString(36).substr(2, 9)}`
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>