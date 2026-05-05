import { IconPropType } from "../../../utils/vue/icon.js";
import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { ComponentSize } from "../../../constants/size.js";
import "../../../utils/index.js";
import { _default } from "./rate.vue.js";
import * as vue from "vue";
import { Component, ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/rate/src/rate.d.ts
interface RateProps {
  /**
   * @description binding value
   */
  modelValue?: number;
  /**
   * @description native `id` attribute
   */
  id?: string;
  /**
   * @description threshold value between low and medium level. The value itself will be included in low level
   */
  lowThreshold?: number;
  /**
   * @description threshold value between medium and high level. The value itself will be included in high level
   */
  highThreshold?: number;
  /**
   * @description max rating score
   */
  max?: number;
  /**
   * @description colors for icons. If array, it should have 3 elements, each of which corresponds with a score level, else if object, the key should be threshold value between two levels, and the value should be corresponding color
   */
  colors?: string[] | Record<number, string>;
  /**
   * @description color of unselected icons
   */
  voidColor?: string;
  /**
   * @description color of unselected read-only icons
   */
  disabledVoidColor?: string;
  /**
   * @description icon components. If array, it should have 3 elements, each of which corresponds with a score level, else if object, the key should be threshold value between two levels, and the value should be corresponding icon component
   */
  icons?: Array<IconPropType> | Record<number, IconPropType>;
  /**
   * @description component of unselected icons
   */
  voidIcon?: IconPropType;
  /**
   * @description component of unselected read-only icons
   */
  disabledVoidIcon?: IconPropType;
  /**
   * @description whether Rate is read-only
   */
  disabled?: boolean;
  /**
   * @description whether picking half start is allowed
   */
  allowHalf?: boolean;
  /**
   * @description whether to display texts
   */
  showText?: boolean;
  /**
   * @description whether to display current score. show-score and show-text cannot be true at the same time
   */
  showScore?: boolean;
  /**
   * @description color of texts
   */
  textColor?: string;
  /**
   * @description text array
   */
  texts?: string[];
  /**
   * @description score template
   */
  scoreTemplate?: string;
  /**
   * @description size of Rate
   */
  size?: ComponentSize;
  /**
   * @description whether value can be reset to `0`
   */
  clearable?: boolean;
  /**
   * @description native `aria-label` attribute
   */
  ariaLabel?: string;
}
/**
 * @deprecated Removed after 3.0.0, Use `RateProps` instead.
 */
declare const rateProps: {
  readonly ariaLabel: StringConstructor;
  readonly modelValue: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly id: EpPropFinalized<StringConstructor, unknown, unknown, undefined, boolean>;
  readonly lowThreshold: EpPropFinalized<NumberConstructor, unknown, unknown, 2, boolean>;
  readonly highThreshold: EpPropFinalized<NumberConstructor, unknown, unknown, 4, boolean>;
  readonly max: EpPropFinalized<NumberConstructor, unknown, unknown, 5, boolean>;
  readonly colors: EpPropFinalized<(new (...args: any[]) => string[] | Record<number, string>) | (() => string[] | Record<number, string>) | (((new (...args: any[]) => string[] | Record<number, string>) | (() => string[] | Record<number, string>)) | null)[], unknown, unknown, () => ["", "", ""], boolean>;
  readonly voidColor: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly disabledVoidColor: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly icons: EpPropFinalized<(new (...args: any[]) => (string | Component)[] | Record<number, string | Component>) | (() => (string | Component)[] | Record<number, string | Component>) | (((new (...args: any[]) => (string | Component)[] | Record<number, string | Component>) | (() => (string | Component)[] | Record<number, string | Component>)) | null)[], unknown, unknown, () => [Component, Component, Component], boolean>;
  readonly voidIcon: EpPropFinalized<(new (...args: any[]) => (string | Component) & {}) | (() => string | Component) | (((new (...args: any[]) => (string | Component) & {}) | (() => string | Component)) | null)[], unknown, unknown, () => Component, boolean>;
  readonly disabledVoidIcon: EpPropFinalized<(new (...args: any[]) => (string | Component) & {}) | (() => string | Component) | (((new (...args: any[]) => (string | Component) & {}) | (() => string | Component)) | null)[], unknown, unknown, () => Component, boolean>;
  readonly disabled: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly allowHalf: BooleanConstructor;
  readonly showText: BooleanConstructor;
  readonly showScore: BooleanConstructor;
  readonly textColor: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly texts: EpPropFinalized<(new (...args: any[]) => string[]) | (() => string[]) | (((new (...args: any[]) => string[]) | (() => string[])) | null)[], unknown, unknown, () => ["Extremely bad", "Disappointed", "Fair", "Satisfied", "Surprise"], boolean>;
  readonly scoreTemplate: EpPropFinalized<StringConstructor, unknown, unknown, "{value}", boolean>;
  readonly size: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly clearable: BooleanConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `RateProps` instead.
 */
type RatePropsPublic = ExtractPublicPropTypes<typeof rateProps>;
declare const rateEmits: {
  change: (value: number) => boolean;
  "update:modelValue": (value: number) => boolean;
};
type RateEmits = typeof rateEmits;
type RateInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { RateEmits, RateInstance, RateProps, RatePropsPublic, rateEmits, rateProps };