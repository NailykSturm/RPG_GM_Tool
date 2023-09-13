<script setup lang="ts">

const { toDeleteGame } = useModal();

const handleConfirm: Function = () => {
    console.log('TODO : Ask the API for delete the game ', toDeleteGame.value);
}

</script>

<template>
    <dialog id="delete_game_modal" class="modal modal-bottom sm:modal-middle">
        <form method="dialog" class="modal-box">
            <h2 class="text-2xl">Are you sure that you want to deleta the game {{ toDeleteGame.name }}</h2>
            <div class="modal-action">
                <button class="btn btn-error" @click="handleConfirm()">delete game</button>
                <button class="btn">cancel</button>
            </div>
        </form>
    </dialog>
</template>