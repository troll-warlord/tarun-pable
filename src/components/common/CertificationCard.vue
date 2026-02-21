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
  <div class="infra-card cert-card group flex flex-row items-stretch p-0 overflow-hidden min-h-40">
    <!-- Logo column -->
    <div class="w-28 md:w-32 shrink-0 flex items-center justify-center bg-panel group-hover:bg-primary-subtle transition-colors">
      <TechIcon :slug="cert.slug" :alt="cert.name" />
    </div>

    <!-- Content column -->
    <div class="flex flex-col justify-center grow p-6 md:p-8 border-l border-edge overflow-hidden">
      <!-- Status badge + org row -->
      <div class="flex items-center gap-3 mb-3">
        <span class="cert-status-badge">{{ cert.status }}</span>
        <span class="text-label font-mono text-muted uppercase tracking-widest truncate">{{ cert.org }}</span>
      </div>

      <!-- Cert name -->
      <h4 class="text-main font-bold md:text-lg leading-tight mb-4 uppercase tracking-tight group-hover:text-primary transition-colors duration-300">
        {{ cert.name }}
      </h4>

      <!-- Metadata rows -->
      <div class="grid grid-cols-1 gap-y-1">
        <div class="flex items-center gap-2">
          <span class="text-label font-mono text-muted/60 uppercase w-12 shrink-0">ID_Ref</span>
          <span class="text-label font-mono text-muted tracking-wider truncate">{{ cert.id }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-label font-mono text-muted/60 uppercase w-12 shrink-0">Verify</span>
          <span class="text-label font-mono text-body tracking-wider hover:text-primary transition-colors cursor-pointer italic"> // Check_Credential </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

/* The .infra-card global class provides the base border + hover behavior.
   .cert-card overrides only what's structural to this component. */
.cert-card {
  background-color: color-mix(in srgb, var(--clr-bg-surface), transparent 80%);
  border: 1px solid var(--clr-edge);

  /* infra-card has border-l, we restore all-sides border for this card layout */
  border-left-width: 1px;
}

/* Status pill (ACTIVE / IN_PROGRESS / etc.) */
.cert-status-badge {
  @apply font-mono px-2 py-0.5 border uppercase tracking-widest whitespace-nowrap;
  font-size: var(--text-label);
  color: var(--clr-primary);
  border-color: color-mix(in srgb, var(--clr-primary), transparent 80%);
  background-color: color-mix(in srgb, var(--clr-primary), transparent 90%);
}
</style>
