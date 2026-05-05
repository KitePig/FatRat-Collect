import { Option } from "./types.js";
import { SegmentedProps } from "./segmented.js";
import * as vue from "vue";

//#region ../../packages/components/segmented/src/segmented.vue.d.ts
declare const __VLS_export: <T extends Option = Option>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: vue.PublicProps & __VLS_PrettifyLocal<SegmentedProps<T> & {
    onChange?: ((val: any) => any) | undefined;
    "onUpdate:modelValue"?: ((val: any) => any) | undefined;
  }> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: {}) => void;
  attrs: any;
  slots: {
    default?: (props: {
      item: T;
    }) => any;
  };
  emit: ((event: "change", val: any) => void) & ((event: "update:modelValue", val: any) => void);
}>) => vue.VNode<vue.RendererNode, vue.RendererElement, {
  [key: string]: any;
}> & {
  __ctx?: Awaited<typeof __VLS_setup>;
};
declare const _default: typeof __VLS_export;
type __VLS_PrettifyLocal<T> = (T extends any ? { [K in keyof T]: T[K] } : { [K in keyof T as K]: T[K] }) & {};
//#endregion
export { _default };