<script setup>
/**
 * StatCell
 * ─────────────────────────────────────────────────────────────
 * Single metric tile used inside MetricsPanel's 2×3 grid.
 *
 * Props
 * ─────
 *   label       – top micro-label   e.g. "Frame Rate"
 *   value       – large display value  e.g. 60  or "—"
 *   unit        – unit suffix  e.g. "fps"
 *   subtitle    – sub-label below value  e.g. "CLIENT RENDER"
 *   valueColor  – CSS color for the value (default: var(--clr-primary))
 *
 * Slots
 * ─────
 *   #footer     – custom bottom content: sparklines, progress bars,
 *                 key-value rows, etc.
 */
defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], default: '—' },
  unit: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  valueColor: { type: String, default: 'var(--clr-primary)' },
})
</script>

<template>
  <div class="stat-cell">
    <!-- Top label -->
    <span class="cell-label">{{ label }}</span>

    <!-- Big value -->
    <span class="cell-value" :style="{ color: valueColor }">
      {{ value }}<span v-if="unit" class="cell-unit">{{ unit }}</span>
    </span>

    <!-- Sub-label -->
    <span v-if="subtitle" class="cell-subtitle">{{ subtitle }}</span>

    <!-- Custom footer (sparkline / bar / key-value list) -->
    <div v-if="$slots.footer" class="cell-footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

/* Cell layout */
.stat-cell {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem;
  background: color-mix(in srgb, var(--clr-bg-base), transparent 20%);
}

/* Top micro-label */
.cell-label {
  font-family: var(--font-mono);
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--clr-text-muted);
}

/* Big value */
.cell-value {
  font-family: var(--font-mono);
  font-size: 1.5rem; /* text-2xl */
  font-weight: 700;
  line-height: 1;
  margin-top: 0.25rem;
  transition: color 0.5s ease;
}

/* Small unit after value */
.cell-unit {
  font-size: 10px;
  font-weight: 400;
  margin-left: 0.25rem;
  color: var(--clr-text-muted);
}

/* Sub-label */
.cell-subtitle {
  font-family: var(--font-mono);
  font-size: 9px;
  text-transform: uppercase;
  color: var(--clr-text-muted);
}

/* Footer grows to push content down */
.cell-footer {
  margin-top: auto;
}
</style>
