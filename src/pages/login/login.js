import Vue from 'vue'
import Login from './Login.vue'
import store from '../../store'
import Http from "../../Http/http";
import VueAxios from 'vue-axios'
Vue.use(VueAxios,Http);
Vue.config.productionTip = false;

import VueParticles from 'vue-particles'

import {
  Input,
  Button
} from 'element-ui';

Vue.use(Button)
Vue.use(Input);
Vue.use(VueParticles);
new Vue({
  store,
  render: h => h(Login)
}).$mount('#login')