<template>
  <div>
    <form>
      <FileUploader @success="onUploadSuccess" @fail="onUploadFail" />
    </form>

    <TransactionsList :transactions="transactions" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FileUploader from './FileUploader.vue'
import TransactionsList from './TransactionsList.vue'

const transactions = ref([])

function onUploadSuccess(payload) {
  transactions.value = payload
}

function onUploadFail(error) {
  console.log(error)
}
</script>

<style lang="scss" scoped></style>
