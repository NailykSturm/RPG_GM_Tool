<script setup lang="ts">
import { IGame } from '~/types/IGame';
import AddGameModal from '~/components/modals/AddGameModal.vue';
import DeleteGameModal from '~/components/modals/DeleteGameModal.vue';

const { listGames } = useGameRouter();
const { toDeleteGame } = useModal();

const handleDeleteGame: Function = (game: IGame) => {
    toDeleteGame.value = game;
}

defineProps({
    wsize: {
        type: String,
        default: 'w-96'
    }
});
</script>

<template>
    <div class="bg-base-200 flex flex-col h-full" v-bind:class="wsize">
        <h1 class="flex text-xl items-center justify-center mt-2">List of your games</h1>
        <div class="flex items-center justify-around mb-5">
            <button class="btn btn-info" onclick="add_game_modal.showModal()">Add game</button>
        </div>
        <div class="flex" style="max-height: 75vh;">
            <ul class="grow overflow-y-auto">
                <li v-for="game in listGames" class="grid grid-cols-5 mt-4 px-8">
                    <button class="btn btn-error mr-2" onclick="delete_game_modal.showModal()"
                        @click="handleDeleteGame(game)">
                        <svg class="h-12 w-12" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <line x1="4" y1="7" x2="20" y2="7" />
                            <line x1="10" y1="11" x2="10" y2="17" />
                            <line x1="14" y1="11" x2="14" y2="17" />
                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                        </svg>
                    </button>
                    <button class="btn btn-warning mr-2" onclick="delete_game_modal.showModal()"
                        @click="handleDeleteGame(game)">
                        <svg class="h-12 w-12" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                            stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" />
                            <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" />
                            <line x1="13.5" y1="6.5" x2="17.5" y2="10.5" />
                        </svg>
                    </button>
                    <NuxtLink class="btn btn-primary col-span-3" :to="`/games/${game.name}`">{{ game.name }}</NuxtLink>
                </li>
            </ul>
        </div>
    </div>
    <AddGameModal />
    <DeleteGameModal />
</template>