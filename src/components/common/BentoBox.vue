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
  <div :class="['bento-box-base group/box hover:border-emerald-500/30 hover:bg-zinc-900/40', layoutClasses.span]">
    <h4 class="bento-label-base group-hover/box:text-emerald-500/50">
      {{ title }}
    </h4>

    <div :class="['grid w-full place-items-center mt-4 gap-8', layoutClasses.grid]">
      <div v-for="tool in items" :key="tool.name" class="tech-item-base group hover:-translate-y-2">
        <img :src="getIconUrl(tool.slug)" class="tech-icon-base" :alt="tool.name" />
        <span class="absolute -bottom-6 font-mono text-[12px] text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap uppercase tracking-widest">
          {{ tool.name }}
        </span>
      </div>
    </div>
  </div>
</template>
