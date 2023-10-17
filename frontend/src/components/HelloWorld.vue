<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

const message = ref('')

axios
  .get('http://localhost:49160/')
  .then((response) => {
    message.value = response.data.message
  })
  .catch((error) => {
    console.log(error)
  })
</script>

<style lang="scss" scoped></style>
