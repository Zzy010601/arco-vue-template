<!--
 * @Date: 2024-06-07 16:34:33
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-13 16:11:54
-->
<template>
  <a-breadcrumb class="container-breadcrumb">
    <template #separator>
      <icon-right />
    </template>
    <a-breadcrumb-item>
      <icon-apps />
    </a-breadcrumb-item>
    <a-breadcrumb-item v-for="item in items" :key="item.path">
      <a-link
        v-if="jump && item.path !== route.path"
        class="text-arco-gray-6"
        @click="router.push(item.path)"
      >
        {{ item.label }}
      </a-link>
      <span v-else>{{ item.label }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup lang="ts">
export interface BreadcrumbProps {
  items: { path: string; label: string }[];
  jump?: boolean;
}
withDefaults(defineProps<BreadcrumbProps>(), {
  items: () => [],
  jump: true,
});
const router = useRouter();
const route = useRoute();
</script>

<style scoped lang="less">
.container-breadcrumb {
  margin: 8px 0;

  :deep(.arco-breadcrumb-item) {
    color: rgb(var(--gray-6));

    &:last-child {
      color: rgb(var(--gray-10));
    }
  }
  :deep(.arco-breadcrumb-item a) {
    color: rgb(var(--gray-6));
    &:hover {
      color: rgb(var(--link-6));
    }
  }
}
</style>
