<template>
  <a-layout-footer class="footer">
    Copyright © {{ new Date().getFullYear() }} Present Arco Design Web
  </a-layout-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style lang="less" scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  color: var(--color-text-2);
  text-align: center;
}
</style>
