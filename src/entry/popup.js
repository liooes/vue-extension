// import { createApp } from 'vue'
// import App from '../view/popup.vue'

// createApp(App).mount('#app')

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from '../view/popup.vue'
 

const app = createApp(App)  
app.use(ElementPlus)
app.mount('#app')