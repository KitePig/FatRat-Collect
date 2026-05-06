import { IconPropType } from "../../../utils/vue/icon.js";
import "../../../utils/index.js";
import { PopperEffect, PopperInstance } from "../../popper/src/popper.js";
import { ButtonType } from "../../button/src/button.js";
import "../../button/index.js";
import { PopconfirmProps } from "./popconfirm.js";
import "../../../index.js";
import * as vue from "vue";

//#region ../../packages/components/popconfirm/src/popconfirm.vue.d.ts
declare var __VLS_23: {
    confirm: (e: MouseEvent) => void;
    cancel: (e: MouseEvent) => void;
  }, __VLS_41: {};
type __VLS_Slots = {} & {
  actions?: (props: typeof __VLS_23) => any;
} & {
  reference?: (props: typeof __VLS_41) => any;
};
declare const __VLS_base: vue.DefineComponent<PopconfirmProps, {
  popperRef: vue.ComputedRef<PopperInstance | undefined>;
  hide: () => void;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  cancel: (e: MouseEvent) => void;
  confirm: (e: MouseEvent) => void;
}, string, vue.PublicProps, Readonly<PopconfirmProps> & Readonly<{
  onCancel?: ((e: MouseEvent) => any) | undefined;
  onConfirm?: ((e: MouseEvent) => any) | undefined;
}>, {
  teleported: boolean;
  effect: PopperEffect;
  icon: IconPropType;
  hideAfter: number;
  width: string | number;
  confirmButtonType: ButtonType;
  cancelButtonType: ButtonType;
  iconColor: string;
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