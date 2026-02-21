<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  main: {
    type: String,
    required: true,
  },
  secondary: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="mb-8 md:mb-12">
    <h2 class="section-label">{{ label }}</h2>

    <h3 class="section-heading">
      {{ main }}
      <span v-if="secondary" class="text-muted italic ml-2 md:ml-2">
        {{ secondary }}
      </span>
    </h3>

    <div class="pipe-description">
      <div class="pipe-line"></div>
      <p class="description-text">
        {{ description }}
      </p>
    </div>
  </div>
</template>
