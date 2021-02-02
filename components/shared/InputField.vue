<template>
    <div>
        <input-label :for-attr="id" v-if="label && !movingPlaceholder">{{label}}</input-label>
        <div class="relative" :class="inputContainerClass">
            <input 
                :type="type" 
                class="border border-solid appearance-none border-gray-300 bg-transparent p-4 px-6 rounded placeholder-gray-500 focus:outline-none focus:ring ring-light-blue-200" 
                :class="[inputClass, calendarStyle]" 
                :id="id"
                :value="value"
                :placeholder="movingPlaceholder ? ' ' : placeholder"
                :required="required"
                :disabled="disabled"
                v-on:input="updateValue($event.target.value)"
                v-bind="$attrs"
                ref="inputField"
                :maxlength="maxLength"
            />
            <div v-if="type === 'calendar'" class="absolute right-0 inset-y-0 pr-6 flex items-center pointer-events-none">
                <i class="far fa-calendar-alt text-gray-600"></i>
            </div>
            <span v-if="movingPlaceholder" class="absolute top-0 text-sm uppercase bg-white mt-4 ml-4 text-gray-500 duration-200 origin-0 block pointer-events-none">{{placeholder}}</span>
        </div>
    </div>
</template>

<script>
    import InputLabel from './InputLabel.vue';

    export default {
        name: 'InputField',
        components: {
            InputLabel
        },
        props: {
            type: {
                type: String,
                default: 'text',
            },
            id: {
                type: String,
                required: true,
            },
            placeholder: {
                type: String,
                required: false
            },
            movingPlaceholder: {
                type: Boolean,
                default: true,
            },
            value: {
                type: [ String, Object ],
                required: false,
            },
            required: {
                type: Boolean,
                default: false
            },
            inputClass: {
                type: [ String, Array ],
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
            focus: {
                type: Boolean,
                required: false
            },
            maxLength: {
                type: Number,
            }
        },
        methods: {
            updateValue (value) {
                this.$emit('input', value);
            },
            setFocus (focus) {
                if (focus) {
                    this.$refs.inputField.focus();
                } else {
                    this.$refs.inputField.blur();
                }
            }
        },
        mounted () {
            this.setFocus(this.focus);
        },
        computed: {
            calendarStyle () {
                if (this.type === 'calendar') {
                    return 'pr-16'
                }

                return '';
            }
        },
        watch: {
            focus (newVal) {
                this.setFocus(newVal);
            }
        }
    }
</script>

<style lang="scss" scoped>
    input:focus-within ~ span,
    input:not(:placeholder-shown) ~ span {
        @apply transform text-sm uppercase -translate-y-7 z-0 ml-3 rounded px-2 py-0 text-gray-500;
    }
</style>
