import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { ComponentSize } from "../../../constants/size.js";
import "../../../utils/index.js";
import { _default } from "./description.vue.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/descriptions/src/description.d.ts
interface DescriptionProps {
  /**
   * @description with or without border
   * @default false
   */
  border?: boolean;
  /**
   * @description numbers of `Descriptions Item` in one line
   * @default 3
   */
  column?: number;
  /**
   * @description direction of list
   * @default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical';
  /**
   * @description size of list
   * @default ''
   */
  size?: ComponentSize;
  /**
   * @description title text, display on the top left
   * @default ''
   */
  title?: string;
  /**
   * @description extra text, display on the top right
   * @default ''
   */
  extra?: string;
  /**
   * @description width of every label column
   */
  labelWidth?: string | number;
}
/**
 * @deprecated Removed after 3.0.0, Use `DescriptionProps` instead.
 */
declare const descriptionProps: {
  readonly border: BooleanConstructor;
  readonly column: EpPropFinalized<NumberConstructor, unknown, unknown, 3, boolean>;
  readonly direction: EpPropFinalized<StringConstructor, "horizontal" | "vertical", unknown, "horizontal", boolean>;
  readonly size: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly title: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly extra: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly labelWidth: {
    readonly type: vue.PropType<EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
/**
 * @deprecated Removed after 3.0.0, Use `DescriptionProps` instead.
 */
type DescriptionPropsPublic = ExtractPublicPropTypes<typeof descriptionProps>;
type DescriptionInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { DescriptionInstance, DescriptionProps, DescriptionPropsPublic, descriptionProps };