<script setup>
const store = useTodos();

const props = defineProps({
  userId: {
    type: Number,
    default: 0,
  },
  id: {
    type: Number,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  taskText: {
    type: String,
    required: true,
  },
});

const bgColor = ref("#fff");

const checkValue = ref(props.completed);

const changeStatusTask = async () => {
  await store.changeTask(checkValue.value, props.id);
};

watchEffect(async () => {
  if (checkValue.value) {
    bgColor.value = "#999";
    return;
  }
  bgColor.value = "#fff";
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
    <p :class="{ 'cart-text': true, 'card-crossed': checkValue }">
      {{ taskText }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.task {
  display: flex;
  gap: 30px;
  background-color: v-bind(bgColor);
  border-radius: 10px;
  padding: 10px 20px;

  .cart-text {
    color: blue;
    font-weight: 700;
    font-size: 18px;
  }

  .card-crossed {
    text-decoration: line-through;
  }
}
</style>
