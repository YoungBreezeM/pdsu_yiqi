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
    DatePicker,
    Tabs,
    Table,
    TabPane,
    Select,
    TableColumn,
    Container,
    Option
} from 'element-ui';

Vue.use(Option);
Vue.use(Container);
Vue.use(DatePicker);
Vue.use(Input);
Vue.use(Dialog);
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Icon);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Table);
Vue.use(Select);
Vue.use(TableColumn);

Vue.prototype.$message = Message;


new Vue({
    store,
    router: index,
    render: h => h(Graph)
}).$mount('#app')
