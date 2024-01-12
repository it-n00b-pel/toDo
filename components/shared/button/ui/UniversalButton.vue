<script setup>

const emit = defineEmits(['clickBtn']);

const clickHandler = () => {
  emit('clickBtn');
};

</script>

<template>
  <div @click="clickHandler">
    <slot />
  </div>
</template>

<style scoped lang="scss">

</style>
