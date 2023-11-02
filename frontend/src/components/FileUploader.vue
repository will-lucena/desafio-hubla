<template>
  <div class="file_uploader">
    <input ref="uploader" id="uploader" type="file" accept=".txt" @change="onUpload" hidden />

    <p @click="onClickOpenUploader">
      <span v-if="hasDragnDrop">Arrasta e solta o arquivo aqui ou </span>
      <span class="drag_n_drop__highlight">selecione</span> um arquivo para carregar as transações
    </p>
  </div>
</template>

<script setup>
import { uploadTransactionsFile } from '@/api/transactions'
import { ref } from 'vue'

const emit = defineEmits(['success', 'fail'])
const uploader = ref(null)

const hasDragnDrop = ref(false)

function onUpload() {
  const [file] = uploader.value.files

  if (file) {
    uploadTransactionsFile(file)
      .then(({ data }) => {
        emit('success', data)
      })
      .catch((error) => {
        emit('fail', error)
      })
  }
}

function onClickOpenUploader() {
  uploader.value.click()
}
</script>

<style lang="scss" scoped>
.file_uploader {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  padding: 2rem;

  &__box {
    border-radius: 0.5rem;
    border: 1px dashed var(--color-border);
    padding: 1.5rem;
  }
}

.drag_n_drop {
  &__highlight {
    cursor: pointer;
    font-weight: 700;
    color: aqua;
  }
}
</style>
