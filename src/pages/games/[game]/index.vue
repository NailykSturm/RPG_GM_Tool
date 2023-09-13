<script lang="ts" setup>
import { Ref } from 'nuxt/dist/app/compat/capi';

import GameListMenu from '~/components/GameList.vue';

const { listNameSubpages, subpage, noSubpage, switchSubpage, isSupbage } = useGameRouter();
const displayListGame: Ref<boolean> = useState('display-list-game-in-game', () => false)

definePageMeta({
    middleware: 'user-only'
});

onBeforeMount(() => {
    if (noSubpage) switchSubpage(listNameSubpages.bestiary);
});

const togleListDisplay = () => {
    displayListGame.value = !displayListGame.value;
}

</script>

<template>
    <NuxtLayout>
        <div class="bg-warning h-full">
            <div class="drawer h-full">
                <input id="my-drawer" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex flex-col h-full">
                    <nav class="bg-error navbar">
                        <div class="navbar-start">
                            <label for="my-drawer" class="btn btn-outline btn-info">
                                <svg class=" h-8 w-8 text-red-500" width="24" height="24" viewBox="0 0 24 24"
                                    stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <line x1="4" y1="6" x2="20" y2="6" />
                                    <line x1="4" y1="12" x2="20" y2="12" />
                                    <line x1="4" y1="18" x2="20" y2="18" />
                                </svg>
                            </label>
                        </div>
                        <div class="navbar-center tabs">
                            <a class="tab tab-bordered"
                                :class="`${isSupbage(listNameSubpages.bestiary) ? 'tab-active' : ''}`"
                                @click="switchSubpage(listNameSubpages.bestiary)">bestiary</a>
                            <a class="tab tab-bordered" :class="`${isSupbage(listNameSubpages.script) ? 'tab-active' : ''}`"
                                @click="switchSubpage(listNameSubpages.script)">Script</a>
                            <a class="tab tab-bordered"
                                :class="`${isSupbage(listNameSubpages.notebook) ? 'tab-active' : ''}`"
                                @click="switchSubpage(listNameSubpages.notebook)">notebook</a>
                        </div>
                    </nav>
                    <div class="bg-accent grow flex items-center justify-center overflow-auto">
                        <subpage />
                    </div>
                </div>
                <div class="drawer-side">
                    <label for="my-drawer" class="drawer-overlay"></label>
                    <GameListMenu />
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>