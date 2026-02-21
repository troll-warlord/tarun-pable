<script setup>
defineProps({
  title: String,
})
</script>

<template>
  <div class="console-box">
    <div class="console-header">
      <div class="traffic-lights">
        <div class="dot red"></div>
        <div class="dot amber"></div>
        <div class="dot emerald"></div>
      </div>
      <span v-if="title" class="console-title">{{ title }}</span>
    </div>
    <div class="console-content text-sm">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.console-box {
  background: var(--clr-bg-surface);
  border: 1px solid var(--clr-edge);
  padding: 1.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}
.console-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}
.console-title {
  font-family: var(--font-mono);
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--clr-text-muted);
  opacity: 0.6;
}
.traffic-lights {
  display: flex;
  gap: 0.4rem;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  opacity: 0.3;
}
.red {
  background: #ef4444;
}
.amber {
  background: #f59e0b;
}
.emerald {
  background: var(--clr-primary);
}
.console-content {
  font-family: var(--font-mono);
  color: var(--clr-text-muted);
}
</style>
