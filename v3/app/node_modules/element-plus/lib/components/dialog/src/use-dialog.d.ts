import { DialogProps } from "./dialog.js";
import * as vue from "vue";
import { CSSProperties, Ref, TransitionProps } from "vue";

//#region ../../packages/components/dialog/src/use-dialog.d.ts
declare const useDialog: (props: DialogProps, targetRef: Ref<HTMLElement | undefined>) => {
  afterEnter: () => void;
  afterLeave: () => void;
  beforeLeave: () => void;
  handleClose: () => void;
  onModalClick: () => void;
  close: () => void;
  doClose: () => void;
  onOpenAutoFocus: () => void;
  onCloseAutoFocus: () => void;
  onCloseRequested: () => void;
  onFocusoutPrevented: (event: CustomEvent) => void;
  bringToFront: () => void;
  titleId: Ref<string, string>;
  bodyId: Ref<string, string>;
  closed: Ref<boolean, boolean>;
  style: vue.ComputedRef<CSSProperties>;
  overlayDialogStyle: vue.ComputedRef<CSSProperties>;
  rendered: Ref<boolean, boolean>;
  visible: Ref<boolean, boolean>;
  zIndex: Ref<number, number>;
  transitionConfig: vue.ComputedRef<TransitionProps | {
    name: string;
    onAfterEnter: () => void;
    onBeforeLeave: () => void;
    onAfterLeave: () => void;
  }>;
  _draggable: vue.ComputedRef<boolean>;
  _alignCenter: vue.ComputedRef<boolean>;
  _overflow: vue.ComputedRef<boolean>;
  closing: Ref<boolean, boolean>;
  penetrable: vue.ComputedRef<boolean | undefined>;
};
//#endregion
export { useDialog };