<script setup lang="ts">

import useModalParams from '~/composables/useModalParams';

const { modalParams } = useModalParams();
function handleConfirm() {
    modalParams.value.handleConfirm();
    useModalParams().resetModalParams();
}
defineProps({
    idModal: { type: String, required: true },
});
</script>

<template>
    <dialog v-bind:id="idModal" class="modal modal-bottom sm:modal-middle">
        <form method="dialog" class="modal-box">
            <h3 class="font-bold text-lg mb-6">{{ modalParams.title }}</h3>
            <div v-if="modalParams.displayFields" class="grid grid-cols-2 gap-4">
                <label for="modal_game_name" class="label">Name of the game </label>
                <input id="modal_game_name" class="input" type="text" v-model="modalParams.game.name"
                    placeholder="Ex: D&D discovery" />
                <label for="modal_game_universe" class="label">Universe of the game
                    <div class="tooltip z-[1]"
                        data-tip="This is for help you to better manage your bestiary. In other word, it can be use to create one bestiary and use it in other game that have the same universe.">
                        <svg class="h-6 w-6 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </label>
                <input id="modal_game_universe" class="input" type="text" v-model="modalParams.game.universe"
                    placeholder="Ex: Dungeon & Dragons" />
            </div>
            <div class="modal-action">
                <button class="btn btn-success" @click="handleConfirm()">{{ modalParams.confirmButtonText }}</button>
                <button class="btn">cancel</button>
            </div>
        </form>
    </dialog>
</template>