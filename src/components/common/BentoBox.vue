<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  items: { type: Array, required: true },
  getIconUrl: { type: Function, required: true },
})

const layoutClasses = computed(() => {
  const count = props.items.length
  const config = {
    1: { span: 'md:col-span-1', grid: 'grid-cols-1' },
    2: { span: 'md:col-span-2', grid: 'grid-cols-2' },
    3: { span: 'md:col-span-3', grid: 'grid-cols-3' },
    4: { span: 'md:col-span-4', grid: 'grid-cols-4' },
    5: { span: 'md:col-span-5', grid: 'grid-cols-5' },
    6: { span: 'md:col-span-6', grid: 'grid-cols-6' },
  }
  return config[count] || { span: 'md:col-span-6', grid: 'grid-cols-4' }
})
</script>
<template>
  <div :class="['bento-box-base group/box', layoutClasses.span]">
    <h4 class="bento-label-base group-hover/box:text-primary/50">
      {{ title }}
    </h4>

    <div :class="['grid w-full place-items-center mt-4 gap-8', layoutClasses.grid]">
      <div v-for="tool in items" :key="tool.name" class="tech-item-base group hover:-translate-y-2">
        <img :src="getIconUrl(tool.slug)" class="tech-icon-base" :alt="tool.name" />
        <span class="absolute -bottom-6 font-mono text-label text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-widest">
          {{ tool.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

/* ── Bento box card skin ─────────────────────────────────────── */
.bento-box-base {
  @apply p-8 border flex flex-col items-start justify-between transition-all duration-500;
  border-radius: var(--radius-card);
  border-color: var(--clr-edge);
  background-color: color-mix(in srgb, var(--clr-bg-surface), transparent 80%);

  &:hover {
    border-color: color-mix(in srgb, var(--clr-primary), transparent 70%);
    background-color: color-mix(in srgb, var(--clr-bg-surface), transparent 60%);
  }
}

.bento-label-base {
  @apply w-full font-mono uppercase tracking-[0.4em] mb-2 transition-colors;
  font-size: var(--text-label);
  color: var(--clr-text-muted);
}

/* Icon wrapper within bento slots */
.tech-item-base {
  @apply relative flex flex-col items-center justify-center transition-all duration-300;
}

.tech-icon-base {
  @apply w-12 h-12 md:w-16 md:h-16 object-contain brightness-110 contrast-125;
  filter: drop-shadow(0 0 1px rgba(255, 255, 255, 0.4));
}
</style>
