<template>
  <div>
    <div class="flex gap-2 items-center mb-1">
      <label class="text-red-500" v-if="required">*</label>
      <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700">
        {{ label }}
      </label>
      <p v-if="helpText" class="text-xs text-gray-500 opacity-75">{{ helpText }}</p>
    </div>
    
    <div class="relative">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[
          'block outline-none w-full rounded border border-gray-300 px-2 py-1',
          'focus:border-blue-500 focus:ring-blue-500',
          error ? 'border-red-300' : 'border-gray-300',
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white',
          className
        ]"
      />
    </div>
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
  label?: string
  type?: string
  placeholder?: string
  disabled?: boolean
  error?: string
  helpText?: string
  className?: string
  id?: string
  required?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  disabled: false,
  className: '',
  required: false,
  id: () => `input-${Math.random().toString(36).substr(2, 9)}`
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>