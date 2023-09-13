<script setup lang="ts">
import { IGame } from '~/types/IGame';
import AddGameModal from '~/components/modals/AddGameModal.vue';
import DeleteGameModal from '~/components/modals/DeleteGameModal.vue';

const { listGames } = useGameRouter();
const { toDeleteGame } = useModal();

const handleDeleteGame: Function = (game: IGame) => {
    toDeleteGame.value = game;
}
</script>

<template>
    <div class="bg-secondary w-1/4 h-full">
        <h1 class="flex text-xl items-center justify-center">List of your games</h1>
        <div class="flex items-center justify-around">
            <button class="btn btn-info" onclick="add_game_modal.showModal()">Add game</button>
        </div>
        <div class="overflow-auto">
            <div class="flex items-center justify-around">
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
    <AddGameModal />
    <DeleteGameModal />
</template>