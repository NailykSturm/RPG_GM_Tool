<script setup lang="ts">
import { Ref } from 'nuxt/dist/app/compat/capi';


const full_road: Ref<string[]> = useState('full_road', () => []);
const gameName: Ref<string | string[]> = useState('game_name', () => '');

useRouter().afterEach((to, from) => {
    full_road.value = to.fullPath.split('/');
    gameName.value = to.params.game;
});

const games_links = useState('games_links', () => {
    return {
        'bestiary': `/games/${gameName.value}/bestiary`,
        'script': `/games/${gameName.value}/script`,
        'notebook': `/games/${gameName.value}/notebook`
    }
})
</script>

<template>
    <div class="flex">
        <div class="flex-1 text-sm breadcrumbs">
            <ul v-if="full_road.length != 0">
                <li>{{ gameName }}</li>
                <li>{{ full_road[full_road.length - 1] }}</li>
                <!-- <li>Object</li> -->
            </ul>
        </div>
        <div class="tabs flex-1">
            <NuxtLink class="tab tab-bordered" :class="useRoute().fullPath == games_links.bestiary ? 'tab-active' : ''" :to="games_links.bestiary">Bestiary</NuxtLink>
            <NuxtLink class="tab tab-bordered" :class="useRoute().fullPath == games_links.script ? 'tab-active' : ''" :to="games_links.script">Script</NuxtLink>
            <NuxtLink class="tab tab-bordered" :class="useRoute().fullPath == games_links.notebook ? 'tab-active' : ''" :to="games_links.notebook">Notebook</NuxtLink>
        </div>
    </div>
</template>