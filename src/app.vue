<script setup lang="ts">
const { theme } = setTheme();
</script>

<template :data-theme="theme">
    <NuxtPage :key="$route.fullPath" />
</template>
