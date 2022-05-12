<template>
    <div class="login-wrap">
        <div class="container">
            <div class="container-left">
                <div class="container-left-div1">
                    <div class="container-left1-div3">
                        <div class="container-left-div1-y"></div>
                    </div>
                </div>
            </div>
            <div class="container-right">
                <div class="container-right-div1">
                    <div class="container-right-div1-y"></div>
                </div>
            </div>
            <div class="login-wrap-left fl">
                <div class="login-wrap-left-top">
                    <div class="login-wrap-left-top-logo fl">
                        <img src="../../assets/img/logo.png" alt="">
                    </div>
                    <div class="login-wrap-left-top-title fl" style="font-size: 22px">
                        碳达峰碳中和统一指挥平台
                    </div>
                </div>
                <div class="login-wrap-left-bottom" style="display: flex;justify-content: center">
                    <img src="../../assets/img/loginImg.png" alt="" style="height: 300px;margin-bottom: 190px">
                </div>
            </div>
            <div class="login-wrap-right fl">
                <div class="login-wrap-right-div">
                    <div class="login-wrap-right-div-title">
                        欢迎登陆
                    </div>
                    <div class="login-wrap-right-div-input">
                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                            <el-form-item prop="username" style="height: 45px" >
                                <el-input v-model="ruleForm.username" placeholder="账户">
                                    <el-button slot="prepend" icon="el-icon-lx-people" style="line-height: 40px;padding-left: 5px;font-size: 25px"></el-button>
                                </el-input>
                            </el-form-item>
                            <el-form-item prop="password" style="height: 45px">
                                <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')">
                                    <el-button slot="prepend" icon="el-icon-lx-lock" style="line-height: 40px;padding-left: 5px;font-size:25px"></el-button>
                                </el-input>
                            </el-form-item>
                            <div class="login-choose">
                                <div class="fl">
                                    <el-checkbox v-model="checked">记住用户名密码</el-checkbox>
                                </div>
                                <div class="fr">

                                </div>
                            </div>
                            <div class="login-btn">
                                <el-button type="primary" @click="submitForm('ruleForm')" round>登录</el-button>
                            </div>
                        </el-form>
                    </div>

                </div>

            </div>
        </div>

        <Modal :msg="message"
               :isHideModal="HideModal"></Modal>
    </div>
</template>

<script type="text/ecmascript-6">
    import axios from 'axios';
    import Modal from '../../common/modal'
    import {mapActions} from 'vuex'

    export default {
        components: {Modal},
        data: function(){

            return {

                message: '',
                HideModal:true,
                checked:false,

                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                },


            }
        },
        created() {
            this.getAdminState();
        },

        methods: {


            //页面加载检查用户是否登陆，没有登陆就加载登陆页面
            getAdminState() {
                let loginInfo = JSON.parse(localStorage.getItem("loginAdminInfo"));
                if (loginInfo === null) {
                    this.ruleForm.username = "";
                    this.ruleForm.password = "";
                    this.checked = false;
                } else {
                    this.ruleForm.username = loginInfo.username;
                    this.ruleForm.password = loginInfo.password;
                    this.checked = true;

                }
            },


            //提交登陆
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.checked) {
                            let loginAdminInfo = {
                                "username": this.ruleForm.username,
                                "password": this.ruleForm.password,
                                "checked": "1"
                            };
                            localStorage.setItem("loginAdminInfo", JSON.stringify(loginAdminInfo));
                            this.doUserLogin(this.ruleForm.username, this.ruleForm.password)
                        }
                        else {
                            this.doUserLogin(this.ruleForm.username, this.ruleForm.password)
                        }
                    }
                    else {
                        this.message = "请正确填写信息";
                        this.HideModal = false;
                        const that = this;
                        function a() {
                            that.message = "";
                            that.HideModal = true;
                        }
                        setTimeout(a, 2000);
                        return false;
                    }
                });
            },


            //进行登录
            doUserLogin(username, password) {
                this.userLogin({
                    username: username,
                    password: password
                });
                setTimeout(() => {
                    this.$router.push("/Index")
                }, 1000)
            },

            ...mapActions([
                'userLogin',
            ]),
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less">
    @import "../../assets/less/base";

    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(../../assets/img/bg.png);
        background-size: cover;
        display: flex;
        align-items: center;
        justify-content: center;
        .container{
            height: 70%;
            width: 60%;
            background-color: @color-white;
            border-radius: 25px;
            position: relative;
            .container-left{
                width: 120px;
                height: 90px;
                position: absolute;
                bottom: 50px;
                left: -75px;
                .container-left-div1{
                    height: 30px;
                    position: relative;
                    .container-left-div1-q{
                        width: 30px;
                        height: 30px;
                        background-color: @color-white;
                        border-radius: 50%;
                        position: absolute;
                        top: 0;
                        left: -25px;
                    }
                    .container-left1-div3{
                        height: 30px;
                        width: 80%;
                        position: absolute;
                        background-color: @color-white;
                        top:0;
                        right: 0;
                        .container-left-div1-y{
                            position: absolute;
                            top:0;
                            left: -12px;
                            width: 30px;
                            height: 30px;
                            background-color: @color-white;
                            border-radius: 50%;
                        }
                    }
                }

            }
            .container-right{
                width: 120px;
                height: 90px;
                position: absolute;
                top: 50px;
                right: -75px;
                .container-right-div1{
                    height: 30px;
                    width: 80%;
                    background-color: @color-white;
                    position: relative;
                    .container-right-div1-y{
                        position: absolute;
                        top:0;
                        right: -12px;
                        width: 30px;
                        height: 30px;
                        background-color: @color-white;
                        border-radius: 50%;
                    }
                }
                .container-right-div2{
                    height: 30px;
                    background-color: rgb(71,81,239,1);
                    position: relative;
                    .container-right-div2-y{
                        position: absolute;
                        top:0;
                        left: -12px;
                        width: 30px;
                        height: 30px;
                        background-color: rgb(71,81,239,1);
                        border-radius: 50%;
                    }
                }
                .container-right-div3{
                    height: 30px;
                    width: 65%;
                    background-color: @color-white;
                    position: relative;
                    .container-right-div3-y{
                        position: absolute;
                        top:0;
                        right: -12px;
                        width: 30px;
                        height: 30px;
                        background-color: @color-white;
                        border-radius: 50%;
                    }
                }
            }
            .login-wrap-left {
                width: 50%;
                height: 600px;
                .login-wrap-left-top {
                    height: 150px;
                    display: flex;
                    align-items: center;
                    padding-left: 10%;
                    .login-wrap-left-top-logo {
                        height: 40px;
                        flex: 1;
                        img {
                            height: 40px;
                        }
                    }
                    .login-wrap-left-top-title {
                        flex: 4;
                        height: 50px;
                        display: flex;
                        align-items: center;
                        font-size: @font-size-large-xxxxx;
                        font-weight: bold;
                    }
                }
                .login-wrap-left-bottom {
                    height: 450px;
                }

            }
            .login-wrap-right {
                width: 50%;
                height: 600px;
                display: flex;
                align-items: center;
                justify-content: center;
                .login-wrap-right-div {
                    height: 450px;
                    margin-top: 150px;
                    width: 100%;
                    .login-wrap-right-div-title {
                        height: 80px;
                        text-align: center;
                        font-size: @font-size-large-x;
                        font-weight: bold;
                    }

                    .login-wrap-right-div-input {
                        width: 65%;
                        margin: 0 auto;
                        height: 340px;
                        .login-choose {
                            height: 50px;
                        }
                        .login-btn {
                            height: 60px;
                            display: flex;
                            align-items: center;
                            justify-content: center;

                            .el-button {
                                width: 100%;
                                height: 40px;
                                font-size: @font-size-large;
                            }
                        }
                    }
                }
            }
        }




    }

    .lookForBtn {
        width: 100%;
        height: 50px;
        .el-button{
            width: 100%;
            height: 40px;
            font-size: @font-size-large;
        }
    }
    .successDiv{
        height: 150px;
        width: 100%;
        .successDivTop{
            height: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .successDivBottom{
            height: 40%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    @media only screen and (max-width: 1540px) {
        .login-wrap {
            .container{
                .login-wrap-left {
                    .login-wrap-left-top {
                        .login-wrap-left-top-title {
                            font-size: @font-size-large-x;
                        }
                    }
                    .login-wrap-left-bottom {
                        height: 450px;
                    }

                }
            }

        }

    }

    @media only screen and (max-width: 1200px) {
        .login-wrap {
            .container{
                .login-wrap-left {
                    .login-wrap-left-top {
                        .login-wrap-left-top-title {
                            font-size: @font-size-large;
                        }
                    }
                    .login-wrap-left-bottom {
                        height: 450px;
                    }
                }
            }

        }

    }


    @media only screen and (max-width: 1024px) {
        .login-wrap {
            width: 1024px;
            .container{
                .login-wrap-left {
                    .login-wrap-left-top {

                    }
                    .login-wrap-left-bottom {
                        height: 450px;
                    }

                }
            }

        }

    }

</style>
<style >
    .el-input--small .el-input__inner{
        height: 40px;
        background-color: #f0f0f0;
    }
</style>


