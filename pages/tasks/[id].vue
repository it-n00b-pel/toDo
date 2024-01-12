<script setup>

const route = useRoute();
const todos = useTodos();
const store = useTodos();

const task = computed(() => todos.currentTask);
const checkValue = ref(false);
const taskText = ref('');
const isVisibleInput = ref(true);

watchEffect(() => {
  checkValue.value = task.value.completed;
  taskText.value = task.value.title;
});

const deleteTask = async () => {
  try {
    await $fetch(`https://jsonplaceholder.typicode.com/todos/${task.value.id}`, {
      method: 'DELETE',
    });
    store.removeTask(task.value.id);
    navigateTo('/');
  } catch (e) {
    console.error(e);
  }
};

const changeStatusTask = async () => {
  try {
    const response = await $fetch(`https://jsonplaceholder.typicode.com/todos/${task.value.id}`, {
      method: 'PATCH',
      body: JSON.stringify(({
        completed: checkValue.value,
      })),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    store.changeTask(response);
  } catch (e) {
    console.error(e);
  }
};

const changeTaskText = async () => {
  try {
    const response = await $fetch(`https://jsonplaceholder.typicode.com/todos/${task.value.id}`, {
      method: 'PATCH',
      body: JSON.stringify(({
        title: taskText.value,
      })),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    store.changeTask(response);
    navigateTo('/');
  } catch (e) {
    console.error(e);
  }
};


onMounted(() => {
  todos.setTask(+route.params.id);
});
</script>

<template>
  <div class="task">
    <input
      v-model="checkValue"
      type="checkbox"
      @change="changeStatusTask"
      @click.stop
    >
    <div class="task__title">
      <input
        v-if="!isVisibleInput"
        v-model="taskText"
        class="task__title__input"
        @focusout="isVisibleInput= !isVisibleInput"
        @keyup.enter="changeTaskText"
      >
      <p
        v-if="isVisibleInput"
        class="task__title__text"
        @dblclick="isVisibleInput= !isVisibleInput"
      >
        {{ taskText }}
      </p>
    </div>
    <universal-button
      style="background-color: red"
      class="task__delete-btn"
      @click-btn="deleteTask"
    >
      delete
    </universal-button>
  </div>
</template>

<style scoped lang="scss">
.task{
  display: flex;
  gap: 30px;
  justify-content: center;

  .task__title {
    max-width: 400px;
    width: 100%;


    .task__title__input {
      width: 100%;
      height: 30px;
    }

    .task__title__text {
      width: 100%;
    }

  }

  .task__delete-btn {
    width: 80px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    cursor: pointer;
  }
}

</style>
