import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import * as vue from "vue";
import { ExtractPublicPropTypes, StyleValue } from "vue";

//#region ../../packages/components/badge/src/badge.d.ts
interface BadgeProps {
  /**
   * @description display value.
   */
  value?: string | number;
  /**
   * @description maximum value, shows `{max}+` when exceeded. Only works if value is a number.
   */
  max?: number;
  /**
   * @description if a little dot is displayed.
   */
  isDot?: boolean;
  /**
   * @description hidden badge.
   */
  hidden?: boolean;
  /**
   * @description badge type.
   */
  type?: 'primary' | 'success' | 'warning' | 'info' | 'danger';
  /**
   * @description whether to show badge when value is zero.
   */
  showZero?: boolean;
  /**
   * @description customize dot background color
   */
  color?: string;
  /**
   * @description CSS style of badge
   */
  badgeStyle?: StyleValue;
  /**
   * @description set offset of the badge
   */
  offset?: [number, number];
  /**
   * @description custom class name of badge
   */
  badgeClass?: string;
}
/**
 * @deprecated Removed after 3.0.0, Use `BadgeProps` instead.
 */
declare const badgeProps: {
  readonly value: EpPropFinalized<readonly [StringConstructor, NumberConstructor], unknown, unknown, "", boolean>;
  readonly max: EpPropFinalized<NumberConstructor, unknown, unknown, 99, boolean>;
  readonly isDot: BooleanConstructor;
  readonly hidden: BooleanConstructor;
  readonly type: EpPropFinalized<StringConstructor, "info" | "primary" | "success" | "warning" | "danger", unknown, "danger", boolean>;
  readonly showZero: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly color: StringConstructor;
  readonly badgeStyle: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue) | (((new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly offset: EpPropFinalized<(new (...args: any[]) => [number, number]) | (() => [number, number]) | (((new (...args: any[]) => [number, number]) | (() => [number, number])) | null)[], unknown, unknown, () => number[], boolean>;
  readonly badgeClass: {
    readonly type: vue.PropType<string>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
/**
 * @deprecated Removed after 3.0.0, Use `BadgeProps` instead.
 */
type BadgePropsPublic = ExtractPublicPropTypes<typeof badgeProps>;
//#endregion
export { BadgeProps, BadgePropsPublic, badgeProps };