
import routerCenter from "../../../lib/routerCenter";

import GraphIndex from "@/pages/graph/view/GraphIndex";

let routes = [
    {
        path: "/",
        name: 'graph',
        component: GraphIndex
    },

];

//注册路由
let index = routerCenter.registerRouter(routes);

//验证是否登录
// verifyLogin(index);

export default index;