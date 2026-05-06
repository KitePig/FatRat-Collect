import { IconPropType } from "../../../utils/vue/icon.js";
import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { _default } from "./notification.vue.js";
import * as vue from "vue";
import { AppContext, ExtractPublicPropTypes, VNode } from "vue";

//#region ../../packages/components/notification/src/notification.d.ts
declare const notificationTypes: readonly ["primary", "success", "info", "warning", "error"];
type NotificationType = (typeof notificationTypes)[number] | '';
type NotificationPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
interface NotificationProps {
  /**
   * @description custom class name for Notification
   */
  customClass?: string;
  /**
   * @description whether `message` is treated as HTML string
   */
  dangerouslyUseHTMLString?: boolean;
  /**
   * @description duration before close. It will not automatically close if set 0
   */
  duration?: number;
  /**
   * @description custom icon component. It will be overridden by `type`
   */
  icon?: IconPropType;
  /**
   * @description notification dom id
   */
  id?: string;
  /**
   * @description description text
   */
  message?: string | VNode | (() => VNode);
  /**
   * @description offset from the top edge of the screen. Every Notification instance of the same moment should have the same offset
   */
  offset?: number;
  /**
   * @description callback function when notification clicked
   */
  onClick?: () => void;
  /**
   * @description callback function when closed
   */
  onClose: () => void;
  /**
   * @description custom position
   */
  position?: NotificationPosition;
  /**
   * @description whether to show a close button
   */
  showClose?: boolean;
  /**
   * @description title
   */
  title?: string;
  /**
   * @description notification type
   */
  type?: NotificationType;
  /**
   * @description initial zIndex
   */
  zIndex?: number;
  /**
   * @description custom close icon, default is Close
   */
  closeIcon?: IconPropType;
}
/**
 * @deprecated Removed after 3.0.0, Use `NotificationProps` instead.
 */
declare const notificationProps: {
  readonly customClass: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly dangerouslyUseHTMLString: BooleanConstructor;
  readonly duration: EpPropFinalized<NumberConstructor, unknown, unknown, 4500, boolean>;
  readonly icon: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
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
  readonly offset: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly onClick: EpPropFinalized<(new (...args: any[]) => () => void) | (() => () => void) | {
    (): () => void;
    new (): any;
    readonly prototype: any;
  } | (((new (...args: any[]) => () => void) | (() => () => void) | {
    (): () => void;
    new (): any;
    readonly prototype: any;
  }) | null)[], unknown, unknown, () => undefined, boolean>;
  readonly onClose: {
    readonly type: vue.PropType<() => void>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly position: EpPropFinalized<StringConstructor, "top-left" | "top-right" | "bottom-left" | "bottom-right", unknown, "top-right", boolean>;
  readonly showClose: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly title: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly type: EpPropFinalized<StringConstructor, "" | "error" | "info" | "primary" | "success" | "warning", unknown, "", boolean>;
  readonly zIndex: NumberConstructor;
  readonly closeIcon: EpPropFinalized<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown, vue.DefineComponent<{}, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `NotificationProps` instead.
 */
type NotificationPropsPublic = ExtractPublicPropTypes<typeof notificationProps>;
declare const notificationEmits: {
  destroy: () => boolean;
};
type NotificationEmits = typeof notificationEmits;
type NotificationInstance = InstanceType<typeof _default> & unknown;
type NotificationOptions = Omit<NotificationProps, 'id' | 'onClose'> & {
  /**
   * @description set the root element for the notification, default to `document.body`
   */
  appendTo?: HTMLElement | string;
  /**
   * @description callback function when closed
   */
  onClose?(vm: VNode): void;
};
type NotificationOptionsTyped = Omit<NotificationOptions, 'type'>;
interface NotificationHandle {
  close: () => void;
}
type NotificationParams = Partial<NotificationOptions> | string | VNode;
type NotificationParamsTyped = Partial<NotificationOptionsTyped> | string | VNode;
interface NotifyFn {
  (options?: NotificationParams, appContext?: null | AppContext): NotificationHandle;
  closeAll(): void;
  updateOffsets(position?: NotificationOptions['position']): void;
  _context: AppContext | null;
}
type NotifyTypedFn = (options?: NotificationParamsTyped, appContext?: null | AppContext) => NotificationHandle;
interface Notify extends NotifyFn {
  primary: NotifyTypedFn;
  success: NotifyTypedFn;
  warning: NotifyTypedFn;
  error: NotifyTypedFn;
  info: NotifyTypedFn;
}
interface NotificationQueueItem {
  vm: VNode;
}
type NotificationQueue = NotificationQueueItem[];
//#endregion
export { NotificationEmits, NotificationHandle, NotificationInstance, NotificationOptions, NotificationOptionsTyped, NotificationParams, NotificationParamsTyped, NotificationPosition, NotificationProps, NotificationPropsPublic, NotificationQueue, NotificationQueueItem, NotificationType, Notify, NotifyFn, NotifyTypedFn, notificationEmits, notificationProps, notificationTypes };