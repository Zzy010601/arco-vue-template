<!--
 * @Date: 2024-06-13 15:33:15
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-17 15:07:10
-->
<template>
  <div class="content">
    <a-result class="result" status="404" subtitle="抱歉，页面不见了～"> </a-result>
    <div class="operation-row">
      <a-button key="back" type="primary" @click="back"> 返回 </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
const back = () => {
  router.push({ name: 'home' });
};
</script>

<style scoped lang="less">
.content {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -121px;
  margin-left: -95px;
  text-align: center;
}
</style>
