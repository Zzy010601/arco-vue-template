<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      :header-style="{ paddingBottom: '0' }"
      :body-style="{ padding: '17px 20px 21px 20px' }"
    >
      <template #title> 线上热门内容 </template>
      <template #extra>
        <a-link> 查看更多 </a-link>
      </template>
      <a-space direction="vertical" :size="10" fill>
        <a-radio-group v-model:model-value="type" type="button" @change="typeChange">
          <a-radio value="text"> 文本 </a-radio>
          <a-radio value="image"> 图片 </a-radio>
          <a-radio value="video"> 视频 </a-radio>
        </a-radio-group>
        <a-table :data="renderList" :pagination="false" :bordered="false">
          <template #columns>
            <a-table-column title="排名" data-index="key"></a-table-column>
            <a-table-column title="内容标题" data-index="title">
              <template #cell="{ record }">
                <a-typography-paragraph
                  :ellipsis="{
                    rows: 1,
                  }"
                >
                  {{ record.title }}
                </a-typography-paragraph>
              </template>
            </a-table-column>
            <a-table-column title="点击量" data-index="clickNumber"> </a-table-column>
            <a-table-column
              title="日涨幅"
              data-index="increases"
              :sortable="{
                sortDirections: ['ascend', 'descend'],
              }"
            >
              <template #cell="{ record }">
                <div class="increases-cell">
                  <span>{{ record.increases }}%</span>
                  <icon-caret-up
                    v-if="record.increases !== 0"
                    style="color: #f53f3f; font-size: 8px"
                  />
                </div>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </a-space>
    </a-card>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useLoading from '@/hooks/useLoading';
import { queryPopularList, PopularRecord } from '@/api/dashboard';

export default defineComponent({
  setup() {
    const type = ref('text');
    const { loading, setLoading } = useLoading();
    const renderList = ref<PopularRecord[]>();
    const fetchData = async (type: string) => {
      try {
        setLoading(true);
        const { data } = await queryPopularList({ type });
        renderList.value = data;
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        setLoading(false);
      }
    };
    const typeChange = (type: string) => {
      fetchData(type);
    };
    fetchData('text');
    return {
      type,
      typeChange,
      loading,
      renderList,
    };
  },
});
</script>

<style scoped lang="less">
.general-card {
  min-height: 388px;
}

:deep(.arco-table-tr) {
  height: 44px;

  .arco-typography {
    margin-bottom: 0;
  }
}

.increases-cell {
  display: flex;
  align-items: center;

  span {
    margin-right: 4px;
  }
}
</style>
