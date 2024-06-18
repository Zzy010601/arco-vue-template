<script lang="tsx">
import { defineComponent, ref, watch, h, compile, computed } from 'vue';
import { useRouter, useRoute, RouteRecordRaw, RouteRecordNormalized } from 'vue-router';
import { useAppStore } from '@/store';
import usePermission from '@/hooks/permission';

export default defineComponent({
  emit: ['collapse'],
  setup() {
    const appStore = useAppStore();
    const permission = usePermission();
    const router = useRouter();
    const route = useRoute();
    const collapsed = ref(false);
    const appRoute = computed(() => {
      return router.getRoutes().filter((item) => !item.meta?.hidden);
    });
    const menuTree = computed(() => {
      const copyRouter = JSON.parse(JSON.stringify(appRoute.value));
      function travel(_routes: RouteRecordRaw[], layer: number) {
        if (!_routes) return null;
        const collector: any = _routes.map((element) => {
          // no access
          if (!permission.accessRouter(element)) {
            return null;
          }

          // leaf node
          if (!element.children) {
            return element;
          }

          // Associated child node
          const subItem = travel(element.children, layer);
          if (subItem.length) {
            element.children = subItem;
            return element;
          }
          // the else logic
          if (layer > 1) {
            element.children = subItem;
            return element;
          }
          return null;
        });
        return collector.filter(Boolean);
      }
      return travel(copyRouter, 0);
    });

    // In this case only two levels of menus are available
    // You can expand as needed

    const selectedKey = ref<string[]>([]);
    const goto = (item: RouteRecordRaw) => {
      router.push({
        name: item.name,
      });
    };
    watch(
      route,
      (newVal) => {
        if (newVal.meta.requiresAuth) {
          const key = newVal.matched[1]?.name as string;
          selectedKey.value = [key];
        }
      },
      {
        immediate: true,
      },
    );
    watch(
      () => appStore.menuCollapse,
      (newVal) => {
        collapsed.value = newVal;
      },
      {
        immediate: true,
      },
    );
    const setCollapse = (val: boolean) => {
      appStore.updateSettings({ menuCollapse: val });
    };

    const renderSubMenu = () => {
      function travel(_route: RouteRecordRaw[], nodes: any[]) {
        if (_route) {
          _route.forEach((element) => {
            // This is demo, modify nodes as needed
            if (!permission.accessRouter(element)) return;
            const icon = (icon: string | undefined | null) => {
              return icon ? `<${icon}/>` : ``;
            };
            // 如果父级一级菜单不是始终显示且只有一个二级菜单并且此二级菜单没有第三级子菜单，则不显示其父级一级菜单
            const r =
              !element.meta?.alwaysShow &&
              element?.children?.length === 1 &&
              !element.children[0]?.children ? (
                <a-menu-item
                  key={element.children[0].name}
                  v-slots={{
                    icon: () => h(compile(`${icon(element.children[0]?.meta?.icon)}`)),
                  }}
                  onClick={() => goto(element.children[0])}
                >
                  {element.children[0]?.meta?.title || ''}
                </a-menu-item>
              ) : (
                <a-sub-menu
                  key={element?.name}
                  v-slots={{
                    title: () =>
                      h(compile(`${icon(element?.meta?.icon)}${element?.meta?.title || ''}`)),
                  }}
                >
                  {element?.children?.map((elem) => {
                    return (
                      <a-menu-item key={elem.name} onClick={() => goto(elem)}>
                        {elem?.meta?.title || ''}
                        {travel(elem.children ?? [], [])}
                      </a-menu-item>
                    );
                  })}
                </a-sub-menu>
              );
            nodes.push(r as never);
          });
        }
        return nodes;
      }
      return travel(menuTree.value, []);
    };
    return () => (
      <a-menu
        v-model:collapsed={collapsed.value}
        selected-keys={selectedKey.value}
        accordion
        auto-open-selected
        show-collapse-button
        level-indent={34}
        onCollapse={setCollapse}
      >
        {renderSubMenu()}
      </a-menu>
    );
  },
});
</script>

<style lang="less" scoped>
.arco-menu {
  height: 100%;
}

:deep(.arco-menu-inner) {
  .arco-menu-inline-header {
    display: flex;
    align-items: center;
    user-select: none;
  }

  .arco-menu-item {
    user-select: none;
  }

  .arco-icon {
    &:not(.arco-icon-down) {
      font-size: 18px;
    }
  }

  .arco-menu-pop-header {
    &:not(.arco-menu-has-icon) {
      height: 40px;
      white-space: normal;
      text-overflow: clip;
    }
  }
}
</style>
