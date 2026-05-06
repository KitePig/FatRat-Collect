import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { _default } from "./watermark.vue.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/watermark/src/watermark.d.ts
interface WatermarkFontType {
  color?: string;
  fontSize?: number | string;
  fontWeight?: 'normal' | 'bold' | 'lighter' | 'bolder' | number;
  fontStyle?: 'none' | 'normal' | 'italic' | 'oblique';
  fontFamily?: string;
  fontGap?: number;
  textAlign?: 'start' | 'end' | 'left' | 'right' | 'center';
  textBaseline?: 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom';
}
interface WatermarkProps {
  /**
   * @description The z-index of the appended watermark element
   */
  zIndex?: number;
  /**
   * @description The rotation angle of the watermark
   */
  rotate?: number;
  /**
   * @description The width of the watermark
   */
  width?: number;
  /**
   * @description The height of the watermark
   */
  height?: number;
  /**
   * @description Image source, it is recommended to export 2x or 3x image, high priority (support base64 format)
   */
  image?: string;
  /**
   * @description Watermark text content
   */
  content?: string | string[];
  /**
   * @description Text style
   */
  font?: WatermarkFontType;
  /**
   * @description The spacing between watermarks
   */
  gap?: [number, number];
  /**
   * @description The offset of the watermark from the upper left corner of the container. The default is gap/2
   */
  offset?: [number, number];
}
/**
 * @deprecated Removed after 3.0.0, Use `WatermarkProps` instead.
 */
declare const watermarkProps: {
  readonly zIndex: EpPropFinalized<NumberConstructor, unknown, unknown, 9, boolean>;
  readonly rotate: EpPropFinalized<NumberConstructor, unknown, unknown, -22, boolean>;
  readonly width: NumberConstructor;
  readonly height: NumberConstructor;
  readonly image: StringConstructor;
  readonly content: EpPropFinalized<(new (...args: any[]) => string | string[]) | (() => string | string[]) | (((new (...args: any[]) => string | string[]) | (() => string | string[])) | null)[], unknown, unknown, "Element Plus", boolean>;
  readonly font: {
    readonly type: vue.PropType<WatermarkFontType>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly gap: EpPropFinalized<(new (...args: any[]) => [number, number]) | (() => [number, number]) | (((new (...args: any[]) => [number, number]) | (() => [number, number])) | null)[], unknown, unknown, () => number[], boolean>;
  readonly offset: {
    readonly type: vue.PropType<[number, number]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
/**
 * @deprecated Removed after 3.0.0, Use `WatermarkProps` instead.
 */
type WatermarkPropsPublic = ExtractPublicPropTypes<typeof watermarkProps>;
type WatermarkInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { WatermarkFontType, WatermarkInstance, WatermarkProps, WatermarkPropsPublic, watermarkProps };