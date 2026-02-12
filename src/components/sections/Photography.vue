<script setup>
import photos from '@/data/photography.json'
import { onMounted } from 'vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import gsap from 'gsap'
import { SECTION_HEADERS } from '@/utils/constants'

const header = SECTION_HEADERS.PHOTOGRAPHY

onMounted(() => {
  gsap.from('.photo-node', {
    scrollTrigger: {
      trigger: '#photography',
      start: 'top 70%',
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'expo.out',
  })
})

// Static Layout mapping for exactly 6 photos
const layoutClasses = [
  'md:col-span-8 md:row-span-2', // Photo 1 (Big Feature)
  'md:col-span-4 md:row-span-1', // Photo 2
  'md:col-span-4 md:row-span-1', // Photo 3
  'md:col-span-4 md:row-span-1', // Photo 4
  'md:col-span-4 md:row-span-1', // Photo 5
  'md:col-span-4 md:row-span-1', // Photo 6
]
</script>

<template>
  <section id="photography" class="section-container">
    <SectionHeader :label="header.label" :main="header.main" :secondary="header.secondary" :description="header.description" />

    <div>
      <div class="grid grid-cols-1 md:grid-cols-12 gap-px bg-white/5 border border-white/5 auto-rows-[300px]">
        <div v-for="(photo, index) in photos.slice(0, 6)" :key="index" :class="[layoutClasses[index], 'photo-node relative group overflow-hidden bg-zinc-950']">
          <img
            :src="photo.url"
            :alt="photo.title"
            class="w-full h-full object-cover transition-all duration-700 ease-in-out filter grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100 scale-100 group-hover:scale-110"
          />

          <div
            class="absolute inset-0 bg-linear-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8"
          >
            <span class="text-[10px] font-mono text-emerald-500 mb-1 tracking-[0.2em]"> // CAPTURE_REF_{{ index + 1 }} </span>
            <h4 class="text-xl font-bold text-white uppercase tracking-tighter">
              {{ photo.title }}
            </h4>
          </div>

          <div class="absolute top-6 right-6 font-mono text-[10px] text-white/10 group-hover:text-emerald-500/50 transition-colors">NODE_0{{ index + 1 }}</div>
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
    </div>
  </section>
</template>

<style scoped>
.photo-node img {
  will-change: filter, transform;
  backface-visibility: hidden;
}
</style>
