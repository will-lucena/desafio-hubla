<template>
  <div>
    <!-- <h1>{{ message }}</h1> -->
    <form>
      <input type="file" name="" id="" @change="onUpload" />
    </form>
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
  let formData = new FormData()
  const [file] = event.target.files
  formData.append('file', file)
  axios
    .post(`${apiUrl}transactions`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(() => {
      loadTransactions()
      loadBalances()
    })
}

async function loadTransactions() {
  message.value = (await axios.get(`${apiUrl}transactions`)).data
}

async function loadBalances() {
  axios.get(`${apiUrl}balances`)
}

onMounted(() => {
  loadTransactions().then(() => {
    loadBalances()
  })
})
</script>

<style lang="scss" scoped></style>
