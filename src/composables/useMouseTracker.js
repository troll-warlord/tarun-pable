import { ref, onMounted, onUnmounted } from 'vue'

/**
 * useMouseTracker
 * ─────────────────────────────────────────────────────────────
 * Tracks the global mouse position and keeps two CSS custom
 * properties (--mouse-x, --mouse-y) on <html> in sync so that
 * any CSS that needs the cursor position can use them directly.
 *
 * Returns reactive `mouseX` and `mouseY` refs for components
 * that need the values in JS (e.g. cursor glow, navbar spotlight).
 */
export function useMouseTracker() {
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

  return { mouseX, mouseY }
}
