import { ComponentSize } from "../../constants/size.js";
import { Option } from "./src/types.js";
import { Props, SegmentedEmits, SegmentedInstance, SegmentedProps, SegmentedPropsPublic, defaultProps, segmentedEmits, segmentedProps } from "./src/segmented.js";
import "../../index.js";
import * as vue from "vue";

//#region ../../packages/components/segmented/index.d.ts
declare const ElSegmented: (<T extends Option = Option>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: {
  attrs: any;
  emit: ((event: "change", val: any) => void) & ((event: "update:modelValue", val: any) => void);
  slots: {
    default?: (props: {
      item: T;
    }) => any;
  };
}, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: vue.PublicProps & {
    direction?: ("vertical" | "horizontal") | undefined;
    options?: T[] | undefined;
    modelValue?: (string | number | boolean) | undefined;
    props?: Props | undefined;
    block?: boolean | undefined;
    size?: ComponentSize | undefined;
    disabled?: boolean | undefined;
    validateEvent?: boolean | undefined;
    id?: string | undefined;
    name?: string | undefined;
    ariaLabel?: string | undefined;
    onChange?: ((val: any) => any) | undefined;
    "onUpdate:modelValue"?: ((val: any) => any) | undefined;
  } & (typeof globalThis extends {
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
}) & vue.ObjectPlugin & Record<string, any>;
//#endregion
export { ElSegmented, ElSegmented as default, Props, SegmentedEmits, SegmentedInstance, SegmentedProps, SegmentedPropsPublic, defaultProps, segmentedEmits, segmentedProps };