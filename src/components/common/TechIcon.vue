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
    <span class="text-zinc-200 font-bold font-mono md:text-lg uppercase tracking-wider group-hover:text-emerald-400 transition-colors">
      {{ name.toUpperCase() }}
    </span>
  </div>
</template>


