<script setup lang="ts">
const { listGames } = useGameRouter();

</script>

<template>
    <div class="bg-secondary inset-y-0 left-0 w-full h-full">
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
</template>