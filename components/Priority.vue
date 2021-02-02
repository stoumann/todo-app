<template>
    <div>
        <div v-if="type === 'buttons'" class="flex items-center divide-x border shadow-sm rounded-lg overflow-hidden">
            <button 
                v-for="priority in priorityList" 
                :key="priority.name" 
                @click.stop="selectPriority(priority)"
                :class="{'shadow-inner bg-gray-100': priority.name === priorityData}" 
                class="flex-1 p-3 px-4 focus:outline-none flex items-center justify-center space-x-2"
            >
                <div>
                    <svg class="h-5 w-5" :class="priority.textColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clip-rule="evenodd" />
                    </svg>
                </div>
                <div class="font-semibold text-gray-500 text-sm">
                    {{priority.name}}
                </div>
            </button>
        </div>
        <div v-if="type === 'selector'" class="relative">
            <button @click.stop="isOpen = true" title="Priority" class="rounded border border-white hover:border-gray-200 hover:shadow-md p-1 focus:outline-none">
                <svg class="h-5 w-5" :class="priorityColor(selectedPriority)" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clip-rule="evenodd" />
                </svg>
            </button>
            <div v-if="isOpen" v-click-outside="closePriorityList" class="absolute bg-white p-2 rounded shadow top-8 right-0 z-10 space-y-1 text-xs">
                <button v-for="priority in priorityList" :key="priority.name" @click.stop="selectPriority(priority)" class="flex items-center space-x-2 w-full hover:bg-gray-100 p-1 px-2 focus:outline-none focus:ring rounded ring-cyan-200">
                    <div class="flex-1 text-left font-semibold text-gray-500">{{priority.name}}</div>
                    <div>
                        <svg class="h-5 w-5" :class="priority.textColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clip-rule="evenodd" />
                        </svg>
                    </div>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import { priorities } from './priority.js';
    import vClickOutside from 'v-click-outside';

    export default {
        name: 'Priority',
        props: {
            type: {
                type: String,
                required: true,
            },
            selectedPriority: {
                type: String,
                required: true,
            },
        },
        directives: {
            clickOutside: vClickOutside.directive
        },
        methods: {
            priorityColor (priorityName) {
                return priorities.find(priority => priority.name === priorityName).textColor;
            },
            closePriorityList (event) {
                this.isOpen = false;
            },
            selectPriority (priority) {
                this.priorityData = priority.name;
                this.$emit('priority-selected', priority);
                this.closePriorityList();
            }
        },
        data () {
            return {
                isOpen: false,
                priorityList: priorities,
                priorityData: this.selectedPriority
            }
        }
    }
</script>

<style>

</style>