<!--
 * @Date: 2024-06-11 16:54:31
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-19 15:26:25
-->
<template>
  <PageWrap v-slot="{ height }">
    <div ref="headRef" class="mb-5">
      <a-row>
        <a-col :flex="1">
          <a-form :model="queryForm" auto-label-width>
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item label="字典名称" field="dictName">
                  <a-input v-model="queryForm.dictName" placeholder="请输入字典名称" allow-clear />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="字典编码" field="dictCode">
                  <a-input v-model="queryForm.dictCode" placeholder="请输入字典编码" allow-clear />
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
      :title="editForm?.id ? '编辑字典' : '新增字典'"
      width="550px"
      draggable
      unmount-on-close
      @before-ok="handleAddOk"
      @cancel="modalVisible = false"
    >
      <a-form ref="formRef" :model="editForm" :rules="rules" auto-label-width>
        <a-form-item label="字典名称" field="dictName">
          <a-input v-model="editForm.dictName" placeholder="请输入字典名称" />
        </a-form-item>
        <a-form-item label="字典编码" field="dictCode">
          <a-input
            v-model="editForm.dictCode"
            placeholder="请输入字典编码"
            :disabled="!!editForm?.id"
          />
        </a-form-item>
        <a-form-item label="描述" field="description">
          <a-textarea
            v-model="editForm.description"
            placeholder="请输入备注"
            :auto-size="{ minRows: 2, maxRows: 5 }"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </PageWrap>
</template>

<script setup lang="tsx">
import { PaginationProps, type TableColumnData } from '@arco-design/web-vue';
import { getUserList } from '@/api/system/user';
import { Pagination } from '@/types/global';
import { useTableScroll } from '@/hooks';

const resetEditForm = () => ({
  // 字典id
  id: undefined as number,
  // 字典名称
  dictName: '',
  // 字典编码
  dictCode: '',
  // 描述
  description: '',
});
const headRef = ref();
const tableData = ref([]);
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
  dictName: '',
  dictCode: '',
});
const editForm = ref(resetEditForm());
const rules = {
  dictName: [{ required: true, message: '请输入字典名称' }],
};
const formRef = ref();
const columns = [
  {
    title: '字典名称',
    dataIndex: 'dictName',
    width: 150,
    align: 'center',
  },
  {
    title: '字典编码',
    dataIndex: 'dictCode',
    width: 200,
    align: 'center',
  },

  {
    title: '描述',
    dataIndex: 'description',
    width: 300,
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
          字典配置
        </a-button>
        <a-button type="text" status="danger">
          删除
        </a-button>
      </a-space>
    ),
  },
] as TableColumnData[];
const { calculateHeight } = useTableScroll(headRef);
const queryDictList = () => {
  return new Promise((resolve) => {
    // loading.value = true;
    // getUserList({
    //   ...queryForm.value,
    //   pageNum: pagination.current,
    //   pageSize: pagination.pageSize,
    // })
    //   .then((res) => {
    //     tableData.value = res.list;
    //     pagination.total = res.total;
    //     resolve(res);
    //   })
    //   .finally(() => {
    //     loading.value = false;
    //   });
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
const handleAddOk = () => {
  formRef.value.validate().then(() => {
    modalVisible.value = false;
  });
};
const pageChange = (page: number) => {
  pagination.current = page;
  queryDictList();
};
const pageSizeChange = (size: number) => {
  pagination.pageSize = size;
  queryDictList();
};
const search = () => {
  pagination.current = 1;
  queryDictList();
};
const reset = () => {
  queryForm.value = {
    dictName: '',
    dictCode: '',
  };
  queryDictList();
};
onMounted(() => queryDictList());
</script>
