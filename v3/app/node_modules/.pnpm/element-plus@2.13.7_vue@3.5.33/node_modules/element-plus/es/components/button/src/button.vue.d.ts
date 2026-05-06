import { IconPropType } from "../../../utils/vue/icon.js";
import "../../../utils/index.js";
import { ButtonNativeType, ButtonProps, ButtonType } from "./button.js";
import * as vue from "vue";

//#region ../../packages/components/button/src/button.vue.d.ts
declare var __VLS_11: {}, __VLS_35: {}, __VLS_37: {};
type __VLS_Slots = {} & {
  loading?: (props: typeof __VLS_11) => any;
} & {
  icon?: (props: typeof __VLS_35) => any;
} & {
  default?: (props: typeof __VLS_37) => any;
};
declare const __VLS_base: vue.DefineComponent<ButtonProps, {
  /** @description button html element */ref: vue.Ref<HTMLButtonElement | undefined, HTMLButtonElement | undefined>; /** @description button size */
  size: vue.ComputedRef<"" | "default" | "small" | "large">; /** @description button type */
  type: vue.ComputedRef<"default" | "" | "info" | "primary" | "success" | "warning" | "text" | "danger">; /** @description button disabled */
  disabled: vue.ComputedRef<boolean>; /** @description whether adding space */
  shouldAddSpace: vue.ComputedRef<boolean>;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  click: (evt: MouseEvent) => void;
}, string, vue.PublicProps, Readonly<ButtonProps> & Readonly<{
  onClick?: ((evt: MouseEvent) => any) | undefined;
}>, {
  type: ButtonType;
  text: boolean;
  disabled: boolean;
  round: boolean;
  dashed: boolean;
  nativeType: ButtonNativeType;
  loadingIcon: IconPropType;
  plain: boolean;
  autoInsertSpace: boolean;
  tag: string | vue.Component;
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