<script setup lang="ts">
import { Ref } from 'nuxt/dist/app/compat/capi';

import { bestiaryFieldTypes, emptyUIBestiaryField } from '~/types/IGameImpl';
import { CSelectList } from '~/types/CGame';
import { IBestiaryField } from '~/types/IGame';
import BestiaryInput from '~/components/ui/BestiaryInput.vue';
import SelectMenu from '~/components/ui/SelectMenu.vue';
import { IUIBestiaryField } from '~/types/IUI';
import { EBestiaryFieldType } from '~/types/EGame';

const { fields, creatures, fetchBestiary, addFieldInBestiary } = useBestiaryManagment();
const { getUniverseOfGame } = useGameManagment();
const { selectFieldSelected } = useForm();
const route = useRoute();

const newField = ref(emptyUIBestiaryField);
const universe = ref('');

onBeforeMount(() => {
    const game = route.params.game as string;
    universe.value = getUniverseOfGame(game);
    fetchBestiary(universe.value);

    newField.value.options = new CSelectList();
});

function addOptionForSelect() {
    if (selectFieldSelected.value != '') {
        newField.value.options.addOption(selectFieldSelected.value);
        selectFieldSelected.value = '';
        newField.value.options.resetDisplay();
    }
}

function deleteOptionForSelect() {
    if (selectFieldSelected.value != '') {
        newField.value.options.removeOption(selectFieldSelected.value);
        selectFieldSelected.value = '';
        newField.value.options.resetDisplay();
    }
}

function onClickMenuItem(value: string) {
    selectFieldSelected.value = value;
}

function createField() {
    addFieldInBestiary(universe.value, newField.value as IUIBestiaryField);
}

</script>

<template>
    <div class="h-full w-full grid grid-cols-4 gap-4">
        <!-- <div v-for="i in 12" class="bg-warning text-warning-content flex items-center justify-center">{{ i }}</div> -->
        <div class="flex bg-base-300 flex-col items-center py-4">Fields
            <button class="btn btn-info" onclick="add_field_modal.showModal()">Add field</button>
            <div style="max-height: 75vh;">
                <template v-if="!fields || fields.length == 0">
                    <div class="flex flex-col items-center justify-center">
                        <h1 class="text-2xl">No fields</h1>
                        <p class="text-lg">Add a field to start</p>
                    </div>
                </template>
                <template v-else>
                    <!-- <ul class="grow overflow-y-auto">
                        <li v-for="field in fields" class="grid h-8 rounded text-primary-content place-content-center">
                            {{ field.field }} : {{ EBestiaryFieldType[field.type] }}
                        </li>
                    </ul> -->
                    <table class="table table-zebra">
                        <thead>
                            <tr><th>Name</th><th>Type</th></tr>
                        </thead>
                        <tbody>
                            <tr v-for="field in fields">
                                <td>{{ field.field }}</td>
                                <td>{{ EBestiaryFieldType[field.type] }}</td>
                            </tr>
                        </tbody>
                    </table>
                </template>
            </div>
        </div>
        <div class="flex items-center justify-center col-span-3">Creatures</div>
        <!-- <div class="bg-warning text-warning-content flex items-center justify-center">Test</div> -->
    </div>

    <dialog id="add_field_modal" class="modal">
        <div class="modal-box overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
            <div class="flex-col">
                <h3 class="font-bold text-lg">Create new field</h3>
                <div class="place-items-center">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Name of the field <span class="text-error">*</span></span>
                        </label>
                        <input v-model="newField.field" class="input input-bordered" type="text">
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Type of the field <span class="text-error">*</span></span>
                            <span class="label-text-alt">
                                <div class="tooltip tooltip-left z-[1]"
                                    data-tip="The type of a field means what kind of value it can takes. For example, if it was an input, the value is a free text value">
                                    <svg class="h-6 w-6 text-info" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </span>
                        </label>
                        <select class="select tooltip select-bordered" v-model="newField.type">
                            <option v-for="option in bestiaryFieldTypes" v-bind:value="option.field">
                                {{ option.label }}
                            </option>
                        </select>
                    </div>
                    <div class="divider">Options</div>

                    <div class="form-control">
                        <!-- {{ option.label }} : {{ option.desc }} -->
                        <label class="label">
                            <span class="label-text">Requirered ?</span>
                            <input type="checkbox" class="checkbox" v-model="newField.required" />
                        </label>
                        <label class="label" v-if="newField.type == bestiaryFieldTypes[0].field">
                            <span class="label-text">Maximum length</span>
                            <input type="number" class="input input-bordered" v-model="newField.maxLenght">
                        </label>
                        <label class="label" v-if="newField.type == bestiaryFieldTypes[3].field">
                            <span class="label-text">Minimum</span>
                            <input type="number" class="input input-bordered" v-model="newField.min">
                        </label>
                        <label class="label" v-if="newField.type == bestiaryFieldTypes[3].field">
                            <span class="label-text">Maximum</span>
                            <input type="number" class="input input-bordered" v-model="newField.max">
                        </label>
                        <label class="label" v-if="newField.type == bestiaryFieldTypes[3].field">
                            <span class="label-text">Step</span>
                            <input type="number" class="input input-bordered" v-model="newField.step">
                        </label>
                        <div v-if="newField.type == bestiaryFieldTypes[1].field">
                            <label class="label">
                                <span class="label-text">Options</span>
                            </label>
                            <div class="join">
                                <button class="btn join-item" @click="addOptionForSelect">Add Option</button>
                                <SelectMenu :listOptions="(newField.options as CSelectList)" :onClickItem="onClickMenuItem"
                                    dropdown-options="dropdown-top dropdown-end join-item" />
                                <button class="btn join-item btn-error" @click="deleteOptionForSelect">
                                    <svg class="h-6 w-6" width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                                        stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <line x1="4" y1="7" x2="20" y2="7" />
                                        <line x1="10" y1="11" x2="10" y2="17" />
                                        <line x1="14" y1="11" x2="14" y2="17" />
                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-base-200 rounded ml-4 p-5 flex-grow relative">
                <h3 class="font-bold text-lg">Render</h3>
                <div class="mb-0 py-4">
                    {{ bestiaryFieldTypes.find((field) => { return field.field == newField.type }).desc }}
                </div>
                <BestiaryInput :readonly="true" v-bind:data="(ref(newField) as Ref<IUIBestiaryField>)" />
                <div class="absolute bottom-5 right-5 modal-action">
                    <button class="btn btn-outline" onclick="add_field_modal.close()">Cancel</button>
                    <button class="btn btn-success" @click="createField">Add</button>
                </div>
            </div>
        </div>
    </dialog>
</template>