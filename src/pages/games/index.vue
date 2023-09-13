<script lang="ts" setup>
import GameListMenu from '~/components/GameList.vue';

const { listGames, refreshListGames } = useGameRouter();

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
            <GameListMenu  />
            <div class="bg-warning w-full flex items-center justify-center">
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
            </div>
        </div>
    </NuxtLayout>
</template>
