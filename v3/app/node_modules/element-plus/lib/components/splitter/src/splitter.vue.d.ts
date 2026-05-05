import { Layout } from "./type.js";
import { SplitterProps } from "./splitter.js";
import * as vue from "vue";

//#region ../../packages/components/splitter/src/splitter.vue.d.ts
declare var __VLS_1: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any;
};
declare const __VLS_base: vue.DefineComponent<SplitterProps, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  resize: (index: number, sizes: number[]) => void;
  collapse: (index: number, type: "end" | "start", sizes: number[]) => void;
  resizeStart: (index: number, sizes: number[]) => void;
  resizeEnd: (index: number, sizes: number[]) => void;
}, string, vue.PublicProps, Readonly<SplitterProps> & Readonly<{
  onResize?: ((index: number, sizes: number[]) => any) | undefined;
  onCollapse?: ((index: number, type: "end" | "start", sizes: number[]) => any) | undefined;
  onResizeStart?: ((index: number, sizes: number[]) => any) | undefined;
  onResizeEnd?: ((index: number, sizes: number[]) => any) | undefined;
}>, {
  layout: Layout;
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