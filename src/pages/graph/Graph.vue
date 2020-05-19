<template>
    <div class="graph"
         :style="{
        width:clientView.clientWidth,
        height:clientView.clientHeight
    }">
        <!--头部-->
        <div class="header">
            平顶山学院新冠疫情(COVID-19)数据追踪及可视化系统
            <a href="javascript:history.back();" class="whole-back">
                <button class="button type1">返回</button>
            </a>
            <a href="/graph" class="whole-home">
                <button class="button type1"><i class="el-icon-s-home"></i>首页</button>
            </a>
        </div>
        <!--主体-->
        <div class="clearfix">
            <transition name="toggle">
                <router-view></router-view>
            </transition>
        </div>
    </div>
</template>

<script>
    import "./css/graph.scss"

    export default {
        name: "graph",
        data(){
            return{
                clientView:{
                    clientWidth: "100%",
                    clientHeight: ""
                }
            }
        },
        methods:{
            initClientView() {
                //初始化客户端高度
                this.clientView.clientHeight = document.documentElement.clientHeight + "px";
            },
            autoClientView() {
                //监听客户端视图变化
                window.onresize = () => {
                    this.initClientView();
                }
            }
        },
        mounted(){

            this.initClientView();

            this.autoClientView();
        }

    };
</script>

