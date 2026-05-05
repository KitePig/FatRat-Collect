import { DialogProps, DialogTransition } from "./dialog.js";
import * as vue from "vue";

//#region ../../packages/components/dialog/src/dialog.vue.d.ts
declare var __VLS_43: {
    close: () => void;
    titleId: string;
    titleClass: string;
  }, __VLS_45: {}, __VLS_47: {}, __VLS_50: {};
type __VLS_Slots = {} & {
  header?: (props: typeof __VLS_43) => any;
} & {
  title?: (props: typeof __VLS_45) => any;
} & {
  default?: (props: typeof __VLS_47) => any;
} & {
  footer?: (props: typeof __VLS_50) => any;
};
declare const __VLS_base: vue.DefineComponent<DialogProps, {
  /** @description whether the dialog is visible */visible: vue.Ref<boolean, boolean>;
  dialogContentRef: vue.Ref<any, any>;
  resetPosition: () => void;
  handleClose: () => void;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  close: () => void;
  "update:modelValue": (value: boolean) => void;
  open: () => void;
  opened: () => void;
  closed: () => void;
  openAutoFocus: () => void;
  closeAutoFocus: () => void;
}, string, vue.PublicProps, Readonly<DialogProps> & Readonly<{
  onClose?: (() => any) | undefined;
  "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
  onOpen?: (() => any) | undefined;
  onOpened?: (() => any) | undefined;
  onClosed?: (() => any) | undefined;
  onOpenAutoFocus?: (() => any) | undefined;
  onCloseAutoFocus?: (() => any) | undefined;
}>, {
  appendTo: string | HTMLElement;
  title: string;
  transition: DialogTransition;
  overflow: boolean;
  closeOnClickModal: boolean;
  closeOnPressEscape: boolean;
  lockScroll: boolean;
  modal: boolean;
  openDelay: number;
  closeDelay: number;
  headerAriaLevel: string;
  alignCenter: boolean;
  draggable: boolean;
  showClose: boolean;
  ariaLevel: string;
}, {}, {}, {}, string, vue.ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
type __VLS_WithSlots<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
export { _default };