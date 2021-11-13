import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.baseURL='http://ubuntu@ec2-52-7-202-195.compute-1.amazonaws.com:9997/api/'
//axios.defaults.baseURL='http://localhost:9997/api'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

createApp(App).use(store).use(router).use(VueAxios,axios).mount('#app')
