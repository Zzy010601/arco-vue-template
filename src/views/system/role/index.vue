<!--
 * @Date: 2024-06-11 16:54:31
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-17 16:38:46
-->
<template>
  <PageWrap v-slot="{ height }">
    <div ref="headRef" class="mb-5">
      <a-row>
        <a-col :flex="1">
          <a-form :model="queryForm" auto-label-width>
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item label="角色名称" field="roleName">
                  <a-input v-model="queryForm.roleCode" placeholder="请输入角色名称" allow-clear />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="角色编码" field="roleCode">
                  <a-input v-model="queryForm.roleCode" placeholder="请输入角色编码" allow-clear />
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
      row-key="userId"
      :columns="columns"
      :data="tableData"
      :pagination="paginationProps"
      :bordered="false"
      :scroll="{ maxHeight: calculateHeight(height) }"
      @page-change="pageChange"
      @page-size-change="pageSizeChange"
    />
  </PageWrap>
</template>

<script setup lang="tsx">
import { useUserStore } from '@/store';
import { PaginationProps, type TableColumnData } from '@arco-design/web-vue';
import { getUserList } from '@/api/user';
import { Pagination } from '@/types/global';
import dayjs from 'dayjs';
import { useTableScroll } from '@/hooks';

const userStore = useUserStore();
const headRef = ref();
const tableData = ref([]);
const loading = ref<boolean>(false);
const pagination = ref<Pagination>({
  current: 1,
  pageSize: 10,
  total: 0,
});
const paginationProps = computed<PaginationProps>(() => ({
  ...pagination.value,
  showPageSize: true,
  showTotal: true,
  showJumper: true,
}));
const queryForm = ref({
  roleName: '',
  roleCode: '',
});
const columns = [
  {
    title: '角色名称',
    dataIndex: 'roleName',
    width: 120,
    align: 'center',
    fixed: 'left',
  },
  {
    title: '角色编码',
    dataIndex: 'roleCode',
    width: 120,
    align: 'center',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 150,
    align: 'center',
    render: ({ record }) => dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss'),
  },
  {
    title: '操作',
    dataIndex: 'operate',
    width: 150,
    align: 'center',
    fixed: 'right',
    render: () => (
      <a-space size="mini">
        <a-button type="text" size="mini">
          编辑
        </a-button>
        <a-button type="text" size="mini">
          授权
        </a-button>
      </a-space>
    ),
  },
] as TableColumnData[];
const { calculateHeight } = useTableScroll(headRef);
const queryUserList = () => {
  return new Promise((resolve) => {
    loading.value = true;
    getUserList({
      ...queryForm.value,
      pageNum: pagination.value.current,
      pageSize: pagination.value.pageSize,
    })
      .then((res) => {
        tableData.value = res.list;
        pagination.value.total = res.total;
        resolve(res);
      })
      .finally(() => {
        loading.value = false;
      });
  });
};
const pageChange = (page: number) => {
  pagination.value.current = page;
  queryUserList();
};
const pageSizeChange = (size: number) => {
  pagination.value.pageSize = size;
  queryUserList();
};
const search = () => {
  pagination.value.current = 1;
  queryUserList();
};
const reset = () => {
  queryForm.value = {
    roleName: '',
    roleCode: '',
  };
  queryUserList();
};
onMounted(() => queryUserList());
</script>
