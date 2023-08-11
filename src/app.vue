<script setup lang="ts">
const { theme } = setTheme();
</script>

<template>
    <NuxtLayout>
        <NuxtPage :key="$route.fullPath" :data-theme="theme"/>
    </NuxtLayout>
</template>
