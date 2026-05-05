import { IconPropType } from "../../../utils/vue/icon.js";
import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import { Mutable } from "../../../utils/typescript.js";
import "../../../utils/index.js";
import { _default } from "./message.vue.js";
import * as vue from "vue";
import { AppContext, ExtractPublicPropTypes, VNode } from "vue";

//#region ../../packages/components/message/src/message.d.ts
interface MessageProps {
  /**
   * @description custom class name for Message
   */
  customClass?: string;
  /**
   * @description whether `message` is treated as HTML string
   */
  dangerouslyUseHTMLString?: boolean;
  /**
   * @description display duration, millisecond. If set to 0, it will not turn off automatically
   */
  duration?: number;
  /**
   * @description custom icon component, overrides `type`
   */
  icon?: IconPropType;
  /**
   * @description message dom id
   */
  id?: string;
  /**
   * @description message text
   */
  message?: string | VNode | (() => VNode);
  /**
   * @description callback function when closed with the message instance as the parameter
   */
  onClose?: () => void;
  /**
   * @description whether to show a close button
   */
  showClose?: boolean;
  /**
   * @description message type
   */
  type?: MessageType;
  /**
   * @description whether message is plain
   */
  plain?: boolean;
  /**
   * @description set the distance to the top of viewport
   */
  offset?: number;
  /**
   * @description message placement position
   */
  placement?: MessagePlacement;
  /**
   * @description message element zIndex value
   */
  zIndex?: number;
  /**
   * @description merge messages with the same content, type of VNode message is not supported
   */
  grouping?: boolean;
  /**
   * @description The number of repetitions, similar to badge, is used as the initial number when used with `grouping`
   */
  repeatNum?: number;
}
declare const messageTypes: readonly ["primary", "success", "info", "warning", "error"];
declare const messagePlacement: readonly ["top", "top-left", "top-right", "bottom", "bottom-left", "bottom-right"];
declare const MESSAGE_DEFAULT_PLACEMENT = "top";
type MessageType = (typeof messageTypes)[number];
type MessagePlacement = (typeof messagePlacement)[number];
/** @deprecated please use `MessageType` instead */
type messageType = MessageType;
interface MessageConfigContext {
  max?: number;
  grouping?: boolean;
  duration?: number;
  offset?: number;
  showClose?: boolean;
  plain?: boolean;
  placement?: string;
}
declare const messageDefaults: Mutable<{
  readonly customClass: "";
  readonly dangerouslyUseHTMLString: false;
  readonly duration: 3000;
  readonly icon: undefined;
  readonly id: "";
  readonly message: "";
  readonly onClose: undefined;
  readonly showClose: false;
  readonly type: "info";
  readonly plain: false;
  readonly offset: 16;
  readonly placement: undefined;
  readonly zIndex: 0;
  readonly grouping: false;
  readonly repeatNum: 1;
  readonly appendTo: HTMLElement;
}>;
/**
 * @deprecated Removed after 3.0.0, Use `MessageProps` instead.
 */
declare const messageProps: {
  readonly customClass: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly dangerouslyUseHTMLString: EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
  readonly duration: EpPropFinalized<NumberConstructor, unknown, unknown, 3000, boolean>;
  readonly icon: EpPropFinalized<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown, undefined, boolean>;
  readonly id: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly message: EpPropFinalized<(new (...args: any[]) => string | VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
  }> | (() => VNode)) | (() => string | VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
  }> | (() => VNode)) | (((new (...args: any[]) => string | VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
  }> | (() => VNode)) | (() => string | VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
  }> | (() => VNode))) | null)[], unknown, unknown, "", boolean>;
  readonly onClose: EpPropFinalized<(new (...args: any[]) => () => void) | (() => () => void) | {
    (): () => void;
    new (): any;
    readonly prototype: any;
  } | (((new (...args: any[]) => () => void) | (() => () => void) | {
    (): () => void;
    new (): any;
    readonly prototype: any;
  }) | null)[], unknown, unknown, undefined, boolean>;
  readonly showClose: EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
  readonly type: EpPropFinalized<StringConstructor, "error" | "info" | "primary" | "success" | "warning", unknown, "info", boolean>;
  readonly plain: EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
  readonly offset: EpPropFinalized<NumberConstructor, unknown, unknown, 16, boolean>;
  readonly placement: EpPropFinalized<StringConstructor, "top" | "bottom" | "top-left" | "top-right" | "bottom-left" | "bottom-right", unknown, undefined, boolean>;
  readonly zIndex: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly grouping: EpPropFinalized<BooleanConstructor, unknown, unknown, false, boolean>;
  readonly repeatNum: EpPropFinalized<NumberConstructor, unknown, unknown, 1, boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `MessageProps` instead.
 */
type MessagePropsPublic = ExtractPublicPropTypes<typeof messageProps>;
declare const messageEmits: {
  destroy: () => boolean;
};
type MessageEmits = typeof messageEmits;
type MessageInstance = InstanceType<typeof _default> & unknown;
type MessageOptions = Partial<Mutable<Omit<MessageProps, 'id'> & {
  appendTo?: HTMLElement | string;
}>>;
type MessageParams = MessageOptions | MessageOptions['message'];
type MessageParamsNormalized = Omit<MessageProps, 'id'> & {
  /**
   * @description set the root element for the message, default to `document.body`
   */
  appendTo: HTMLElement;
};
type MessageOptionsWithType = Omit<MessageOptions, 'type'>;
type MessageParamsWithType = MessageOptionsWithType | MessageOptions['message'];
interface MessageHandler {
  /**
   * @description close the Message
   */
  close: () => void;
}
type MessageFn = {
  (options?: MessageParams, appContext?: null | AppContext): MessageHandler;
  closeAll(type?: MessageType): void;
  closeAllByPlacement(position: MessagePlacement): void;
};
type MessageTypedFn = (options?: MessageParamsWithType, appContext?: null | AppContext) => MessageHandler;
type Message = MessageFn & {
  primary: MessageTypedFn;
  success: MessageTypedFn;
  warning: MessageTypedFn;
  info: MessageTypedFn;
  error: MessageTypedFn;
};
//#endregion
export { MESSAGE_DEFAULT_PLACEMENT, Message, MessageConfigContext, MessageEmits, MessageFn, MessageHandler, MessageInstance, MessageOptions, MessageOptionsWithType, MessageParams, MessageParamsNormalized, MessageParamsWithType, MessagePlacement, MessageProps, MessagePropsPublic, MessageType, MessageTypedFn, messageDefaults, messageEmits, messagePlacement, messageProps, messageType, messageTypes };