<template>
  <div class="alert">
    <div class="alert__container">
      <p>{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    required: true
  }
})
</script>

<style lang="scss" scoped>
.alert {
  position: absolute;
  top: 50px;
  left: 0;
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__container {
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 1rem 2rem;
    background-color: var(--color-background-mute);
  }

  &__message {
  }
}
</style>
