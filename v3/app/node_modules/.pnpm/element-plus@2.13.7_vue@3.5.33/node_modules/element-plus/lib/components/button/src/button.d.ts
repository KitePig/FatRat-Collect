import { IconPropType } from "../../../utils/vue/icon.js";
import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { ComponentSize } from "../../../constants/size.js";
import "../../../utils/index.js";
import * as vue from "vue";
import { Component, ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/button/src/button.d.ts
declare const buttonTypes: readonly ["default", "primary", "success", "warning", "info", "danger", "text", ""];
declare const buttonNativeTypes: readonly ["button", "submit", "reset"];
type ButtonType = (typeof buttonTypes)[number];
type ButtonNativeType = (typeof buttonNativeTypes)[number];
interface ButtonProps {
  /**
   * @description button size
   */
  size?: ComponentSize;
  /**
   * @description disable the button
   */
  disabled?: boolean;
  /**
   * @description button type
   */
  type?: ButtonType;
  /**
   * @description icon component
   */
  icon?: IconPropType;
  /**
   * @description native button type
   */
  nativeType?: ButtonNativeType;
  /**
   * @description determine whether it's loading
   */
  loading?: boolean;
  /**
   * @description customize loading icon component
   */
  loadingIcon?: IconPropType;
  /**
   * @description determine whether it's a plain button
   */
  plain?: boolean;
  /**
   * @description determine whether it's a text button
   */
  text?: boolean;
  /**
   * @description determine whether it's a link button
   */
  link?: boolean;
  /**
   * @description determine whether the text button background color is always on
   */
  bg?: boolean;
  /**
   * @description native button autofocus
   */
  autofocus?: boolean;
  /**
   * @description determine whether it's a round button
   */
  round?: boolean;
  /**
   * @description determine whether it's a circle button
   */
  circle?: boolean;
  /**
   * @description determine whether it's a dashed button
   */
  dashed?: boolean;
  /**
   * @description custom button color, automatically calculate `hover` and `active` color
   */
  color?: string;
  /**
   * @description dark mode, which automatically converts `color` to dark mode colors
   */
  dark?: boolean;
  /**
   * @description automatically insert a space between two chinese characters
   */
  autoInsertSpace?: boolean;
  /**
   * @description custom element tag
   */
  tag?: string | Component;
}
/**
 * @deprecated Removed after 3.0.0, Use `ButtonProps` instead.
 */
declare const buttonProps: {
  readonly size: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly disabled: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly type: EpPropFinalized<StringConstructor, "" | "default" | "info" | "primary" | "success" | "warning" | "text" | "danger", unknown, "", boolean>;
  readonly icon: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | Component) & {}) | (() => string | Component) | (((new (...args: any[]) => (string | Component) & {}) | (() => string | Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly nativeType: EpPropFinalized<StringConstructor, "reset" | "submit" | "button", unknown, "button", boolean>;
  readonly loading: BooleanConstructor;
  readonly loadingIcon: EpPropFinalized<(new (...args: any[]) => (string | Component) & {}) | (() => string | Component) | (((new (...args: any[]) => (string | Component) & {}) | (() => string | Component)) | null)[], unknown, unknown, () => vue.DefineComponent<{}, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, boolean>;
  readonly plain: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly text: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly link: BooleanConstructor;
  readonly bg: BooleanConstructor;
  readonly autofocus: BooleanConstructor;
  readonly round: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly circle: BooleanConstructor;
  readonly dashed: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly color: StringConstructor;
  readonly dark: BooleanConstructor;
  readonly autoInsertSpace: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly tag: EpPropFinalized<(new (...args: any[]) => (string | Component) & {}) | (() => string | Component) | (((new (...args: any[]) => (string | Component) & {}) | (() => string | Component)) | null)[], unknown, unknown, "button", boolean>;
};
declare const buttonEmits: {
  click: (evt: MouseEvent) => boolean;
};
/**
 * @deprecated Removed after 3.0.0, Use `ButtonProps` instead.
 */
type ButtonPropsPublic = ExtractPublicPropTypes<typeof buttonProps>;
type ButtonEmits = typeof buttonEmits;
interface ButtonConfigContext {
  type?: ButtonProps['type'];
  plain?: ButtonProps['plain'];
  text?: ButtonProps['text'];
  round?: ButtonProps['round'];
  dashed?: ButtonProps['dashed'];
  autoInsertSpace?: ButtonProps['autoInsertSpace'];
}
//#endregion
export { ButtonConfigContext, ButtonEmits, ButtonNativeType, ButtonProps, ButtonPropsPublic, ButtonType, buttonEmits, buttonNativeTypes, buttonProps, buttonTypes };