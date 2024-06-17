/*
 * @Date: 2024-06-13 15:33:15
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-17 16:19:46
 */
import { computed } from 'vue';
import { useAppStore } from '@/store';

export default function useThemes() {
  const appStore = useAppStore();
  const isDark = computed(() => {
    return appStore.theme === 'dark';
  });
  return {
    isDark,
  };
}
