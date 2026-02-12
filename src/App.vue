<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Navbar from '@/components/layout/Navbar.vue'
import Hero from '@/components/sections/Hero.vue'
import About from '@/components/sections/About.vue'
import Experience from '@/components/sections/Experience.vue'
import Projects from '@/components/sections/Projects.vue'
import Photography from '@/components/sections/Photography.vue'
import Contact from '@/components/sections/Contact.vue'
import Footer from '@/components/layout/Footer.vue'

let lenis = null

onMounted(() => {
  // 1. Initialize Lenis
  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Standard "luxury" easing
    direction: 'vertical',
    gestureDirection: 'vertical',
    smoothHover: true,
    smoothTouch: false, // Usually best to keep native touch behavior on mobile
  })

  // 2. Sync Lenis with GSAP ScrollTrigger
  // This is the secret sauce that prevents the "flicker"
  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)
})

onUnmounted(() => {
  lenis?.destroy()
})

const { y } = useWindowScroll()

const scrollPercent = computed(() => {
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  return height > 0 ? (y.value / height) * 100 : 0
})

const mouseX = ref(0)
const mouseY = ref(0)

const handleMouseMove = (e) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
  document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`)
  document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`)
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <div class="min-h-screen bg-zinc-950 selection:bg-emerald-500/30">
    <div class="fixed top-0 left-0 h-1 bg-emerald-500 z-100 transition-all duration-100" :style="{ width: scrollPercent + '%' }"></div>

    <div class="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div class="grid-glow"></div>
      <div class="bg-grid"></div>
    </div>

    <div class="relative z-10 bg-transparent">
      <Navbar :mouse-x="mouseX" :mouse-y="mouseY" />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Photography />
        <Contact />
      </main>
      <Footer />
    </div>
  </div>
</template>

<style>
/* 3. Add this essential CSS to your global styles */
html.lenis {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-stopped {
  overflow: hidden;
}

.lenis.lenis-scrolling iframe {
  pointer-events: none;
}
</style>
