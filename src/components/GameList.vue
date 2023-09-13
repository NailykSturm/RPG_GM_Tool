<script setup lang="ts">
import { IGame } from '~/types/IGame';

const { listGames } = useGameRouter();
const { toDeleteGame } = useModal();

const handleDeleteGame: Function = (game: IGame) => {
    toDeleteGame.value = game;
}
</script>

<template>
    <div class="bg-secondary inset-y-0 left-0 w-full h-full">
        <h1 class="flex items-center justify-center inset-y-0 top-0">List of your games</h1>
        <div class="flex items-center justify-around">
            <button class="btn btn-info" onclick="add_game_modal.showModal()">Add game</button>
        </div>
        <div class="overflow-y-auto">
            <div class="h-max flex items-center justify-around ">
                <ul>
                    <li v-for="game in listGames" class="flex flex-wrap items-center mt-4">
                        <button class="btn btn-error mr-2" onclick="delete_game_modal.showModal()"
                            @click="handleDeleteGame(game)">Delete game</button>
                        <NuxtLink :to="`/games/${game.name}`">{{ game.name }}</NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>