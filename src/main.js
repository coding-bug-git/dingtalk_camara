import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'

const app = createApp(App)

app.use(ElementPlus, { size: 'small', zIndex: 3000 })

app.use(store).use(router).mount('#app')
