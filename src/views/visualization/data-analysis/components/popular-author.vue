<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card class="general-card" :header-style="{ paddingBottom: '14px' }">
      <template #title> 热门作者榜单 </template>
      <template #extra>
        <a-link> 查看更多 </a-link>
      </template>
      <a-table
        :data="tableData.list"
        :pagination="false"
        :bordered="false"
        style="margin-bottom: 20px"
      >
        <template #columns>
          <a-table-column title="排名" data-index="ranking"> </a-table-column>
          <a-table-column title="作者" data-index="author"> </a-table-column>
          <a-table-column
            title="内容量"
            data-index="contentCount"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          >
          </a-table-column>
          <a-table-column
            title="点击量"
            data-index="clickCount"
            :sortable="{
              sortDirections: ['ascend', 'descend'],
            }"
          >
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </a-spin>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import useLoading from '@/hooks/useLoading';
import { queryPopularAuthor, PopularAuthorRes } from '@/api/visualization';

export default defineComponent({
  setup() {
    const { loading, setLoading } = useLoading();
    const tableData = ref<PopularAuthorRes>({ list: [] });
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await queryPopularAuthor();
        tableData.value = data;
      } catch (err) {
        // you can report use errorHandler or other
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return {
      loading,
      tableData,
    };
  },
});
</script>

<style scoped lang="less">
.general-card {
  min-width: 395px;
  min-height: 425px;
}
</style>
