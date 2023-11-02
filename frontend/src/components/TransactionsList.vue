<template>
  <table v-if="hasTransactions" class="table">
    <tr class="table__row">
      <th class="table__column">Vendedor</th>
      <th class="table__column">Produto</th>
      <th class="table__column">Tipo</th>
      <th class="table__column">Valor</th>
      <th class="table__column">Data</th>
    </tr>
    <tr v-for="transaction in transactions" :key="transaction.id" class="table__row">
      <TransactionsListItem :transaction="transaction" />
    </tr>
  </table>
</template>

<script setup>
import { computed } from 'vue'
import TransactionsListItem from './TransactionsListItem.vue'

const props = defineProps({
  transactions: { type: Array, default: () => [] }
})

const hasTransactions = computed(() => props.transactions.length > 0)
</script>

<style lang="scss" scoped>
.list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.table {
  width: 100%;
  &__row {
    display: flex;
    flex-direction: row;

    padding: 1rem 0.5rem;

    border-bottom: 1px solid var(--color-border);
  }

  &__column {
    flex: 1;
    text-align: left;
    font-weight: 700;
  }
}
</style>
