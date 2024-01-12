<script setup>
const route = useRoute();
const todos = useTodos();
const store = useTodos();

const task = computed(() => todos.currentTask);
const checkValue = ref(false);
const taskText = ref("");
const isVisibleInput = ref(true);

watchEffect(() => {
  checkValue.value = task.value.completed;
  taskText.value = task.value.title;
});

const deleteTask = async () => {
  await store.removeTask(task.value.id);
  navigateTo("/");
};

const changeStatusTask = async () => {
  await store.changeTask(checkValue.value, task.value.id);
};

const changeTaskText = async () => {
  if (taskText.value.length && task.value.title !== taskText.value) {
    await store.changeTask(taskText.value, task.value.id);
    navigateTo("/");
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
      <UniversaInput
        v-if="!isVisibleInput"
        :enter-handler="true"
        :value="taskText"
        class="task__title__input"
        @update-input-value="(value) => (taskText = value)"
        @enter-tap="changeTaskText"
        @focusout="isVisibleInput = !isVisibleInput"
      />
      <p
        v-if="isVisibleInput"
        class="task__title__text"
        @dblclick="isVisibleInput = !isVisibleInput"
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
.task {
  display: flex;
  gap: 30px;
  justify-content: center;
  padding-top: 100px;

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
