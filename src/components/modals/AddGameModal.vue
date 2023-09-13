<script setup lang="ts">
import { Ref } from "nuxt/dist/app/compat/capi";

const newGameName: Ref<string> = useState('new game name', () => '');
const { newGame } = useGameManagment();

const handleConfirm: Function = () => {
    if (newGameName.value === '') return;
    console.log(`WIP : Ask the API to create the new game : ${newGameName.value}`);
    newGame(newGameName.value);
    newGameName.value = '';
}

</script>

<template>
    <dialog id="add_game_modal" class="modal modal-bottom sm:modal-middle">
        <form method="dialog" class="modal-box">
            <h3 class="font-bold text-lg mb-6">You're creating a new game</h3>
            <input class="input" type="text" v-model="newGameName" placeholder="Name of you're new game" />
            <div class="modal-action">
                <button class="btn btn-success" @click="handleConfirm()">create game</button>
                <button class="btn">cancel</button>
            </div>
        </form>
    </dialog>
</template>