<script setup>
import { ref, computed, onMounted } from 'vue'
import TechIcon from '@/components/common/TechIcon.vue'
const props = defineProps({ job: Object })

const period = computed(() => {
  const fmt = (d) => {
    if (!d || d === 'current') return 'Present'
    const [year, month] = d.split('-')
    return new Date(Number(year), Number(month) - 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }
  return `${fmt(props.job.from)} – ${fmt(props.job.to)}`
})

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
  <div
    ref="cardRef"
    :class="[
      'shrink-0 w-[85vw] md:w-150 relative group flex flex-col',
      'border-l md:border-l-0 md:border-t',
      isExpanded ? 'border-primary' : isIntersecting ? 'border-primary/40' : 'border-edge md:hover:border-primary/30',
    ]"
  >
    <!-- Timeline node dot -->
    <div
      :class="[
        'w-3 h-3 rounded-full border-2 border-base bg-surface absolute z-70 transition-all duration-500',
        'left-0 -translate-x-1/2 top-0 md:top-0',
        'md:left-0 md:-translate-y-1/2',
        isExpanded ? 'bg-primary border-primary scale-125 [box-shadow:var(--shadow-glow)]' : 'group-hover:border-primary/50',
      ]"
    ></div>

    <div class="mt-8 md:mt-16 px-6 md:pr-18 flex flex-col grow">
      <!-- Company header -->
      <div class="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 text-center md:text-left">
        <TechIcon :slug="job.slug" :alt="job.company" />

        <div class="flex flex-col items-center md:items-start">
          <h4 class="text-xl font-bold text-main mb-1 group-hover:text-primary transition-colors uppercase tracking-tight">
            {{ job.company }}
          </h4>
          <div class="flex items-center gap-2">
            <span class="text-primary/50 font-mono text-sm font-bold uppercase">[Node]</span>
            <p class="text-mono-label text-muted text-xs uppercase">{{ job.role }}</p>
          </div>
          <p class="text-label font-mono text-muted mt-1 uppercase tracking-widest">{{ period }}</p>
        </div>
      </div>

      <!-- Expandable content area -->
      <div class="relative h-80 mb-6">
        <!-- Ambient glow backdrop -->
        <div class="absolute inset-0 bg-base/40 blur-2xl -z-10"></div>

        <transition
          enter-active-class="transition-all duration-500 ease-out"
          leave-active-class="transition-all duration-300 ease-in absolute top-0 left-0 w-full"
          enter-from-class="opacity-0 translate-y-4"
          leave-to-class="opacity-0 -translate-y-4"
        >
          <!-- Summary view -->
          <p v-if="!isExpanded" key="summary" class="text-body italic leading-relaxed text-sm md:pr-6">"{{ job.summary }}"</p>

          <!-- Impact log view -->
          <div v-else key="impact" class="log-scroll-mask h-full">
            <div class="h-full overflow-y-auto pr-4 space-y-4 custom-log-scrollbar border-t border-edge pt-4 pb-12" @wheel.stop @touchmove.stop>
              <div v-for="(point, index) in job.impact" :key="index" class="exp-log-item group/item">
                <p class="text-sm text-body leading-relaxed group-hover/item:text-main transition-colors">
                  <span class="text-primary font-mono mr-2 text-label font-bold">[0{{ index + 1 }}]</span>
                  {{ point }}
                </p>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <!-- Toggle button -->
      <div class="pb-6 flex justify-center md:justify-start">
        <button class="flex items-center gap-3 text-mono-label text-muted hover:text-primary transition-colors group/btn" @click="isExpanded = !isExpanded">
          <span class="flex items-center justify-center w-6 h-6 border border-edge rounded-badge group-hover/btn:border-primary/50 transition-colors">
            {{ isExpanded ? '-' : '+' }}
          </span>
          <span class="text-label tracking-[0.2em] font-mono">
            {{ isExpanded ? 'TERMINATE_LOG' : 'INITIALIZE_IMPACT_LOG' }}
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

/*
 * ── Component Identity Styles ─────────────────────────────────
 * These classes are ExperienceCard-specific skins.
 * They live here (not in style.css) per the Hybrid Standard:
 *   "Layout logic → Tailwind utilities in <template>"
 *   "Component skin → @apply directives in <style scoped>"
 */

/* Individual impact log row */
.exp-log-item {
  @apply relative pl-6 py-4 border-l-2 transition-colors;
  border-top-right-radius: var(--radius-badge);
  border-bottom-right-radius: var(--radius-badge);
  border-color: color-mix(in srgb, var(--clr-primary), transparent 90%);
  background-color: var(--clr-bg-panel);
  will-change: transform, opacity;

  &:hover {
    border-color: var(--clr-primary);
  }
}

/* Custom thin scrollbar for the impact log scroll area */
.custom-log-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: color-mix(in srgb, var(--clr-primary), transparent 70%) transparent;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: color-mix(in srgb, var(--clr-primary), transparent 80%);
    border-radius: 9999px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: color-mix(in srgb, var(--clr-primary), transparent 50%);
  }
}

/* Top/bottom fade mask on the scroll container */
.log-scroll-mask {
  mask-image: linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%);
}
</style>
