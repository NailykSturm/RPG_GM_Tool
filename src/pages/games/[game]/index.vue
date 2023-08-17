<script lang="ts" setup>
import { Ref } from 'nuxt/dist/app/compat/capi';

import VButton from '~/components/ui/Button.vue';
import GameListMenu from '~/components/GameList.vue';

const { listNameSubpages, subpage, noSubpage, switchSubpage, isSupbage } = useGameRouter();
const { theme } = useTheme();

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
    <div :data-theme="theme">
        <NuxtLayout>
            <div class="flex w-full h-full">
                <div  class="h-hull w-1/4" v-if="displayListGame">
                    <GameListMenu  />
                </div>
                <div class="h-full w-full">
                    <div class="bg-error flex">
                        <VButton class="mr-4 btn-outline btn-info" :click="togleListDisplay">
                            <svg v-if="displayListGame" class="h-8 w-8 " width="24" height="24" viewBox="0 0 24 24"
                                stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <polyline points="11 7 6 12 11 17" />
                                <polyline points="17 7 12 12 17 17" />
                            </svg>
                            <svg v-else class="h-8 w-8 " width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                                stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <polyline points="7 7 12 12 7 17" />
                                <polyline points="13 7 18 12 13 17" />
                            </svg>
                        </VButton>
                        <div class="tabs">
                            <a class="tab tab-bordered"
                                :class="`${isSupbage(listNameSubpages.bestiary) ? 'tab-active' : ''}`"
                                @click="switchSubpage(listNameSubpages.bestiary)">bestiary</a>
                            <a class="tab tab-bordered"
                                :class="`${isSupbage(listNameSubpages.notebook) ? 'tab-active' : ''}`"
                                @click="switchSubpage(listNameSubpages.notebook)">notebook</a>
                            <a class="tab tab-bordered" :class="`${isSupbage(listNameSubpages.script) ? 'tab-active' : ''}`"
                                @click="switchSubpage(listNameSubpages.script)">Script</a>
                        </div>
                    </div>
                    <div class="bg-warning h-full w-full flex items-center justify-center">
                        <subpage />
                    </div>
                </div>
            </div>
        </NuxtLayout>
    </div>
</template>