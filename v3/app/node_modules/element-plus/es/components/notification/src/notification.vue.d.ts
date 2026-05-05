import { IconPropType } from "../../../utils/vue/icon.js";
import "../../../utils/index.js";
import { NotificationPosition, NotificationProps, NotificationType } from "./notification.js";
import * as vue from "vue";

//#region ../../packages/components/notification/src/notification.vue.d.ts
declare function close(): void;
declare var __VLS_21: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_21) => any;
};
declare const __VLS_base: vue.DefineComponent<NotificationProps, {
  visible: vue.Ref<boolean, boolean>; /** @description close notification */
  close: typeof close;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  destroy: () => void;
}, string, vue.PublicProps, Readonly<NotificationProps> & Readonly<{
  onDestroy?: (() => any) | undefined;
}>, {
  offset: number;
  position: NotificationPosition;
  type: NotificationType;
  title: string;
  id: string;
  onClick: () => void;
  message: string | vue.VNode | (() => vue.VNode);
  closeIcon: IconPropType;
  showClose: boolean;
  duration: number;
  customClass: string;
}, {}, {}, {}, string, vue.ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
type __VLS_WithSlots<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
export { _default };