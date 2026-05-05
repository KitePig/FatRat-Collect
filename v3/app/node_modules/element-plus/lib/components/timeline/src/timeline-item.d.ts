import { IconPropType } from "../../../utils/vue/icon.js";
import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { _default } from "./timeline-item.vue.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/timeline/src/timeline-item.d.ts
interface TimelineItemProps {
  /**
   * @description timestamp content
   */
  timestamp?: string;
  /**
   * @description whether to show timestamp
   */
  hideTimestamp?: boolean;
  /**
   * @description whether vertically centered
   */
  center?: boolean;
  /**
   * @description position of timestamp
   */
  placement?: 'top' | 'bottom';
  /**
   * @description node type
   */
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | '';
  /**
   * @description background color of node
   */
  color?: string;
  /**
   * @description node size
   */
  size?: 'normal' | 'large';
  /**
   * @description icon component
   */
  icon?: IconPropType;
  /**
   * @description icon is hollow
   */
  hollow?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `TimelineItemProps` instead.
 */
declare const timelineItemProps: {
  readonly timestamp: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly hideTimestamp: BooleanConstructor;
  readonly center: BooleanConstructor;
  readonly placement: EpPropFinalized<StringConstructor, "top" | "bottom", unknown, "bottom", boolean>;
  readonly type: EpPropFinalized<StringConstructor, "info" | "primary" | "success" | "warning" | "danger", unknown, "", boolean>;
  readonly color: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly size: EpPropFinalized<StringConstructor, "large" | "normal", unknown, "normal", boolean>;
  readonly icon: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly hollow: BooleanConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `TimelineItemProps` instead.
 */
type TimelineItemPropsPublic = ExtractPublicPropTypes<typeof timelineItemProps>;
type TimelineItemInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { TimelineItemInstance, TimelineItemProps, TimelineItemPropsPublic, timelineItemProps };