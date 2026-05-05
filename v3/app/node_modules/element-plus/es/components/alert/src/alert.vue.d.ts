import { TypeComponentsMap } from "../../../utils/vue/icon.js";
import "../../../utils/index.js";
import { AlertProps } from "./alert.js";
import * as vue from "vue";

//#region ../../packages/components/alert/src/alert.vue.d.ts
declare var __VLS_13: {}, __VLS_20: {}, __VLS_22: {};
type __VLS_Slots = {} & {
  icon?: (props: typeof __VLS_13) => any;
} & {
  title?: (props: typeof __VLS_20) => any;
} & {
  default?: (props: typeof __VLS_22) => any;
};
declare const __VLS_base: vue.DefineComponent<AlertProps, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  close: (evt: MouseEvent) => void;
}, string, vue.PublicProps, Readonly<AlertProps> & Readonly<{
  onClose?: ((evt: MouseEvent) => any) | undefined;
}>, {
  type: keyof typeof TypeComponentsMap;
  title: string;
  description: string;
  closable: boolean;
  closeText: string;
  effect: "light" | "dark";
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