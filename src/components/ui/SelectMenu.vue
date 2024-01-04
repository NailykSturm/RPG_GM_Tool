<script setup lang="ts">
    import { CSelectList } from '~/types/CGame';

    const { selectFieldSelected } = useForm();

    const props = defineProps({
        listOptions: {
            type: CSelectList,
            required: true,
        },
        dropdownOptions: {
            type: String,
            default: '',
        },
        onClickItem: {
            type: Function,
            default: (value: string) => {},
        },
    });

    function updateOptionsList() {
        if (selectFieldSelected.value == '') {
            props.listOptions.resetDisplay();
            return;
        }
        props.listOptions.includeOption(selectFieldSelected.value);
    }
</script>

<template>
    <div class="dropdown" :class="props.dropdownOptions">
        <input type="text" class="input input-bordered" v-model="selectFieldSelected" @input="updateOptionsList" />
        <div tabindex="0" class="menu dropdown-content z-[1] p-2 shadow bg-base-200 rounded-box w-52 mt-4 overflow-auto max-h-40">
            <ul>
                <template v-for="category in props.listOptions.getListCategory().cat">
                    <template v-if="category.display">
                        <li>
                            <details open>
                                <summary>{{ category.name }}</summary>
                                <ul>
                                    <template v-for="subcat in category.subcat">
                                        <template v-if="subcat.display">
                                            <li>
                                                <details open>
                                                    <summary>{{ subcat.name }}</summary>
                                                    <ul>
                                                        <template v-for="elt in subcat.value">
                                                            <li v-if="elt.display" @click="props.onClickItem(elt.value)">
                                                                <a>{{ props.listOptions.getElement(elt.value) }}</a>
                                                            </li>
                                                        </template>
                                                    </ul>
                                                </details>
                                            </li>
                                        </template>
                                    </template>
                                    <template v-for="eltWithoutSubcat in category.valueWithoutSubcat">
                                        <li v-if="eltWithoutSubcat.display" @click="props.onClickItem(eltWithoutSubcat.value)">
                                            <a>{{ props.listOptions.getElement(eltWithoutSubcat.value) }}</a>
                                        </li>
                                    </template>
                                </ul>
                            </details>
                        </li>
                    </template>
                </template>
                <template v-for="eltWithoutCat in props.listOptions.getListCategory().valueWithoutCat">
                    <li v-if="eltWithoutCat.display" @click="props.onClickItem(eltWithoutCat.value)">
                        <a>{{ props.listOptions.getElement(eltWithoutCat.value) }}</a>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>
