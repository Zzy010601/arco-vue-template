<!--
 * @Date: 2024-06-12 15:45:15
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-17 16:04:09
-->
<template>
  <div class="w-full h-full px-4 pb-4" :class="!showBreadcrumb && 'pt-4'">
    <!-- 面包屑 -->
    <Breadcrumb v-show="showBreadcrumb" :items="breadItem" />
    <!-- 内容区域 -->
    <div ref="cardRef" class="h-full">
      <a-card
        :style="{ height, borderRadius: '4px' }"
        :body-style="{ height: '100%' }"
        :bordered="false"
      >
        <slot :height="cardHeight"></slot>
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
interface WrapProps {
  showBreadcrumb?: boolean;
}
const props = withDefaults(defineProps<WrapProps>(), {
  showBreadcrumb: true,
});
const cardRef = ref();
const cardHeight = computed(() => {
  return cardRef.value ? cardRef.value.offsetHeight - 32 : 800;
});
const height = computed(() => {
  return props.showBreadcrumb ? `calc(100% - 40px)` : '100%';
});
const route = useRoute();
const breadItem = computed(() => {
  const defaultRoutes = route.matched.map((item, index) => {
    return {
      path: (index === 0 ? item.redirect ?? item.children[0].path : item.path) as string,
      label: item.meta.title,
    };
  });
  return defaultRoutes;
});
</script>
