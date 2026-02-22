<script setup>
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import gsap from 'gsap'
import TerminalWindow from '@/components/common/TerminalWindow.vue'
import MetricsPanel from '@/components/common/MetricsPanel.vue'
import heroData from '@/data/hero.json'

const profile = heroData

// ── Stat-chip live values (sourced from child via expose) ─────
const metricsPanel = useTemplateRef('metricsPanel')
const fps = ref(0)
const ping = ref(null)
const cpuCores = ref('?')

// ── Ops feed ─────────────────────────────────────────────────
const opsLog = [
  { cmd: true, text: 'kubectl rollout status deploy/api-gateway' },
  { cmd: false, text: 'deployment "api-gateway" successfully rolled out', type: 'success' },
  { cmd: true, text: 'terraform apply -auto-approve -target=module.eks' },
  { cmd: false, text: 'Apply complete! 12 added, 3 changed, 0 destroyed.', type: 'warn' },
  { cmd: true, text: 'helm upgrade --install prometheus monitoring/' },
  { cmd: false, text: 'Release "prometheus" has been upgraded. Happy Helming!', type: 'success' },
  { cmd: true, text: 'kubectl scale deploy/worker --replicas=12' },
  { cmd: false, text: 'deployment.apps/worker scaled', type: 'success' },
  { cmd: true, text: 'kopf run operator.py --namespace=production' },
  { cmd: false, text: '[INFO] Operator ready. Watching cluster events...', type: 'muted' },
]

const visibleLines = ref([])
let lineIdx = 0
let logTimer = null

const tickLog = () => {
  visibleLines.value = [...visibleLines.value, opsLog[lineIdx % opsLog.length]].slice(-5)
  lineIdx++
  logTimer = setTimeout(tickLog, 900 + Math.random() * 700)
}

onMounted(() => {
  const tl = gsap.timeline({ delay: 0.1 })
  tl.from('.hero-left', { x: -30, opacity: 0, duration: 1.1, ease: 'power3.out' })
    .from('.hero-right', { x: 30, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.8')
    .from('.stat-chip', { y: 12, opacity: 0, stagger: 0.1, duration: 0.45 }, '-=0.5')

  // sync chip refs from the child's exposed values
  // (uses a watcher-free poll; child updates its own refs reactively)
  const sync = () => {
    if (metricsPanel.value) {
      fps.value = metricsPanel.value.fps ?? 0
      ping.value = metricsPanel.value.ping
      cpuCores.value = metricsPanel.value.cpuCores
    }
    requestAnimationFrame(sync)
  }
  requestAnimationFrame(sync)

  logTimer = setTimeout(tickLog, 2200)
})

onUnmounted(() => {
  clearTimeout(logTimer)
})

const scrollTo = (id) => {
  const targetId = id === 'contact' && window.innerWidth < 768 ? 'contact-form' : id
  document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="hero" class="relative min-h-screen flex items-center overflow-hidden">
    <!-- ── Left panel ──────────────────────────────────────── -->
    <div class="hero-left relative z-10 w-full lg:w-[55%] px-8 md:px-20 py-20">
      <!-- Live stat chips -->
      <div class="flex flex-wrap gap-2 mb-10">
        <div class="stat-chip inline-flex items-center gap-2 font-mono text-code font-bold uppercase tracking-[0.2em] px-3 py-1.5 border border-edge text-muted">
          <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shrink-0"></span>
          SLO: {{ profile.slo }}
        </div>
        <div class="stat-chip inline-flex items-center gap-2 font-mono text-code font-bold uppercase tracking-[0.2em] px-3 py-1.5 border border-edge text-muted">
          <span class="text-primary">&#9632;</span>
          {{ fps }}_FPS
        </div>
        <div class="stat-chip inline-flex items-center gap-2 font-mono text-code font-bold uppercase tracking-[0.2em] px-3 py-1.5 border border-edge text-muted">
          <span class="text-primary">&#8599;</span>
          PING: {{ ping ?? '…' }}ms
        </div>
        <div class="stat-chip inline-flex items-center gap-2 font-mono text-code font-bold uppercase tracking-[0.2em] px-3 py-1.5 border border-edge text-muted">
          <span class="text-primary">&#9670;</span>
          {{ cpuCores }}_CORES
        </div>
      </div>

      <h1 class="heading-xl mb-10">{{ profile.name }}</h1>

      <div class="space-y-6 mb-12 border-l border-edge pl-8">
        <p class="text-primary font-mono text-xs font-bold uppercase tracking-[0.4em]">{{ profile.title }}</p>
        <p class="text-body-muted text-lg md:text-2xl max-w-lg leading-relaxed">"{{ profile.tagline }}"</p>
      </div>

      <div class="flex flex-wrap gap-4">
        <button v-for="btn in profile.cta" :key="btn.target" :class="btn.style === 'primary' ? 'btn-primary' : 'btn-outline'" class="rounded-sm" @click="scrollTo(btn.target)">
          {{ btn.label }}
        </button>
      </div>
    </div>

    <!-- ── Right panel ─────────────────────────────────────── -->
    <div class="hero-right absolute right-0 top-0 h-full w-[45%] hidden lg:flex flex-col justify-center gap-4 overflow-x-hidden px-8 py-20">
      <!-- Metrics card — height adapts to viewport, min/max capped -->
      <MetricsPanel ref="metricsPanel" style="height: clamp(280px, calc(100vh - 340px), 500px); flex-shrink: 0" />

      <!-- OPS feed — sits OUTSIDE the metrics card, fixed height -->
      <div class="shrink-0" style="height: 160px">
        <TerminalWindow title="ops_feed :: region=remote_global" content-height="90px" class="h-full">
          <TransitionGroup name="log-line" tag="div" class="space-y-1.5">
            <p v-for="(line, i) in visibleLines" :key="i" class="font-mono text-code leading-relaxed truncate">
              <span v-if="line.cmd" class="text-primary mr-1.5 select-none">$</span>
              <span v-else class="text-muted mr-1.5 select-none">›</span>
              <span
                :class="{
                  'text-primary': line.type === 'success',
                  'text-amber-400': line.type === 'warn',
                  'text-muted': line.type === 'muted',
                  'text-body': line.cmd,
                }"
                >{{ line.text }}</span
              >
            </p>
          </TransitionGroup>
        </TerminalWindow>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "tailwindcss";

/* Allow right panel to scroll on short viewports without showing a scrollbar */
.hero-right {
  overflow-y: auto;
  scrollbar-width: none;
}
.hero-right::-webkit-scrollbar {
  display: none;
}

/* Log line slide-up enter transition */
.log-line-enter-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.log-line-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
</style>
