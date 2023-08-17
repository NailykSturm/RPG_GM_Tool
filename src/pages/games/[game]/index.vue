<script lang="ts" setup>
import { Ref } from 'nuxt/dist/app/compat/capi';
import VButton from '~/components/ui/Button.vue';

const { listNameSubpages, subpage, noSubpage, switchSubpage, isSupbage } = useGameRouter();
const { theme } = useTheme();
const { listGames } = useGameRouter();

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
                <div class="bg-secondary inset-y-0 left-0 w-1/4 h-full" v-if="displayListGame">
                    <div class="">
                        <h1 class="flex items-center justify-center inset-y-0 top-0">List of your games</h1>
                        <div class="flex items-center justify-around">
                            <VButton class="btn btn-info">Add game</VButton>
                        </div>
                        <div class="overflow-y-auto">
                            <div class="h-max flex items-center justify-around ">
                                <ul>
                                    <li v-for="game in listGames" class="flex flex-wrap items-center mt-4">
                                        <VButton class="btn btn-error mr-2">Delete game</VButton>
                                        <NuxtLink :to="`/games/${game.name}`">{{ game.name }}</NuxtLink>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
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