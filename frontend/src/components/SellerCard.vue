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
  const converted = (props.balance / 100).toFixed(2)
  return `R$ ${converted}`
})
</script>

<style lang="scss" scoped>
.card {
  min-width: 250px;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 2rem;
  border-radius: 0.5rem;
  border: 1px solid white;
}
</style>
