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
        async getAllTasks() {
            const loadingIndicator = useLoadingIndicator();
            loadingIndicator.start();
            try {
                const response = await $fetch('https://jsonplaceholder.typicode.com/todos');
                this.todos = response;
            } catch (e) {

            } finally {
                loadingIndicator.finish();
            }
        },
        setTask(id) {
            this.currentTask = this.todos.find((t) => t.id === id);
        },
        async createTask(task) {
            const loadingIndicator = useLoadingIndicator();
            loadingIndicator.start();
            try {
                const response = await $fetch('https://jsonplaceholder.typicode.com/todos', {
                    method: 'POST',
                    body: JSON.stringify(({
                        ...task,
                    })),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                });

                this.todos = [response, ...this.todos];
            } catch (e) {
                console.error(e);
            } finally {
                loadingIndicator.finish();
            }
        },
        async changeTask(value, id) {
            const index = this.todos.findIndex(todo => todo.id === id);
            const loadingIndicator = useLoadingIndicator();
            loadingIndicator.start();
            try {
                if (typeof value === 'string') {
                    const response = await $fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                        method: 'PATCH',
                        body: JSON.stringify(({
                            title: value,
                        })),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    });

                    this.todos[index] = response;
                }
                if (typeof value === 'boolean') {
                    const response = await $fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                        method: 'PATCH',
                        body: JSON.stringify(({
                            completed: value,
                        })),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    });
                    this.todos[index] = response;
                }
            } catch (e) {
                console.error(e);
            } finally {
                loadingIndicator.finish();
            }
        },
        async removeTask(id) {
            const loadingIndicator = useLoadingIndicator();
            loadingIndicator.start();
            try {
                await $fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                    method: 'DELETE',
                });
                this.todos = this.todos.filter((task) => task.id !== id);
            } catch (e) {
                console.error(e);
            } finally {
                loadingIndicator.finish();
            }
        },

    },
});
