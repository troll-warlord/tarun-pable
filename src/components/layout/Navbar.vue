<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

defineProps({
  mouseX: Number,
  mouseY: Number,
})
const isMenuOpen = ref(false)
const isScrolled = ref(false)

const navLinks = [
  { name: '// Expertise', href: 'about' },
  { name: '// Experience', href: 'experience' },
  { name: '// Portfolio', href: 'projects' },
  { name: '// Photography', href: 'photography' },
  { name: '// Connect', href: 'contact' },
]
const scrollToSection = (id) => {
  isMenuOpen.value = false
  if (id === 'hero') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <nav :class="['fixed top-0 left-0 w-full z-100 transition-all duration-500 px-6 py-4', isScrolled ? 'bg-base/80 backdrop-blur-md border-b border-edge py-3' : 'bg-transparent']">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <!-- Brand -->
      <div class="group cursor-pointer flex items-center gap-3" @click="scrollToSection('hero')">
        <div class="flex items-center gap-2 font-mono">
          <span class="text-primary font-bold text-xs animate-pulse">></span>
          <span class="text-main text-xs font-black uppercase tracking-[0.2em] group-hover:text-primary transition-colors"> TARUN_PABLE </span>
          <div class="h-4 w-px bg-muted/50"></div>
          <span class="text-mono-label opacity-60 inline">Cloud_Arch</span>
        </div>
      </div>

      <!-- Desktop nav -->
      <div class="hidden lg:flex items-center gap-8">
        <ul class="flex gap-8">
          <li v-for="link in navLinks" :key="link.name" class="relative group">
            <button class="text-mono-label text-muted group-hover:text-primary transition-colors py-2" @click="scrollToSection(link.href)">
              {{ link.name }}
            </button>
            <span class="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full"></span>
          </li>
        </ul>

        <div class="h-4 w-px bg-muted/50"></div>

        <!-- Theme toggle -->
        <button
          class="w-8 h-8 flex items-center justify-center border border-edge text-muted hover:text-primary hover:border-primary transition-all rounded-sm"
          :title="themeStore.isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click="themeStore.toggleTheme()"
        >
          <!-- Sun (shown in dark mode) -->
          <svg
            v-if="themeStore.isDark"
            xmlns="http://www.w3.org/2000/svg"
            class="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="4" />
            <line x1="12" y1="2" x2="12" y2="4" />
            <line x1="12" y1="20" x2="12" y2="22" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="2" y1="12" x2="4" y2="12" />
            <line x1="20" y1="12" x2="22" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
          <!-- Moon (shown in light mode) -->
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        </button>

        <div class="h-4 w-px bg-muted/50"></div>

        <a href="/Resume.pdf" download class="btn-primary py-2 px-5 text-nano rounded-sm"> Download_CV </a>
      </div>

      <!-- Co-ordintaes on Navbar -->
      <!-- <div class="font-mono text-nano text-muted flex gap-4 border-l border-edge pl-6">
        <div class="flex flex-col">
          <span class="text-primary/40 uppercase">X_COORD</span>
          <span class="text-body">{{ mouseX.toString().padStart(4, '0') }}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-primary/40 uppercase">Y_COORD</span>
          <span class="text-body">{{ mouseY.toString().padStart(4, '0') }}</span>
        </div>
      </div> -->

      <!-- Mobile hamburger -->
      <button class="lg:hidden text-body" @click="isMenuOpen = !isMenuOpen">
        <div class="w-6 h-5 relative flex flex-col justify-between">
          <span :class="['w-full h-px bg-current transition-all', isMenuOpen ? 'rotate-45 translate-y-2' : '']"></span>
          <span :class="['w-full h-px bg-current transition-all', isMenuOpen ? 'opacity-0' : '']"></span>
          <span :class="['w-full h-px bg-current transition-all', isMenuOpen ? '-rotate-45 -translate-y-2' : '']"></span>
        </div>
      </button>
    </div>

    <!-- Mobile menu drawer -->
    <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 -translate-y-4" enter-to-class="opacity-100 translate-y-0">
      <div v-if="isMenuOpen" class="absolute top-full left-0 w-full bg-base border-b border-edge p-8 lg:hidden shadow-2xl">
        <div class="flex flex-col gap-6">
          <button v-for="link in navLinks" :key="link.name" class="text-left text-mono-label text-body hover:text-primary" @click="scrollToSection(link.href)">
            {{ link.name }}
          </button>
          <button class="flex items-center gap-3 text-left text-mono-label text-body hover:text-primary transition-colors" @click="themeStore.toggleTheme()">
            <span>{{ themeStore.isDark ? '// LIGHT_MODE' : '// DARK_MODE' }}</span>
          </button>
        </div>
      </div>
    </transition>
  </nav>
</template>
