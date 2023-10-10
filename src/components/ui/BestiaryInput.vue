<script setup lang="ts">
import { PropType, Ref } from 'nuxt/dist/app/compat/capi';
import { IBestiaryField } from '~/types/IGame';
import { bestiaryFieldTypes } from '~/types/IGameImpl';


const props = defineProps({
    readonly: {
        type: Boolean,
        default: false,
    },
    data: {
        type: Object as PropType<Ref<IBestiaryField>>,
        required: true,
    }
});

function selectValue(value: string, catA: any = '', catB: any = '') {
    let selectValue = '';
    if (catA != '') selectValue += `${catA}/`;
    if (catB != '') selectValue += `${catB}/`;
    selectValue += value;
    console.log(`new selected value: ${selectValue}`);
    props.data.value.value = selectValue;
}

</script>

<template>
    <div class="divider overflow-x-auto overflow-y-hidden py-4">{{ bestiaryFieldTypes.find((field) => {
        return field.field ==
            props.data.value.type
    }).desc }}</div>
    <div class="form-control">
        <label class="label"> 
            <span class="label-text">{{ props.data.value.field }}
                <template v-if="props.data.value.required == true">
                    <span class="text-error">*</span>
                </template>
            </span>
            <template v-if="props.data.value.type == bestiaryFieldTypes[2].field">
                <input type="checkbox" class="checkbox" v-model="props.data.value.value" />
            </template>
        </label>
        <template v-if="props.data.value.type == bestiaryFieldTypes[0].field">
            <input type="text" class="input input-bordered" v-model="props.data.value.value"
                :maxlength="props.data.value.maxLenght" />
            <label class="label">
                <span class="label-text"></span>
                <span class="label-text">{{ (props.data.value.value.toString()).length }} / {{ props.data.value.maxLenght }}
                </span>
            </label>
        </template>
        <template v-else-if="props.data.value.type == bestiaryFieldTypes[1].field">
            <!-- <select type="text" class="input input-bordered" v-model="props.data.value.value">
                <option v-for="opt in props.data.value.options">{{ opt }}</option>
            </select> -->
            <div class="dropdown dropdown-top">
                <input tabindex="0" class="input input-bordered" v-model="props.data.value.value" readonly />
                <div tabindex="0" class="menu dropdown-content z-[4] p-2 bg-base-200 rounded-box w-52 mt-4 overflow-auto max-h-64">
                    <ul>
                        <li v-for="(catA, keyA) in props.data.value.options">
                            <template v-if="typeof keyA == typeof 0">
                                <a @click="selectValue(catA)">{{ catA }}</a>
                            </template>
                            <template v-else>
                                <details>
                                    <summary>{{ keyA }}</summary>
                                    <ul>
                                        <li v-for="(catB, keyB) in catA" class="rounded-box">
                                            <template v-if="typeof keyB == typeof 0">
                                                <a @click="selectValue(catB, keyA)">{{ catB }}</a>
                                            </template>
                                            <template v-else>
                                                <details>
                                                    <summary>{{ keyB }}</summary>
                                                    <ul>
                                                        <li v-for="(catC, keyC) in catB" class="rounded-box" @click="selectValue(catC, keyA, keyB)">
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
        </template>
        <template v-else-if="props.data.value.type == bestiaryFieldTypes[2].field"></template>
        <template v-else-if="props.data.value.type == bestiaryFieldTypes[3].field">
            <input type="number" class="input input-bordered" v-model="props.data.value.value" :min="props.data.value.min"
                :max="props.data.value.max" :step="props.data.value.step" />
        </template>
    </div>
</template>