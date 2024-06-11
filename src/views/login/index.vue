<!--
 * @Date: 2024-06-11 13:12:37
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-11 15:57:20
-->
<template>
  <div class="flex h-screen">
    <div class="fixed z-10 inline-flex items-center top-6 left-5">
      <img :src="logoIcon" alt="logo" />
      <div class="mx-1 text-xl text-neutral-100">Arco Design Web</div>
    </div>
    <LoginBanner />
    <div class="relative flex items-center justify-center flex-1 pb-10">
      <div>
        <LoginForm
          v-if="showPage === PageEnum.Login"
          @callRegister="callRegister"
          @callForgotPassword="callForgotPassword"
        />
        <RegisterForm v-else-if="showPage === PageEnum.Register" @callLogin="callLogin" />
        <ForgotPasswordForm v-else-if="showPage === PageEnum.ForgotPassword" @callLogin="callLogin" />
      </div>
      <div class="absolute bottom-0 right-0 w-full">
        <Footer />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Footer from '@/components/footer/index.vue';
import logoIcon from '@/assets/icons/arco-logo.svg?url';
import LoginBanner from './components/banner.vue';
import LoginForm from './components/login-form.vue';
import RegisterForm from './components/register-form.vue';
import ForgotPasswordForm from './components/forgot-password-form.vue';

enum PageEnum {
  Login,
  Register,
  ForgotPassword,
}
const showPage = ref(0);
const callLogin = () => {
  showPage.value = PageEnum.Login;
};
const callRegister = () => {
  showPage.value = PageEnum.Register;
};
const callForgotPassword = () => {
  showPage.value = PageEnum.ForgotPassword;
};
</script>

<style lang="less" scoped>
.banner {
  width: 550px;
  background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%);
}
</style>
