import { EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { PopperEffect } from "../../popper/src/popper.js";
import { Placement } from "../../popper/index.js";
import * as vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes, StyleValue } from "vue";

//#region ../../packages/components/avatar/src/avatar-group-props.d.ts
declare const avatarGroupProps: {
  /**
   * @description control the size of avatars in this avatar-group
   */
  readonly size: {
    readonly type: vue.PropType<number | "" | "default" | "small" | "large" | undefined>;
    readonly values: readonly ["", "default", "small", "large"];
    readonly validator: (val: unknown) => val is number;
  };
  /**
   * @description control the shape of avatars in this avatar-group
   */
  readonly shape: {
    readonly type: vue.PropType<"square" | "circle" | undefined>;
    readonly values: readonly ["circle", "square"];
  };
  /**
   * @description whether to collapse avatars
   */
  readonly collapseAvatars: BooleanConstructor;
  /**
   * @description whether show all collapsed avatars when mouse hover text of the collapse-avatar. To use this, `collapse-avatars` must be true
   */
  readonly collapseAvatarsTooltip: BooleanConstructor;
  /**
   * @description the max avatars number to be shown. To use this, `collapse-avatars` must be true
   */
  readonly maxCollapseAvatars: {
    readonly type: NumberConstructor;
    readonly default: 1;
  };
  /**
   * @description tooltip theme, built-in theme: `dark` / `light`
   */
  readonly effect: {
    readonly type: vue.PropType<PopperEffect>;
    readonly default: "light";
  };
  /**
   * @description placement of tooltip
   */
  readonly placement: {
    readonly type: vue.PropType<Placement>;
    readonly values: Placement[];
    readonly default: "top";
  };
  /**
   * @description custom class name for tooltip
   */
  readonly popperClass: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | any)[])[])[])[])[])[])[])[])[])[])[]) | (((new (...args: any[]) => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | any)[])[])[])[])[])[])[])[])[])[])[])) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  /**
   * @description custom style for tooltip
   */
  readonly popperStyle: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue) | (((new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  /**
   * @description custom class name for the collapse-avatar
   */
  readonly collapseClass: StringConstructor;
  /**
   * @description custom style for the collapse-avatar
   */
  readonly collapseStyle: {
    readonly type: vue.PropType<StyleValue>;
  };
};
type AvatarGroupProps = ExtractPropTypes<typeof avatarGroupProps>;
type AvatarGroupPropsPublic = ExtractPublicPropTypes<typeof avatarGroupProps>;
//#endregion
export { AvatarGroupProps, AvatarGroupPropsPublic, avatarGroupProps };