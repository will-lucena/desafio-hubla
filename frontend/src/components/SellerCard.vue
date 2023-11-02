<template>
  <div class="card" :class="{ 'card--selected': isSelected }">
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
  },
  isSelected: {
    type: Boolean,
    default: false
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
  border: 1px solid var(--color-border);

  box-shadow: 0 0.25rem 0.5rem 0 rgba(18, 18, 18, 0.7);
  transition: 0.3s;

  &:hover {
    box-shadow: 0 0.5rem 1rem 0 rgba(18, 18, 18, 1);
  }

  &--selected {
    background-color: var(--color-background-inverse);
    border: 1px solid var(--color-border-inverse);
    color: var(--color-text-inverse);
  }
}
</style>
