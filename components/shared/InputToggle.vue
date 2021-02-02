<template>
    <div class="flex justify-center items-center">
        <div class="relative rounded-full w-16 h-8 transition duration-200 ease-linear" :class="value ? 'bg-green-checkbox' : 'bg-gray-400'">
            <label :for="'toggle_' + id"
                class="absolute left-0 bg-white border-solid border-2 mb-2 w-8 h-8 rounded-full transition transform duration-100 ease-linear cursor-pointer z-20"
                :class="value ? 'translate-x-full border-green-checkbox' : 'translate-x-0 border-gray-400'"></label>
            <input type="checkbox" :id="'toggle_' + id" name="toggle"
                class="appearance-none w-full h-full active:outline-none focus:outline-none m-0 absolute top-0 z-10"
                :checked="value" @change="$emit('input', $event.target.checked)" />
        </div>
    </div>
</template>

<script>
    export default {
        props: ['value', 'id'],
        watch: {
            value (newVal) {
                this.$emit('toggle-change', newVal);
            }
        }
    }
</script>

<style>

</style>