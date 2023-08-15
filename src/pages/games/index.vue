<script lang="ts" setup>
import VButton from '~~/src/components/ui/Button.vue';
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
        <div class="flex w-full h-full">
            <div class="bg-secondary inset-y-0 left-0 w-1/4 h-full">
                <div class="">
                    <h1 class="flex items-center justify-center inset-y-0 top-0">List of your games</h1>
                    <div class="flex items-center justify-around">
                        <VButton class="btn btn-info">Add game</VButton>
                        <VButton class="btn btn-error">Delete game</VButton>
                    </div>
                    <div class="overflow-y-auto">
                        <div class="h-max flex items-center justify-around ">
                            <ul class="menu">
                                <li v-for="game in listGames">
                                    <NuxtLink :to="`/games/${game.name}`">{{ game.name }}</NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-warning w-full flex items-center justify-center">
                <div class="flex items-center justify-center">
                    <div class="card bg-base-300 shadow-lg">
                        <div class="card-body">
                            <div class="card-actions">
                                <h2>Welcomme to your game's managment page</h2>
                            </div>
                            <div class="mb-5">
                                Here you can found the list of your games that you alerady created.<br>
                                You can also create or delete other games for managing multiple games.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>
