import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueProgressBar from '@aacassandra/vue3-progressbar'

createApp(App).use(router).use(VueProgressBar, {
  color: 'rgb(255, 196, 24)',
  failedColor: 'red'
}).mount('#app')
