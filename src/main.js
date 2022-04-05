import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'

//UPDATE URL TO BACKEND API DEEPRESPRED
const urlbackendapi='http://deeprespred-api.bioinformatica.org:9997/api/'
const adminsecurity='#REPEAT2021#'

//NO UPDATE
axios.defaults.baseURL=urlbackendapi
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const app=createApp(App)
app.config.globalProperties.urlbackend=urlbackendapi
app.config.globalProperties.adminsecurity=adminsecurity

app.use(store).use(router).use(VueAxios,axios).mount('#app')
