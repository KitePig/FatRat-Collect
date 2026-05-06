import * as vue from "vue";

//#region ../../packages/components/select/src/option-group.vue.d.ts
declare const _default: typeof __VLS_export;
declare const __VLS_export: vue.DefineComponent<vue.ExtractPropTypes<{
  /**
   * @description name of the group
   */
  label: StringConstructor;
  /**
   * @description whether to disable all options in this group
   */
  disabled: BooleanConstructor;
}>, {
  groupRef: vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  visible: vue.ComputedRef<boolean>;
  ns: {
    namespace: vue.ComputedRef<string>;
    b: (blockSuffix?: string) => string;
    e: (element?: string) => string;
    m: (modifier?: string) => string;
    be: (blockSuffix?: string, element?: string) => string;
    em: (element?: string, modifier?: string) => string;
    bm: (blockSuffix?: string, modifier?: string) => string;
    bem: (blockSuffix?: string, element?: string, modifier?: string) => string;
    is: {
      (name: string, state: boolean | undefined): string;
      (name: string): string;
    };
    cssVar: (object: Record<string, string>) => Record<string, string>;
    cssVarName: (name: string) => string;
    cssVarBlock: (object: Record<string, string>) => Record<string, string>;
    cssVarBlockName: (name: string) => string;
  };
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
  /**
   * @description name of the group
   */
  label: StringConstructor;
  /**
   * @description whether to disable all options in this group
   */
  disabled: BooleanConstructor;
}>> & Readonly<{}>, {
  disabled: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { _default };