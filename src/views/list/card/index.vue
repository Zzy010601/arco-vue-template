<!--
 * @Date: 2024-06-11 13:12:37
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-14 15:03:35
-->
<template>
  <PageWrap>
    <a-row :gutter="20" align="stretch">
      <a-col :span="24">
        <a-row justify="space-between">
          <a-col :span="24">
            <a-tabs :default-active-tab="1" type="rounded">
              <a-tab-pane key="1" title="全部">
                <QualityInspection />
                <TheService />
                <RulesPreset />
              </a-tab-pane>
              <a-tab-pane key="2" title="内容质检">
                <QualityInspection />
              </a-tab-pane>
              <a-tab-pane key="3" title="开通服务">
                <TheService />
              </a-tab-pane>
              <a-tab-pane key="4" title="规则预置">
                <RulesPreset />
              </a-tab-pane>
            </a-tabs>
          </a-col>
          <a-input-search
            placeholder="搜索"
            style="position: absolute; top: 60px; right: 10px; width: 240px"
          />
        </a-row>
      </a-col>
    </a-row>
  </PageWrap>
</template>

<script setup lang="ts">
import QualityInspection from './components/quality-inspection.vue';
import TheService from './components/the-service.vue';
import RulesPreset from './components/reules-preset.vue';
</script>

<style scoped lang="less">
:deep(.arco-list-item) {
  width: 33%;
}

:deep(.block-title) {
  margin: 0 0 12px 0;
  font-size: 14px;
}

:deep(.arco-list-col) {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.container {
  :deep(.arco-list-content) {
    overflow-x: hidden;
  }

  :deep(.arco-card-meta-title) {
    font-size: 14px;
  }

  :deep(.list-wrap) {
    .list-row {
      align-items: stretch;

      .list-col {
        margin-bottom: 16px;
      }
    }

    :deep(.arco-space) {
      width: 100%;

      .arco-space-item {
        &:last-child {
          flex: 1;
        }
      }
    }
  }
}
</style>
