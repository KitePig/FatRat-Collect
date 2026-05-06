import { IconPropType } from "../../../utils/vue/icon.js";
import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { PopperEffect } from "../../popper/src/popper.js";
import { Measurable } from "../../popper/src/constants.js";
import { ButtonType } from "../../button/src/button.js";
import "../../button/index.js";
import { ElTooltipTriggerProps } from "../../tooltip/src/trigger.js";
import { ElTooltipContentProps } from "../../tooltip/src/content.js";
import "../../tooltip/index.js";
import { _default } from "./popconfirm.vue.js";
import "../../../index.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/popconfirm/src/popconfirm.d.ts
interface PopconfirmProps {
  /**
   * @description Title
   */
  title?: string;
  /**
   * @description Confirm button text
   */
  confirmButtonText?: string;
  /**
   * @description Cancel button text
   */
  cancelButtonText?: string;
  /**
   * @description Confirm button type
   */
  confirmButtonType?: ButtonType;
  /**
   * @description Cancel button type
   */
  cancelButtonType?: ButtonType;
  /**
   * @description Icon Component
   */
  icon?: IconPropType;
  /**
   * @description Icon color
   */
  iconColor?: string;
  /**
   * @description is hide Icon
   */
  hideIcon?: boolean;
  /**
   * @description delay of disappear, in millisecond
   */
  hideAfter?: number;
  /**
   * @description Tooltip theme, built-in theme: `dark` / `light`
   */
  effect?: ElTooltipContentProps['effect'];
  /**
   * @description whether popconfirm is teleported to the body
   */
  teleported?: ElTooltipContentProps['teleported'];
  /**
   * @description when popconfirm inactive and `persistent` is `false` , popconfirm will be destroyed
   */
  persistent?: ElTooltipContentProps['persistent'];
  /**
   * @description popconfirm width, min width 150px
   */
  width?: string | number;
  /**
   * @description Indicates whether virtual triggering is enabled
   */
  virtualTriggering?: ElTooltipTriggerProps['virtualTriggering'];
  /**
   * @description Indicates the reference element to which the popper is attached
   */
  virtualRef?: ElTooltipTriggerProps['virtualRef'];
}
/**
 * @deprecated Removed after 3.0.0, Use `PopconfirmProps` instead.
 */
declare const popconfirmProps: {
  readonly title: StringConstructor;
  readonly confirmButtonText: StringConstructor;
  readonly cancelButtonText: StringConstructor;
  readonly confirmButtonType: EpPropFinalized<StringConstructor, "" | "default" | "info" | "primary" | "success" | "warning" | "text" | "danger", unknown, "primary", boolean>;
  readonly cancelButtonType: EpPropFinalized<StringConstructor, "" | "default" | "info" | "primary" | "success" | "warning" | "text" | "danger", unknown, "text", boolean>;
  readonly icon: EpPropFinalized<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown, () => vue.DefineComponent<{}, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, boolean>;
  readonly iconColor: EpPropFinalized<StringConstructor, unknown, unknown, "#f90", boolean>;
  readonly hideIcon: BooleanConstructor;
  readonly hideAfter: EpPropFinalized<NumberConstructor, unknown, unknown, 200, boolean>;
  readonly effect: {
    readonly default: "light";
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string) | (() => PopperEffect) | (((new (...args: any[]) => string) | (() => PopperEffect)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    readonly __epPropKey: true;
  };
  readonly teleported: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly persistent: BooleanConstructor;
  readonly width: EpPropFinalized<readonly [StringConstructor, NumberConstructor], unknown, unknown, 150, boolean>;
  readonly virtualTriggering: BooleanConstructor;
  readonly virtualRef: {
    readonly type: vue.PropType<Measurable>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
declare const popconfirmEmits: {
  /**
   * @description triggers when click confirm button
   */
  confirm: (e: MouseEvent) => boolean;
  /**
   * @description triggers when click cancel button
   */
  cancel: (e: MouseEvent) => boolean;
};
type PopconfirmEmits = typeof popconfirmEmits;
/**
 * @deprecated Removed after 3.0.0, Use `PopconfirmProps` instead.
 */
type PopconfirmPropsPublic = ExtractPublicPropTypes<typeof popconfirmProps>;
type PopconfirmInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { PopconfirmEmits, PopconfirmInstance, PopconfirmProps, PopconfirmPropsPublic, popconfirmEmits, popconfirmProps };