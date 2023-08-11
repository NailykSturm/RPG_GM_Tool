<script lang="ts" setup>
import Header from '~/components/Header.vue';

const { theme } = setTheme();
</script>

<template>
    <div :data-theme="theme">
        <div class="h-screen w-screen">
            <Header class="mb-4" />
            <main class="flex flex-wrap items-center justify-center">
                <slot />
            </main>
        </div>
    </div>
</template>
