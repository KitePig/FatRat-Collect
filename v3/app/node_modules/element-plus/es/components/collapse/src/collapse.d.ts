import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import { Arrayable, Awaitable } from "../../../utils/typescript.js";
import "../../../utils/index.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/collapse/src/collapse.d.ts
type CollapseActiveName = string | number;
type CollapseModelValue = Arrayable<CollapseActiveName>;
type CollapseIconPositionType = 'left' | 'right';
declare const emitChangeFn: (value: CollapseModelValue) => value is string | number | CollapseActiveName[];
interface CollapseProps {
  /**
   * @description whether to activate accordion mode
   */
  accordion?: boolean;
  /**
   * @description currently active panel, the type is `string` in accordion mode, otherwise it is `array`
   */
  modelValue?: CollapseModelValue;
  /**
   * @description set expand icon position
   */
  expandIconPosition?: CollapseIconPositionType;
  /**
   * @description before-collapse hook before the collapse state changes. If `false` is returned or a `Promise` is returned and then is rejected, will stop collapsing
   */
  beforeCollapse?: (name: CollapseActiveName) => Awaitable<boolean>;
}
/**
 * @deprecated Removed after 3.0.0, Use `CollapseProps` instead.
 */
declare const collapseProps: {
  readonly accordion: BooleanConstructor;
  readonly modelValue: EpPropFinalized<(new (...args: any[]) => string | number | CollapseActiveName[]) | (() => CollapseModelValue) | (((new (...args: any[]) => string | number | CollapseActiveName[]) | (() => CollapseModelValue)) | null)[], unknown, unknown, () => [], boolean>;
  readonly expandIconPosition: EpPropFinalized<(new (...args: any[]) => "left" | "right") | (() => CollapseIconPositionType) | (((new (...args: any[]) => "left" | "right") | (() => CollapseIconPositionType)) | null)[], unknown, unknown, "right", boolean>;
  readonly beforeCollapse: {
    readonly type: vue.PropType<(name: CollapseActiveName) => Awaitable<boolean>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
/**
 * @deprecated Removed after 3.0.0, Use `CollapseProps` instead.
 */
type CollapsePropsPublic = ExtractPublicPropTypes<typeof collapseProps>;
declare const collapseEmits: {
  "update:modelValue": (value: CollapseModelValue) => value is string | number | CollapseActiveName[];
  change: (value: CollapseModelValue) => value is string | number | CollapseActiveName[];
};
type CollapseEmits = typeof collapseEmits;
//#endregion
export { CollapseActiveName, CollapseEmits, CollapseIconPositionType, CollapseModelValue, CollapseProps, CollapsePropsPublic, collapseEmits, collapseProps, emitChangeFn };