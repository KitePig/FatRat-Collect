import { EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { SelectContext } from "./type.js";
import * as vue from "vue";

//#region ../../packages/components/select/src/option.vue.d.ts
declare const _default: typeof __VLS_export;
declare const __VLS_export: vue.DefineComponent<vue.ExtractPropTypes<{
  value: {
    readonly type: vue.PropType<EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown>>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  label: {
    readonly type: vue.PropType<EpPropMergeType<(NumberConstructor | StringConstructor)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  created: BooleanConstructor;
  disabled: BooleanConstructor;
}>, {
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
  id: vue.Ref<string, string>;
  containerKls: vue.ComputedRef<string[]>;
  currentLabel: vue.ComputedRef<boolean | EpPropMergeType<(NumberConstructor | StringConstructor)[], unknown, unknown>>;
  itemSelected: vue.ComputedRef<boolean>;
  isDisabled: vue.ComputedRef<boolean>;
  select: SelectContext;
  visible: vue.Ref<boolean, boolean>;
  hover: vue.Ref<boolean, boolean>;
  states: {
    index: number;
    groupDisabled: boolean;
    visible: boolean;
    hover: boolean;
  };
  hoverItem: () => void;
  handleMousedown: (event: MouseEvent) => void;
  updateOption: (query: string) => void;
  selectOptionClick: () => void;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
  value: {
    readonly type: vue.PropType<EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown>>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  label: {
    readonly type: vue.PropType<EpPropMergeType<(NumberConstructor | StringConstructor)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  created: BooleanConstructor;
  disabled: BooleanConstructor;
}>> & Readonly<{}>, {
  disabled: boolean;
  created: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { _default };