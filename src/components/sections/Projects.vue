<script setup>
import projectData from '@/data/projects.json'
import ProjectCard from '@/components/common/ProjectCard.vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import { SECTION_HEADERS } from '@/utils/constants'

const header = SECTION_HEADERS.PROJECTS
</script>

<template>
  <section id="projects" class="section-container">
    <SectionHeader :label="header.label" :main="header.main" :secondary="header.secondary" :description="header.description" />

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
      <ProjectCard v-for="project in projectData" :key="project.id" :project="project" />
    </div>
  </section>
</template>
