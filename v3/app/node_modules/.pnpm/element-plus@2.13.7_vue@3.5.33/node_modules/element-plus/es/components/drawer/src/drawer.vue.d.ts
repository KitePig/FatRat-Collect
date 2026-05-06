import { DialogTransition } from "../../dialog/src/dialog.js";
import "../../dialog/index.js";
import { DrawerProps } from "./drawer.js";
import * as vue from "vue";

//#region ../../packages/components/drawer/src/drawer.vue.d.ts
declare var __VLS_37: {
    close: () => void;
    titleId: string;
    titleClass: string;
  }, __VLS_39: {}, __VLS_52: {}, __VLS_54: {};
type __VLS_Slots = {} & {
  header?: (props: typeof __VLS_37) => any;
} & {
  title?: (props: typeof __VLS_39) => any;
} & {
  default?: (props: typeof __VLS_52) => any;
} & {
  footer?: (props: typeof __VLS_54) => any;
};
declare const __VLS_base: vue.DefineComponent<DrawerProps, {
  handleClose: () => void; /** @deprecated Will be removed after 2.14.0. */
  afterEnter: () => void; /** @deprecated Will be removed after 2.14.0. */
  afterLeave: () => void;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  close: () => void;
  resize: (evt: MouseEvent, size: number) => void;
  "update:modelValue": (value: boolean) => void;
  open: () => void;
  opened: () => void;
  closed: () => void;
  openAutoFocus: () => void;
  closeAutoFocus: () => void;
  "resize-start": (evt: MouseEvent, size: number) => void;
  "resize-end": (evt: MouseEvent, size: number) => void;
}, string, vue.PublicProps, Readonly<DrawerProps> & Readonly<{
  onClose?: (() => any) | undefined;
  onResize?: ((evt: MouseEvent, size: number) => any) | undefined;
  "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
  onOpen?: (() => any) | undefined;
  onOpened?: (() => any) | undefined;
  onClosed?: (() => any) | undefined;
  onOpenAutoFocus?: (() => any) | undefined;
  onCloseAutoFocus?: (() => any) | undefined;
  "onResize-start"?: ((evt: MouseEvent, size: number) => any) | undefined;
  "onResize-end"?: ((evt: MouseEvent, size: number) => any) | undefined;
}>, {
  appendTo: string | HTMLElement;
  title: string;
  size: string | number;
  transition: DialogTransition;
  direction: "ltr" | "rtl" | "ttb" | "btt";
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
  withHeader: boolean;
  modalFade: boolean;
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