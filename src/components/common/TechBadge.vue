<script setup>
defineProps({
  name: String,
  icon: String,
})
</script>

<template>
  <div class="tech-pill group hover:bg-primary-subtle">
    <div class="w-8 h-8 flex items-center justify-center bg-base border border-edge rounded-badge group-hover:border-primary/30 transition-colors">
      <span class="text-nano font-mono text-muted group-hover:text-primary font-bold uppercase">
        {{ name.substring(0, 2) }}
      </span>
    </div>

    <div class="flex flex-col">
      <span class="text-code font-mono font-bold text-body group-hover:text-main transition-colors uppercase tracking-widest">
        {{ name }}
      </span>
      <span class="text-nano font-mono text-muted/50 uppercase tracking-tighter group-hover:text-primary/50"> Module_Loaded </span>
    </div>
  </div>
</template>
