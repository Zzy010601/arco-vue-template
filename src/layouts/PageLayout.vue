<!--
 * @Date: 2024-06-11 17:35:08
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-12 09:10:28
-->
<template>
  <router-view v-slot="{ Component, route }">
    <transition name="fade" mode="out-in">
      <component :is="Component" v-if="route.meta?.keepAlive" :key="route.fullPath" />
      <keep-alive v-else>
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup lang="ts">
const router = useRouter();

// const aliveViews = computed(() => {
//   const { routes } = router.options;
//   console.log(routes);
//   return routes.filter((route) => route.meta.keepAlive).map((route) => route.name);
// }) as ComputedRef<string[]>;
</script>
