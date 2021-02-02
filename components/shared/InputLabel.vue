<template>
    <label class="font-sans font-semibold text-gray-700" :class="labelClass" :for="forAttr">
        <slot></slot>
    </label>
</template>

<script>
    export default {
        name: 'InputLabel',
        props: {
            forAttr: {
                type: String
            },
            labelClass: {
                type: String
            },
        }
    }
</script>

<style>

</style>