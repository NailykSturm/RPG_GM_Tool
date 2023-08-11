<script setup lang="ts">
const { theme } = setTheme();
</script>

<template>
    <NuxtLayout :data-theme="theme">
        <NuxtPage :key="$route.fullPath" />
    </NuxtLayout>
</template>
