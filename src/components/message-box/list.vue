<template>
  <a-list :bordered="false">
    <a-list-item
      v-for="item in renderList"
      :key="item.id"
      action-layout="vertical"
      :style="{
        opacity: item.status ? 0.5 : 1,
      }"
    >
      <template #extra>
        <a-tag v-if="item.messageType === 0" color="gray">未开始</a-tag>
        <a-tag v-else-if="item.messageType === 1" color="green">已开通</a-tag>
        <a-tag v-else-if="item.messageType === 2" color="blue">进行中</a-tag>
        <a-tag v-else-if="item.messageType === 3" color="red">即将到期</a-tag>
      </template>
      <div class="item-wrap" @click="onItemClick(item)">
        <a-list-item-meta>
          <template v-if="item.avatar" #avatar>
            <a-avatar shape="circle">
              <img v-if="item.avatar" :src="item.avatar" alt="avatar" />
              <icon-desktop v-else />
            </a-avatar>
          </template>
          <template #title>
            <a-space :size="4">
              <span>{{ item.title }}</span>
              <a-typography-text type="secondary">
                {{ item.subTitle }}
              </a-typography-text>
              <a-typography-text v-if="item.type === 'message'" class="time-text">
                {{ item.time }}
              </a-typography-text>
            </a-space>
          </template>
          <template #description>
            <div>
              <a-typography-paragraph
                :ellipsis="{
                  rows: 1,
                }"
                >{{ item.content }}</a-typography-paragraph
              >
            </div>
          </template>
        </a-list-item-meta>
      </div>
    </a-list-item>
    <template #footer>
      <a-space fill :size="0" :class="{ 'add-border-top': renderList.length < showMax }">
        <div class="footer-wrap">
          <a-link @click="allRead"> 全部已读 </a-link>
        </div>
        <div class="footer-wrap">
          <a-link> 查看更多 </a-link>
        </div>
      </a-space>
    </template>
    <div
      v-if="renderList.length && renderList.length < 3"
      :style="{ height: (showMax - renderList.length) * 86 + 'px' }"
    ></div>
  </a-list>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { MessageRecord, MessageListType } from '@/api/message';

export default defineComponent({
  props: {
    renderList: {
      type: Array as PropType<MessageListType>,
      required: true,
    },
    unreadCount: {
      type: Number,
      default: 0,
    },
  },
  emits: ['itemClick'],
  setup(props, context) {
    const allRead = () => {
      context.emit('itemClick', [...props.renderList]);
    };

    const onItemClick = (item: MessageRecord) => {
      if (!item.status) {
        context.emit('itemClick', [item]);
      }
    };
    const showMax = 3;
    return {
      allRead,
      onItemClick,
      showMax,
    };
  },
});
</script>

<style scoped lang="less">
:deep(.arco-list) {
  .arco-list-item {
    min-height: 86px;
    border-bottom: 1px solid rgb(var(--gray-3));
  }

  .arco-list-item-extra {
    position: absolute;
    top: 9px;
    right: 10px;
  }

  .arco-list-item-meta-content {
    flex: 1;
  }

  .item-wrap {
    cursor: pointer;
  }

  .time-text {
    position: absolute;
    top: 12px;
    right: 12px;
    color: rgb(var(--gray-6));
    font-size: 12px;
  }

  .arco-list-footer {
    height: 52px;
    padding: 0;
    line-height: 50px;

    .arco-space-item {
      width: 100%;
      border-right: 1px solid rgb(var(--gray-3));

      &:last-child {
        border-right: none;
      }
    }

    .add-border-top {
      border-top: 1px solid rgb(var(--gray-3));
    }
  }

  .footer-wrap {
    text-align: center;
  }

  .arco-typography {
    margin-bottom: 0;
  }

  .add-border {
    border-top: 1px solid rgb(var(--gray-3));
  }
}
</style>
