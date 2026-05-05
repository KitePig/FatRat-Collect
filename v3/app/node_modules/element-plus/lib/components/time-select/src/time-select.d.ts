import { IconPropType } from "../../../utils/vue/icon.js";
import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { ComponentSize } from "../../../constants/size.js";
import "../../../utils/index.js";
import { PopperEffect } from "../../popper/src/popper.js";
import { UseEmptyValuesProps } from "../../../hooks/use-empty-values/index.js";
import "../../../hooks/index.js";
import { _default } from "./time-select.vue.js";
import "../../popper/index.js";
import * as vue from "vue";
import { CSSProperties, Component, ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/time-select/src/time-select.d.ts
interface TimeSelectProps extends UseEmptyValuesProps {
  /**
   * @description set format of time
   */
  format?: string;
  /**
   * @description binding value
   */
  modelValue?: string | null;
  /**
   * @description whether TimeSelect is disabled
   */
  disabled?: boolean;
  /**
   * @description whether the input is editable
   */
  editable?: boolean;
  /**
   * @description Tooltip theme, built-in theme: `dark` / `light`
   */
  effect?: PopperEffect;
  /**
   * @description whether to show clear button
   */
  clearable?: boolean;
  /**
   * @description size of Input
   */
  size?: ComponentSize;
  /**
   * @description placeholder in non-range mode
   */
  placeholder?: string;
  /**
   * @description start time
   */
  start?: string;
  /**
   * @description end time
   */
  end?: string;
  /**
   * @description time step
   */
  step?: string;
  /**
   * @description minimum time, any time before this time will be disabled
   */
  minTime?: string | null;
  /**
   * @description maximum time, any time after this time will be disabled
   */
  maxTime?: string | null;
  /**
   * @description whether `end` is included in options
   */
  includeEndTime?: boolean;
  /**
   * @description same as `name` in native input
   */
  name?: string;
  /**
   * @description custom prefix icon component
   */
  prefixIcon?: IconPropType;
  /**
   * @description custom clear icon component
   */
  clearIcon?: IconPropType;
  /**
   * @description custom class name for TimeSelect's dropdown
   */
  popperClass?: string;
  /**
   * @description custom style for TimeSelect's dropdown
   */
  popperStyle?: string | CSSProperties;
}
declare const DEFAULT_STEP = "00:30";
/**
 * @deprecated Removed after 3.0.0, Use `TimeSelectProps` instead.
 */
declare const timeSelectProps: {
  readonly emptyValues: ArrayConstructor;
  readonly valueOnClear: EpPropFinalized<(new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null) | (((new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null)) | null)[], unknown, unknown, undefined, boolean>;
  readonly format: EpPropFinalized<StringConstructor, unknown, unknown, "HH:mm", boolean>;
  readonly modelValue: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string) | (() => string | null) | (((new (...args: any[]) => string) | (() => string | null)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly disabled: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly editable: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly effect: EpPropFinalized<(new (...args: any[]) => string) | (() => PopperEffect) | (((new (...args: any[]) => string) | (() => PopperEffect)) | null)[], unknown, unknown, "light", boolean>;
  readonly clearable: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly size: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly placeholder: StringConstructor;
  readonly start: EpPropFinalized<StringConstructor, unknown, unknown, "09:00", boolean>;
  readonly end: EpPropFinalized<StringConstructor, unknown, unknown, "18:00", boolean>;
  readonly step: EpPropFinalized<StringConstructor, unknown, unknown, "00:30", boolean>;
  readonly minTime: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string) | (() => string | null) | (((new (...args: any[]) => string) | (() => string | null)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly maxTime: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string) | (() => string | null) | (((new (...args: any[]) => string) | (() => string | null)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly includeEndTime: BooleanConstructor;
  readonly name: StringConstructor;
  readonly prefixIcon: EpPropFinalized<(new (...args: any[]) => (string | Component) & {}) | (() => string | Component) | (((new (...args: any[]) => (string | Component) & {}) | (() => string | Component)) | null)[], unknown, unknown, () => vue.DefineComponent<{}, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, boolean>;
  readonly clearIcon: EpPropFinalized<(new (...args: any[]) => (string | Component) & {}) | (() => string | Component) | (((new (...args: any[]) => (string | Component) & {}) | (() => string | Component)) | null)[], unknown, unknown, () => vue.DefineComponent<{}, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, boolean>;
  readonly popperClass: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly popperStyle: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | CSSProperties) | (() => string | CSSProperties) | (((new (...args: any[]) => string | CSSProperties) | (() => string | CSSProperties)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
/**
 * @deprecated Removed after 3.0.0, Use `TimeSelectProps` instead.
 */
type TimeSelectPropsPublic = ExtractPublicPropTypes<typeof timeSelectProps>;
type TimeSelectInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { DEFAULT_STEP, TimeSelectInstance, TimeSelectProps, TimeSelectPropsPublic, timeSelectProps };