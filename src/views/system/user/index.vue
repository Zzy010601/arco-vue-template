<!--
 * @Date: 2024-06-11 16:54:31
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-11 17:19:38
-->
<template>
  <div>
    <Breadcrumb :items="['系统管理', '用户管理']" />
    <a-card>
      <a-row>
        <a-col :flex="1">
          <a-form :model="queryForm" auto-label-width>
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item label="用户名" field="username">
                  <a-input v-model="queryForm.username" placeholder="请输入用户名" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="姓名" field="name">
                  <a-input v-model="queryForm.name" placeholder="请输入姓名" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script setup lang="ts">
const queryForm = ref({
  username: '',
  name: '',
  deptHierarchyArr: [],
  telephone: '',
});
</script>
