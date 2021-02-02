import _ from 'lodash';
import Vue from 'vue'
import { uuid } from '@cfworker/uuid';

export const strict = true;

export const state = () => ({
    tasks: [],
    taskData: {},
    lastOpenTask: null
});

export const mutations = {
    GET_TASK(state, payload) {
        state.taskData = payload;
    },
    CREATE_TASK(state, payload) {
        state.tasks.push(payload);
    },
    DELETE_TASK(state, payload) {
        function deleteTaskOrSubtask(items) {
            _.forEach(items, function (item) {
                _.remove(items, function(item) {
                    if (item.id === payload.id) {
                        return true;
                    }
                });

                _.has(item, 'tasks') ? deleteTaskOrSubtask(item.tasks, item) : 0;
            });
        }

        var tasks = state.tasks;
        
        deleteTaskOrSubtask(tasks);

        _.each(tasks, (task, i) => {
            Vue.set(state.tasks, i, task);
        });
        
        state.taskData = {};
    },
    UPDATE_TASK(state, payload) {

        function findAndUpdateTask(tasks) {
            tasks.forEach((task, index) => {
                if (task.id === payload.id) {
                    tasks[index] = payload;
                } else {
                    findAndUpdateTask(task.tasks);
                }
            });

            return tasks;
        }

        var tasks = [...state.tasks];
        var updatedTasks = findAndUpdateTask(tasks);

        _.each(updatedTasks, (task, i) => {
            Vue.set(state.tasks, i, task);
        });
    },
    UPDATE_TASK_LIST (state, payload) {
        state.tasks = payload;
    },
    UPDATE_LAST_OPEN_TASK(state, payload) {
        state.lastOpenTask = payload;
    },
    INITIALIZE_STORE(state) {
        // Check if the ID exists
        if(localStorage.getItem('taskStore')) {
            this.replaceState(
                Object.assign(state, JSON.parse(localStorage.getItem('taskStore')))
            );
            state.taskData = {};
        } else {
            state.tasks = [
                {
                    id: '9b4deae7-d8a1-43d4-9ac4-08eb005d9ed5',
                    title: 'Task title',
                    subTitle: 'Subtitle to the task',
                    priority: 'HIGH',
                    note: 'This is supposed to be a very long text because it´s inside a note',
                    done: false,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                    tasks: [],
                },
                {
                    id: '8d4a6c87-8b28-484c-b7c6-9cfa9abaf411',
                    title: 'Task title 2',
                    subTitle: 'Subtitle to the second task',
                    priority: 'MEDIUM',
                    note: 'This is supposed to be a very long text because it´s inside a note',
                    done: false,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                    tasks: [
                        {
                            id: '348b996e-fab9-4f26-9c68-d6b2f37bb7f0',
                            title: 'Task title',
                            subTitle: 'Subtitle to the task',
                            priority: 'HIGH',
                            note: 'This is supposed to be a very long text because it´s inside a note',
                            done: false,
                            createdAt: Date.now(),
                            updatedAt: Date.now(),
                            tasks: [],
                        },
                        {
                            id: 'ecc0b001-5e10-407b-bb38-a58c914e5461',
                            title: 'Task title 2',
                            subTitle: 'Subtitle to the second task',
                            priority: 'MEDIUM',
                            note: 'This is supposed to be a very long text because it´s inside a note',
                            done: false,
                            createdAt: Date.now(),
                            updatedAt: Date.now(),
                            tasks: [],
                        },
                        {
                            id: '441e3ead-8ba0-4d44-b401-a80e0a9b7289',
                            title: 'Task title 3',
                            subTitle: 'Subtitle to the third task',
                            priority: 'LOW',
                            note: 'This is supposed to be a very long text because it´s inside a note',
                            done: false,
                            createdAt: Date.now(),
                            updatedAt: Date.now(),
                            tasks: [],
                        }
                    ],
                },
                {
                    id: 'a172b356-9412-4efc-bdf8-e97a8c740bac',
                    title: 'Task title 3',
                    subTitle: 'Subtitle to the third task',
                    priority: 'LOW',
                    note: 'This is supposed to be a very long text because it´s inside a note',
                    done: false,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                    tasks: [],
                }
            ]
        }
    }
};

export const actions = {
    showTask: (state, param) => {
        state.commit('GET_TASK', param);
        state.commit('UPDATE_LAST_OPEN_TASK', param.id);
    },
    createTask: (state, payload) => {
        payload.createdAt = Date.now();
        payload.updatedAt = Date.now();

        state.commit('CREATE_TASK', payload);
    },
    createSubTask: (state, payload) => {
        let subTask = payload.task;
        subTask.createdAt = Date.now();
        subTask.updatedAt = Date.now();
        
        let parentTask = payload.parentTask;
        parentTask.tasks.push(subTask);

        state.commit('UPDATE_TASK', parentTask);
    },
    deleteTask: (state, payload) => {
        state.commit('DELETE_TASK', payload);
    },
    updateTask: (state, payload) => {
        payload.updatedAt = Date.now();
        state.commit('UPDATE_TASK', payload);
    },
    updateTaskList: (state, payload) => {
        state.commit('UPDATE_TASK_LIST', payload);
    }
};

export const getters = {
    tasks: state => {
        return state.tasks;
    },
    singleTask: task => {
        return task;
    }
};