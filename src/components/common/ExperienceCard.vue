<script setup>
import { ref, onMounted } from 'vue'
import TechIcon from '@/components/common/TechIcon.vue'
defineProps({ job: Object })

const isExpanded = ref(false)
const isIntersecting = ref(false) // Track mobile visibility
const cardRef = ref(null)

onMounted(() => {
  if (window.innerWidth < 768) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting.value = entry.isIntersecting
      },
      { threshold: 0.6 }
    )
    if (cardRef.value) observer.observe(cardRef.value)
  }
})
</script>

<template>
  <!-- <div class="shrink-0 w-[85vw] md:w-150 relative group flex flex-col border-l border-white/10 md:border-l-0 md:border-t md:border-white/10 hover:border-emerald-500/30"> -->
  <div
    ref="cardRef"
    :class="[
      'shrink-0 w-[85vw] md:w-150 relative group flex flex-col',
      'border-l md:border-l-0 md:border-t',
      isExpanded ? 'border-emerald-500' : isIntersecting ? 'border-emerald-500/40' : 'border-white/10 md:hover:border-emerald-500/30',
    ]"
  >
    <div
      :class="[
        'w-3 h-3 rounded-full border-2 border-zinc-950 bg-zinc-800 absolute z-70 transition-all duration-500',

        /* Position for Mobile: Centered on Left Border */
        'left-0 -translate-x-1/2 top-0 md:top-0',

        /* Position for Laptop: Centered on Top Border */
        'md:left-0 md:-translate-y-1/2',

        isExpanded ? 'bg-emerald-500 border-emerald-400 scale-125 shadow-[0_0_10px_#10b981]' : 'group-hover:border-emerald-500/50',
      ]"
    ></div>

    <div class="mt-8 md:mt-16 px-6 md:pr-18 flex flex-col grow">
      <div class="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 text-center md:text-left">
        <TechIcon :slug="job.slug" :alt="job.company" />

        <div class="flex flex-col items-center md:items-start">
          <h4 class="text-xl font-bold text-zinc-100 mb-1 group-hover:text-emerald-400 transition-colors uppercase tracking-tight">
            {{ job.company }}
          </h4>
          <div class="flex items-center gap-2">
            <span class="text-emerald-500/50 font-mono text-[12px] font-bold uppercase">[Node]</span>
            <p class="text-mono-label text-zinc-500 text-xs uppercase">{{ job.role }}</p>
          </div>
          <p class="text-[12px] font-mono text-zinc-600 mt-1 uppercase tracking-widest">{{ job.period }}</p>
        </div>
      </div>

      <div class="relative h-80 mb-6">
        <div class="absolute inset-0 bg-zinc-950/40 blur-2xl -z-10"></div>

        <transition
          enter-active-class="transition-all duration-500 ease-out"
          leave-active-class="transition-all duration-300 ease-in absolute top-0 left-0 w-full"
          enter-from-class="opacity-0 translate-y-4"
          leave-to-class="opacity-0 -translate-y-4"
        >
          <p v-if="!isExpanded" key="summary" class="text-zinc-300 italic leading-relaxed text-sm md:pr-6">"{{ job.summary }}"</p>

          <div v-else key="impact" class="log-scroll-mask h-full">
            <div class="h-full overflow-y-auto pr-4 space-y-4 custom-log-scrollbar border-t border-white/5 pt-4 pb-12" @wheel.stop @touchmove.stop>
              <div v-for="(point, index) in job.impact" :key="index" class="exp-log-item group/item">
                <p class="text-sm text-zinc-300 leading-relaxed group-hover/item:text-emerald-50 transition-colors">
                  <span class="text-emerald-500 font-mono mr-2 text-[11px] font-bold">[0{{ index + 1 }}]</span>
                  {{ point }}
                </p>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <div class="pb-6 flex justify-center md:justify-start">
        <button class="flex items-center gap-3 text-mono-label text-zinc-500 hover:text-emerald-400 transition-colors group/btn" @click="isExpanded = !isExpanded">
          <span class="flex items-center justify-center w-6 h-6 border border-white/10 rounded-sm group-hover/btn:border-emerald-500/50 transition-colors">
            {{ isExpanded ? '-' : '+' }}
          </span>
          <span class="text-[12px] tracking-[0.2em] font-mono">
            {{ isExpanded ? 'TERMINATE_LOG' : 'INITIALIZE_IMPACT_LOG' }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>
