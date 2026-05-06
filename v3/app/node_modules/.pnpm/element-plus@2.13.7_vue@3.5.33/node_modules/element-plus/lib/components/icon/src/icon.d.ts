import { EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { _default } from "./icon.vue.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/icon/src/icon.d.ts
interface IconProps {
  /**
   * @description SVG icon size, size x size
   */
  size?: number | string;
  /**
   * @description SVG tag's fill attribute
   */
  color?: string;
}
/**
 * @deprecated Removed after 3.0.0, Use `IconProps` instead.
 */
declare const iconProps: {
  readonly size: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | number) | (() => string | number) | (((new (...args: any[]) => string | number) | (() => string | number)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly color: {
    readonly type: vue.PropType<string>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
/**
 * @deprecated Removed after 3.0.0, Use `IconProps` instead.
 */
type IconPropsPublic = ExtractPublicPropTypes<typeof iconProps>;
type IconInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { IconInstance, IconProps, IconPropsPublic, iconProps };