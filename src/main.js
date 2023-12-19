import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'gitart-vue-dialog/dist/style.css'
import { GDialog } from 'gitart-vue-dialog'
// import '@fortawesome/fontawesome-free/js/all'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.component('GDialog', GDialog)
app.use(createPinia())
app.use(router)

app.mount('#app')
