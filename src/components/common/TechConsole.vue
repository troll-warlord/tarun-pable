<script setup>
import { ref, computed } from 'vue'
import stack from '@/data/techStack.json'
import TechIcon from '@/components/common/TechIcon.vue'

const activeTab = ref('cloud_platforms')

const categories = [
  { id: 'cloud_platforms', label: 'Cloud_Ops' },
  { id: 'orchestration_logic', label: 'Clusters' },
  { id: 'automation_iac', label: 'IaC' },
  { id: 'ci_cd_pipelines', label: 'CI/CD' },
  { id: 'telemetry_observability', label: 'Metrics' },
  { id: 'development_languages', label: 'Code' },
  { id: 'persistent_storage', label: 'Data' },
  { id: 'others', label: 'Tools' },
]

const activeItems = computed(() => stack[activeTab.value] || [])
const activeLabel = computed(() => categories.find((c) => c.id === activeTab.value)?.label)

const handleHover = (id) => {
  if (window.innerWidth >= 1024) activeTab.value = id
}
</script>

<template>
  <div class="console-wrapper">
    <div class="console-sidebar">
      <div class="console-header-area">
        <p class="console-label text-emerald-500/50 text-right lg:text-left">Select_Module_</p>
      </div>

      <div class="overflow-y-auto custom-scrollbar grow">
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
        <h3 class="console-label text-zinc-600">
          System_Output // <span class="hidden md:inline text-zinc-400">{{ activeLabel }}</span>
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
  </div>
</template>
