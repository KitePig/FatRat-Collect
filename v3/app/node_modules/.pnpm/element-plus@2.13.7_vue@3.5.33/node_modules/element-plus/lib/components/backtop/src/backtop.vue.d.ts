import { BacktopProps } from "./backtop.js";
import * as vue from "vue";

//#region ../../packages/components/backtop/src/backtop.vue.d.ts
declare var __VLS_7: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_7) => any;
};
declare const __VLS_base: vue.DefineComponent<BacktopProps, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  click: (evt: MouseEvent) => void;
}, string, vue.PublicProps, Readonly<BacktopProps> & Readonly<{
  onClick?: ((evt: MouseEvent) => any) | undefined;
}>, {
  target: string;
  bottom: number;
  right: number;
  visibilityHeight: number;
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