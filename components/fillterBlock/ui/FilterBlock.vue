<script setup>

const filterType = useState('filterType', () => '');
// const filterType = ref('');

const sortTasks = (trigger) => {
  filterType.value = trigger;
  localStorage.setItem('trigger', trigger);
};

onMounted(() => {
  const filterTrigger = localStorage.getItem('trigger');
  if (!filterTrigger) {
    filterType.value = 'all';
  } else {
    filterType.value = filterTrigger;
  }
});

</script>

<template>
  <div class="filtered-buttons">
    <UniversalButton
      :class="{'active-btn': filterType==='all', 'all-btn': true, 'btn': true}"
      @click-btn="sortTasks('all')"
    >
      <span>All</span>
    </UniversalButton>
    <UniversalButton
      :class="{'active-btn': filterType==='open', 'btn': true}"
      @click-btn="sortTasks('open')"
    >
      <span>Open</span>
    </UniversalButton>
    <UniversalButton
      :class="{'active-btn': filterType==='close', 'close-btn': true, 'btn': true}"
      @click-btn="sortTasks('close')"
    >
      <span>Close</span>
    </UniversalButton>
  </div>
</template>

<style scoped lang="scss">
.filtered-buttons {
  display: flex;
  gap: 1px;
  justify-content: center;

  .btn {
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    cursor: pointer;
    background-color: white;
  }


  .all-btn {
    border-radius: 5px 0 0 5px;
  }

  .close-btn {
    border-radius: 0 5px 5px 0;
  }

  .active-btn {
    background-color: cyan;
  }
}
</style>
