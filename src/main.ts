import { createApp } from 'vue'
import { createHead } from '@unhead/vue/client'
import './style.css'
import 'vue-sonner/style.css'
import App from './App.vue'
import { router } from './router/index.ts'
createApp(App).use(router).use(createHead()).mount('#app')
