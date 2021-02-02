<template>
    <button :type="type" :class="[btnClass, typeClass, disabledClass]" class="border border-solid border-transparent p-2 px-4 rounded focus:outline-none focus:ring ring-light-blue-200 leading-none" :disabled="disabled" :id="id" @click="$emit('btn-click');">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 'InputButton',
        props: {
            id: {
                type: String,
                required: false,
            },
            btnClass: {
                type: String,
                default: '',
                required: false,
            },
            disabled: {
                type: Boolean,
                default: false,
                required: false,
            },
            type: {
                type: String,
                required: false,
                default: 'button',
            },
            btnType: {
                type: String,
                required: false,
                default: 'default',
            }
        },
        computed: {
            disabledClass () {
                if (this.disabled) {
                    return 'opacity-50 cursor-not-allowed';
                }
            },
            typeClass () {
                switch (this.btnType) {
                    case 'primary':
                        return 'bg-light-blue-500 hover:bg-light-blue-600 focus:bg-light-blue-800 text-white';
                    break;

                    case 'secondary':
                        return 'bg-cyan-800 hover:bg-cyan-900 focus:bg-cyan-700 text-white';
                    break;

                    case 'success':
                        return 'bg-green-500 hover:bg-green-300 focus:bg-green-400 text-white';
                    break;

                    case 'danger':
                        return 'bg-red-600 hover:bg-red-400 focus:bg-red-500 text-white';
                    break;

                    case 'link':
                        return 'bg-transparent p-0 text-light-blue-400 hover:text-light-blue-600 font-semibold hover:underline';
                    break;
                
                    default:
                        return 'bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 hover:border-gray-400 focus:border-gray-400 text-gray-700';
                    break;
                }
            }
        }
    }
</script>

<style>

</style>
