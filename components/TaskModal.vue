<template>
    <modal v-if="openEditTask && task" @close="closeModal" :header-text="headerText" :modal-container-class="parentTask ? 'lg:py-16 lg:px-8' : ''">
        <div slot="body" class="flex flex-col lg:flex-row lg:items-stretch w-full h-full">
            <form @submit.prevent="saveTask()" class="px-8 space-y-10 flex-1">
                <div>
                    <priority :selectedPriority="task.priority" @priority-selected="setSelectedPriority" type="buttons"></priority>
                </div>
                <div>
                    <input-field :focus="true" v-model="task.title" id="task-title" input-class="w-full" placeholder="Title" />
                </div>
                <div>
                    <input-field v-model="task.subTitle" id="task-subtitle" input-class="w-full" placeholder="Subtitle" />
                </div>
                <div>
                    <input-textarea v-model="task.note" id="task-note" input-class="w-full h-full" input-container-class="h-full" container-class="h-full" placeholder="Notes" />
                </div>
            </form>
            <div v-if="!isSubTask && !parentTask && task.createdAt" class="px-8 flex-1 h-full mt-6 lg:mt-0 lg:pl-0">
                <div class="p-8 w-full h-full bg-gray-100 rounded-lg" v-if="task.tasks.length > 0">
                    <div v-for="(subTask, index) in task.tasks" :key="index">
                        <sub-task :task="subTask" :child="true" :from-edit="true" />
                    </div>
                    <input-button btnType="link" type="button" @btn-click="createTask()">+ Create subtask</input-button>
                </div>
                <div class="p-8 w-full bg-gray-100 rounded-lg font-semibold" v-else>
                    There are no subtasks created <input-button btnType="link" type="button" @btn-click="createTask()">+ Create subtask</input-button>
                </div>
            </div>
            <task-modal :open-edit-task="openCreateTask" @close="closeCreateTask" :task="emptyTask" :parent-task="task" mode="create" header-text="Create subtask" />
        </div>
        <div slot="footer">
            <div class="flex justify-end">
                <input-button @btn-click="saveTask()" v-shortkey="['enter']" @shortkey="saveTask()" btnClass="p-4 px-6" type="button" btnType="primary" :disabled="!task.title">SAVE</input-button>
            </div>
        </div>
    </modal>
</template>

<script>
    import { priorities } from './priority.js';
    import Priority from './Priority.vue';
    import Modal from './shared/Modal.vue';
    import InputField from './shared/InputField.vue';
    import InputButton from './shared/InputButton.vue';
    import SubTask from './SubTask.vue';
    import TaskModal from './TaskModal.vue';
    import { uuid } from '@cfworker/uuid';

    export default {
        name: 'TaskModal',
        components: {
            Priority, Modal, InputField, InputButton, SubTask, TaskModal
        },
        props: {
            task: {
                type: Object,
                required: false,
            },
            openEditTask: {
                type: Boolean,
                required: true,
            },
            isSubTask: {
                type: Boolean,
                required: false,
                default: false,
            },
            mode: {
                type: String,
                required: true,
            },
            headerText: {
                type: String,
                required: false,
            },
            parentTask: {
                type: Object,
            },
        },
        data () {
            return {
                priorityList: priorities,
                openCreateTask: false,
                emptyTask: null,
                taskTemplate: {
                    title: '',
                    subTitle: '',
                    priority: 'LOW',
                    note: '',
                    done: false,
                    tasks: [],
                }
            }
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
            closeModal () {
                this.$emit('close');
            },
            saveTask () {
                if (!this.task.title) {
                    return;
                }

                if (this.mode === 'create') {
                    if (this.parentTask) {
                        let payload = {
                            parentTask: this.parentTask,
                            task: this.task,
                        };

                        this.$store.dispatch('tasks/createSubTask', payload);
                    } else {
                        this.$store.dispatch('tasks/createTask', this.task);
                    }
                } else if (this.mode === 'edit') {
                    this.$store.dispatch('tasks/updateTask', this.task);
                }
                this.closeModal();
            },
            setSelectedPriority (priority) {
                this.task.priority = priority.name;
            }
        }
    }
</script>

<style>

</style>