<template>
  <div>
    <form class="uploader_form">
      <FileUploader @success="onUploadSuccess" @fail="onUploadFail" />
    </form>

    <section v-if="hasBalances" class="balances__container">
      <h2>Saldo dos vendedores e associados</h2>
      <div class="balances">
        <SellerCard
          v-for="(balance, index) in balances"
          :key="index"
          :balance="balance.balance"
          :name="balance.name"
          @click="onClickSellerCard(balance.name)"
          :is-selected="isFilteredBy(balance.name)"
        />
      </div>
    </section>

    <TransactionsList :transactions="filteredTransactions" />
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { loadBalances } from '../api/balances'
import { loadTransactions } from '../api/transactions'
import FileUploader from './FileUploader.vue'
import SellerCard from './SellerCard.vue'
import TransactionsList from './TransactionsList.vue'

const transactions = ref([])
const balances = ref([])
const hasBalances = computed(() => balances.value.length > 0)
const activeFilter = ref([])

const filteredTransactions = computed(() => {
  if (activeFilter.value.length === 0) {
    return transactions.value
  }

  return transactions.value.filter((el) => activeFilter.value.includes(el.sellerName))
})

function onUploadSuccess(payload) {
  loadBalances()
    .then(({ data }) => {
      balances.value = data
    })
    .catch((error) => {
      console.log(error)
    })

  if (transactions.value.length > 0) {
    loadTransactions()
      .then(({ data }) => {
        transactions.value = data
      })
      .catch((error) => {
        console.log(error)
      })
  } else {
    transactions.value = payload
  }
}

function onUploadFail(error) {
  console.log(error)
}

function onClickSellerCard(name) {
  if (isFilteredBy(name)) {
    activeFilter.value.splice(activeFilter.value.indexOf(name), 1)
  } else {
    activeFilter.value.push(name)
  }
}

function isFilteredBy(name) {
  return activeFilter.value.includes(name)
}

onMounted(() => {
  loadTransactions()
    .then(({ data }) => {
      transactions.value = data
    })
    .catch((error) => {
      console.log(error)
    })

  loadBalances()
    .then(({ data }) => {
      balances.value = data
    })
    .catch((error) => {
      console.log(error)
    })
})
</script>

<style lang="scss" scoped>
.balances {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;

  &__container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

.uploader_form,
.balances__container {
  background-color: var(--color-background-soft);
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  margin: 2rem 0;
}
</style>
