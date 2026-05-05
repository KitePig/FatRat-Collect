import { InputInstance } from "../../input/src/instance.js";
import "../../input/index.js";
import { TooltipInstance } from "../../tooltip/src/tooltip.js";
import "../../tooltip/index.js";
import { AutocompleteData, AutocompleteDataItem, AutocompleteProps } from "./autocomplete.js";
import * as vue from "vue";
import { Ref } from "vue";

//#region ../../packages/components/autocomplete/src/autocomplete.vue.d.ts
declare const __VLS_export: <T extends AutocompleteDataItem = AutocompleteDataItem>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: vue.PublicProps & __VLS_PrettifyLocal<AutocompleteProps<T> & {
    onBlur?: ((evt: FocusEvent) => any) | undefined;
    onChange?: ((value: string | number) => any) | undefined;
    onFocus?: ((evt: FocusEvent) => any) | undefined;
    onInput?: ((value: string | number) => any) | undefined;
    onSelect?: ((item: Record<string, any>) => any) | undefined;
    "onUpdate:modelValue"?: ((value: string | number) => any) | undefined;
    onClear?: (() => any) | undefined;
  }> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: vue.ShallowUnwrapRef<{
    /** @description the index of the currently highlighted item */highlightedIndex: Ref<number, number>; /** @description autocomplete whether activated */
    activated: Ref<boolean, boolean>; /** @description remote search loading status */
    loading: Ref<boolean, boolean>; /** @description el-input component instance */
    inputRef: Ref<InputInstance | undefined, InputInstance | undefined>; /** @description el-tooltip component instance */
    popperRef: Ref<TooltipInstance | undefined, TooltipInstance | undefined>; /** @description fetch suggestions result */
    suggestions: Ref<AutocompleteData<T>, AutocompleteData<T>>; /** @description triggers when a suggestion is clicked */
    handleSelect: (item: T) => Promise<void>; /** @description handle keyboard enter event */
    handleKeyEnter: () => Promise<void>; /** @description focus the input element */
    focus: () => void; /** @description blur the input element */
    blur: () => void; /** @description close suggestion */
    close: () => void; /** @description highlight an item in a suggestion */
    highlight: (index: number) => void; /** @description loading suggestion list */
    getData: (queryString: string) => Promise<void>;
  }>) => void;
  attrs: any;
  slots: {
    prepend?: (props: {}) => any;
  } & {
    append?: (props: {}) => any;
  } & {
    prefix?: (props: {}) => any;
  } & {
    suffix?: (props: {}) => any;
  } & {
    header?: (props: {}) => any;
  } & {
    loading?: (props: {}) => any;
  } & {
    default?: (props: {
      item: T;
    }) => any;
  } & {
    footer?: (props: {}) => any;
  };
  emit: ((event: "blur", evt: FocusEvent) => void) & ((event: "focus", evt: FocusEvent) => void) & ((event: "select", item: Record<string, any>) => void) & ((event: "change", value: string | number) => void) & ((event: "update:modelValue", value: string | number) => void) & ((event: "input", value: string | number) => void) & ((event: "clear") => void);
}>) => vue.VNode<vue.RendererNode, vue.RendererElement, {
  [key: string]: any;
}> & {
  __ctx?: Awaited<typeof __VLS_setup>;
};
declare const _default: typeof __VLS_export;
type __VLS_PrettifyLocal<T> = (T extends any ? { [K in keyof T]: T[K] } : { [K in keyof T as K]: T[K] }) & {};
//#endregion
export { _default };