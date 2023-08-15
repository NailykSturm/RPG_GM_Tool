<script lang="ts" setup>

definePageMeta({
    middleware: 'user-only'
})

const { theme } = useTheme();
</script>

<template>
    <div :data-theme="theme">
        <NuxtLayout>
        </NuxtLayout>
    </div>
</template>