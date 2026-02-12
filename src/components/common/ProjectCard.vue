<script setup>
import { computed } from 'vue'
import TechIcon from './TechIcon.vue'
const props = defineProps({ project: { type: Object, required: true } })

const isLive = computed(() => props.project.status === 'live')
</script>

<template>
  <div class="infra-card group relative p-8 md:p-10 h-full flex flex-col bg-zinc-950 transition-all duration-300">
    <div class="absolute left-0 top-0 bottom-0 w-px bg-white/5 group-hover:w-1 group-hover:bg-emerald-500 transition-all duration-300"></div>

    <div class="relative z-10 flex justify-between items-start mb-10 pl-2">
      <div class="flex flex-col gap-1.5">
        <span class="text-[11px] font-mono text-zinc-500 uppercase tracking-[0.2em]">Deployment_Ref</span>
        <span class="text-[13px] font-mono text-zinc-300 group-hover:text-emerald-400 transition-colors uppercase">
          {{ project.id }}
        </span>
      </div>
      <div
        :class="[
          'px-3 py-1 border text-[10px] font-mono uppercase tracking-widest transition-all font-bold',
          isLive ? 'border-emerald-500/20 text-emerald-500 bg-emerald-500/5' : 'border-white/5 text-zinc-600',
        ]"
      >
        {{ isLive ? 'Production' : 'Development' }}
      </div>
    </div>

    <div class="relative z-10 mb-8 pl-2 grow">
      <h3 class="text-2xl md:text-3xl font-bold text-zinc-100 mb-5 group-hover:text-white uppercase tracking-tighter">
        {{ project.title }}
      </h3>
      <p class="text-base text-zinc-400 leading-relaxed font-light transition-colors group-hover:text-zinc-300">
        {{ project.description }}
      </p>
    </div>

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

    <div class="relative z-10 pt-8 border-t border-white/5 pl-2 min-h-20 flex flex-col justify-center">
      <div v-if="isLive" class="grid grid-cols-2 gap-4">
        <a v-if="project.links?.repo" :href="project.links.repo" target="_blank" class="group/link flex flex-col gap-1 text-zinc-600 hover:text-white transition-colors">
          <span class="text-[12px] font-mono uppercase tracking-widest text-zinc-700">01 // Repository</span>
          <div class="flex items-center gap-2 font-mono text-[12px] uppercase tracking-tighter">
            <span class="text-emerald-500/0 group-hover/link:text-emerald-500 transition-all">_</span>
            ACCESS_SOURCE
          </div>
        </a>

        <a
          v-if="project.links?.demo"
          :href="project.links.demo"
          target="_blank"
          class="group/link flex flex-col gap-1 text-zinc-400 hover:text-emerald-400 transition-colors border-l border-white/5 pl-4"
        >
          <span class="text-[12px] font-mono uppercase tracking-widest text-zinc-700">02 // Deployment</span>
          <div class="flex items-center gap-2 font-mono text-[12px] uppercase tracking-tighter font-bold">
            <span class="text-emerald-500/0 group-hover/link:text-emerald-500 transition-all">_</span>
            PROBE_ENDPOINT
          </div>
        </a>
      </div>

      <div v-else class="flex flex-col gap-1">
        <span class="text-[12px] font-mono uppercase tracking-widest text-zinc-800">00 // Status</span>
        <div class="flex items-center gap-3 text-[12px] font-mono text-zinc-700 uppercase italic tracking-wider">
          <span class="w-1.5 h-1.5 rounded-full bg-zinc-800 animate-pulse"></span>
          STAGING_LOCKED_FOR_REVISIONS
        </div>
      </div>
    </div>
  </div>
</template>
