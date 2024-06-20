<!--
 * @Date: 2024-06-19 15:12:28
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-20 10:25:01
-->
<template>
  <PageWrap v-slot="{ height }">
    <div ref="headRef" class="mb-5">
      <a-row>
        <a-col :flex="1">
          <a-form :model="queryForm" auto-label-width>
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item label="表名称" field="tableName">
                  <a-input v-model="queryForm.tableName" placeholder="请输入表名称" />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item label="表描述" field="tableComment">
                  <a-input v-model="queryForm.tableComment" placeholder="请输入表描述" />
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
        <a-button type="primary" @click="handleGenTable">
          <template #icon>
            <icon-download />
          </template>
          生成
        </a-button>
        <a-button @click="openImportTable">
          <template #icon>
            <icon-upload />
          </template>
          导入
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
    >
      <template #operate="{ record }">
        <a-space>
          <a-button type="text" size="mini" @click="() => handlePreview(record)"> 预览 </a-button>
          <a-popconfirm content="请确认是否删除？" @ok="() => handleDelete(record)">
            <a-button type="text" status="danger" size="mini"> 删除 </a-button>
          </a-popconfirm>
          <a-dropdown trigger="hover">
            <a-button type="text" size="mini"> 更多 </a-button>
            <template #content>
              <a-doption class="justify-center" @click="() => handleEditTable(record)">
                修改
              </a-doption>
              <a-doption class="justify-center" @click="() => handleSynchDb(record)">
                同步
              </a-doption>
              <a-doption class="justify-center" @click="() => handleGenTable(record)">
                生成代码
              </a-doption>
            </template>
          </a-dropdown>
        </a-space>
      </template>
    </a-table>
    <a-modal v-model:visible="visible" title="代码预览" fullscreen @cancel="visible = false">
      <a-tabs type="card-gutter">
        <a-tab-pane
          v-for="(value, key) in previewData"
          :key="key"
          :title="key.substring(key.lastIndexOf('/') + 1, key.indexOf('.vm'))"
        >
          <hljsVuePlugin.component
            :language="key.split('/')[1]"
            :code="highlightedCode(value, key)"
          />
        </a-tab-pane>
      </a-tabs>
    </a-modal>
  </PageWrap>
</template>

<script setup lang="tsx">
import { listTable, previewTable, delTable, genCode, synchDb } from '@/api/system/gen';
import { downLoadZip } from '@/utils';
import { useTableScroll } from '@/hooks';
import { FieldRule, Message, Modal, PaginationProps, TableColumnData } from '@arco-design/web-vue';
import { Pagination } from '@/types/global';
import hljs from 'highlight.js/lib/core';
import hljsVuePlugin from '@highlightjs/vue-plugin';

const headRef = ref();
const tableData = ref([]);
const loading = ref<boolean>(false);
const visible = ref<boolean>(false);
const previewData = ref<Record<string, string>>({});
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
  tableName: '',
  tableComment: '',
});
const columns = [
  {
    title: '表名称',
    dataIndex: 'tableName',
    width: 120,
    align: 'center',
  },
  {
    title: '表描述',
    dataIndex: 'tableComment',
    width: 120,
    align: 'center',
  },
  {
    title: '实体类',
    dataIndex: 'className',
    width: 120,
    align: 'center',
    ellipsis: true,
    tooltip: true,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 160,
    align: 'center',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    width: 160,
    align: 'center',
  },
  {
    title: '操作',
    dataIndex: 'operate',
    width: 150,
    align: 'center',
    slotName: 'operate',
  },
] as TableColumnData[];
const { calculateHeight } = useTableScroll(headRef);
const getList = () => {
  return new Promise((resolve) => {
    loading.value = true;
    listTable(queryForm.value)
      .then((res) => {
        tableData.value = res;
        resolve(res);
      })
      .finally(() => {
        loading.value = false;
      });
  });
};
// 生成代码
const handleGenTable = async (record: any) => {
  const tableNames = record.tableName || '';
  if (!tableNames) {
    Message.error('请选择要生成的表');
    return;
  }
  if (record.genType === '1') {
    await genCode(record.tableName);
    Message.success('成功生成到自定义路径：' + record.genPath);
  } else {
    downLoadZip('/business/gen/gen/batchGenCode?tables=' + tableNames);
  }
};
// 同步数据库
const handleSynchDb = async (record: any) => {
  Modal.info({
    title: '警告',
    content: `确认要强制同步${record.tableName}表结构吗？`,
    hideCancel: false,
    onBeforeOk: (done: (closed?: boolean) => void) => {
      synchDb(record.tableName)
        .then(() => {
          Message.success('同步成功');
          done();
        })
        .catch(() => {
          done(false);
        });
    },
  });
};
const openImportTable = () => {};
const handlePreview = async (record: any) => {
  const res = await previewTable(record.tableId);
  previewData.value = res;
  console.log(previewData.value);
  visible.value = true;
};
const highlightedCode = (code: any, key: string) => {
  const language = key.split('/')[1];
  const result = hljs.highlight(language, code || '', true);
  console.log(result);
  return result.code;
};
const handleEditTable = (record: any) => {
  // const tableId = record.tableId
};
const handleDelete = (record: any) => {
  const tableIds = record.tableId;
  Modal.warning({
    title: '警告',
    content: `是否确认删除表编号为${tableIds}的数据项？`,
    hideCancel: false,
    onBeforeOk: (done: (closed?: boolean) => void) => {
      delTable(tableIds)
        .then(() => {
          Message.success('删除成功');
          getList();
          done();
        })
        .catch(() => {
          done(false);
        });
    },
  });
};
const search = () => {
  getList();
};
const reset = () => {
  queryForm.value = {
    tableName: '',
    tableComment: '',
  };
  getList();
};
onMounted(() => getList());
</script>
