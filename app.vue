<script setup lang="ts">
const title = 'Jira'
const description = 'Jira 首頁'

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
  link: [
    { rel: 'icon', href: `${config.app.baseURL}favicon.ico` }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://www.atlassian.com/favicon.ico'
})

</script>
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>