<!--
 * @Date: 2024-06-11 16:54:31
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-19 15:25:18
-->
<template>
  <PageWrap v-slot="{ height }">
    <div ref="headRef" class="mb-5">
      <a-row>
        <a-col :flex="1">
          <a-form :model="queryForm" auto-label-width>
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item label="用户名" field="loginName">
                  <a-input v-model="queryForm.loginName" placeholder="请输入用户名" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="姓名" field="name">
                  <a-input v-model="queryForm.name" placeholder="请输入姓名" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="部门" field="deptHierarchyArr">
                  <a-cascader
                    :options="deptOptions"
                    placeholder="请选择部门"
                    :field-names="{
                      label: 'deptName',
                      value: 'deptId',
                      children: 'children',
                    }"
                    allow-search
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="手机号" field="telephone">
                  <a-input v-model="queryForm.telephone" placeholder="请输入手机号" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider class="h-[84px]" direction="vertical" />
        <a-col :flex="'86px'" class="text-right">
          <a-space direction="vertical" :size="18">
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
import { getUserList } from '@/api/system/user';
import { Pagination } from '@/types/global';
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
const tooltip = ref<string>('');
const paginationProps = computed<PaginationProps>(() => ({
  ...pagination.value,
  showPageSize: true,
  showTotal: true,
  showJumper: true,
}));
const deptOptions = computed(() => {
  return userStore.departList;
});
const queryForm = ref({
  loginName: '',
  name: '',
  deptHierarchyArr: [],
  telephone: '',
});
const columns = [
  {
    title: '用户名',
    dataIndex: 'loginName',
    width: 120,
    align: 'center',
    fixed: 'left',
  },
  {
    title: '角色',
    dataIndex: 'sysRoleList',
    width: 250,
    align: 'center',
    ellipsis: true,
    tooltip: true,
    render: ({ record }) => {
      tooltip.value = record.sysRoleList.map((item: any) => item.roleName).join(' ');
      return record.sysRoleList.map((item: any) => (
        <a-tag size="small" class="mr-1">
          {item.roleName}
        </a-tag>
      ));
    },
  },
  {
    title: '部门',
    dataIndex: 'deptName',
    width: 150,
    align: 'center',
  },
  {
    title: '公司',
    dataIndex: 'companyName',
    width: 150,
    align: 'center',
  },
  {
    title: '手机号',
    dataIndex: 'telephone',
    width: 120,
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
          修改
        </a-button>
        <a-button type="text" size="mini">
          重置密码
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
    loginName: '',
    name: '',
    deptHierarchyArr: [],
    telephone: '',
  };
  pagination.value.current = 1;
  queryUserList();
};
onMounted(() => queryUserList());
</script>
