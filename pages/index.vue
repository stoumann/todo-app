<template>
    <div>
        <div class="container mx-auto">
            <div class="text-center mt-6">
                <h1>My Tasks</h1>
            </div>
            <div class="mt-6">
                <div class="flex items-center mb-6">
                    <div class="flex-1"></div>
                    <div>
                        <input-button v-shortkey="['t']" @shortkey.native="createTask()" btn-type="success" @btn-click="createTask()">
                            + Create task [t]
                        </input-button>
                    </div>
                </div>
                <task-modal :open-edit-task="openCreateTask" @close="closeCreateTask" :task="emptyTask" mode="create" header-text="Create new task" />
                <tasks v-model="tasks" :level="1" />
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
                console.log('dillermand')
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
