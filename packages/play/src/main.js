import { createApp } from 'vue'
import App from './App.vue'

import KtbProject from 'ktb-packages-project'

const app = createApp(App)

app.use(KtbProject).mount('#app')
