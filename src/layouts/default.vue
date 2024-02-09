<script lang="ts" setup>
    import Header from "../components/Header.vue";
    import Footer from "../components/Footer.vue";
    import Notif from "../components/Notif.vue";

    const { theme } = useTheme();
</script>

<template>
    <div class="flex flex-col h-screen bg-base-100" :data-theme="theme">
        <Header />
        <main class="grow">
            <slot />
        </main>
        <Notif />
        <!-- <Footer  /> -->
    </div>
</template>
