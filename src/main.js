// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from '@/App.vue'

const app = createApp(App)

app.use(createPinia())
// We will use router later, skipping for this specific step to avoid errors

app.mount('#app')
