<script setup>
import footerData from '@/data/footer.json'
const currentYear = new Date().getFullYear()
const { socialLinks, systemSpecs } = footerData
</script>

<template>
  <footer class="relative py-16 px-8 border-t border-white/5 overflow-hidden">
    <div class="grid-glow"></div>

    <div class="bg-grid"></div>

    <div class="max-w-7xl mx-auto relative z-10">
      <div class="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
        <div class="w-full lg:w-auto">
          <div class="flex items-center gap-3 font-mono text-sm mb-3">
            <span class="text-emerald-500 font-bold animate-pulse">></span>
            <span class="heading-lg text-lg tracking-[0.2em] text-zinc-100">TARUN_PABLE</span>
          </div>

          <div class="text-mono-label text-zinc-600 mb-8">47.6062° N, 122.3321° W // UTC-8:00</div>

          <div class="flex gap-10">
            <div v-for="spec in systemSpecs" :key="spec.label" class="flex flex-col border-l border-white/10 pl-4">
              <span class="text-mono-label text-zinc-600 text-[8px] mb-1">{{ spec.label }}</span>
              <span class="text-mono-label text-zinc-400 font-bold tracking-normal">{{ spec.value }}</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col items-start lg:items-end gap-6">
          <h4 class="text-mono-label text-zinc-600">Access_Gateways</h4>
          <div class="flex gap-4">
            <a
              v-for="link in socialLinks"
              :key="link.name"
              :href="link.url"
              target="_blank"
              class="group relative flex items-center justify-center w-12 h-12 border border-white/10 bg-zinc-900 transition-all hover:border-emerald-500/50"
            >
              <span class="font-mono text-[11px] font-bold text-zinc-500 group-hover:text-emerald-400">{{ link.icon }}</span>
              <span class="absolute -top-8 text-[8px] font-mono text-emerald-500 opacity-0 group-hover:opacity-100 transition-all uppercase whitespace-nowrap">
                {{ link.name }}
              </span>
            </a>
          </div>
        </div>
      </div>

      <div class="mt-16 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div class="text-mono-label text-zinc-600 text-[9px]">© {{ currentYear }} // BUILD_ID: 0x{{ currentYear }}AF42 // ALL_RIGHTS_RESERVED</div>

        <div class="hidden md:block overflow-hidden whitespace-nowrap w-1/3 opacity-30">
          <div class="text-[8px] font-mono text-emerald-500 uppercase tracking-[0.3em] animate-marquee">
            SYSTEM_OK // LATENCY_OPTIMIZED // MULTI_REGION_DEPLOYED // SECURITY_HARDENED // SYSTEM_OK //
          </div>
        </div>

        <div class="flex gap-6 text-mono-label text-zinc-600 text-[9px]">
          <span class="hover:text-emerald-500 cursor-help transition-colors">Privacy.txt</span>
          <span class="hover:text-emerald-500 cursor-help transition-colors">SLA_v2.0</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
.animate-marquee {
  display: inline-block;
  animation: marquee 30s linear infinite;
}
</style>
