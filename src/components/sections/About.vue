<script setup>
import stack from '@/data/techStack.json'
import CertificationCard from '@/components/common/CertificationCard.vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import TechConsole from '@/components/common/TechConsole.vue'
import { SECTION_HEADERS } from '@/utils/constants'

const header = SECTION_HEADERS.ABOUT
</script>

<template>
  <section id="about" class="section-container">
    <SectionHeader v-bind="header" />

    <div class="mb-16">
      <div class="flex items-center gap-4 mb-6">
        <span class="text-primary font-mono text-xs">[01]</span>
        <h3 class="heading-lg text-sm!">Professional_Validation</h3>
        <div class="h-px grow bg-edge"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CertificationCard v-for="cert in stack.certifications" :key="cert.id" :cert="cert" />

        <div class="hidden md:flex items-center p-8 gap-6 border-2 border-dashed border-edge rounded-card opacity-40 hover:opacity-100 transition-all">
          <div class="w-20 text-center text-4xl font-light text-main">+</div>
          <div class="border-l border-edge pl-6">
            <h4 class="text-main font-mono italic text-xs uppercase tracking-widest">Upcoming</h4>
            <p class="text-code font-mono text-body mt-1 uppercase">Specialization_Pipeline</p>
          </div>
        </div>
      </div>
    </div>

    <div class="relative">
      <div class="flex items-center gap-4 mb-6">
        <span class="text-primary font-mono text-xs">[02]</span>
        <h3 class="heading-lg text-sm!">Technical_Arsenal</h3>
        <div class="h-px grow bg-edge"></div>
      </div>

      <TechConsole />
    </div>
  </section>
</template>
