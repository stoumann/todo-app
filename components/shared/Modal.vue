<template>
    <div class="fixed inset-0 bg-white bg-opacity-60 flex items-start justify-center z-50 p-6">
        <div class="container max-h-full py-8" :class="modalContainerClass">
            <div class="bg-white rounded-lg shadow-lg border w-full h-full flex flex-col" style="">
                <div class="flex items-center p-8">
                    <div class="flex-1">
                        <h3>{{headerText}}</h3>
                    </div>
                    <button @click="close()">
                        <svg class="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div class="flex-1">
                    <slot name="body"></slot>
                </div>
                <div class="p-8">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Modal',
        props: {
            headerText: {
                type: String,
                required: false,
            },
            modalContainerClass: {
                type: String,
                required: false,
            },
        },
        created() {
            document.addEventListener('keyup', (event) => {
                if (event.key === 'Escape') {
                    this.close();
                }
            });
        },
        methods: {
            close () {
                this.$emit('close');
            }
        }
    }
</script>

<style>

</style>