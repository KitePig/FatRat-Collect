import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { ComponentSize } from "../../../constants/size.js";
import "../../../utils/index.js";
import { Option } from "./types.js";
import { _default } from "./segmented.vue.js";
import * as vue from "vue";
import { ComponentInstance, ExtractPublicPropTypes } from "vue";
import { ComponentExposed } from "vue-component-type-helpers";

//#region ../../packages/components/segmented/src/segmented.d.ts
interface Props {
  label?: string;
  value?: string;
  disabled?: string;
}
declare const defaultProps: Required<Props>;
interface SegmentedProps<T extends Option = Option> {
  direction?: 'vertical' | 'horizontal';
  /**
   * @description options of segmented
   */
  options?: T[];
  /**
   * @description binding value
   */
  modelValue?: string | number | boolean;
  /**
   * @description configuration options, see the following table
   */
  props?: Props;
  /**
   * @description fit width of parent content
   */
  block?: boolean;
  /**
   * @description size of component
   */
  size?: ComponentSize;
  /**
   * @description whether segmented is disabled
   */
  disabled?: boolean;
  /**
   * @description whether to trigger form validation
   */
  validateEvent?: boolean;
  /**
   * @description native input id
   */
  id?: string;
  /**
   * @description native `name` attribute
   */
  name?: string;
  /**
   * @description native `aria-label` attribute
   */
  ariaLabel?: string;
}
/**
 * @deprecated Removed after 3.0.0, Use `SegmentedProps` instead.
 */
declare const segmentedProps: {
  ariaLabel: StringConstructor;
  direction: EpPropFinalized<(new (...args: any[]) => "horizontal" | "vertical") | (() => "horizontal" | "vertical") | (((new (...args: any[]) => "horizontal" | "vertical") | (() => "horizontal" | "vertical")) | null)[], unknown, unknown, string, boolean>;
  options: EpPropFinalized<(new (...args: any[]) => Option[]) | (() => Option[]) | (((new (...args: any[]) => Option[]) | (() => Option[])) | null)[], unknown, unknown, () => never[], boolean>;
  modelValue: EpPropFinalized<(BooleanConstructor | NumberConstructor | StringConstructor)[], unknown, unknown, undefined, boolean>;
  props: EpPropFinalized<(new (...args: any[]) => Props) | (() => Props) | (((new (...args: any[]) => Props) | (() => Props)) | null)[], unknown, unknown, () => Required<Props>, boolean>;
  block: BooleanConstructor;
  size: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  disabled: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  validateEvent: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
  id: StringConstructor;
  name: StringConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `SegmentedProps` instead.
 */
type SegmentedPropsPublic = ExtractPublicPropTypes<typeof segmentedProps>;
declare const segmentedEmits: {
  "update:modelValue": (val: any) => val is string | number | boolean;
  change: (val: any) => val is string | number | boolean;
};
type SegmentedEmits = typeof segmentedEmits;
type SegmentedInstance = ComponentInstance<typeof _default> & ComponentExposed<typeof _default>;
//#endregion
export { Props, SegmentedEmits, SegmentedInstance, SegmentedProps, SegmentedPropsPublic, defaultProps, segmentedEmits, segmentedProps };