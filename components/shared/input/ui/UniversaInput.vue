<script setup>
const props = defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  enterHandler: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
    default: "",
  },
});
const inputValue = ref(props.value);

const emit = defineEmits(["updateInputValue", "enterTap"]);

function onInput(event) {
  inputValue.value = event.target.value;
  emit("updateInputValue", inputValue.value);
}

const tapEnter = () => {
  if (props.enterHandler) {
    emit("enterTap");
  }
};

</script>

<template>
  <input
    :value="props.value"
    @input="onInput"
    @keyup.enter="tapEnter"
  >
</template>

<style scoped lang="scss"></style>
