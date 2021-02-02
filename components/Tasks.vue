<template>
    <div>
        <draggable 
            v-bind="dragOptions" 
            tag="div" 
            :list="list" 
            :value="value" 
            :group="level"
            handle=".handle"
            @input="emitter" 
            @change="onChange"
            class="hide-scroll space-y-4"
        >
            <div v-for="(task, index) in realValue" :key="index">
                <task :task="task" :child="child" />
                <div :class="{'bg-gray-200 p-2 lg:p-4 rounded-b-lg shadow-inner': !child}" v-if="task.tasks.length > 0">
                    <tasks :class="{'': task.tasks.length > 0}" :list="task.tasks" :child="true" @change="onChange" :level="level+1"/>
                </div>
            </div>
        </draggable>
    </div>
</template>

<script>
    import draggable from 'vuedraggable';
    import Tasks from './Tasks.vue';
    import Task from './Task.vue';

    export default {
        name: 'Tasks',
        components: {
            draggable, Tasks, Task
        },
        props: {
            child: {
                type: Boolean,
                default: false,
            },
            value: {
                required: false,
                type: Array,
                default: null
            },
            list: {
                required: false,
                type: Array,
                default: null
            },
            level: {
                required: true,
                type: Number,
            },
        },
        computed: {
            dragOptions() {
                return {
                    animation: 1,
                    group: 'tasks',
                    disabled: false,
                    ghostClass: 'opacity-50'
                };
            },
            realValue() {
                return this.value ? this.value : this.list;
            }
        },
        methods: {
            emitter (value) {
                this.$emit('input', value);
            },
            onChange: function() {
                if (this.child === true) {
                    this.$emit('change');
                } else {
                    this.emitter(this.value);
                }
            },
        }
    }
</script>

<style>
</style>
