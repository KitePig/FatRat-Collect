import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { ComponentSize } from "../../../constants/size.js";
import "../../../utils/index.js";
import { _default } from "./tag.vue.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/tag/src/tag.d.ts
interface TagProps {
  /**
   * @description type of Tag
   */
  type?: 'primary' | 'success' | 'info' | 'warning' | 'danger';
  /**
   * @description whether Tag can be removed
   */
  closable?: boolean;
  /**
   * @description whether to disable animations
   */
  disableTransitions?: boolean;
  /**
   * @description whether Tag has a highlighted border
   */
  hit?: boolean;
  /**
   * @description background color of the Tag
   */
  color?: string;
  /**
   * @description size of Tag
   */
  size?: ComponentSize;
  /**
   * @description theme of Tag
   */
  effect?: 'dark' | 'light' | 'plain';
  /**
   * @description whether Tag is rounded
   */
  round?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `TagProps` instead.
 */
declare const tagProps: {
  readonly type: EpPropFinalized<StringConstructor, "info" | "primary" | "success" | "warning" | "danger", unknown, "primary", boolean>;
  readonly closable: BooleanConstructor;
  readonly disableTransitions: BooleanConstructor;
  readonly hit: BooleanConstructor;
  readonly color: StringConstructor;
  readonly size: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly effect: EpPropFinalized<StringConstructor, "light" | "dark" | "plain", unknown, "light", boolean>;
  readonly round: BooleanConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `TagProps` instead.
 */
type TagPropsPublic = ExtractPublicPropTypes<typeof tagProps>;
declare const tagEmits: {
  close: (evt: MouseEvent) => boolean;
  click: (evt: MouseEvent) => boolean;
};
type TagEmits = typeof tagEmits;
type TagInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { TagEmits, TagInstance, TagProps, TagPropsPublic, tagEmits, tagProps };