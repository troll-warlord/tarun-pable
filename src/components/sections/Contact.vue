<script setup>
import { ref } from 'vue'
import { SECTION_HEADERS } from '@/utils/constants'
import SectionHeader from '@/components/common/SectionHeader.vue'
import TerminalWindow from '@/components/common/TerminalWindow.vue'
import InfraInput from '@/components/common/InfraInput.vue'

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
  <section id="contact" class="section-container">
    <SectionHeader v-bind="header" />

    <div class="grid lg:grid-cols-2 gap-16 relative z-10">
      <div class="space-y-10">
        <terminal-window class="max-w-md">
          <p><span class="text-primary">>>></span> INITIALIZING_HANDSHAKE...</p>
          <p><span class="text-primary">>>></span> LOCATION: REMOTE_GLOBAL</p>
          <p>
            <span class="text-primary">>>></span> STATUS:
            <span :class="isSending ? 'text-amber-400 animate-pulse' : 'text-emerald-400'">
              {{ isSending ? 'UPLOADING_PAYLOAD...' : 'AWAITING_INPUT' }}
            </span>
          </p>

          <div class="pt-4 flex gap-4 items-center">
            <div class="progress-track">
              <div class="progress-bar" :class="{ animating: isSending }"></div>
            </div>
            <span class="port-label">Port_443_Active</span>
          </div>
        </terminal-window>

        <p class="description-text opacity-60 max-w-md">
          Whether you're looking to scale a startup, optimize a legacy cloud environment, or discuss visual composition—my terminal is always open.
        </p>
      </div>

      <div class="form-card">
        <form class="space-y-8" @submit.prevent="handleCommit">
          <div class="grid md:grid-cols-2 gap-8">
            <InfraInput v-model="form.name" label="01 // IDENTIFY_NAME" placeholder="USER_ID" required />
            <InfraInput v-model="form.email" label="02 // CONTACT_EMAIL" placeholder="GATEWAY_ADDR" type="email" required />
          </div>

          <InfraInput v-model="form.message" label="03 // PROJECT_SCOPE" type="textarea" placeholder="DESCRIBE_MANIFESTO..." required />

          <button type="submit" :disabled="isSending" class="btn-primary w-full py-5">
            <span v-if="!isSending && !isSuccess">_ EXECUTE_COMMIT</span>
            <span v-else-if="isSending" class="animate-pulse">PUSHING_TO_MAIN...</span>
            <span v-else>HANDSHAKE_COMPLETE</span>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.form-card {
  background: color-mix(in srgb, var(--clr-bg-surface), transparent 50%);
  padding: 2.5rem;
  border: 1px solid var(--clr-edge);
  backdrop-filter: blur(12px);
}
.progress-track {
  height: 4px;
  width: 200px;
  background: var(--clr-bg-panel);
  overflow: hidden;
}
.progress-bar {
  height: 100%;
  width: 100%;
  background: var(--clr-primary);
  opacity: 0.2;
  transition: all 0.3s;
}
.progress-bar.animating {
  opacity: 1;
  animation: progress-slide 2s infinite;
}
@keyframes progress-slide {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
.port-label {
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--clr-primary);
  opacity: 0.7;
}
</style>
