import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { DialogBeforeCloseFn, DialogProps, DialogTransition } from "../../dialog/src/dialog.js";
import "../../dialog/index.js";
import { _default } from "./drawer.vue.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/drawer/src/drawer.d.ts
interface DrawerProps extends DialogProps {
  /**
   * @description Set the direction in which the Drawer opens
   */
  direction?: 'ltr' | 'rtl' | 'ttb' | 'btt';
  /**
   * @description Whether to enable the resizable function for the drawer
   */
  resizable?: boolean;
  /**
   * @description The size of the Drawer form, when using the number type, is measured in pixels. When using the string type, please pass in 'x%'; otherwise, it will be interpreted as the number type
   */
  size?: string | number;
  /**
   * @description You can remove the title from the drawer, so that your drawer will have more space on the screen. If you want to be visited, you must set the title attribute.
   */
  withHeader?: boolean;
  /**
   * @description The fade-in and fade-out animation switch of the mask layer
   */
  modalFade?: boolean;
  /**
   * @description Help assistive technologies such as screen readers identify content hierarchies
   */
  headerAriaLevel?: string;
}
/**
 * @deprecated Removed after 3.0.0, Use `DrawerProps` instead.
 */
declare const drawerProps: {
  readonly direction: EpPropFinalized<StringConstructor, "ltr" | "rtl" | "ttb" | "btt", unknown, "rtl", boolean>;
  readonly resizable: BooleanConstructor;
  readonly size: EpPropFinalized<readonly [StringConstructor, NumberConstructor], unknown, unknown, "30%", boolean>;
  readonly withHeader: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly modalFade: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly headerAriaLevel: EpPropFinalized<StringConstructor, unknown, unknown, "2", boolean>;
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
  readonly transition: EpPropFinalized<(new (...args: any[]) => string | vue.TransitionProps) | (() => DialogTransition) | (((new (...args: any[]) => string | vue.TransitionProps) | (() => DialogTransition)) | null)[], unknown, unknown, undefined, boolean>;
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
 * @deprecated Removed after 3.0.0, Use `DrawerProps` instead.
 */
type DrawerPropsPublic = ExtractPublicPropTypes<typeof drawerProps>;
declare const drawerEmits: {
  'resize-start': (evt: MouseEvent, size: number) => boolean;
  resize: (evt: MouseEvent, size: number) => boolean;
  'resize-end': (evt: MouseEvent, size: number) => boolean;
  open: () => boolean;
  opened: () => boolean;
  close: () => boolean;
  closed: () => boolean;
  "update:modelValue": (value: boolean) => boolean;
  openAutoFocus: () => boolean;
  closeAutoFocus: () => boolean;
};
type DrawerEmits = typeof drawerEmits;
type DrawerInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { DrawerEmits, DrawerInstance, DrawerProps, DrawerPropsPublic, drawerEmits, drawerProps };