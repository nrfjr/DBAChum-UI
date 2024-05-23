import { createApp } from 'vue'
import App from '/src/App.vue'
import router from './router'
import store from '/src/assets/data/store.vue'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')

