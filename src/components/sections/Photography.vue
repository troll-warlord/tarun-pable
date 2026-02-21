<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import photographyData from '@/data/photography.json'
import SectionHeader from '@/components/common/SectionHeader.vue'
import { SECTION_HEADERS } from '@/utils/constants'

const header = SECTION_HEADERS.PHOTOGRAPHY
gsap.registerPlugin(ScrollTrigger)

onMounted(() => {
  gsap.from('.photo-node', {
    scrollTrigger: {
      trigger: '#photography',
      start: 'top 80%',
    },
    y: 40,
    opacity: 0,
    stagger: 0.1,
    duration: 1,
    ease: 'expo.out',
  })
})
</script>

<template>
  <section id="photography" class="section-container">
    <SectionHeader :label="header.label" :main="header.main" :secondary="header.secondary" :description="header.description" />

    <div class="grid grid-cols-1 md:grid-cols-12 auto-rows-[300px] gap-4">
      <div v-for="photo in photographyData" :key="photo.id" :class="['photo-card relative group overflow-hidden border border-white/5 rounded-sm', photo.span]">
        <div class="absolute inset-0 bg-zinc-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col justify-end p-6">
          <p class="text-mono-label text-emerald-500 mb-1">{{ photo.category }}</p>
          <h4 class="text-xl font-bold text-white uppercase tracking-tighter">{{ photo.title }}</h4>
        </div>

        <img :src="photo.url" :alt="photo.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

        <div
          class="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-size-[100%_2px,3px_100%] opacity-20"
        ></div>
      </div>
    </div>
    <div class="mt-12 flex flex-col md:flex-row items-center justify-between border-t border-white/5 pt-8 gap-6">
      <div class="flex gap-12">
        <div class="flex flex-col">
          <span class="section-label mb-1! text-zinc-600">Optical_Resolution</span>
          <span class="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">RAW_UNCOMPRESSED</span>
        </div>
        <div class="flex flex-col">
          <span class="section-label mb-1! text-zinc-600">Sensor_Profile</span>
          <span class="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">Full_Frame_Dynamic</span>
        </div>
      </div>
      <button class="section-label text-emerald-500 hover:text-emerald-400 transition-all group flex items-center gap-4 lowercase">
        <span class="h-px w-8 bg-emerald-500/20 group-hover:w-12 group-hover:bg-emerald-500 transition-all"></span>
        <span class="uppercase tracking-widest">ACCESS_FULL_GALLERY</span>
      </button>
    </div>
  </section>
</template>

<style scoped>
.photo-node img {
  will-change: filter, transform;
  backface-visibility: hidden;
}
</style>
