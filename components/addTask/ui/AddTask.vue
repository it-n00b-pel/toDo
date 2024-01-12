<script setup>

const taskText = ref('');
const store = useTodos();

const addTask = async () => {
  if (taskText.value.length) {
    const task = {
      userId: Math.random(),
      id: Math.random(),
      title: taskText.value,
      completed: false,
    };

    const response = await $fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify(({
        task,
      })),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    store.createTask(response.task);
    taskText.value = '';
  }
};
</script>


<template>
  <div class="add-task">
    <input
      v-model.trim="taskText"
      type="text"
      class="add-task__input"
      placeholder="Add Task"
      @keyup.enter="addTask"
    >
    <UniversalButton
      class="add-task__btn"
      @click-btn="addTask"
    >
      <span>Add Task</span>
    </UniversalButton>
  </div>
</template>

<style scoped lang="scss">
.add-task {
  display: flex;
  align-items: center;
  gap: 30px;
  justify-content: center;

  .add-task__input {
    height: 30px;
    border-radius: 5px;
    border: none;
    outline: none;
    font-size: 18px;
    max-width: 400px;
    width: 100%;
  }

  .add-task__btn {
    cursor: pointer;
    background-color: aquamarine;
    height: 30px;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
  }
}

</style>
