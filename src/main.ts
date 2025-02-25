import { createApp } from 'vue'
import App from './App.vue'

import router from './router/main'
import { createPinia } from 'pinia'

// import './style.css'

import './demos/ipc'
// If you want use Node.js, the`nodeIntegration` needs to be enabled in the Main process.
// import './demos/node'

import Message from './utils/message'

const pinia = createPinia()
const app=createApp(App)

app.use(router)
app.use(pinia)
app.use(Message)

app.mount('#app')
  .$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
  