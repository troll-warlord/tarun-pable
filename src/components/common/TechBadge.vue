<script setup>
defineProps({
  name: String,
  icon: String,
})
</script>

<template>
  <div class="tech-pill group hover:bg-emerald-500/3">
    <div class="w-8 h-8 flex items-center justify-center bg-zinc-950 border border-white/5 rounded-sm group-hover:border-emerald-500/30 transition-colors">
      <span class="text-[9px] font-mono text-zinc-600 group-hover:text-emerald-500 font-bold uppercase">
        {{ name.substring(0, 2) }}
      </span>
    </div>

    <div class="flex flex-col">
      <span class="text-[10px] font-mono font-bold text-zinc-400 group-hover:text-zinc-100 transition-colors uppercase tracking-widest">
        {{ name }}
      </span>
      <span class="text-[7px] font-mono text-zinc-700 uppercase tracking-tighter group-hover:text-emerald-500/50"> Module_Loaded </span>
    </div>
  </div>
</template>
