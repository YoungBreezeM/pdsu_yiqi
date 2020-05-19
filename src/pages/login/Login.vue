<template>
    <div class="login" :style="{
       width:clientView.clientWidth,
       height:clientView.clientHeight
    }">
        <vue-particles
                color="#1A11FF"
                :particleOpacity="0.7"
                :particlesNumber="80"
                shapeType="circle"
                :particleSize="4"
                linesColor="#1A11FF"
                :linesWidth="1"
                :lineLinked="true"
                :lineOpacity="0.4"
                :linesDistance="150"
                :moveSpeed="3"
                :hoverEffect="true"
                hoverMode="grab"
                :clickEffect="true"
                clickMode="push"
        >
        </vue-particles>
        <LoginForm></LoginForm>
    </div>
</template>
<script>
    import "./css/Login.scss"
    import LoginForm from "./components/LoginForm";
    export default {
        name: "login",
        data(){
          return{
            clientView:{
              clientWidth: "100%",
              clientHeight: ""
            }
          }
        },
        components:{
            LoginForm
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
        mounted() {
          this.initClientView();
          this.autoClientView();
        }
    };
</script>

