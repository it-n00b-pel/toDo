<script setup>

</script>

<template>
  <div class="main-page">
    <h1 class="main-page__title">
      Tasks list
    </h1>
    <AddTask />
    <FilterBlock />
    <TasksList />
  </div>
</template>

<style scoped lang="scss">
.main-page {
  padding: 80px 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  .main-page__title {
    text-align: center;
    font-size: 36px;
  }
}
</style>
