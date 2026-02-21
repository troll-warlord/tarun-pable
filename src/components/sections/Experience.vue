<script setup>
import { onMounted, ref, onUnmounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import experienceData from '@/data/experience.json'
import ExperienceCard from '@/components/common/ExperienceCard.vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import { SECTION_HEADERS } from '@/utils/constants'

const header = SECTION_HEADERS.EXPERIENCE
gsap.registerPlugin(ScrollTrigger)

const sectionRef = ref(null)
const triggerRef = ref(null)
const scrollProgress = ref(0)
let mm = gsap.matchMedia()

onMounted(() => {
  mm.add('(min-width: 768px)', () => {
    // We calculate based on the cards container width
    const scrollWidth = sectionRef.value.offsetWidth - window.innerWidth + 100

    gsap.to(sectionRef.value, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: triggerRef.value,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${sectionRef.value.offsetWidth}`,
        onUpdate: (self) => {
          scrollProgress.value = self.progress * 100
        },
        invalidateOnRefresh: true,
      },
    })
  })
})

onUnmounted(() => {
  mm.revert()
})

const scrollToContact = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
</script>

<template>
  <section id="experience" ref="triggerRef" class="section-container pb-0! overflow-hidden min-h-screen flex flex-col justify-center">
    <div class="hidden md:block absolute top-16 left-0 w-full h-0.5 z-50 pointer-events-none">
      <div class="h-full bg-primary [box-shadow:var(--shadow-glow-lg)] transition-all duration-75 ease-out" :style="{ width: scrollProgress + '%' }"></div>
    </div>

    <SectionHeader :label="header.label" :main="header.main" :secondary="header.secondary" :description="header.description" />

    <div class="hidden md:absolute md:top-2 md:right-0 items-center gap-6 mt-6 md:mt-0 opacity-60">
      <div class="w-12 h-px bg-primary/20"></div>
      <p class="text-code font-mono text-muted italic uppercase tracking-widest">
        <span class="md:hidden">Scroll_vertical_log</span>
        <span class="hidden md:inline">Scroll_to_traverse</span>
      </p>
    </div>

    <div class="relative w-full">
      <div ref="sectionRef" class="flex flex-col md:flex-row items-start md:w-max relative z-10 pb-20 md:pb-0 pl-4 md:pl-0">
        <ExperienceCard v-for="job in experienceData" :key="job.id" :job="job" />

        <div class="w-full md:w-[50vw] shrink-0 px-0 md:px-20 flex flex-col justify-center py-10">
          <div class="max-w-md p-8 md:p-12 border border-primary/20 bg-primary-subtle relative">
            <span class="text-mono-label text-primary absolute -top-3 left-6 bg-base px-3">EOF</span>
            <h4 class="text-xl md:text-2xl font-bold mb-4 uppercase text-main">Next_Major_Release?</h4>
            <p class="text-muted text-sm mb-8 italic">Currently seeking opportunities to architect high-availability systems and lead engineering excellence.</p>
            <button class="btn-primary w-full" @click="scrollToContact">Establish_Connection</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
