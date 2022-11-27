import { createApp } from 'vue'
import mitt from 'mitt'
const emitter = mitt()
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
 


 

loadFonts()

createApp(App)
  .use(router)
  .use(vuetify)
  .mount('#app')
  