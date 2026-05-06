import { IconPropType } from "../../../utils/vue/icon.js";
import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { ComponentSize } from "../../../constants/size.js";
import "../../../utils/index.js";
import { _default } from "./switch.vue.js";
import * as vue from "vue";
import { ExtractPublicPropTypes, PropType } from "vue";

//#region ../../packages/components/switch/src/switch.d.ts
interface SwitchProps {
  /**
   * @description binding value, it should be equivalent to either `active-value` or `inactive-value`, by default it's `boolean` type
   */
  modelValue?: boolean | string | number;
  /**
   * @description whether Switch is disabled
   */
  disabled?: boolean;
  /**
   * @description whether Switch is in loading state
   */
  loading?: boolean;
  /**
   * @description size of Switch
   */
  size?: ComponentSize;
  /**
   * @description width of Switch
   */
  width?: string | number;
  /**
   * @description whether icon or text is displayed inside dot, only the first character will be rendered for text
   */
  inlinePrompt?: boolean;
  /**
   * @description component of the icon displayed in action when in `off` state
   */
  inactiveActionIcon?: IconPropType;
  /**
   * @description component of the icon displayed in action when in `on` state
   */
  activeActionIcon?: IconPropType;
  /**
   * @description component of the icon displayed when in `on` state, overrides `active-text`
   */
  activeIcon?: IconPropType;
  /**
   * @description component of the icon displayed when in `off` state, overrides `inactive-text`
   */
  inactiveIcon?: IconPropType;
  /**
   * @description text displayed when in `on` state
   */
  activeText?: string;
  /**
   * @description text displayed when in `off` state
   */
  inactiveText?: string;
  /**
   * @description switch value when in `on` state
   */
  activeValue?: boolean | string | number;
  /**
   * @description switch value when in `off` state
   */
  inactiveValue?: boolean | string | number;
  /**
   * @description input name of Switch
   */
  name?: string;
  /**
   * @description whether to trigger form validation
   */
  validateEvent?: boolean;
  /**
   * @description before-change hook before the switch state changes. If `false` is returned or a `Promise` is returned and then is rejected, will stop switching
   */
  beforeChange?: () => Promise<boolean> | boolean;
  /**
   * @description id for input
   */
  id?: string;
  /**
   * @description tabindex for input
   */
  tabindex?: string | number;
  /**
   * @description native `aria-label` attribute
   */
  ariaLabel?: string;
}
/**
 * @deprecated Removed after 3.0.0, Use `SwitchProps` instead.
 */
declare const switchProps: {
  readonly ariaLabel: StringConstructor;
  readonly modelValue: EpPropFinalized<readonly [BooleanConstructor, StringConstructor, NumberConstructor], unknown, unknown, false, boolean>;
  readonly disabled: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly loading: BooleanConstructor;
  readonly size: {
    readonly type: PropType<EpPropMergeType<(new (...args: any[]) => "" | "default" | "small" | "large") | (() => "" | "default" | "small" | "large") | (((new (...args: any[]) => "" | "default" | "small" | "large") | (() => "" | "default" | "small" | "large")) | null)[], unknown, "" | "default" | "small" | "large">>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly width: EpPropFinalized<readonly [StringConstructor, NumberConstructor], unknown, unknown, "", boolean>;
  readonly inlinePrompt: BooleanConstructor;
  readonly inactiveActionIcon: {
    readonly type: PropType<EpPropMergeType<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly activeActionIcon: {
    readonly type: PropType<EpPropMergeType<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly activeIcon: {
    readonly type: PropType<EpPropMergeType<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly inactiveIcon: {
    readonly type: PropType<EpPropMergeType<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly activeText: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly inactiveText: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly activeValue: EpPropFinalized<readonly [BooleanConstructor, StringConstructor, NumberConstructor], unknown, unknown, true, boolean>;
  readonly inactiveValue: EpPropFinalized<readonly [BooleanConstructor, StringConstructor, NumberConstructor], unknown, unknown, false, boolean>;
  readonly name: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly validateEvent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly beforeChange: {
    readonly type: PropType<() => Promise<boolean> | boolean>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly id: StringConstructor;
  readonly tabindex: {
    readonly type: PropType<EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
/**
 * @deprecated Removed after 3.0.0, Use `SwitchProps` instead.
 */
type SwitchPropsPublic = ExtractPublicPropTypes<typeof switchProps>;
declare const switchEmits: {
  "update:modelValue": (val: boolean | string | number) => boolean;
  change: (val: boolean | string | number) => boolean;
  input: (val: boolean | string | number) => boolean;
};
type SwitchEmits = typeof switchEmits;
type SwitchInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { SwitchEmits, SwitchInstance, SwitchProps, SwitchPropsPublic, switchEmits, switchProps };