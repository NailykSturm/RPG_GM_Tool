<script lang="ts" setup>
import GameListMenu from '~/components/GameList.vue';

const { listGames, listBestiary, refreshListGames } = useGameManagment();

definePageMeta({
    middleware: 'user-only',
});

onBeforeMount(() => {
    refreshListGames();
});

</script>

<template>
    <NuxtLayout>
        <div class="flex h-full">
            <GameListMenu wsize="1/6" />
            <div class="w-full flex flex-col items-center justify-center">
                <div class="flex items-center justify-center">
                    <div class="card bg-base-300 shadow-lg">
                        <div class="card-body">
                            <div class="card-actions">
                                <h2>Welcome to your game's management page</h2>
                            </div>
                            <div class="mb-5">
                                Here you can found the list of your games that you alerady created.<br>
                                You can also create or delete others games for managing multiple games.
                            </div>
                        </div>
                    </div>
                </div>
                <div class="m-5 items-center justify-center">
                    <p>List of yours bestiaries</p>
                    <div class="max-h-96 pr-1 overflow-y-auto">
                        <template v-for="bestiary in listBestiary">
                            <div tabindex="0" class="collapse mt-2 bg-base-200">
                            <div class="collapse-title text-xl font-medium">
                                {{ bestiary.universe }}
                            </div>
                            <div class="collapse-content text-base">
                                <p class="mb-3">Used by : </p>
                                <div class="flex flex-nowrap max-w-xs overflow-x-auto pb-1 gap-2">
                                    <div v-if="!listGames.find((game) => {return game.universe == bestiary.universe})" class="badge badge-error">No game using it</div>
                                    <template v-else v-for="game in listGames">
                                        <div v-if="game.universe == bestiary.universe" class="badge badge-neutral">{{ game.name }}</div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>
