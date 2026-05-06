import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { ComponentSize } from "../../../constants/size.js";
import "../../../utils/index.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/text/src/text.d.ts
interface TextProps {
  /**
   * @description text type
   */
  type?: 'primary' | 'success' | 'info' | 'warning' | 'danger' | '';
  /**
   * @description text size
   */
  size?: ComponentSize;
  /**
   * @description render ellipsis
   */
  truncated?: boolean;
  /**
   * @description maximum lines
   */
  lineClamp?: number | string;
  /**
   * @description custom element tag
   */
  tag?: string;
}
/**
 * @deprecated Removed after 3.0.0, Use `TextProps` instead.
 */
declare const textProps: {
  readonly type: EpPropFinalized<StringConstructor, "" | "info" | "primary" | "success" | "warning" | "danger", unknown, "", boolean>;
  readonly size: EpPropFinalized<StringConstructor, "" | "default" | "small" | "large", unknown, "", boolean>;
  readonly truncated: BooleanConstructor;
  readonly lineClamp: {
    readonly type: vue.PropType<EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly tag: EpPropFinalized<StringConstructor, unknown, unknown, "span", boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `TextProps` instead.
 */
type TextPropsPublic = ExtractPublicPropTypes<typeof textProps>;
//#endregion
export { TextProps, TextPropsPublic, textProps };