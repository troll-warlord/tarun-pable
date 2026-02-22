import { ref, computed, onMounted, onUnmounted } from 'vue'

const WARN = '#f59e0b'

/**
 * useMetrics
 * ─────────────────────────────────────────────────────────────
 * All measurements are client-side — they reflect the VISITOR'S
 * browser and device, not any server.
 *
 *   FPS       – requestAnimationFrame counter
 *   Ping      – timed fetch of a local asset (no-cache)
 *   FCP       – PerformanceObserver 'first-contentful-paint'
 *   Page Load – Navigation Timing API (loadEventEnd)
 *   JS Heap   – performance.memory  (Chrome / Edge only)
 *   Client HW – hardwareConcurrency · deviceMemory · screen · DPR
 *
 * Must be called inside a component setup() so that onMounted /
 * onUnmounted are scoped to that component's lifecycle.
 */
export function useMetrics() {
  // ── 1. FPS ─────────────────────────────────────────────────
  const fps = ref(0)
  const fpsHistory = ref(Array(20).fill(60))
  let frameCount = 0,
    lastFpsTime = 0,
    rafId = null

  const countFps = (ts) => {
    frameCount++
    if (ts - lastFpsTime >= 1000) {
      const f = Math.min(frameCount, 144)
      fps.value = f
      fpsHistory.value = [...fpsHistory.value.slice(-19), f]
      frameCount = 0
      lastFpsTime = ts
    }
    rafId = requestAnimationFrame(countFps)
  }

  // ── 2. Ping ────────────────────────────────────────────────
  const ping = ref(null)
  const pingHistory = ref(Array(20).fill(0))

  const measurePing = async () => {
    try {
      const t0 = performance.now()
      await fetch('/tarun-pable/favicon.svg', { cache: 'no-store', mode: 'no-cors' })
      const ms = Math.round(performance.now() - t0)
      ping.value = ms
      pingHistory.value = [...pingHistory.value.slice(-19), ms]
    } catch {
      /* offline */
    }
  }

  // ── 3. Hardware (static — read once) ──────────────────────
  const cpuCores = navigator.hardwareConcurrency ?? '?'
  const deviceRam = navigator.deviceMemory ?? '?'
  const _conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection
  const netType = ref(_conn?.effectiveType ?? '—')
  if (_conn) {
    _conn.addEventListener('change', () => {
      netType.value = _conn.effectiveType
    })
  }

  // ── 4. Navigation Timing ───────────────────────────────────
  const ttfb = ref(0)
  const loadTime = ref(0)
  const fcp = ref(0)

  // ── 5. JS Heap (Chrome / Chromium only) ───────────────────
  const memUsed = ref(0)
  const memLimit = ref(0)
  const hasMemory = !!performance.memory

  const readMemory = () => {
    if (!hasMemory) return
    memUsed.value = Math.round(performance.memory.usedJSHeapSize / 1048576)
    memLimit.value = Math.round(performance.memory.jsHeapSizeLimit / 1048576)
  }

  // ── 6. Screen / device ────────────────────────────────────
  const screenRes = `${screen.width}×${screen.height}`
  const dpr = window.devicePixelRatio?.toFixed(1) ?? '1.0'

  // ── Sparkline helper ──────────────────────────────────────
  const makeLine = (vals, maxVal) => {
    const W = 200,
      H = 36
    const rng = maxVal || Math.max(...vals) || 1
    const pts = vals.map((v, i) => ({
      x: +((i / (vals.length - 1)) * W).toFixed(1),
      y: +(H - (v / rng) * (H - 4) - 2).toFixed(1),
    }))
    const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`).join(' ')
    return { line, area: line + ` L${W} ${H} L0 ${H} Z` }
  }

  const fpsSparkline = computed(() => makeLine(fpsHistory.value, 144))
  const pingSparkline = computed(() => makeLine(pingHistory.value, Math.max(...pingHistory.value, 100)))

  // ── Computed warning colors (amber when degraded) ─────────
  const clrFps = computed(() => (fps.value < 30 ? WARN : 'var(--clr-primary)'))
  const clrPing = computed(() => (ping.value > 150 ? WARN : 'var(--clr-primary)'))
  const clrFcp = computed(() => (fcp.value > 1800 ? WARN : 'var(--clr-primary)'))
  const clrMem = computed(() => (memUsed.value / memLimit.value > 0.8 ? WARN : 'var(--clr-primary)'))
  const clrNet = computed(() => (netType.value === '4g' ? 'var(--clr-primary)' : WARN))

  // ── Lifecycle ─────────────────────────────────────────────
  let pingTimer = null

  onMounted(async () => {
    const nav = performance.getEntriesByType('navigation')[0]
    if (nav) {
      ttfb.value = Math.round(nav.responseStart - nav.requestStart)
      loadTime.value = Math.round(nav.loadEventEnd - nav.startTime)
    }

    try {
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
          if (e.name === 'first-contentful-paint') fcp.value = Math.round(e.startTime)
        }
      }).observe({ type: 'paint', buffered: true })
    } catch {
      /* unsupported */
    }

    readMemory()
    lastFpsTime = performance.now()
    rafId = requestAnimationFrame(countFps)

    await measurePing()
    pingTimer = setInterval(() => {
      measurePing()
      readMemory()
    }, 3000)
  })

  onUnmounted(() => {
    clearInterval(pingTimer)
    if (rafId) cancelAnimationFrame(rafId)
  })

  return {
    // FPS
    fps,
    fpsHistory,
    fpsSparkline,
    clrFps,
    // Ping
    ping,
    pingHistory,
    pingSparkline,
    clrPing,
    // Hardware
    cpuCores,
    deviceRam,
    netType,
    clrNet,
    // Timing
    ttfb,
    loadTime,
    fcp,
    clrFcp,
    // Memory
    memUsed,
    memLimit,
    hasMemory,
    clrMem,
    // Screen
    screenRes,
    dpr,
  }
}
