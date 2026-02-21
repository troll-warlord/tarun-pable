<script setup>
defineProps({
  label: String,
  modelValue: String,
  type: { type: String, default: 'text' },
  placeholder: String,
  required: { type: Boolean, default: false },
})
defineEmits(['update:modelValue'])
</script>

<template>
  <div class="field-container">
    <label class="field-label">{{ label }}</label>
    <component
      :is="type === 'textarea' ? 'textarea' : 'input'"
      :value="modelValue"
      :required="required"
      :rows="type === 'textarea' ? 4 : null"
      :placeholder="placeholder"
      class="infra-input"
      :type="type"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<style scoped>
.field-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.field-label {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--clr-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.infra-input {
  width: 100%;
  background: var(--clr-bg-panel);
  border: 1px solid var(--clr-edge);
  padding: 1rem;
  color: var(--clr-text-main);
  font-family: var(--font-mono);
  font-size: 12px;
  transition: all 0.3s ease;
}
.infra-input:focus {
  outline: none;
  border-color: var(--clr-primary);
  background: color-mix(in srgb, var(--clr-primary), transparent 95%);
}
</style>
