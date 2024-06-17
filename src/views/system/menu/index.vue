<!--
 * @Date: 2024-06-11 16:54:31
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-17 17:00:10
-->
<template>
  <PageWrap v-slot="{ height }">
    <div ref="headRef" class="mb-5">
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
          <a-button type="primary" @click="handleAdd">
            <template #icon>
              <icon-plus />
            </template>
            新增
          </a-button>
        </a-space>
      </div>
    </div>
    <a-table
      v-model:expanded-keys="expandedKeys"
      row-key="id"
      :columns="columns"
      :data="tableData"
      :loading="loading"
      :bordered="false"
      :scroll="{ maxHeight: calculateHeight(height) }"
    />
    <a-drawer
      :visible="visible"
      :title="'新增菜单'"
      :width="600"
      :render-to-body="false"
      unmount-on-close
      @ok="handleOk"
      @cancel="visible = false"
    >
      <a-form
        ref="formRef"
        :model="editForm"
        :rules="rules"
        :label-col-props="{ span: 5 }"
        :wrapper-col-props="{ span: 18 }"
      >
        <a-form-item label="菜单类型" field="menuType">
          <a-radio-group v-model="editForm.menuType" type="button">
            <a-radio :value="0">一级菜单</a-radio>
            <a-radio :value="1">子菜单</a-radio>
            <a-radio :value="2">按钮/权限</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item :label="editForm.menuType === 2 ? '按钮/权限' : '菜单名称'" field="title">
          <a-input
            v-model="editForm.title"
            :placeholder="editForm.menuType === 2 ? '请输入按钮/权限' : '请输入菜单名称'"
            allow-clear
          />
        </a-form-item>
        <a-form-item v-if="editForm.menuType !== 0" label="上级菜单" field="parentId">
          <a-tree-select
            v-model="editForm.parentId"
            :data="menuTree"
            placeholder="请选择上级菜单"
            allow-clear
          />
        </a-form-item>
        <a-form-item v-if="editForm.menuType !== 2" label="路由地址" field="path">
          <a-input
            v-model="editForm.path"
            placeholder="请输入路由地址"
            allow-clear
            @blur="editForm.path = editForm?.path.trim()"
          />
        </a-form-item>
        <a-form-item v-if="editForm.menuType !== 2" label="组件路径" field="component">
          <a-input
            v-model="editForm.component"
            placeholder="请输入组件路径"
            allow-clear
            @blur="editForm.component = editForm?.component.trim()"
          />
        </a-form-item>
        <a-form-item v-if="editForm.menuType === 0" label="默认跳转地址" field="redirect">
          <a-input
            v-model="editForm.redirect"
            placeholder="请输入默认跳转地址"
            allow-clear
            @blur="editForm.redirect = editForm?.redirect.trim()"
          />
        </a-form-item>
        <a-form-item v-if="editForm.menuType === 2" label="权限标识" field="perms">
          <a-input v-model="editForm.perms" placeholder="请输入权限标识" allow-clear />
        </a-form-item>
        <a-form-item v-if="editForm.menuType !== 2" label="菜单图标" field="icon">
          <a-input v-model="editForm.icon" placeholder="请输入菜单图标" />
        </a-form-item>
        <a-form-item v-if="editForm.menuType !== 2" label="排序" field="sortNo">
          <a-input-number v-model="editForm.sortNo" :min="0" placeholder="请输入排序" />
        </a-form-item>
        <a-form-item v-if="editForm.menuType !== 2" label="是否为路由菜单" field="route">
          <a-switch v-model="editForm.route" checked-text="是" unchecked-text="否" />
        </a-form-item>
        <a-form-item v-if="editForm.menuType !== 2" label="是否隐藏" field="hidden">
          <a-switch v-model="editForm.hidden" checked-text="是" unchecked-text="否" />
        </a-form-item>
        <a-form-item v-if="editForm.menuType !== 2" label="是否缓存路由" field="keepAlive">
          <a-switch v-model="editForm.keepAlive" checked-text="是" unchecked-text="否" />
        </a-form-item>
        <a-form-item
          v-if="editForm.menuType === 0"
          label="是否始终显示"
          field="alwaysShow"
          tooltip="若为否，当该一级菜单只有一个二级菜单且二级菜单没有子菜单时，不显示此一级菜单。反之，则始终显示此一级菜单。"
        >
          <a-switch v-model="editForm.alwaysShow" checked-text="是" unchecked-text="否" />
        </a-form-item>
      </a-form>
    </a-drawer>
  </PageWrap>
</template>

<script setup lang="tsx">
import { FieldRule, TableColumnData } from '@arco-design/web-vue';
import { useTableScroll } from '@/hooks';
import { getUserList } from '@/api/user';

const resetEditForm = () => {
  return {
    // 菜单标题
    title: '',
    // 菜单类型
    menuType: 0,
    // 上级菜单id
    parentId: null as number,
    // icon
    icon: '',
    // 路由地址
    path: '',
    // 默认跳转地址
    redirect: '',
    // 组件路径
    component: '',
    // 权限标识
    perms: '',
    // 排序
    sortNo: 0,
    // 是否为路由菜单
    route: true,
    // 是否隐藏
    hidden: false,
    // 是否缓存路由
    keepAlive: true,
    // 是否始终显示
    alwaysShow: false,
  };
};
const headRef = ref();
const tableData = ref([]);
const expandedKeys = ref([]);
const loading = ref<boolean>(false);
const visible = ref<boolean>(false);
const queryForm = ref({
  title: '',
});
const formRef = ref();
const editForm = ref(resetEditForm());
const rules = ref<Record<string, FieldRule[]>>({
  title: [
    {
      required: true,
      message: editForm.value.menuType === 2 ? '请输入按钮/权限' : '请输入菜单名称',
    },
  ],
  parentId: [{ required: true, message: '请选择上级菜单' }],
  path: [{ required: true, message: '请输入路由地址' }],
  component: [{ required: true, message: '请输入组件路径' }],
});
const menuTree = ref([]);
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
const { calculateHeight } = useTableScroll(headRef);
const handleAdd = () => {
  editForm.value = resetEditForm();
  visible.value = true;
};
const handleOk = () => {
  formRef.value
    .validate()
    .then(() => {})
    .catch((errors: any) => {
      console.log('errors', errors);
    });
};
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

<style lang="less" scoped>
:deep(.arco-drawer-body) {
  padding-top: 30px;
}
</style>
