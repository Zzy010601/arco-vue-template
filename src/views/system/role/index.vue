<!--
 * @Date: 2024-06-11 16:54:31
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-19 16:59:28
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
        <a-button type="primary" @click="handleAdd">
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
    <a-modal
      v-model:visible="modalVisible"
      :title="editForm?.id ? '编辑角色' : '新增角色'"
      width="550px"
      draggable
      unmount-on-close
      @before-ok="handleAddOk"
      @cancel="modalVisible = false"
    >
      <a-form ref="formRef" :model="editForm" :rules="rules" auto-label-width>
        <a-form-item label="角色名称" field="roleName">
          <a-input v-model="editForm.roleName" placeholder="请输入角色名称" />
        </a-form-item>
        <a-form-item label="角色编码" field="roleCode">
          <a-input
            v-model="editForm.roleCode"
            placeholder="请输入角色编码"
            :disabled="!!editForm?.id"
          />
        </a-form-item>
        <a-form-item label="备注" field="remark">
          <a-textarea
            v-model="editForm.remark"
            placeholder="请输入备注"
            :auto-size="{ minRows: 2, maxRows: 6 }"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-drawer v-model:visible="drawerVisible" title="角色权限配置" width="550px" unmount-on-close>
      <a-scrollbar class="h-full overflow-y-auto">
        <a-tree
          v-model:checked-keys="checkedKeys"
          checkable
          :data="treeData"
          checked-strategy="child"
        />
      </a-scrollbar>
    </a-drawer>
  </PageWrap>
</template>

<script setup lang="tsx">
import { PaginationProps, TableColumnData } from '@arco-design/web-vue';
import { getUserList } from '@/api/system/user';
import { Pagination } from '@/types/global';
import dayjs from 'dayjs';
import { useTableScroll } from '@/hooks';

const resetEditForm = () => ({
  // 角色id
  id: undefined as number,
  // 角色名称
  roleName: '',
  // 角色编码
  roleCode: '',
  // 备注
  remark: '',
});
const headRef = ref();
const tableData = ref([]);
const checkedKeys = ref<number[]>([]);
const treeData = ref<any[]>([]);
const loading = ref<boolean>(false);
const modalVisible = ref<boolean>(false);
const drawerVisible = ref<boolean>(false);
const pagination = reactive<Pagination>({
  current: 1,
  pageSize: 10,
  total: 0,
});
const paginationProps = computed<PaginationProps>(() => ({
  ...pagination,
  showPageSize: true,
  showTotal: true,
  showJumper: true,
}));
const queryForm = ref({
  roleName: '',
  roleCode: '',
});
const editForm = ref(resetEditForm());
const formRef = ref();
const rules = {
  roleName: [{ required: true, message: '请输入角色名称' }],
  roleCode: [{ required: true, message: '请输入角色编码' }],
};
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
    render: ({ record }) => (
      <a-space size="mini">
        <a-button type="text" size="mini" onClick={() => handleEdit(record)}>
          编辑
        </a-button>
        <a-button type="text" size="mini" onClick={() => handleAccredit()}>
          授权
        </a-button>
      </a-space>
    ),
  },
] as TableColumnData[];
const { calculateHeight } = useTableScroll(headRef);
// 获取角色列表
const queryRoleList = () => {
  return new Promise((resolve) => {
    loading.value = true;
    getUserList({
      ...queryForm.value,
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
    })
      .then((res) => {
        tableData.value = res.list;
        pagination.total = res.total;
        resolve(res);
      })
      .finally(() => {
        loading.value = false;
      });
  });
};
const handleAdd = () => {
  modalVisible.value = true;
  editForm.value = resetEditForm();
};
const handleEdit = (record: any) => {
  modalVisible.value = true;
  editForm.value = { ...record };
};
const handleAccredit = () => {
  drawerVisible.value = true;
};
const handleAddOk = (done: (closed?: boolean) => void) => {
  formRef.value.validate().then(() => {
    modalVisible.value = true;
  });
};
const pageChange = (page: number) => {
  pagination.current = page;
  queryRoleList();
};
const pageSizeChange = (size: number) => {
  pagination.pageSize = size;
  queryRoleList();
};
const search = () => {
  pagination.current = 1;
  queryRoleList();
};
const reset = () => {
  queryForm.value = {
    roleName: '',
    roleCode: '',
  };
  pagination.current = 1;
  queryRoleList();
};
onMounted(() => queryRoleList());
</script>
