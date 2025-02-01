<template>
  <nav class="fixed top-0 left-0 w-full bg-white shadow-md z-50">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <NuxtLink to="/" class="text-xl font-bold">Logo</NuxtLink>
        
        <!-- Mobile menu button -->
        <button 
          class="md:hidden p-2 rounded-md hover:bg-gray-100"
          @click="isOpen = !isOpen"
          aria-label="Toggle menu"
        >
          <div class="w-6 h-5 relative flex flex-col justify-between">
            <span 
              class="w-full h-0.5 bg-gray-600 transition-transform duration-300"
              :class="{ 'rotate-45 translate-y-2': isOpen }"
            ></span>
            <span 
              class="w-full h-0.5 bg-gray-600 transition-opacity duration-300"
              :class="{ 'opacity-0': isOpen }"
            ></span>
            <span 
              class="w-full h-0.5 bg-gray-600 transition-transform duration-300"
              :class="{ '-rotate-45 -translate-y-2': isOpen }"
            ></span>
          </div>
        </button>

        <!-- Desktop navigation -->
        <div class="hidden md:flex space-x-4">
          <NuxtLink to="/" class="hover:text-gray-600">Home</NuxtLink>
          <NuxtLink to="/about" class="hover:text-gray-600">About</NuxtLink>
          <NuxtLink to="/contact" class="hover:text-gray-600">Contact</NuxtLink>
        </div>
      </div>

      <!-- Mobile navigation -->
      <div 
        class="md:hidden"
        :class="{ 'block': isOpen, 'hidden': !isOpen }"
      >
        <div class="px-2 pt-2 pb-3 space-y-1">
          <NuxtLink 
            to="/" 
            class="block px-3 py-2 rounded-md hover:bg-gray-100"
            @click="isOpen = false"
          >
            Home
          </NuxtLink>
          <NuxtLink 
            to="/about" 
            class="block px-3 py-2 rounded-md hover:bg-gray-100"
            @click="isOpen = false"
          >
            About
          </NuxtLink>
          <NuxtLink 
            to="/contact" 
            class="block px-3 py-2 rounded-md hover:bg-gray-100"
            @click="isOpen = false"
          >
            Contact
          </NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const isOpen = ref(false)
</script>