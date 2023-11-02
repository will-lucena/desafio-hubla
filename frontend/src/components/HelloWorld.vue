<template>
  <div>
    <form>
      <FileUploader @success="onUploadSuccess" @fail="onUploadFail" />
    </form>

    <div class="balances">
      <SellerCard
        v-for="(balance, index) in balances"
        :key="index"
        :balance="balance.balance"
        :name="balance.name"
      />
    </div>

    <TransactionsList :transactions="transactions" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { loadBalances } from '../api/balances'
import { loadTransactions } from '../api/transactions'
import FileUploader from './FileUploader.vue'
import SellerCard from './SellerCard.vue'
import TransactionsList from './TransactionsList.vue'

const transactions = ref([])
const balances = ref([])

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
}
</style>
