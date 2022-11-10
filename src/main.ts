import { createApp } from 'vue'
import { createPinia } from 'pinia'


import { Buffer } from 'buffer';
window.Buffer = Buffer;

import App from './App.vue'
import router from './router'


import './assets/main.css'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'



export default createVuetify({
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      }
    },
  })

const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(vuetify).mount('#app')
