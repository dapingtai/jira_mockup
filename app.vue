<script setup lang="ts">
const title = 'Jira'
const description = 'Jira 首頁'

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