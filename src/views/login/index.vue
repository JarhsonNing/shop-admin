<template>
    <div class="login">
        <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form">
            <h3 class="title">胖崽寿司管理系统</h3>
            <el-form-item prop="username">
                <el-input
                        v-model="loginForm.username"
                        type="text"
                        size="large"
                        auto-complete="off"
                        placeholder="账号"
                >
                    <template #prefix><svg-icon icon-class="user" class="el-input__icon input-icon" /></template>
                </el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input
                        v-model="loginForm.password"
                        type="password"
                        size="large"
                        auto-complete="off"
                        placeholder="密码"
                        @keyup.enter="handleLogin"
                >
                    <template #prefix><svg-icon icon-class="password" class="el-input__icon input-icon" /></template>
                </el-input>
            </el-form-item>
            <el-checkbox v-model="loginForm.rememberMe" style="margin:0px 0px 25px 0px;">记住密码</el-checkbox>
            <el-form-item style="width:100%;">
                <el-button
                        :loading="loading"
                        size="large"
                        type="primary"
                        style="width:100%;"
                        @click.prevent="handleLogin"
                >
                    <span v-if="!loading">登 录</span>
                    <span v-else>登 录 中...</span>
                </el-button>
            </el-form-item>
        </el-form>
        <!--  底部  -->
        <div class="el-login-footer">
            <span>Copyright © 2018-2023 Jarhson All Rights Reserved.</span>
        </div>
    </div>
</template>

<script setup>
import {getCurrentInstance, ref} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {login} from '@/api/user.js'

const router = useRouter();
const route = useRoute();
const redirect = ref(route.query.redirect)

const loginForm = ref({
    username: "",
    password: "",
    rememberMe: false
});

const loginRules = {
    username: [{ required: true, trigger: "blur", message: "请输入您的账号" }],
    password: [{ required: true, trigger: "blur", message: "请输入您的密码" }]
};

const codeUrl = ref("");
const loading = ref(false);
const loginRef = ref()

function handleLogin() {
    loginRef.value?.validate(valid => {
        if (valid) {
            loading.value = true;
            // 勾选了需要记住密码设置在 cookie 中设置记住用户名和密码
            if (loginForm.value.rememberMe) {
                localStorage.setItem('username', loginForm.value.username);
                localStorage.setItem('password', loginForm.value.password);
                localStorage.setItem('rememberMe', loginForm.value.rememberMe);
            }
            // 调用action的登录方法
            login(loginForm.value).then(() => {
                router.push({ path: redirect.value || "/" });
            }).catch(() => {
                loading.value = false;
            });
        }
    });
}

</script>

<style lang='scss' scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("@/assets/images/login-background.png");
  background-size: cover;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 40px;
    input {
      height: 40px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 0px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 40px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 40px;
  padding-left: 12px;
}
</style>
