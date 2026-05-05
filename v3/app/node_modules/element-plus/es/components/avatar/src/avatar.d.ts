import { IconPropType } from "../../../utils/vue/icon.js";
import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { ComponentSize } from "../../../constants/size.js";
import { ObjectFit } from "../../../utils/typescript.js";
import "../../../utils/index.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";
import * as csstype from "csstype";

//#region ../../packages/components/avatar/src/avatar.d.ts
interface AvatarProps {
  /**
   * @description avatar size.
   */
  size?: number | ComponentSize;
  /**
   * @description avatar shape.
   */
  shape?: 'circle' | 'square';
  /**
   * @description representation type to icon, more info on icon component.
   */
  icon?: IconPropType;
  /**
   * @description the source of the image for an image avatar.
   */
  src?: string;
  /**
   * @description native attribute `alt` of image avatar.
   */
  alt?: string;
  /**
   * @description native attribute srcset of image avatar.
   */
  srcSet?: string;
  /**
   * @description set how the image fit its container for an image avatar.
   */
  fit?: ObjectFit;
}
/**
 * @deprecated Removed after 3.0.0, Use `AvatarProps` instead.
 */
declare const avatarProps: {
  readonly size: {
    readonly type: vue.PropType<EpPropMergeType<readonly [NumberConstructor, StringConstructor], "" | "default" | "small" | "large", number>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly shape: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "square" | "circle", unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly icon: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly src: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly alt: StringConstructor;
  readonly srcSet: StringConstructor;
  readonly fit: EpPropFinalized<(new (...args: any[]) => "fill" | "-moz-initial" | "inherit" | "initial" | "revert" | "revert-layer" | "unset" | "none" | "contain" | "cover" | "scale-down") | (() => csstype.Property.ObjectFit | undefined) | (((new (...args: any[]) => "fill" | "-moz-initial" | "inherit" | "initial" | "revert" | "revert-layer" | "unset" | "none" | "contain" | "cover" | "scale-down") | (() => csstype.Property.ObjectFit | undefined)) | null)[], unknown, unknown, "cover", boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `AvatarProps` instead.
 */
type AvatarPropsPublic = ExtractPublicPropTypes<typeof avatarProps>;
declare const avatarEmits: {
  error: (evt: Event) => boolean;
};
type AvatarEmits = typeof avatarEmits;
//#endregion
export { AvatarEmits, AvatarProps, AvatarPropsPublic, avatarEmits, avatarProps };