<!--
 * @Date: 2024-06-11 16:54:31
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-13 11:17:24
-->
<template>
  <PageWrap>
    <a-row>
      <a-col :flex="1">
        <a-form :model="queryForm" auto-label-width>
          <a-row :gutter="16">
            <a-col :span="8">
              <a-form-item label="菜单名称" field="title">
                <a-input v-model="queryForm.title" placeholder="请输入菜单名称" allow-clear />
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </a-col>
      <a-divider class="h-[32px]" direction="vertical" />
      <a-col :flex="'150px'" class="text-right">
        <a-space direction="horizontal" :size="12">
          <a-button type="primary" @click="search">
            <template #icon>
              <icon-search />
            </template>
            查询
          </a-button>
          <a-button @click="reset">
            <template #icon>
              <icon-refresh />
            </template>
            重置
          </a-button>
        </a-space>
      </a-col>
    </a-row>
    <a-divider style="margin-top: 0" />
    <div class="mb-5">
      <a-space>
        <a-button type="primary">
          <template #icon>
            <icon-plus />
          </template>
          新增
        </a-button>
      </a-space>
    </div>
    <a-table
      :loading="loading"
      row-key="id"
      :columns="columns"
      :data="tableData"
      :bordered="false"
      :scroll="{ y: 560 }"
    />
  </PageWrap>
</template>

<script setup lang="tsx">
import { TableColumnData } from '@arco-design/web-vue';
import { getUserList } from '@/api/user';

const tableData = ref([]);
const loading = ref<boolean>(false);
const tooltip = ref<string>('');
const queryForm = ref({
  title: '',
});
const columns = [
  {
    title: '菜单名称',
    dataIndex: 'title',
    width: 120,
    align: 'center',
    fixed: 'left',
  },
  {
    title: '菜单类型',
    dataIndex: 'menuType',
    width: 100,
    align: 'center',
    render: ({ record }) => record.menuType,
  },
  {
    title: '组件路径',
    dataIndex: 'component',
    width: 200,
    align: 'center',
  },
  {
    title: '路由地址',
    dataIndex: 'path',
    width: 200,
    align: 'center',
  },
  {
    title: '排序',
    dataIndex: 'sortNo',
    width: 60,
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'operate',
    width: 150,
    align: 'center',
    fixed: 'right',
    render: ({ record }) => (
      <a-space size="mini">
        <a-button type="text" size="mini">
          编辑
        </a-button>
        <a-button type="text" size="mini">
          添加下级
        </a-button>
        <a-button type="text" status="danger" size="mini">
          删除
        </a-button>
      </a-space>
    ),
  },
] as TableColumnData[];
const queryUserList = () => {
  return new Promise((resolve) => {
    // loading.value = true;
    // getUserList(queryForm.value)
    //   .then((res) => {
    //     tableData.value = res;
    //     resolve(res);
    //   })
    //   .finally(() => {
    //     loading.value = false;
    //   });
  });
};
const search = () => {
  queryUserList();
};
const reset = () => {
  queryForm.value = {
    title: '',
  };
  queryUserList();
};
onMounted(() => queryUserList());
</script>
