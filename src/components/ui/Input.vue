<script lang="ts">
    export default defineComponent({
        inheritAttrs: false,
    });
</script>

<script lang="ts" setup>
    import { useField } from "vee-validate";
    const props = defineProps({
        label: {
            type: String,
            default: "",
        },
        name: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            default: "text",
        },
        placeholder: String,
    });

    const { value, errorMessage } = useField(toRef(props, "name"), undefined);
</script>

<template>
    <label class="block mb-2 font-extrabold" for="">{{ label }}</label>
    <input
        class="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-info shadow border-2 border-info rounded"
        v-model="value"
        :type="props.type"
        :placeholder="props.placeholder" />
    <p class="text-error-content">{{ errorMessage }}</p>
</template>
