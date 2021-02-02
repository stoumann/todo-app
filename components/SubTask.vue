<template>
    <div class="my-2">
        <div class="bg-white flex items-center p-3 px-5 rounded-lg space-x-4 relative" :class="{'opacity-50': task.done}">
            <button @click.stop="toggleDone()" class="h-6 w-6 rounded-full border-2 border-gray-400 flex items-center justify-center text-white hover:bg-gray-400 active:bg-green-500 focus:outline-none" :class="{'bg-green-500 border-green-500': task.done}">
                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7" />
                </svg>
            </button>
            <div class="flex-1 truncate">
                <div class="font-bold text-gray-600 truncate">{{task.title}}</div>
                <div class="text-sm text-gray-400 truncate">{{task.subTitle}}</div>
            </div>
            <div v-if="!task.done" title="Notes">
                <svg class="h-5 w-5" :class="task.note ? 'text-gray-500' : 'text-gray-200'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            </div>

            <button v-if="task.done" title="Delete" @click.stop="deleteTask()">
                <svg class="h-5 w-5 hover:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
    import Priority from './Priority.vue';

    export default {
        name: 'Task',
        components: {
            Priority
        },
        data () {
            return {
                openEditTask: false,
            }
        },
        props: {
            task: {
                type: Object,
                required: true,
            },
            child: {
                type: Boolean,
                default: false,
            },
        },
        methods: {
            toggleDone () {
                let task = {...this.task};
                task.done = !this.task.done;

                this.$store.dispatch('tasks/updateTask', task);
            },
            deleteTask () {
                if (confirm('Are you sure you want to delete the task?')) {
                    this.$store.dispatch('tasks/deleteTask', this.task);
                }
            },
            setSelectedPriority (priority) {
                let task = {...this.task};
                task.priority = priority.name;

                this.$store.dispatch('tasks/updateTask', task);
            },
            closeTask () {
                this.openEditTask = false;
            }
        }
    }
</script>

<style>

</style>