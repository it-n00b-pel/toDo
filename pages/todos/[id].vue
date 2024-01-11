<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <h2>Task ID = {{ route.params.id }}</h2>
</template>

<style scoped>

</style>
