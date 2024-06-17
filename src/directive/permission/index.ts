/*
 * @Date: 2024-06-13 15:33:15
 * @LastEditors: 张子阳
 * @LastEditTime: 2024-06-17 13:38:55
 */
import { DirectiveBinding } from 'vue';
import { useUserStore } from '@/store';
import { RoleEnum } from '@/constants';

function checkPermission(el: HTMLElement, binding: DirectiveBinding) {
  const { value } = binding;
  const userStore = useUserStore();
  const { role } = userStore;

  if (Array.isArray(value)) {
    if (value.length > 0) {
      const hasPermission = value.includes(role);
      if (!hasPermission && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    }
  } else {
    throw new Error(`need roles! Like v-permission="[${RoleEnum.ADMIN},${RoleEnum.USER}]"`);
  }
}

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding);
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    checkPermission(el, binding);
  },
};
