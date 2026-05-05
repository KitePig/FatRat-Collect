import { IconPropType } from "../../../utils/vue/icon.js";
import "../../../utils/index.js";
import { MessagePlacement, MessageProps, MessageType } from "./message.js";
import * as vue from "vue";

//#region ../../packages/components/message/src/message.vue.d.ts
declare function close(): void;
declare var __VLS_27: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_27) => any;
};
declare const __VLS_base: vue.DefineComponent<MessageProps, {
  visible: vue.Ref<boolean, boolean>;
  bottom: vue.ComputedRef<number>;
  close: typeof close;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  destroy: () => void;
}, string, vue.PublicProps, Readonly<MessageProps> & Readonly<{
  onDestroy?: (() => any) | undefined;
}>, {
  zIndex: number;
  offset: number;
  type: MessageType;
  onClose: () => void;
  id: string;
  icon: IconPropType;
  placement: MessagePlacement;
  plain: boolean;
  message: string | vue.VNode | (() => vue.VNode);
  showClose: boolean;
  duration: number;
  customClass: string;
  dangerouslyUseHTMLString: boolean;
  grouping: boolean;
  repeatNum: number;
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