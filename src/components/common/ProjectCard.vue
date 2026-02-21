<script setup>
import { computed } from 'vue'
import TechIcon from './TechIcon.vue'
const props = defineProps({ project: { type: Object, required: true } })

const isLive = computed(() => props.project.status === 'live')
</script>

<template>
  <div class="infra-card group relative p-8 md:p-10 h-full flex flex-col console-card transition-all duration-300">
    <!-- Header row: deployment ref + status badge -->
    <div class="relative z-10 flex justify-between items-start mb-10 pl-2">
      <div class="flex flex-col gap-1.5">
        <span class="text-label font-mono text-muted uppercase tracking-[0.2em]">Deployment_Ref</span>
        <span class="text-[13px] font-mono text-body group-hover:text-primary transition-colors uppercase">
          {{ project.id }}
        </span>
      </div>
      <div
        :class="[
          'px-3 py-1 border text-code font-mono uppercase tracking-widest transition-all font-bold',
          isLive ? 'border-primary/20 text-primary bg-primary-subtle' : 'border-edge text-muted',
        ]"
      >
        {{ isLive ? 'Production' : 'Development' }}
      </div>
    </div>

    <!-- Title + description -->
    <div class="relative z-10 mb-8 pl-2 grow">
      <h3 class="text-2xl md:text-3xl font-bold text-main mb-5 group-hover:text-main uppercase tracking-tighter">
        {{ project.title }}
      </h3>
      <p class="text-body leading-relaxed font-light transition-colors group-hover:text-main">
        {{ project.description }}
      </p>
    </div>

    <!-- Tech icon strip -->
    <div class="relative z-10 flex flex-wrap gap-4 mb-6 pl-2">
      <div
        v-for="tech in project.tech"
        :key="tech"
        class="w-8 h-8 flex m-5 items-center justify-center opacity-100 md:opacity-60 group-hover:opacity-100 transition-all duration-500 transform group-hover:-translate-y-1"
        :title="tech"
      >
        <TechIcon :slug="tech" :alt="tech" />
      </div>
    </div>

    <!-- Footer links -->
    <div class="relative z-10 pt-8 border-t border-edge pl-2 min-h-20 flex flex-col justify-center">
      <div v-if="isLive" class="grid grid-cols-2 gap-4">
        <a v-if="project.links?.repo" :href="project.links.repo" target="_blank" class="group/link flex flex-col gap-1 text-muted hover:text-main transition-colors">
          <span class="text-label font-mono uppercase tracking-widest text-muted/60">01 // Repository</span>
          <div class="flex items-center gap-2 font-mono text-label uppercase tracking-tighter">
            <span class="text-primary/0 group-hover/link:text-primary transition-all">_</span>
            ACCESS_SOURCE
          </div>
        </a>

        <a
          v-if="project.links?.demo"
          :href="project.links.demo"
          target="_blank"
          class="group/link flex flex-col gap-1 text-body hover:text-primary transition-colors border-l border-edge pl-4"
        >
          <span class="text-label font-mono uppercase tracking-widest text-muted/60">02 // Deployment</span>
          <div class="flex items-center gap-2 font-mono text-label uppercase tracking-tighter font-bold">
            <span class="text-primary/0 group-hover/link:text-primary transition-all">_</span>
            PROBE_ENDPOINT
          </div>
        </a>
      </div>

      <div v-else class="flex flex-col gap-1">
        <span class="text-label font-mono uppercase tracking-widest text-muted/40">00 // Status</span>
        <div class="flex items-center gap-3 text-label font-mono text-muted/60 uppercase italic tracking-wider">
          <span class="w-1.5 h-1.5 rounded-full bg-edge animate-pulse"></span>
          STAGING_LOCKED_FOR_REVISIONS
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "tailwindcss";
.console-card {
  @apply gap-4 border rounded-md transition-all duration-300;
  border-color: var(--clr-edge);
  background-color: color-mix(in srgb, var(--clr-bg-base), transparent 60%);

  &:hover {
    border-color: color-mix(in srgb, var(--clr-primary), transparent 70%);
  }
}
</style>
