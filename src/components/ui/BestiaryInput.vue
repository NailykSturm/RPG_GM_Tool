<script setup lang="ts">
    import type { PropType, Ref } from "#imports";

    import type { IUIBestiaryField } from "../../types/User/IUI";
    import { bestiaryFieldTypes } from "../../types/Game/IGameImpl";
    import { CSelectList } from "../../types/Game/CSelectList";

    const props = defineProps({
        readonly: {
            type: Boolean,
            default: false,
        },
        data: {
            type: Object as PropType<Ref<IUIBestiaryField>>,
            required: true,
        },
    });
</script>

<template>
    <div class="form-control">
        <label class="label">
            <span class="label-text"
                >{{ props.data.value.field }}
                <template v-if="props.data.value.required == true">
                    <span class="text-error">*</span>
                </template>
            </span>
            <template v-if="props.data.value.type == bestiaryFieldTypes[2].field">
                <input type="checkbox" class="checkbox" v-model="props.data.value.value" />
            </template>
        </label>
        <template v-if="props.data.value.type == bestiaryFieldTypes[0].field">
            <input
                type="text"
                class="input input-bordered"
                v-model="props.data.value.value"
                :maxlength="props.data.value.maxLenght" />
            <label class="label">
                <span class="label-text"></span>
                <span class="label-text">{{ props.data.value.value.toString().length }} / {{ props.data.value.maxLenght }} </span>
            </label>
        </template>
        <template v-else-if="props.data.value.type == bestiaryFieldTypes[1].field">
            <UiSelectMenu :list-options="props.data.value.options as CSelectList" dropdown-options="dropdown-bottom" />
        </template>
        <template v-else-if="props.data.value.type == bestiaryFieldTypes[2].field"></template>
        <template v-else-if="props.data.value.type == bestiaryFieldTypes[3].field">
            <input
                type="number"
                class="input input-bordered"
                v-model="props.data.value.value"
                :min="props.data.value.min"
                :max="props.data.value.max"
                :step="props.data.value.step" />
        </template>
    </div>
</template>
