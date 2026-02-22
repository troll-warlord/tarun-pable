<script setup>
/**
 * PanelFrame
 * ─────────────────────────────────────────────────────────────
 * Shared visual shell used by TechConsole, MetricsPanel, and
 * any future "console-style" boxes.
 *
 * Provides: border · rounded corners · semi-transparent bg ·
 *           backdrop-blur · overflow-hidden
 *
 * Optionally renders a standard header strip via the #header slot.
 * Use the default slot for all body content.
 *
 * Layout (flex direction, height, etc.) is NOT set here —
 * pass layout classes directly on the component element.
 */
defineOptions({ inheritAttrs: true })
</script>

<template>
  <div class="panel-frame">
    <div v-if="$slots.header" class="frame-header">
      <slot name="header" />
    </div>
    <slot />
  </div>
</template>

<style scoped>
/* ── Outer shell ────────────────────────────────────────────── */
.panel-frame {
  border: 1px solid var(--clr-edge);
  border-radius: 0.75rem;
  overflow: hidden;
  background-color: color-mix(in srgb, var(--clr-bg-surface), transparent 90%);
  backdrop-filter: blur(12px);
}

/* ── Header strip (rendered only when #header slot is used) ── */
.frame-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  flex-shrink: 0;
  border-bottom: 1px solid var(--clr-edge);
  background-color: color-mix(in srgb, var(--clr-bg-base), transparent 80%);
}
</style>
