<script setup>
const filterType = useState("filterType");
const store = useTodos();

const filteredList = computed(() => {
  if (filterType.value === "open") {
    return store.todos.filter((task) => !task.completed);
  }
  if (filterType.value === "close") {
    return store.todos.filter((task) => task.completed);
  }
  return store.todos;
});

onMounted(() => {
  if (!store.todos.length) {
    store.getAllTasks();
  }
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
  <h3
    v-if="!store.todos.length"
    class="no-result"
  >
    No Tasks
  </h3>
</template>

<style scoped lang="scss">
.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.no-result {
  text-align: center;
}
</style>
