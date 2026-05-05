import { SplitterPanelProps } from "./split-panel.js";
import * as vue from "vue";

//#region ../../packages/components/splitter/src/split-panel.vue.d.ts
declare var __VLS_1: {}, __VLS_15: {}, __VLS_18: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_1) => any;
} & {
  'start-collapsible'?: (props: typeof __VLS_15) => any;
} & {
  'end-collapsible'?: (props: typeof __VLS_18) => any;
};
declare const __VLS_base: vue.DefineComponent<SplitterPanelProps, {
  /** @description splitter-panel html element */splitterPanelRef: vue.Ref<HTMLDivElement | undefined, HTMLDivElement | undefined>;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  "update:size": (value: string | number) => void;
}, string, vue.PublicProps, Readonly<SplitterPanelProps> & Readonly<{
  "onUpdate:size"?: ((value: string | number) => any) | undefined;
}>, {
  resizable: boolean;
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