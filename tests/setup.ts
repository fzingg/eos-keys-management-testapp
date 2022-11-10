//import Vue from 'vue';
//import Vuetify from 'vuetify';

import { createApp } from 'vue'
import { createVuetify } from 'vuetify'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App)

app.use(vuetify);
app.config.productionTip = false;