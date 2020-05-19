import Vue from 'vue'
import Graph from "@/pages/graph/Graph";
import store from '../../store'
import Http from "../../Http/http";
import index from "./router";
import VueAxios from 'vue-axios'



Vue.use(VueAxios, Http);
Vue.config.productionTip = false;



import {
    Icon,
    Message,
    Row,
    Col,
    Button,
    Dialog,
    Input,
    DatePicker
} from 'element-ui';

Vue.use(DatePicker);
Vue.use(Input);
Vue.use(Dialog);
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Icon);

Vue.prototype.$message = Message;


new Vue({
    store,
    router: index,
    render: h => h(Graph)
}).$mount('#app')
