<template>
    <div :class="containerClass">
        <input-label :for-attr="id" v-if="label && !movingPlaceholder">{{label}}</input-label>
        <div class="relative" :class="inputContainerClass">
            <textarea 
                class="border border-solid bg-white border-gray-300 p-4 px-6 rounded placeholder-gray-500 focus:outline-none  focus:ring ring-light-blue-200" 
                rows="5"
                :class="inputClass" 
                :id="id"
                :placeholder="movingPlaceholder ? ' ' : placeholder"
                :value="value"
                :required="required"
                :disabled="disabled"
                v-on:input="updateValue($event.target.value)"
                :maxlength="maxLength"
            ></textarea>
            <span v-if="movingPlaceholder" class="absolute top-0 text-sm uppercase bg-white mt-4 ml-4 text-gray-500 duration-200 origin-0 block pointer-events-none">{{placeholder}}</span>
        </div>
        <div v-if="maxLength" class="text-gray-500 text-xs flex items-center justify-end">
            <div>( {{lengthLeft}} tegn tilbage )</div>
        </div>
    </div>
</template>

<script>
    import InputLabel from './InputLabel.vue';

    export default {
        name: 'InputTextarea',
        components: {
            InputLabel
        },
        props: {
            id: {
                type: String,
                required: true,
            },
            placeholder: {
                type: String,
                required: true
            },
            movingPlaceholder: {
                type: Boolean,
                default: true,
            },
            value: {
                type: String,
                required: true,
            },
            required: {
                type: Boolean,
                default: false
            },
            focus: {
                type: Boolean,
                default: false
            },
            containerClass: {
                type: String,
                default: '',
                required: false,
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
            maxLength: {
                type: Number
            }
        },
        methods: {
            updateValue (value) {
                this.$emit('input', value);
            }
        },
        computed: {
            lengthLeft () {
                return this.maxLength - this.value.length;
            }
        }
    }
</script>

<style lang="scss" scoped>
    textarea:focus-within ~ span,
    textarea:not(:placeholder-shown) ~ span {
        @apply transform text-sm uppercase -translate-y-7 z-0 ml-3 rounded px-2 py-0 text-gray-500;
    }
</style>
