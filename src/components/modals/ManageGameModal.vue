<script setup lang="ts">
    import useModalParams from '~/composables/useModalParams';
    import { IUIBestiaryInfo } from '~/types/IUI';

    const { modalParams } = useModalParams();
    const { listBestiary } = useGameManagment();

    function disableListItem(universe: string) {
        listBestiary.value = listBestiary.value.map((bestiary) => {
            if (bestiary.universe.toLowerCase().includes(universe.toLowerCase())) {
                bestiary.display = true;
            } else {
                bestiary.display = false;
            }
            return bestiary;
        });
    }

    function refreshOptions(event: any) {
        disableListItem(event.target.value);
    }

    function selectOption(event: IUIBestiaryInfo) {
        modalParams.value.game.universe.name = event.universe;
        disableListItem(event.universe);
    }

    function createTag() {
        if (modalParams.value.game.universe.name != '') {
            if (
                listBestiary.value.filter((bestiary) => bestiary.universe.toLowerCase() == modalParams.value.game.universe.name.toLowerCase())
                    .length == 0
            ) {
                console.log('create tag');
                listBestiary.value.push({ universe: modalParams.value.game.universe.name, display: true });
            }
        }
    }
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
                <div class="form-control flex flex-col w-full">
                    <label class="label">
                        <span class="label-text">Universe of the game</span>
                        <span class="label-text-alt">
                            <div
                                class="tooltip tooltip-left z-[1]"
                                data-tip="This is for help you to better manage your bestiary. In other word, it can be use to create one bestiary and use it in other game that have the same universe.">
                                <svg class="h-6 w-6 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </span>
                    </label>
                    <div class="dropdown dropdown-hover dropdown-top grow">
                        <input
                            tabindex="0"
                            type="text"
                            v-model="modalParams.game.universe.name"
                            placeholder="Ex: Dungeon & Dragons"
                            class="input input-bordered w-full"
                            @input="refreshOptions" />
                        <div tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 overflow-y-auto max-h-48">
                            <ul>
                                <template v-for="bestiary in listBestiary">
                                    <li v-if="bestiary.display">
                                        <a @click="selectOption(bestiary)">{{ bestiary.universe }}</a>
                                    </li>
                                </template>
                                <li>
                                    <a @click="createTag()">create new universe</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </template>
            <div class="modal-action">
                <button class="btn">cancel</button>
                <button class="btn btn-success" @click="handleConfirm()">{{ modalParams.confirmButtonText }}</button>
            </div>
        </form>
    </dialog>
</template>
