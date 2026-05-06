import { ComponentSize } from "../../../constants/size.js";
import { CSSProperties as CSSProperties$1 } from "../../../utils/typescript.js";
import "../../../utils/index.js";
import { InputType } from "../../input/src/input.js";
import { buttonTypes } from "../../button/src/button.js";
import "../../button/index.js";
import { AppContext, Component, VNode } from "vue";

//#region ../../packages/components/message-box/src/message-box.type.d.ts
type MessageType = '' | 'primary' | 'success' | 'warning' | 'info' | 'error';
type MessageBoxButtonType = (typeof buttonTypes)[number];
type Action = 'confirm' | 'close' | 'cancel';
type MessageBoxType = '' | 'prompt' | 'alert' | 'confirm';
type MessageBoxData = MessageBoxInputData & Action;
interface MessageBoxInputData {
  value: string;
  action: Action;
}
type MessageBoxInputValidator = ((value: string) => boolean | string) | undefined;
declare interface MessageBoxState {
  autofocus: boolean;
  title: string | undefined;
  message: string;
  type: MessageType;
  icon: string | Component;
  closeIcon: string | Component;
  customClass: string;
  customStyle: CSSProperties$1;
  showInput: boolean;
  inputValue: string;
  inputPlaceholder: string;
  inputType: InputType;
  inputPattern: RegExp | null;
  inputValidator: MessageBoxInputValidator;
  inputErrorMessage: string;
  showConfirmButton: boolean;
  showCancelButton: boolean;
  action: Action;
  dangerouslyUseHTMLString: boolean;
  confirmButtonText: string;
  cancelButtonText: string;
  confirmButtonType: MessageBoxButtonType;
  cancelButtonType: MessageBoxButtonType;
  confirmButtonLoading: boolean;
  cancelButtonLoading: boolean;
  confirmButtonLoadingIcon: string | Component;
  cancelButtonLoadingIcon: string | Component;
  confirmButtonClass: string;
  confirmButtonDisabled: boolean;
  cancelButtonClass: string;
  editorErrorMessage: string;
  beforeClose: null | ((action: Action, instance: MessageBoxState, done: () => void) => void);
  callback: null | Callback;
  distinguishCancelAndClose: boolean;
  modalFade: boolean;
  modalClass: string;
  validateError: boolean;
  zIndex: number;
}
type Callback = ((value: string, action: Action) => any) | ((action: Action) => any);
/** Options used in MessageBox */
interface ElMessageBoxOptions {
  /**
   * auto focus when open message-box
   */
  autofocus?: boolean;
  /** Callback before MessageBox closes, and it will prevent MessageBox from closing */
  beforeClose?: (action: Action, instance: MessageBoxState, done: () => void) => void;
  /** Custom class name for MessageBox */
  customClass?: string;
  /** Custom inline style for MessageBox */
  customStyle?: CSSProperties$1;
  /** Whether a mask is displayed */
  modal?: boolean;
  /** modal class name for MessageBox */
  modalClass?: string;
  /** MessageBox closing callback if you don't prefer Promise */
  callback?: Callback;
  /** Text content of cancel button */
  cancelButtonText?: string;
  /** Text content of confirm button */
  confirmButtonText?: string;
  /** Type of cancel button */
  cancelButtonType?: MessageBoxButtonType;
  /** Type of confirm button */
  confirmButtonType?: MessageBoxButtonType;
  /** Loading Icon content of cancel button */
  cancelButtonLoadingIcon?: string | Component;
  /** Loading Icon content of confirm button */
  confirmButtonLoadingIcon?: string | Component;
  /** Custom class name of cancel button */
  cancelButtonClass?: string;
  /** Custom class name of confirm button */
  confirmButtonClass?: string;
  /** Whether to align the content in center */
  center?: boolean;
  /** Whether MessageBox can be drag */
  draggable?: boolean;
  /** Draggable MessageBox can overflow the viewport */
  overflow?: boolean;
  /** Content of the MessageBox */
  message?: string | VNode | (() => VNode);
  /** Title of the MessageBox */
  title?: string | ElMessageBoxOptions;
  /** Message type, used for icon display */
  type?: MessageType;
  /** Message box type */
  boxType?: MessageBoxType;
  /** Custom icon component */
  icon?: string | Component;
  /** Custom close icon component */
  closeIcon?: string | Component;
  /** Whether message is treated as HTML string */
  dangerouslyUseHTMLString?: boolean;
  /** Whether to distinguish canceling and closing */
  distinguishCancelAndClose?: boolean;
  /** Whether to lock body scroll when MessageBox prompts */
  lockScroll?: boolean;
  /** Whether to show a cancel button */
  showCancelButton?: boolean;
  /** Whether to show a confirm button */
  showConfirmButton?: boolean;
  /** Whether to show a close button */
  showClose?: boolean;
  /** Whether to use round button */
  roundButton?: boolean;
  /** Whether MessageBox can be closed by clicking the mask */
  closeOnClickModal?: boolean;
  /** Whether MessageBox can be closed by pressing the ESC */
  closeOnPressEscape?: boolean;
  /** Whether to close MessageBox when hash changes */
  closeOnHashChange?: boolean;
  /** Whether to show an input */
  showInput?: boolean;
  /** Placeholder of input */
  inputPlaceholder?: string;
  /** Initial value of input */
  inputValue?: string;
  /** Regexp for the input */
  inputPattern?: RegExp;
  /** type of input, see more in [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types) */
  inputType?: InputType;
  /** Validation function for the input. Should returns a boolean or string. If a string is returned, it will be assigned to inputErrorMessage */
  inputValidator?: MessageBoxInputValidator;
  /** Error message when validation fails */
  inputErrorMessage?: string;
  /** Custom size of confirm and cancel buttons */
  buttonSize?: ComponentSize;
  /** Custom element to append the message box to */
  appendTo?: HTMLElement | string;
}
type ElMessageBoxShortcutMethod = ((message: ElMessageBoxOptions['message'], options?: ElMessageBoxOptions, appContext?: AppContext | null) => Promise<MessageBoxData>) & ((message: ElMessageBoxOptions['message'], title: ElMessageBoxOptions['title'], options?: ElMessageBoxOptions, appContext?: AppContext | null) => Promise<MessageBoxData>);
interface IElMessageBox {
  _context: AppContext | null;
  /** Show a message box */
  /** Show a message box */
  (options: ElMessageBoxOptions, appContext?: AppContext | null): Promise<MessageBoxData>;
  /** Show an alert message box */
  alert: ElMessageBoxShortcutMethod;
  /** Show a confirm message box */
  confirm: ElMessageBoxShortcutMethod;
  /** Show a prompt message box */
  prompt: ElMessageBoxShortcutMethod;
  /** Close current message box */
  close(): void;
}
//#endregion
export { Action, Callback, ElMessageBoxOptions, ElMessageBoxShortcutMethod, IElMessageBox, MessageBoxData, MessageBoxInputData, MessageBoxInputValidator, MessageBoxState, MessageBoxType };