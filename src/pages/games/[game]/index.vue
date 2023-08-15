<script lang="ts" setup>
import Button from '~/components/ui/Button.vue';
import UserHeader from '~/components/UserHeader.vue';

definePageMeta({
    middleware: 'user-only'
})

const { theme } = setTheme();
</script>

<template>
    <div :data-theme="theme">
        
    </div>
</template>