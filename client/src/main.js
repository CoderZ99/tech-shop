import { createPinia } from "pinia"
import { createApp } from "vue"

import App from "./App.vue"
import router from "./router"
// Apply the tailwind css styles
import Antd from "ant-design-vue"
import "ant-design-vue/dist/reset.css"
import "./style.css"
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Antd)
app.mount("#app")
