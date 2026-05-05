import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { CascaderConfig, CascaderNodePathValue, CascaderNodeValue, CascaderOption, CascaderProps, CascaderValue, ExpandTrigger, LazyLoad, RenderLabel, isDisabled, isLeaf } from "./types.js";
import * as vue from "vue";
import { PropType } from "vue";

//#region ../../packages/components/cascader-panel/src/config.d.ts
interface CascaderCommonProps {
  /**
   * @description specify which key of node object is used as the node's value
   */
  modelValue?: CascaderValue | null;
  /**
   * @description data of the options, the key of `value` and `label` can be customize by `CascaderProps`.
   */
  options?: CascaderOption[];
  /**
   * @description configuration options, see the following `CascaderProps` table.
   */
  props?: CascaderProps;
}
declare const CommonProps: {
  readonly modelValue: {
    readonly type: PropType<EpPropMergeType<(new (...args: any[]) => string | number | Record<string, any> | CascaderNodePathValue | (CascaderNodeValue | CascaderNodePathValue)[]) | (() => CascaderValue | null) | (((new (...args: any[]) => string | number | Record<string, any> | CascaderNodePathValue | (CascaderNodeValue | CascaderNodePathValue)[]) | (() => CascaderValue | null)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly options: EpPropFinalized<(new (...args: any[]) => CascaderOption[]) | (() => CascaderOption[]) | (((new (...args: any[]) => CascaderOption[]) | (() => CascaderOption[])) | null)[], unknown, unknown, () => CascaderOption[], boolean>;
  readonly props: EpPropFinalized<(new (...args: any[]) => CascaderProps) | (() => CascaderProps) | (((new (...args: any[]) => CascaderProps) | (() => CascaderProps)) | null)[], unknown, unknown, () => CascaderProps, boolean>;
};
interface CascaderPanelProps extends CascaderCommonProps {
  border?: boolean;
  renderLabel?: RenderLabel;
}
declare const DefaultProps: CascaderConfig;
/**
 * @deprecated Removed after 3.0.0, Use `CascaderPanelProps` instead.
 */
declare const cascaderPanelProps: {
  border: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
  renderLabel: {
    readonly type: PropType<RenderLabel>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  modelValue: {
    readonly type: PropType<EpPropMergeType<(new (...args: any[]) => string | number | Record<string, any> | CascaderNodePathValue | (CascaderNodeValue | CascaderNodePathValue)[]) | (() => CascaderValue | null) | (((new (...args: any[]) => string | number | Record<string, any> | CascaderNodePathValue | (CascaderNodeValue | CascaderNodePathValue)[]) | (() => CascaderValue | null)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  options: EpPropFinalized<(new (...args: any[]) => CascaderOption[]) | (() => CascaderOption[]) | (((new (...args: any[]) => CascaderOption[]) | (() => CascaderOption[])) | null)[], unknown, unknown, () => CascaderOption[], boolean>;
  props: EpPropFinalized<(new (...args: any[]) => CascaderProps) | (() => CascaderProps) | (((new (...args: any[]) => CascaderProps) | (() => CascaderProps)) | null)[], unknown, unknown, () => CascaderProps, boolean>;
};
declare const cascaderPanelEmits: {
  "update:modelValue": (value: CascaderValue | undefined | null) => boolean;
  change: (value: CascaderValue | undefined | null) => boolean;
  close: () => boolean;
  'expand-change': (value: CascaderNodePathValue) => CascaderNodePathValue;
};
declare const useCascaderConfig: (props: {
  props: CascaderProps;
}) => vue.ComputedRef<{
  expandTrigger: ExpandTrigger;
  multiple: boolean;
  checkStrictly: boolean;
  emitPath: boolean;
  lazy: boolean;
  lazyLoad: LazyLoad;
  value: string;
  label: string;
  children: string;
  disabled: string | isDisabled;
  leaf: string | isLeaf;
  hoverThreshold: number;
  checkOnClickNode: boolean;
  checkOnClickLeaf: boolean;
  showPrefix: boolean;
}>;
//#endregion
export { CascaderCommonProps, CascaderPanelProps, CommonProps, DefaultProps, cascaderPanelEmits, cascaderPanelProps, useCascaderConfig };