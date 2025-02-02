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
      <!-- Trigger Button -->
      <button
        type="button"
        :id="id"
        @click="toggleDropdown"
        :disabled="disabled"
        :class="[
          'block w-full rounded border px-2 py-1 text-left text-md',
          'focus:border-blue-500 focus:ring-blue-500',
          errorMessage ? 'border-red-300' : 'border-gray-300',
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white',
          className
        ]"
      >
        <span :class="[selectedOption ? 'text-gray-900' : 'text-gray-400']">
          {{ selectedOption ? selectedOption.label : placeholder }}
        </span>
        <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <Icon name="heroicons:chevron-down" class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </button>

      <!-- Dropdown Menu -->
      <div
        v-show="isOpen"
        class="absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg"
      >
        <ul
          class="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          tabindex="-1"
          role="listbox"
          @blur="closeDropdown"
        >
          <li
            v-for="option in options"
            :key="option.value"
            :class="[
              'cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-100',
              option.value === modelValue ? 'bg-gray-200' : ''
            ]"
            @click="selectOption(option)"
            role="option"
          >
            <span :class="['block truncate', option.value === modelValue ? 'font-medium' : 'font-normal']">
              {{ option.label }}
            </span>
            <span
              v-if="option.value === modelValue"
              class="absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600"
            >
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <p v-if="errorMessage" class="mt-1 text-sm text-red-600">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';

interface Option {
  value: string
  label: string
}

interface Props {
  name: string
  modelValue: string
  options?: Option[]
  label?: string
  placeholder?: string
  disabled?: boolean
  helpText?: string
  className?: string
  id?: string
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  name: 'AppSelectMenu',
  options: () => [],
  placeholder: '',
  disabled: false,
  className: '',
  required: false,
  id: () => `select-${Math.random().toString(36).substr(2, 9)}`
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isOpen = ref(false)

const selectedOption = computed(() => {
  return props.options.find(option => option.value === props.modelValue)
})

const toggleDropdown = () => {
  if (!props.disabled) {
    isOpen.value = !isOpen.value
  }
}

const closeDropdown = () => {
  isOpen.value = false
}

const selectOption = (option: Option) => {
  value.value = option.value
  emit('update:modelValue', option.value)
  closeDropdown()
}

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest(`#${props.id}`)) {
    closeDropdown()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

const { value, errorMessage } = useField(() => props.name);
</script>