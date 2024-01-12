<script setup>
const filterType = useState('filterType');
const store = useTodos();
const {data, pending} = await useAsyncData('tasks', async () => {
  if (!store.todos.length) {
    const response = await $fetch('https://jsonplaceholder.typicode.com/todos');
    store.todos = response;
    return response;
  }
  return [];
});

const filteredList = computed(() => {
  if (filterType.value === 'open') {
    return store.todos.filter((task) => !task.completed);
  }
  if (filterType.value === 'close') {
    return store.todos.filter((task) => task.completed);
  }
  return store.todos;
});

</script>

<template>
  <div
    v-if="store.todos.length"
    class="tasks-list"
  >
    <NuxtLink
      v-for="task in filteredList"
      :key="task.id"
      :to="`/tasks/${task.id}`"
    >
      <TaskCard
        :id="task.id"
        :task-text="task.title"
        :completed="task.completed"
      />
    </NuxtLink>
  </div>
  <h3 v-else>
    No Tasks
  </h3>
</template>

<style scoped lang="scss">
.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>
