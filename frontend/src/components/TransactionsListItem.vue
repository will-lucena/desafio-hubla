<template>
  <td class="table__column">{{ seller }}</td>
  <td class="table__column">{{ product }}</td>
  <td class="table__column">{{ kind }}</td>
  <td class="table__column">{{ value }}</td>
  <td class="table__column">{{ date }}</td>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  transaction: { type: Object, required: true }
})

const seller = computed(() => props.transaction.sellerName)
const product = computed(() => props.transaction.productDescription)
const value = computed(() => {
  const convertedValue = Math.abs(props.transaction.value).toFixed(2)
  return `R$ ${convertedValue}`
})
const date = computed(() => new Date(props.transaction.date).toLocaleString())
const kind = computed(() => {
  const kindMap = {
    1: 'Venda',
    2: 'Venda afiliada',
    3: 'Comissão paga',
    4: 'Comissão recebida'
  }

  return kindMap[props.transaction.kind]
})
</script>

<style lang="scss" scoped>
.table__column {
  flex: 1;
  text-align: left;
}
</style>
