import * as vue from "vue";

//#region ../../packages/components/dropdown/src/dropdown-menu.vue.d.ts
declare const _default: typeof __VLS_export;
declare const __VLS_export: vue.DefineComponent<vue.ExtractPropTypes<{
  onKeydown: {
    readonly type: vue.PropType<(e: KeyboardEvent) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>, {
  size: vue.ComputedRef<string> | undefined;
  rovingFocusGroupRootStyle: vue.Ref<vue.StyleValue, vue.StyleValue>;
  dropdownKls: vue.ComputedRef<string[]>;
  role: vue.ComputedRef<"listbox" | "grid" | "menu" | "tooltip" | "dialog" | "group" | "navigation" | "tree" | undefined>;
  triggerId: vue.ComputedRef<string>;
  dropdownListWrapperRef: (el: Element | vue.ComponentPublicInstance | null) => void;
  handleKeydown: (event: KeyboardEvent) => void;
  onBlur: (e: Event) => void;
  handleFocus: (e: FocusEvent) => void;
  onMousedown: (e: Event) => void;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
  onKeydown: {
    readonly type: vue.PropType<(e: KeyboardEvent) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>> & Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { _default };