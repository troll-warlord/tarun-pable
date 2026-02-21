<script setup>
defineProps({
  name: {
    type: String,
    required: false,
  },
  alt: {
    type: String,
    required: false,
  },
  slug: {
    type: String,
    required: true,
  },
})

const getIconUrl = (slug) => {
  return new URL(`../../assets/icons/${slug}.svg`, import.meta.url).href
}
</script>

<template>
  <div class="tech-item-base group/logo hover:-translate-y-2 shrink-0">
    <img :src="getIconUrl(slug.toLowerCase())" loading="lazy" class="tech-icon-base" :alt="alt || slug" />
  </div>
  <div v-if="name" class="flex flex-col md:items-center">
    <span class="text-body font-bold font-mono md:text-lg uppercase tracking-wider group-hover:text-primary transition-colors">
      {{ name.toUpperCase() }}
    </span>
  </div>
</template>

<style scoped>
@reference "tailwindcss";

/* ── Standalone tech icon (used in TechConsole, ExperienceCard header) ── */
.tech-item-base {
  @apply relative flex flex-col items-center justify-center transition-all duration-300;
}

.tech-icon-base {
  @apply w-12 h-12 md:w-16 md:h-16 object-contain brightness-110 contrast-125;
  filter: drop-shadow(0 0 1px rgba(255, 255, 255, 0.4));
}
</style>
