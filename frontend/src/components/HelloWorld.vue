<template>
  <div>
    <!-- <h1>{{ message }}</h1> -->
    <input type="file" name="" id="" @change="onUpload" />
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const message = ref('')

const apiUrl = import.meta.env.VITE_API_URL

console.log({ apiUrl })

axios
  .get(apiUrl)
  .then((response) => {
    message.value = response.data.message
  })
  .catch((error) => {
    console.log(error)
  })

function onUpload(event) {
  const [file] = event.target.files

  if (file) {
    let reader = new FileReader()
    reader.readAsText(file, 'UTF-8')
    reader.onload = (evt) => {
      sanitizeContent(evt.target.result)
    }
  }
}

function sanitizeContent(transactions) {
  const transactionsArray = transactions.split('\n')
  const mappedTransactions = transactionsArray.map((transaction) => {
    const kind = transaction.substring(0, 1)
    const date = transaction.substring(1, 26)
    const product = transaction.substring(26, 56).trimEnd()
    const value = transaction.substring(56, 66).trimEnd()
    const seller = transaction.substring(66, 86).trimEnd()

    return { kind, date, product, value, seller }
  })

  uploadTransactions(mappedTransactions)
}

function uploadTransactions(payload) {
  axios.post(`${apiUrl}transactions`, {
    payload
  })
}

async function loadTransactions() {
  message.value = (await axios.get(`${apiUrl}transactions`)).data
}

onMounted(() => {
  loadTransactions()
})
</script>

<style lang="scss" scoped></style>
