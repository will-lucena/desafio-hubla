<template>
  <div class="card">
    <p>{{ name }}</p>
    <p>{{ convertedBalance }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  balance: {
    type: Number,
    required: true
  }
})

const convertedBalance = computed(() => {
  const converted = props.balance.toFixed(2)
  return `R$ ${converted}`
})
</script>

<style lang="scss" scoped>
.card {
  min-width: 250px;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 2rem;
  border-radius: 0.5rem;
  border: 1px solid white;

  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.7);
  transition: 0.3s;

  &:hover {
    box-shadow: 0 1rem 2rem 0 rgba(0, 0, 0, 1);
  }
}
</style>
