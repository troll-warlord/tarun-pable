<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'

const profile = {
  name: 'TARUN PABLE',
  title: 'Cloud Architect',
  tagline: 'Architecting the silence between 100 million requests.',
}

onMounted(() => {
  const tl = gsap.timeline()
  tl.from('.hero-text', { y: 20, opacity: 0, duration: 1, ease: 'power3.out' }).from('.metric-card', { scale: 0.95, opacity: 0, stagger: 0.1, duration: 0.8 }, '-=0.5')
})

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
</script>

<template>
  <section id="hero" class="relative min-h-screen flex items-center overflow-hidden">
    <div class="relative z-10 w-full lg:w-[55%] px-8 md:px-20 py-20">
      <div class="hero-text">
        <div class="inline-flex items-center gap-3 mb-12">
          <div class="status-node status-node-active animate-pulse"></div>
          <span class="text-mono-label">SLO_STATUS: 99.99%_OPTIMAL</span>
        </div>

        <h1 class="heading-xl mb-10">
          {{ profile.name }}
        </h1>

        <div class="space-y-6 mb-12 border-l border-edge pl-8">
          <p class="text-primary font-mono text-xs font-bold uppercase tracking-[0.4em]">
            {{ profile.title }}
          </p>
          <p class="text-body-muted text-lg md:text-2xl max-w-lg leading-relaxed">"{{ profile.tagline }}"</p>
        </div>

        <div class="flex flex-wrap gap-4">
          <button class="btn-primary rounded-sm" @click="scrollTo('projects')">CHECK_SYSTEM_HEALTH</button>
          <button class="btn-outline rounded-sm" @click="scrollTo('contact')">CONTACT_ROOT</button>
        </div>
      </div>
    </div>

    <div class="absolute right-0 top-0 h-full w-[45%] hidden lg:block overflow-hidden p-12">
      <div class="relative h-full w-full">
        <svg width="100%" height="100%" viewBox="0 0 500 800" fill="none" class="opacity-80">
          <g class="metric-card">
            <rect x="50" y="100" width="400" height="120" rx="2" class="fill-surface stroke-edge" stroke-width="1" />
            <text x="75" y="130" class="fill-muted font-mono text-nano">METRIC :: GLOBAL_UPTIME</text>
            <path d="M75 180 Q 120 140 160 180 T 250 160 T 350 180 T 425 140" class="pulse-line stroke-primary" stroke-width="2" fill="none" />
            <text x="380" y="130" class="fill-primary font-mono text-[12px] font-bold">100.0%</text>
          </g>

          <g class="metric-card">
            <rect x="50" y="300" width="190" height="100" rx="2" class="fill-surface stroke-edge" stroke-width="1" />
            <circle cx="80" cy="330" r="3" class="fill-primary" />
            <text x="95" y="333" class="fill-body font-mono text-nano font-bold italic">ON-CALL</text>
            <text x="80" y="370" class="fill-main font-mono text-[14px] font-black uppercase tracking-tighter">STANDBY</text>
          </g>

          <g class="metric-card">
            <rect x="260" y="300" width="190" height="100" rx="2" class="fill-primary/10 stroke-primary/20" stroke-width="1" />
            <text x="280" y="330" class="fill-primary font-mono text-[8px] font-bold">EVENT :: AUTO_SCALE</text>
            <text x="280" y="360" class="fill-main font-mono text-code">REPLICAS: 12</text>
            <path d="M280 375 H400" class="stroke-edge" stroke-width="4" />
            <path d="M280 375 H370" class="stroke-primary" stroke-width="4" />
          </g>

          <g class="metric-card">
            <rect x="50" y="450" width="400" height="150" rx="2" class="fill-base stroke-edge" stroke-width="1" />
            <text x="70" y="480" class="fill-muted font-mono text-[8px]">06:45:01 :: [INFO] Health check passed</text>
            <text x="70" y="510" class="fill-muted font-mono text-[8px]">06:45:04 :: [INFO] Traffic rebalanced</text>
            <text x="70" y="540" class="fill-primary/80 font-mono text-[8px] font-bold">> 06:45:10 :: [SUCCESS] Deployment complete</text>
          </g>
        </svg>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pulse-line {
  stroke-dasharray: 1000;
  stroke-dashoffset: 0;
  animation: pulseMove 10s linear infinite;
}
@keyframes pulseMove {
  from {
    stroke-dashoffset: 1000;
  }
  to {
    stroke-dashoffset: 0;
  }
}
</style>
