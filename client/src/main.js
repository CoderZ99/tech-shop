import { createPinia } from "pinia"
import { createApp } from "vue"

import App from "./App.vue"
import router from "./router"
// Apply the tailwind css styles
import "./style.css"
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount("#app")
