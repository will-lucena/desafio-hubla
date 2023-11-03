<template>
  <main class="main">
    <form class="uploader_form">
      <FileUploader @success="onUploadSuccess" />
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
  </main>
</template>

<script setup>
import { loadBalances } from '@/api/balances'
import { loadTransactions } from '@/api/transactions'
import FileUploader from '@/components/FileUploader.vue'
import SellerCard from '@/components/SellerCard.vue'
import TransactionsList from '@/components/TransactionsList.vue'
import { ERROR_TYPES, buildFailToQueryErrorMessage } from '@/utils/errors'
import { computed, inject, onMounted, ref } from 'vue'
const { onError } = inject('error')

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
  handleBalanceLoad()
  if (transactions.value.length > 0) {
    handleTransactionsLoad()
  } else {
    transactions.value = payload
  }
}

function handleBalanceLoad() {
  loadBalances()
    .then(({ data }) => {
      balances.value = data
    })
    .catch((error) => {
      if (error.error == ERROR_TYPES.FAIL_TO_QUERY) {
        onError(buildFailToQueryErrorMessage())
      }
      onError(error)
    })
}

function handleTransactionsLoad() {
  loadTransactions()
    .then(({ data }) => {
      transactions.value = data
    })
    .catch((error) => {
      if (error.error == ERROR_TYPES.FAIL_TO_QUERY) {
        onError(buildFailToQueryErrorMessage())
      }
      onError(error)
    })
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
  handleTransactionsLoad()
  handleBalanceLoad()
})
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-direction: column;
}

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
