<script setup lang="ts">
import { bestiaryFieldTypes, emptyBestiaryField } from '~/types/IGameImpl';
import { IUISelect, IUISelectCat, IUISelectSubCat, IUISelectOption } from '~/types/IUI';
import BestiaryInput from '~/components/ui/BestiaryInput.vue';

const { fields, creatures, fetchBestiary } = useBestiaryManagment();
const { getUniverseOfGame } = useGameManagment();
const route = useRoute();

const newOptionForSelect = ref('');
const fieldOptionCopy = ref();
const newField = ref(emptyBestiaryField);

onBeforeMount(() => {
    const game = route.params.game as string;
    const universe = getUniverseOfGame(game);
    fetchBestiary(universe);
    newField.value.options = {
        default: [
            'test1', 
            'test2', 
            'test3', 
            'test4'
        ],
        arme: {
            melee: [
                'melee1', 
                'melee2', 
                'melee3', 
                'melee4'
            ],
            distance: [
                'dist1',
                'dist2', 
                'dist3', 
                'dist4'
            ],
        },
        armure: {
            legere: [
                'legere1', 
                'legere2', 
                'legere3', 
                'legere4'
            ],
            moyenne: [
                'moyenne1', 
                'moyenne2', 
                'moyenne3', 
                'moyenne4'
            ],
            lourde: [
                'lourde1',
                'lourde2',
                'lourde3', 
                'lourde4'
            ],
        },
        bouclier: [
            'bouclier1', 
            'bouclier2', 
            'bouclier3', 
            'bouclier4'
        ],
    };
    // newField.value.options = ['test1', 'test2', 'test3', 'test4'];
    fieldOptionCopy.value = newField.value.options;
});

function addOptionForSelect() {
    if (newOptionForSelect.value != '') {

        // const cats = newOptionForSelect.value.split('/');
        // if (!newField.value.options) newField.value.options = { default: [] };
        // if (cats.length > 1) {
        //     console.log(newField.value.options);
        //     const cat = cats.shift();
        //     const opt = cats;
        //     if (newField.value.options[cat] == undefined) newField.value.options[cat] = [];

        //     if (opt.length > 1) {
        //         const subCat = opt.shift();
        //         const subOpt = opt;
        //         if (newField.value.options[cat][subCat] == undefined) newField.value.options[cat][subCat] = [];
        //         if (!newField.value.options[cat][subCat].includes(subOpt)) newField.value.options[cat][subCat].push(subOpt);
        //     }
        //     else {
        //         if (!newField.value.options[cat].includes(opt)) newField.value.options[cat].push(opt);
        //     }
        // }
        // else {
        //     if (!newField.value.options.default.includes(cats[0])) newField.value.options.default.push(cats[0]);
        // }
        // console.log(newField.value.options);
        fieldOptionCopy.value = newField.value.options;
    }
}

function updateOptionsList() {
    if (newOptionForSelect.value == '') {
        fieldOptionCopy.value = newField.value.options;
        return;
    }

    console.log('---------------------------------');
    fieldOptionCopy.value = undefined;
    const cats = newOptionForSelect.value.split('/');
    let cat: string, subCat: string, obj: string = undefined;
    if (cats.length == 1) obj = cats[0];
    else if (cats.length == 2) {
        cat = cats.shift();
        obj = cats.toString();
    }
    else {
        cat = cats.shift();
        subCat = cats.shift();
        obj = cats.toString();
    }

    console.log(`obj: ${obj} | cat: ${cat} | subCat: ${subCat}`);
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
                    <ul class="grow overflow-y-auto">
                        <li v-for="field in fields" class="flex items-center justify-center">
                            {{ field.name }}
                        </li>
                    </ul>
                </template>
            </div>
        </div>
        <div class="flex items-center justify-center col-span-3">Creatures</div>
        <!-- <div class="bg-warning text-warning-content flex items-center justify-center">Test</div> -->
    </div>

    <dialog id="add_field_modal" class="modal">
        <div class="modal-box overflow-hidden">
            <h3 class="font-bold text-lg">Create new field</h3>
            <div class="grid grid-cols-2 gap-4 items-center">
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Name of the field <span class="text-error">*</span></span>
                    </label>
                    <input v-model="newField.field" class="input input-bordered w-full" type="text">
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
                    <select class="select w-full tooltip select-bordered" v-model="newField.type">
                        <option v-for="option in bestiaryFieldTypes" v-bind:value="option.field">
                            {{ option.label }}
                        </option>
                    </select>
                </div>
            </div>

            <div>
                <BestiaryInput :readonly="true" v-bind:data="ref(newField)" />
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
                        <div class="dropdown dropdown-top dropdown-end">
                            <input type="text" class="input input-bordered join-item" v-model="newOptionForSelect"
                                @input="updateOptionsList">
                            <div tabindex="0"
                                class="menu dropdown-content z-[1] p-2 shadow bg-base-200 rounded-box w-52 mt-4 overflow-auto max-h-64">
                                <ul>
                                    <li v-for="(catA, keyA) in fieldOptionCopy">
                                        <template v-if="typeof keyA === typeof 0">
                                            <a>{{ catA }}</a>
                                        </template>
                                        <template v-else>
                                            <details open>
                                                <summary>{{ keyA }}</summary>
                                                <ul>
                                                    <li v-for="(catB, keyB) in catA" class="rounded-box">
                                                        <template v-if="typeof keyB === typeof 0">
                                                            <a>{{ catB }}</a>
                                                        </template>
                                                        <template v-else>
                                                            <details open>
                                                                <summary>{{ keyB }}</summary>
                                                                <ul>
                                                                    <li v-for="(catC, keyC) in catB" class="rounded-box">
                                                                        <a>{{ catC }}</a>
                                                                    </li>
                                                                </ul>
                                                            </details>
                                                        </template>
                                                    </li>
                                                </ul>
                                            </details>
                                        </template>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </dialog>
</template>