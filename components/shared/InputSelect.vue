<template>
    <div class="relative">
        <select 
            class="border appearance-none border-solid bg-white border-gray-300 p-4 px-6 pr-12 rounded focus:outline-none focus:ring ring-light-blue-200 w-full"
            :class="value ? 'has-selected' : ''"
            :multiple="multiple"
            :id="id"
            :value="value"
            v-on:input="updateValue($event.target.value)"
            :disabled="disabled"
        >
            <option v-for="option in optionList" :key="option.value" :value="option.value">{{option.text}}{{optionDescription(option)}}</option>
            <slot></slot>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pr-6 text-gray-700">
            <svg class="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
        <span v-if="movingPlaceholder" class="absolute top-0 text-sm uppercase bg-transparent mt-4 ml-4 text-transparent duration-200 origin-0 block pointer-events-none">{{placeholder}}</span>
    </div>
</template>

<script>
    export default {
        name: 'InputSelect',
        props: {
            multiple: {
                type: Boolean,
                default: false,
            },
            id: {
                type: String,
                required: true,
            },
            value: {
                type: [ String, Object ],
                required: false,
            },
            placeholder: {
                type: String,
                required: false
            },
            movingPlaceholder: {
                type: Boolean,
                default: true,
            },
            required: {
                type: Boolean,
                default: false
            },
            focus: {
                type: Boolean,
                default: false
            },
            inputClass: {
                type: String,
                default: '',
                required: false,
            },
            inputContainerClass: {
                type: String,
                default: '',
                required: false,
            },
            disabled: {
                type: Boolean,
                default: false,
                required: false,
            },
            label: {
                type: String,
                required: false
            },
            optionList: {
                type: Array,
                default: () => { return [] }
            }
        },
        methods: {
            updateValue: function (value) {
                this.$emit('input', value);
            },
            optionDescription (option) {
                if (option.description) {
                    return ' - ' + option.description;
                }

                return '';
            }
        },
    }
</script>

<style lang="scss" scoped>
    select:focus-within ~ span,
    select.has-selected ~ span {
        @apply transform text-sm uppercase -translate-y-7 z-0 ml-3 rounded px-2 py-0 text-gray-500;
    }
</style>