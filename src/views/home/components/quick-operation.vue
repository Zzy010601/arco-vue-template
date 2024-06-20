<!--
 * @Date: 2024-06-17 13:47:18
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-18 13:10:42
-->
<template>
  <a-card
    class="general-card"
    title="快捷操作"
    :header-style="{ paddingBottom: '0' }"
    :body-style="{ padding: '24px 20px 0 20px' }"
  >
    <template #extra>
      <a-link> 管理 </a-link>
    </template>
    <a-row :gutter="8">
      <a-col v-for="link in links" :key="link.text" :span="8" class="wrapper">
        <div class="icon">
          <component :is="link.icon" />
        </div>
        <a-typography-paragraph class="text">
          {{ link.text }}
        </a-typography-paragraph>
      </a-col>
    </a-row>
    <a-divider class="split-line" style="margin: 0" />
  </a-card>
</template>

<script setup lang="ts">
const links = [
  { text: '内容管理', icon: 'icon-file' },
  { text: '内容分析', icon: 'icon-storage' },
  { text: '高级管理', icon: 'icon-settings' },
  { text: '线上推广', icon: 'icon-mobile' },
  { text: '内容投放', icon: 'icon-fire' },
];
</script>
