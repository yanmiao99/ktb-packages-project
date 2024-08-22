import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'

import KtbProject from 'ktb-packages-project'

const app = createApp(App)
app.use(KtbProject).use(router).mount('#app')
