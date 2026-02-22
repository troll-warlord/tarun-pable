<script setup>
import PanelFrame from '@/components/common/PanelFrame.vue'
import StatCell from '@/components/common/StatCell.vue'
import { useMetrics } from '@/composables/useMetrics.js'

const {
  fps,
  fpsSparkline,
  clrFps,
  ping,
  pingSparkline,
  clrPing,
  cpuCores,
  deviceRam,
  netType,
  clrNet,
  ttfb,
  loadTime,
  fcp,
  clrFcp,
  memUsed,
  memLimit,
  hasMemory,
  clrMem,
  screenRes,
  dpr,
} = useMetrics()

defineExpose({ fps, ping, cpuCores })
</script>

<template>
  <PanelFrame class="flex flex-col">
    <!-- Header -->
    <template #header>
      <span class="font-mono text-code font-bold uppercase tracking-[0.25em] text-primary">SYS_METRICS</span>
      <span class="flex items-center gap-1.5 font-mono text-code text-primary"> <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>LIVE </span>
    </template>

    <!-- 2×3 grid — gap-px trick to show clr-edge as dividers -->
    <div class="flex-1 min-h-0 grid grid-cols-2 gap-px" style="background: var(--clr-edge)">
      <!-- FRAME RATE -->
      <StatCell label="Frame Rate" :value="fps" unit="fps" subtitle="CLIENT RENDER" :value-color="clrFps">
        <template #footer>
          <svg viewBox="0 0 200 36" class="w-full" preserveAspectRatio="none" style="height: 36px">
            <path :d="fpsSparkline.area" fill="var(--clr-primary)" fill-opacity="0.08" />
            <path :d="fpsSparkline.line" stroke="var(--clr-primary)" stroke-width="1.5" fill="none" opacity="0.9" />
          </svg>
        </template>
      </StatCell>

      <!-- PING -->
      <StatCell label="Ping" :value="ping ?? '—'" unit="ms" :value-color="clrPing">
        <template #footer>
          <span class="font-mono text-nano uppercase mb-1 block" :style="{ color: clrNet }">{{ netType }}</span>
          <svg viewBox="0 0 200 36" class="w-full" preserveAspectRatio="none" style="height: 36px">
            <path :d="pingSparkline.area" fill="var(--clr-primary)" fill-opacity="0.08" />
            <path :d="pingSparkline.line" stroke="var(--clr-primary)" stroke-width="1.5" fill="none" opacity="0.9" />
          </svg>
        </template>
      </StatCell>

      <!-- FIRST CONTENTFUL PAINT -->
      <StatCell label="Paint (FCP)" :value="fcp || '—'" :unit="fcp ? 'ms' : ''" subtitle="FIRST CONTENTFUL" :value-color="clrFcp">
        <template #footer>
          <div class="space-y-1.5">
            <div class="flex justify-between font-mono text-nano">
              <span class="text-muted">TTFB</span>
              <span class="text-primary">{{ ttfb }} ms</span>
            </div>
            <div class="h-1.5 overflow-hidden" style="background: var(--clr-bg-panel)">
              <div class="h-full transition-all duration-700" :style="{ width: Math.min(100, (fcp / 2000) * 100) + '%', background: clrFcp }" />
            </div>
          </div>
        </template>
      </StatCell>

      <!-- PAGE LOAD -->
      <StatCell label="Page Load" :value="loadTime" unit="ms" subtitle="NAV TIMING API">
        <template #footer>
          <div class="space-y-1.5">
            <div class="flex justify-between font-mono text-nano">
              <span class="text-muted">DNS+TCP</span>
              <span class="text-primary">{{ Math.max(0, ttfb - 5) }} ms</span>
            </div>
            <div class="h-1.5 overflow-hidden" style="background: var(--clr-bg-panel)">
              <div class="h-full transition-all duration-700" :style="{ width: Math.min(100, (loadTime / 3000) * 100) + '%', background: 'var(--clr-primary)' }" />
            </div>
          </div>
        </template>
      </StatCell>

      <!-- JS HEAP -->
      <StatCell
        label="JS Heap"
        :value="hasMemory ? memUsed : '—'"
        :unit="hasMemory ? 'MB' : ''"
        :subtitle="hasMemory ? `/ ${memLimit} MB LIMIT` : 'UNSUPPORTED'"
        :value-color="clrMem"
      >
        <template #footer>
          <div v-if="hasMemory" class="h-1.5 overflow-hidden" style="background: var(--clr-bg-panel)">
            <div class="h-full transition-all duration-700" :style="{ width: Math.min(100, (memUsed / memLimit) * 100) + '%', background: clrMem }" />
          </div>
        </template>
      </StatCell>

      <!-- CLIENT HARDWARE -->
      <StatCell label="Client HW" :value="cpuCores" unit="cores" subtitle="LOGICAL CPU">
        <template #footer>
          <div class="space-y-1.5 font-mono text-nano">
            <div class="flex justify-between">
              <span class="text-muted">RAM</span><span class="text-primary">{{ deviceRam }} GB</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted">SCREEN</span><span class="text-primary">{{ screenRes }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted">DPR</span><span class="text-primary">×{{ dpr }}</span>
            </div>
          </div>
        </template>
      </StatCell>
    </div>
  </PanelFrame>
</template>
