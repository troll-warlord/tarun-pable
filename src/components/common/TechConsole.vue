<script setup>
import { ref, computed } from 'vue'
import stack from '@/data/techStack.json'
import TechIcon from '@/components/common/TechIcon.vue'
import PanelFrame from '@/components/common/PanelFrame.vue'

const activeTab = ref('cloud_platforms')

const categories = Object.keys(stack)
  .filter((key) => key !== 'certifications')
  .map((id) => ({ id, label: stack[id].label }))

const activeItems = computed(() => stack[activeTab.value]?.items || [])
const activeLabel = computed(() => stack[activeTab.value]?.label)

const handleHover = (id) => {
  if (window.innerWidth >= 1024) activeTab.value = id
}
</script>

<template>
  <PanelFrame class="console-wrapper">
    <div class="console-sidebar">
      <div class="console-header-area">
        <p class="console-label text-primary/50 text-right lg:text-left">Select_Module_</p>
      </div>

      <div class="overflow-y-auto custom-scrollbar grow" @wheel.stop @touchmove.stop>
        <button
          v-for="cat in categories"
          :key="cat.id"
          :class="['console-btn', activeTab === cat.id ? 'console-btn-active' : '']"
          @mouseenter="handleHover(cat.id)"
          @click="activeTab = cat.id"
        >
          <span class="hidden lg:inline mr-2 opacity-30">//</span>
          {{ cat.label }}
        </button>
      </div>
    </div>

    <div class="console-viewport">
      <div class="console-header-area">
        <h3 class="console-label text-muted">
          System_Output // <span class="hidden md:inline text-body">{{ activeLabel }}</span>
        </h3>
      </div>

      <div class="grow overflow-y-auto custom-scrollbar p-3 md:p-6 lg:p-10">
        <transition name="fade-slide" mode="out-in">
          <div :key="activeTab" class="flex flex-col gap-3 md:grid md:grid-cols-4 md:gap-5">
            <div v-for="tool in activeItems" :key="tool.name" class="console-card">
              <TechIcon :slug="tool.slug" :alt="tool.name" :name="tool.name" />
            </div>
          </div>
        </transition>
      </div>
    </div>
  </PanelFrame>
</template>

<style scoped>
@reference "tailwindcss";

/*
 * ── Component Identity Styles ─────────────────────────────────
 * All console-* skin classes live here per the Hybrid Standard.
 * Tailwind handles layout/spacing in the template above.
 */

/* Layout only — visual shell is owned by PanelFrame */
.console-wrapper {
  @apply flex flex-row gap-0 lg:gap-8 h-137.5 md:h-125;
}

.console-sidebar {
  @apply order-2 lg:order-1 w-[40%] lg:w-72 border-l lg:border-l-0 lg:border-r flex flex-col;
  border-color: var(--clr-edge);
  background-color: color-mix(in srgb, var(--clr-bg-surface), transparent 70%);
}

.console-viewport {
  @apply order-1 lg:order-2 grow relative overflow-hidden flex flex-col;
  background-color: color-mix(in srgb, var(--clr-bg-surface), transparent 95%);
}

/* Shared header strip in both columns */
.console-header-area {
  @apply p-4 lg:p-6 shrink-0;
  border-bottom: 1px solid var(--clr-edge);
  background-color: color-mix(in srgb, var(--clr-bg-base), transparent 80%);
}

.console-label {
  @apply font-mono uppercase tracking-[0.3em] transition-colors;
  font-size: var(--text-nano);

  @media (min-width: 1024px) {
    font-size: var(--text-code);
  }
}

/* Sidebar navigation buttons */
.console-btn {
  @apply w-full text-right lg:text-left px-4 py-5 lg:py-4 font-mono uppercase
         tracking-widest transition-all cursor-pointer outline-none;
  font-size: var(--text-code);
  border-radius: var(--radius-badge);

  @media (min-width: 1024px) {
    font-size: var(--text-label);
  }
  color: var(--clr-text-muted);

  &:hover {
    color: var(--clr-text-main);
    background-color: var(--clr-bg-panel);
  }
}

.console-btn-active {
  color: var(--clr-primary);
  background-color: color-mix(in srgb, var(--clr-primary), transparent 90%);
  border-right: 2px solid var(--clr-primary);

  @media (min-width: 768px) {
    border-right: none;
    border-left: 2px solid var(--clr-primary);
  }
}

/* Tech icon card inside the viewport grid */
.console-card {
  @apply flex items-center gap-4 lg:flex-col lg:justify-center lg:items-center p-3 lg:p-6 border rounded-md transition-all duration-300;
  border-color: var(--clr-edge);
  background-color: color-mix(in srgb, var(--clr-bg-base), transparent 60%);

  &:hover {
    border-color: color-mix(in srgb, var(--clr-primary), transparent 70%);
  }
}

/* Thin scrollbar for sidebar and viewport */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: color-mix(in srgb, var(--clr-primary), transparent 70%) transparent;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: color-mix(in srgb, var(--clr-primary), transparent 80%);
    border-radius: 9999px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: color-mix(in srgb, var(--clr-primary), transparent 50%);
  }
}

/* Tab-switch transition */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s ease-out;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(-8px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(8px);
}
</style>
