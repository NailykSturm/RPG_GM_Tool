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
            <template v-if="modalParams.displayFields">

                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Name of the game</span>
                    </label>
                    <input type="text" v-model="modalParams.game.name" placeholder="Ex: D&D discovery" class="input input-bordered w-full" />
                </div>
                <div class="form-control w-full">
                    <label class="label">
                        <span class="label-text">Universe of the game</span>
                        <span class="label-text-alt">
                            <div class="tooltip tooltip-left z-[1]"
                                data-tip="This is for help you to better manage your bestiary. In other word, it can be use to create one bestiary and use it in other game that have the same universe.">
                                <svg class="h-6 w-6 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </span>
                    </label>
                    <input type="text" v-model="modalParams.game.universe" placeholder="Ex: Dungeon & Dragons" class="input input-bordered w-full" />
                </div>
            </template>
            <div class="modal-action">
                <button class="btn">cancel</button>
                <button class="btn btn-success" @click="handleConfirm()">{{ modalParams.confirmButtonText }}</button>
            </div>
        </form>
    </dialog>
</template>