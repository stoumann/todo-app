import _ from 'lodash';
import Vue from 'vue'
import { uuid } from '@cfworker/uuid';

export const strict = true;

export const state = () => ({
    tasks: []
});

export const mutations = {
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

        if (tasks.length === 0) {
            state.tasks = [];
        }
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
    INITIALIZE_STORE(state) {
        // Check if the ID exists
        if(localStorage.getItem('taskStore')) {
            this.replaceState(
                Object.assign(state, JSON.parse(localStorage.getItem('taskStore')))
            );
        }
    }
};

export const actions = {
    createTask: (state, payload) => {
        payload.id = uuid();
        payload.createdAt = Date.now();
        payload.updatedAt = Date.now();

        state.commit('CREATE_TASK', payload);
    },
    createSubTask: (state, payload) => {
        let subTask = payload.task;
        subTask.createdAt = Date.now();
        subTask.updatedAt = Date.now();
        subTask.id = uuid();
        
        let parentTask = payload.parentTask;
        parentTask.tasks.push(subTask);

        console.log(parentTask);

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