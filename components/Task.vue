<template>
    <div class="">
        <div @click="openTask()" class="bg-white flex items-center p-3 px-5 rounded-lg space-x-4 relative" :class="!task.done ? 'cursor-pointer hover:shadow-md' : 'opacity-50'">
            <div v-if="!fromEdit" class="flex items-center text-gray-300 hover:text-gray-400 -ml-3 -mr-2 cursor-move handle">
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
            </div>
            <button @click.stop="toggleDone()" class="h-6 w-6 rounded-full border-2 border-gray-400 flex items-center justify-center text-white hover:bg-gray-400 active:bg-green-500 focus:outline-none focus:ring ring-light-blue-200" :class="{'bg-green-500 border-green-500': task.done}">
                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 13l4 4L19 7" />
                </svg>
            </button>
            <button @click.stop="openTask()" class="flex-1 text-left rounded truncate focus:outline-none focus:ring ring-light-blue-200">
                <div class="font-bold text-gray-600 truncate">{{task.title}}</div>
                <div class="text-sm text-gray-400 truncate">{{task.subTitle}}</div>
            </button>
            <div v-if="!task.done" title="Note">
                <svg class="h-5 w-5" :class="task.note ? 'text-gray-500' : 'text-gray-200'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            </div>
            <priority v-if="!task.done" :selectedPriority="task.priority" @priority-selected="setSelectedPriority" type="selector"></priority>

            <button v-if="task.done" title="Delete" @click.stop="deleteTask()">
                <svg class="h-5 w-5 hover:text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
        </div>
        <task-modal :open-edit-task="openEditTask" @close="closeTask" :task="task" :is-sub-task="child" mode="edit" />
    </div>
</template>

<script>
    import Priority from './Priority.vue';
    import TaskModal from './TaskModal.vue';

    export default {
        name: 'Task',
        components: {
            Priority, TaskModal
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
            fromEdit: {
                type: Boolean,
                required: false,
            }
        },
        methods: {
            setSelectedPriority (priority) {
                let task = {...this.task};
                task.priority = priority.name;

                this.$store.dispatch('tasks/updateTask', task);
            },
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
            openTask () {
                if (this.task.done) {
                    return;
                }

                this.openEditTask = true;
            },
            closeTask () {
                this.openEditTask = false;
            }
        }
    }
</script>

<style>

</style>