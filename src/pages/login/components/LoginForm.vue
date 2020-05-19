<template>
    <transition appear>
        <div class="login-form">
            <h1 class="title">登录</h1>
            <form>
                <p class="input-info">
                    <el-input placeholder="请输入用户名"
                              prefix-icon="el-icon-user"
                              v-model="userName"

                    >
                    </el-input>
                <p class="input-info">
                    <el-input placeholder="请输入密码"
                              v-model="password"
                              prefix-icon="el-icon-unlock"
                              show-password>
                    </el-input>
                </p>
                <p class="input-info">
                    <el-button plain class="login-style" @click="login">登录</el-button>
                </p>
            </form>
        </div>
    </transition>
</template>
<script>
    import types from "../../../store/types.js";
    import store from "../../../store/store.js";


    export default {
        data() {
            return {
                userName: "1001",
                password: "123456",
                msg:{
                  110:"用户、密码错误",
                  1001:"登录过期请重新登录",
                  512:"您暂无权限登录"
                }
            };
        },
        mounted() {
           this.checkMsg();
        },
        methods: {
            checkMsg(){
              let msg = this.getQueryString("msg");

              if(this.msg[msg]){
                alert(this.msg[msg])
              }
            },
            getQueryString(name) {
                let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                let r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            },
            login() {
                // LoginApi({userName: this.userName, password: this.password})
                //     .then(data => {
                //         if(data.data.token){
                //           store.commit(types.LOGIN, data.data.token);
                //           store.commit(types.USER,data.object.role);
                //           alert("登录成功");
                //           window.location.href = "/"
                //         }
                //
                //     })
                window.location.href  ='/graph';

            },

        }
    };
</script>

<style lang="scss" scoped>
    .login-form {
        width: 30%;
        height: 40%;
        position: absolute;
        top: 30%;
        left: 35%;
        z-index: 9999;
        background: url("../../../assets/images/loginBox.png");
        background-size: 100% 100%;

        .title {
            text-align: center;
            color: #23f2ff;
        }

        form {
            width: 100%;
            height: 75%;

            .input-info {
                width: 60%;
                margin: 50px auto 20px auto;

                .login-style {
                    width: 100%;
                    color: #23f2ff;
                    background: #0b0f2a;
                    border: 1px solid #23f2ff;
                }

                .login-style:hover {
                    border: 1px solid #443bff;
                }

            }
        }

    }
</style>
