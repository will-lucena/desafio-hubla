<template>
  <table v-if="hasTransactions" class="table">
    <tr class="table__row">
      <th class="table__column" @click="sortBySeller">Vendedor</th>
      <th class="table__column" @click="sortByProduct">Produto</th>
      <th class="table__column" @click="sortByKind">Tipo</th>
      <th class="table__column" @click="sortByValue">Valor</th>
      <th class="table__column" @click="sortByDate">Data</th>
    </tr>
    <tr v-for="transaction in sortedTransactions" :key="transaction.id" class="table__row">
      <TransactionsListItem :transaction="transaction" />
    </tr>
  </table>
</template>

<script setup>
import { computed, ref } from 'vue'
import TransactionsListItem from './TransactionsListItem.vue'

const props = defineProps({
  transactions: { type: Array, default: () => [] }
})

const hasTransactions = computed(() => props.transactions.length > 0)
const invertSort = ref(false)
const activeSortFunction = ref((array) => array)

const sortedTransactions = computed(() => {
  return [...props.transactions].sort(activeSortFunction.value)
})

function sortByDate() {
  activeSortFunction.value = (a, b) => {
    const aDate = new Date(a.date)
    const bDate = new Date(b.date)

    return invertSort.value ? aDate - bDate : bDate - aDate
  }

  invertSort.value = !invertSort.value
}

function sortByValue() {
  activeSortFunction.value = (a, b) => {
    return invertSort.value ? a.value - b.value : b.value - a.value
  }

  invertSort.value = !invertSort.value
}

function sortByKind() {
  activeSortFunction.value = (a, b) => {
    return invertSort.value ? a.kind - b.kind : b.kind - a.kind
  }

  invertSort.value = !invertSort.value
}

function sortByProduct() {
  activeSortFunction.value = (a, b) => {
    if (a.productDescription > b.productDescription) return invertSort.value ? -1 : 1
    if (b.productDescription > a.productDescription) return invertSort.value ? 1 : -1
    return 0
  }

  invertSort.value = !invertSort.value
}

function sortBySeller() {
  activeSortFunction.value = (a, b) => {
    if (a.sellerName > b.sellerName) return invertSort.value ? -1 : 1
    if (b.sellerName > a.sellerName) return invertSort.value ? 1 : -1
    return 0
  }

  invertSort.value = !invertSort.value
}
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
    cursor: pointer;
  }
}
</style>
