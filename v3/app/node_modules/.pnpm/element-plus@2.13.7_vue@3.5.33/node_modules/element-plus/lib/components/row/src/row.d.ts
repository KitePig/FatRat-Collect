import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { _default } from "./row.vue.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/row/src/row.d.ts
declare const RowJustify: readonly ["start", "center", "end", "space-around", "space-between", "space-evenly"];
declare const RowAlign: readonly ["top", "middle", "bottom"];
interface RowProps {
  /**
   * @description custom element tag
   */
  tag?: string;
  /**
   * @description grid spacing
   */
  gutter?: number;
  /**
   * @description horizontal alignment of flex layout
   */
  justify?: (typeof RowJustify)[number];
  /**
   * @description vertical alignment of flex layout
   */
  align?: (typeof RowAlign)[number];
}
/**
 * @deprecated Removed after 3.0.0, Use `RowProps` instead.
 */
declare const rowProps: {
  readonly tag: EpPropFinalized<StringConstructor, unknown, unknown, "div", boolean>;
  readonly gutter: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly justify: EpPropFinalized<StringConstructor, "center" | "space-around" | "space-between" | "space-evenly" | "end" | "start", unknown, "start", boolean>;
  readonly align: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "top" | "bottom" | "middle", unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
/**
 * @deprecated Removed after 3.0.0, Use `RowProps` instead.
 */
type RowPropsPublic = ExtractPublicPropTypes<typeof rowProps>;
type RowInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { RowAlign, RowInstance, RowJustify, RowProps, RowPropsPublic, rowProps };