<script setup lang="ts">
import { Ref } from "nuxt/dist/app/compat/capi";

const newGameName: Ref<string> = useState('new game name', () => '');

defineProps({
    idModal: { type: String, required: true },
    idGame: { type: String || Number, required: false, default: '' },
    gameName: { type: String, required: false, default: '' },

    title: { type: String, required: true },
    confirmText: { type: String, required: true },
    displayField: { type: Boolean, required: true },

    handleConfirm: { type: Function, required: true },

});
</script>

<template>
    <dialog v-bind:id="idModal" class="modal modal-bottom sm:modal-middle">
        <form method="dialog" class="modal-box">
            <h3 class="font-bold text-lg mb-6">{{ title }}</h3>
            <input v-if="displayField" class="input" type="text" v-model="newGameName"
                :placeholder="(gameName != '' && gameName != undefined) ? gameName : 'Name of the game'" />
            <div class="modal-action">
                <button class="btn btn-success" @click="handleConfirm(newGameName)">{{ confirmText }}</button>
                <button class="btn">cancel</button>
            </div>
        </form>
    </dialog>
</template>