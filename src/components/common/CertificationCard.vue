<script setup>
import TechIcon from './TechIcon.vue'

defineProps({
  cert: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div
    class="infra-card group flex flex-row items-stretch p-0 overflow-hidden min-h-40 bg-zinc-900/20 border border-white/5 hover:border-emerald-500/30 transition-all duration-500"
  >
    <div class="w-28 md:w-32 shrink-0 flex items-center justify-center bg-white/2 group-hover:bg-white/4 transition-colors">
      <TechIcon :slug="cert.slug" :alt="cert.name" />
    </div>
    <div class="flex flex-col justify-center grow p-6 md:p-8 border-l border-white/10 overflow-hidden">
      <div class="flex items-center gap-3 mb-3">
        <span class="text-[12px] font-mono px-2 py-0.5 border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 uppercase tracking-widest whitespace-nowrap">
          {{ cert.status }}
        </span>
        <span class="text-[12px] font-mono text-zinc-500 uppercase tracking-widest truncate">{{ cert.org }}</span>
      </div>

      <h4 class="text-zinc-100 font-bold text-base md:text-lg leading-tight mb-4 uppercase tracking-tight group-hover:text-emerald-400 transition-colors duration-300">
        {{ cert.name }}
      </h4>

      <div class="grid grid-cols-1 gap-y-1">
        <div class="flex items-center gap-2">
          <span class="text-[12px] font-mono text-zinc-700 uppercase w-12 shrink-0">ID_Ref</span>
          <span class="text-[12px] font-mono text-zinc-500 tracking-wider truncate">{{ cert.id }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-[12px] font-mono text-zinc-700 uppercase w-12 shrink-0">Verify</span>
          <span class="text-[12px] font-mono text-zinc-400 tracking-wider hover:text-emerald-500 transition-colors cursor-pointer italic"> // Check_Credential </span>
        </div>
      </div>
    </div>
  </div>
</template>
