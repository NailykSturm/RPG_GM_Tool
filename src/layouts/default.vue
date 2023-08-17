<script lang="ts" setup>
import Header from '~/components/Header.vue';
import Footer from '~/components/Footer.vue';

const { theme } = useTheme();
</script>

<template>
    <div class="max-h-screen h-screen max-w-screen w-screen" :data-theme="theme">
        <div class="h-5/6">
            <div>
                <Header class="h-1/6 w-full" />
            </div>
            <div class="h-full w-full">
                <main class="h-full w-full">
                    <slot class="h-full w-full" />
                </main>
            </div>
        </div>
        <!-- <div>
            <Footer class="absolute inset-x-0 bottom-0 h-1/6" />
        </div> -->
    </div>
</template>
