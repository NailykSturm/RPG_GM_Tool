<script setup lang="ts">
const { theme } = useTheme();
</script>

<template :data-theme="theme">
    <NuxtPage :key="$route.fullPath" />
</template>
