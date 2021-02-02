<template>
    <div>
        <div class="container mx-auto px-3">
            <div class="mt-6 flex items-center space-x-4">
                <div>
                    <svg class="h-8 w-8 text-light-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div>
                    <h1 class="uppercase">My task manager</h1>
                </div>
            </div>
            <div class="mt-6">
                <div class="flex items-center mb-6">
                    <div class="flex-1"></div>
                    <div>
                        <input-button v-shortkey="['t']" @shortkey.native="createTask()" btn-type="secondary" @btn-click="createTask()" btn-class="p-4 px-6">
                            Create task <span class="text-cyan-400 tracking-widest ml-2">[t]</span>
                        </input-button>
                    </div>
                </div>

                <task-modal :open-edit-task="openCreateTask" @close="closeCreateTask" :task="emptyTask" mode="create" header-text="Create new task" />
                
                <tasks v-if="tasks && tasks.length > 0" :key="tasks.length" v-model="tasks" :level="1" />
                
                <div class="p-6 w-full bg-white rounded-lg font-semibold flex items-center space-x-4" v-else>
                    <div>
                        <svg class="h-5 w-5 text-light-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        There are no tasks created, press "t" to start creating a task
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import InputButton from '~/components/shared/InputButton.vue';
    import Tasks from '~/components/Tasks.vue';
    import { uuid } from '@cfworker/uuid';
    import TaskModal from '~/components/TaskModal.vue';

    export default {
        name: 'Home',
        components: {
            Tasks, InputButton, TaskModal
        },
        mounted () {
            // Update localhost on state update
            this.$store.subscribe((mutation, state) => {
                localStorage.setItem('taskStore', JSON.stringify(state));
            });
        },
        data () {
            return {
                openCreateTask: false,
                emptyTask: null,
                taskTemplate: {
                    id: uuid(),
                    title: '',
                    subTitle: '',
                    priority: 'LOW',
                    note: '',
                    done: false,
                    tasks: [],
                }
            }
        },
        computed: {
            tasks: {
                get () {
                    return JSON.parse(JSON.stringify(this.$store.state.tasks.tasks));
                },
                set (value) {
                    this.$store.dispatch('tasks/updateTaskList', value);
                }
            },
            dragOptions() {
                return {
                    animation: 1,
                    group: "tasks",
                    disabled: false,
                    ghostClass: "opacity-50"
                };
            },
        },
        methods: {
            createTask () {
                this.emptyTask = {...this.taskTemplate};
                this.openCreateTask = true;
            },
            closeCreateTask () {
                this.emptyTask = null;
                this.openCreateTask = false;
            },
            emitter(value) {
                this.$emit("input", value);
            },
        },
        beforeCreate() {
            this.$store.commit('tasks/INITIALIZE_STORE');
        },
    }
</script>

<style>
</style>
