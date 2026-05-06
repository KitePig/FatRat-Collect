import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { DialogContentProps } from "./dialog-content.js";
import { _default } from "./dialog.vue.js";
import * as vue from "vue";
import { ExtractPublicPropTypes, InjectionKey, TransitionProps } from "vue";

//#region ../../packages/components/dialog/src/dialog.d.ts
type DoneFn = (cancel?: boolean) => void;
type DialogBeforeCloseFn = (done: DoneFn) => void;
type DialogTransition = string | TransitionProps;
/**
 * @description dialog component props
 */
interface DialogProps extends DialogContentProps {
  /**
   * @description whether to append Dialog itself to body. A nested Dialog should have this attribute set to `true`
   */
  appendToBody?: boolean;
  /**
   * @description which element the Dialog appends to
   */
  appendTo?: string | HTMLElement;
  /**
   * @description callback before Dialog closes, and it will prevent Dialog from closing, use done to close the dialog
   */
  beforeClose?: DialogBeforeCloseFn;
  /**
   * @description destroy elements in Dialog when closed
   */
  destroyOnClose?: boolean;
  /**
   * @description whether the Dialog can be closed by clicking the mask
   */
  closeOnClickModal?: boolean;
  /**
   * @description whether the Dialog can be closed by pressing ESC
   */
  closeOnPressEscape?: boolean;
  /**
   * @description whether scroll of body is disabled while Dialog is displayed
   */
  lockScroll?: boolean;
  /**
   * @description whether a mask is displayed
   */
  modal?: boolean;
  /**
   * @description whether the mask is penetrable
   */
  modalPenetrable?: boolean;
  /**
   * @description the Time(milliseconds) before open
   */
  openDelay?: number;
  /**
   * @description the Time(milliseconds) before close
   */
  closeDelay?: number;
  /**
   * @description value for `margin-top` of Dialog CSS, default is 15vh
   */
  top?: string;
  /**
   * @description visibility of Dialog
   */
  modelValue?: boolean;
  /**
   * @description custom class names for mask
   */
  modalClass?: string;
  /**
   * @description width of Dialog, default is 50%
   */
  width?: string | number;
  /**
   * @description same as z-index in native CSS, z-order of dialog
   */
  zIndex?: number;
  /**
   * @description trap focus within dialog
   */
  trapFocus?: boolean;
  /**
   * @description header's aria-level attribute
   */
  headerAriaLevel?: string;
  /**
   * @description custom transition configuration for dialog animation, it can be a string (transition name) or an object with Vue transition props
   */
  transition?: DialogTransition;
}
/**
 * @deprecated Removed after 3.0.0, Use `DialogProps` instead.
 */
declare const dialogProps: {
  readonly appendToBody: BooleanConstructor;
  readonly appendTo: EpPropFinalized<(new (...args: any[]) => string | HTMLElement) | (() => EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>) | (((new (...args: any[]) => string | HTMLElement) | (() => EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>)) | null)[], unknown, unknown, "body", boolean>;
  readonly beforeClose: {
    readonly type: vue.PropType<DialogBeforeCloseFn>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly destroyOnClose: BooleanConstructor;
  readonly closeOnClickModal: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly closeOnPressEscape: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly lockScroll: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly modal: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly modalPenetrable: BooleanConstructor;
  readonly openDelay: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly closeDelay: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly top: {
    readonly type: vue.PropType<string>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly modelValue: BooleanConstructor;
  readonly modalClass: StringConstructor;
  readonly headerClass: StringConstructor;
  readonly bodyClass: StringConstructor;
  readonly footerClass: StringConstructor;
  readonly width: {
    readonly type: vue.PropType<EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly zIndex: {
    readonly type: vue.PropType<number>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly trapFocus: BooleanConstructor;
  readonly headerAriaLevel: EpPropFinalized<StringConstructor, unknown, unknown, "2", boolean>;
  readonly transition: EpPropFinalized<(new (...args: any[]) => string | TransitionProps) | (() => DialogTransition) | (((new (...args: any[]) => string | TransitionProps) | (() => DialogTransition)) | null)[], unknown, unknown, undefined, boolean>;
  readonly center: BooleanConstructor;
  readonly alignCenter: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly closeIcon: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly draggable: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly overflow: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly fullscreen: BooleanConstructor;
  readonly showClose: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly title: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly ariaLevel: EpPropFinalized<StringConstructor, unknown, unknown, "2", boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `DialogProps` instead.
 */
type DialogPropsPublic = ExtractPublicPropTypes<typeof dialogProps>;
declare const dialogEmits: {
  open: () => boolean;
  opened: () => boolean;
  close: () => boolean;
  closed: () => boolean;
  "update:modelValue": (value: boolean) => boolean;
  openAutoFocus: () => boolean;
  closeAutoFocus: () => boolean;
};
type DialogEmits = typeof dialogEmits;
type DialogInstance = InstanceType<typeof _default> & unknown;
interface DialogConfigContext {
  alignCenter?: boolean;
  draggable?: boolean;
  overflow?: boolean;
  transition?: DialogTransition;
}
declare const dialogContextKey: InjectionKey<DialogConfigContext>;
declare const dialogPropsDefaults: {
  readonly appendTo: "body";
  readonly closeOnClickModal: true;
  readonly closeOnPressEscape: true;
  readonly lockScroll: true;
  readonly modal: true;
  readonly openDelay: 0;
  readonly closeDelay: 0;
  readonly headerAriaLevel: "2";
  readonly transition: undefined;
  readonly alignCenter: undefined;
  readonly draggable: undefined;
  readonly overflow: undefined;
  readonly showClose: true;
  readonly title: "";
  readonly ariaLevel: "2";
};
//#endregion
export { DialogBeforeCloseFn, DialogConfigContext, DialogEmits, DialogInstance, DialogProps, DialogPropsPublic, DialogTransition, dialogContextKey, dialogEmits, dialogProps, dialogPropsDefaults };