<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

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
  <nav
    :class="[
      'fixed top-0 left-0 w-full z-100 transition-all duration-500 px-6 py-4',
      isScrolled ? 'bg-zinc-950/80 backdrop-blur-md border-b border-white/5 py-3' : 'bg-transparent',
    ]"
  >
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <div class="group cursor-pointer flex items-center gap-3" @click="scrollToSection('hero')">
        <div class="flex items-center gap-2 font-mono">
          <span class="text-emerald-500 font-bold text-xs animate-pulse">></span>
          <span class="text-zinc-100 text-[12px] font-black uppercase tracking-[0.2em] group-hover:text-emerald-400 transition-colors"> TARUN_PABLE </span>
          <span class="text-white/10 mx-1">|</span>
          <span class="text-mono-label opacity-60 hidden sm:inline">Cloud_Arch</span>
        </div>
      </div>

      <div class="hidden lg:flex items-center gap-8">
        <ul class="flex gap-8">
          <li v-for="link in navLinks" :key="link.name" class="relative group">
            <button class="text-mono-label text-zinc-500 group-hover:text-emerald-400 transition-colors py-2" @click="scrollToSection(link.href)">
              {{ link.name }}
            </button>
            <span class="absolute bottom-0 left-0 w-0 h-px bg-emerald-500 transition-all duration-300 group-hover:w-full"></span>
          </li>
        </ul>

        <div class="h-4 w-px bg-white/5 mx-2"></div>

        <a href="/Resume.pdf" download class="btn-primary py-2 px-5 text-[9px] rounded-sm"> Download_CV </a>
      </div>

      <!-- Co-ordintaes on Navbar -->
      <!-- <div class="font-mono text-[9px] text-zinc-600 flex gap-4 border-l border-white/10 pl-6">
        <div class="flex flex-col">
          <span class="text-emerald-500/40 uppercase">X_COORD</span>
          <span class="text-zinc-400">{{ mouseX.toString().padStart(4, '0') }}</span>
        </div>
        <div class="flex flex-col">
          <span class="text-emerald-500/40 uppercase">Y_COORD</span>
          <span class="text-zinc-400">{{ mouseY.toString().padStart(4, '0') }}</span>
        </div>
      </div> -->

      <button class="lg:hidden text-zinc-400" @click="isMenuOpen = !isMenuOpen">
        <div class="w-6 h-5 relative flex flex-col justify-between">
          <span :class="['w-full h-px bg-current transition-all', isMenuOpen ? 'rotate-45 translate-y-2' : '']"></span>
          <span :class="['w-full h-px bg-current transition-all', isMenuOpen ? 'opacity-0' : '']"></span>
          <span :class="['w-full h-px bg-current transition-all', isMenuOpen ? '-rotate-45 -translate-y-2' : '']"></span>
        </div>
      </button>
    </div>

    <transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 -translate-y-4" enter-to-class="opacity-100 translate-y-0">
      <div v-if="isMenuOpen" class="absolute top-full left-0 w-full bg-zinc-950 border-b border-white/5 p-8 lg:hidden shadow-2xl">
        <div class="flex flex-col gap-6">
          <button v-for="link in navLinks" :key="link.name" class="text-left text-mono-label text-zinc-400 hover:text-emerald-500" @click="scrollToSection(link.href)">
            {{ link.name }}
          </button>
        </div>
      </div>
    </transition>
  </nav>
</template>
