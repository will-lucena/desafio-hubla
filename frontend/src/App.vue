<script setup>
import Index from '@/views/Index.vue'
import { provide, ref } from 'vue'
import ErrorAlert from './components/ErrorAlert.vue'

const showError = ref(false)
const errorMessage = ref('')

function onError(message, timeout = 3000) {
  if (!showError.value) {
    errorMessage.value = message
    showError.value = !showError.value
    const timeoutInstance = setTimeout(() => {
      showError.value = false
      errorMessage.value = ''
      clearTimeout(timeoutInstance)
    }, timeout)
  }
}

provide('error', {
  onError
})
</script>

<template>
  <Index />
  <Transition>
    <ErrorAlert v-if="showError" :message="errorMessage" />
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
