import { createPinia } from "pinia"
import { createApp } from "vue"
import App from "./App.vue"
import "./main.css"
import router from "./router"

import Antd from "ant-design-vue"
import "ant-design-vue/dist/reset.css"

import { setupPrimeVue } from './plugins/primevue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)

// Setup PrimeVue với chỉ những components cần thiết
setupPrimeVue(app)

app.mount("#app")
