import {defineStore} from 'pinia';

export const useTodos = defineStore('todos', {
    state: () => ({
        todos: [],
        currentTask: {
            userId: 0,
            id: 0,
            title: '',
            completed: false,
        },
    }),
    getters: {
        task: (state, id) => state.todos.find(task => task.id === id),
    },
    actions: {
        setTask(id) {
            this.currentTask = this.todos.find((t) => t.id === id);
        },
        createTask(task) {
            this.todos = [task, ...this.todos];
        },
        changeTask(task) {
            for (let i = 0; i < this.todos.length; i++) {
                if (this.todos[i].id === task.id) {
                    this.todos[i] = task;
                    return;
                }
            }
        },
        removeTask(id) {
            this.todos = this.todos.filter((task) => task.id !== id);
        },

    },
});
