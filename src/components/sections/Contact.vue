<script setup>
import { ref } from 'vue'
import { SECTION_HEADERS } from '@/utils/constants'
import SectionHeader from '@/components/common/SectionHeader.vue'
const header = SECTION_HEADERS.CONTACT

const form = ref({ name: '', email: '', message: '' })
const isSending = ref(false)
const isSuccess = ref(false)

const handleCommit = () => {
  isSending.value = true
  setTimeout(() => {
    isSending.value = false
    isSuccess.value = true
    form.value = { name: '', email: '', message: '' }
    setTimeout(() => {
      isSuccess.value = false
    }, 5000)
  }, 2000)
}
</script>

<template>
  <section id="contact" class="section-container relative">
    <!-- <div class="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0">
      <h2 class="text-[20vw] font-black text-white/2 leading-none uppercase">Connect</h2>
    </div> -->

    <SectionHeader :label="header.label" :main="header.main" :secondary="header.secondary" :description="header.description" />

    <div class="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
      <div class="space-y-10">
        <div class="p-6 bg-zinc-900 border border-white/10 font-mono text-[11px] text-zinc-500 space-y-2 max-w-md shadow-2xl">
          <div class="flex gap-1.5 mb-4">
            <div class="w-2 h-2 rounded-full bg-red-500/30"></div>
            <div class="w-2 h-2 rounded-full bg-amber-500/30"></div>
            <div class="w-2 h-2 rounded-full bg-emerald-500/30"></div>
          </div>
          <p><span class="text-emerald-500">>>></span> INITIALIZING_HANDSHAKE...</p>
          <p><span class="text-emerald-500">>>></span> LOCATION: REMOTE_GLOBAL</p>
          <p>
            <span class="text-emerald-500">>>></span> STATUS:
            <span v-if="!isSending" class="text-emerald-400">AWAITING_INPUT</span>
            <span v-else class="text-amber-400 animate-pulse">UPLOADING_PAYLOAD...</span>
          </p>
          <div class="pt-4 flex gap-4 items-center">
            <div class="h-1 w-24 bg-zinc-800 overflow-hidden">
              <div class="h-full bg-emerald-500 transition-all duration-300" :class="isSending ? 'animate-[progress_2s_infinite]' : 'w-full opacity-20'"></div>
            </div>
            <span class="text-[9px] uppercase tracking-widest text-emerald-500/70">Port_443_Active</span>
          </div>
        </div>

        <div class="max-w-sm">
          <p class="description-text opacity-60">
            Whether you're looking to scale a startup, optimize a legacy cloud environment, or discuss visual composition—my terminal is always open.
          </p>
        </div>
      </div>

      <div class="bg-zinc-900/50 p-8 md:p-10 border border-white/5 backdrop-blur-md">
        <form class="space-y-8" @submit.prevent="handleCommit">
          <div class="grid md:grid-cols-2 gap-8">
            <div class="space-y-3">
              <label class="section-label text-zinc-600!">01 // IDENTIFY_NAME</label>
              <input v-model="form.name" type="text" required placeholder="USER_ID" class="contact-input" />
            </div>
            <div class="space-y-3">
              <label class="section-label text-zinc-600!">02 // CONTACT_EMAIL</label>
              <input v-model="form.email" type="email" required placeholder="GATEWAY_ADDR" class="contact-input" />
            </div>
          </div>

          <div class="space-y-3">
            <label class="section-label text-zinc-600!">03 // PROJECT_SCOPE</label>
            <textarea v-model="form.message" rows="4" required placeholder="DESCRIBE_MANIFESTO..." class="contact-input resize-none"></textarea>
          </div>

          <button type="submit" :disabled="isSending" class="btn-primary w-full py-5 flex items-center justify-center gap-3 active:scale-[0.99]">
            <template v-if="!isSending && !isSuccess">
              <span class="flex items-center gap-3"> <span class="animate-pulse">_</span> EXECUTE_COMMIT </span>
            </template>
            <template v-else-if="isSending">
              <span class="animate-pulse">PUSHING_TO_MAIN...</span>
            </template>
            <template v-else>
              <span>HANDSHAKE_COMPLETE</span>
            </template>
          </button>
        </form>

        <transition name="fade">
          <div v-if="isSuccess" class="mt-6 p-4 border border-emerald-500/30 bg-emerald-500/5 flex items-center gap-3">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <p class="text-emerald-500 font-mono text-[10px] uppercase tracking-[0.2em]">Success: Payload deployed to gateway.</p>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
@keyframes progress {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
