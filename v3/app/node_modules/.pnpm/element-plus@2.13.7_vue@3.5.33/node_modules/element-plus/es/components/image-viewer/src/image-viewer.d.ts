import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { _default } from "./image-viewer.vue.js";
import * as vue from "vue";
import { Component, ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/image-viewer/src/image-viewer.d.ts
type ImageViewerAction = 'zoomIn' | 'zoomOut' | 'clockwise' | 'anticlockwise';
type ImageViewerCrossorigin = 'anonymous' | 'use-credentials' | '';
interface ImageViewerProps {
  /**
   * @description preview link list.
   */
  urlList?: string[];
  /**
   * @description preview backdrop z-index.
   */
  zIndex?: number;
  /**
   * @description the initial preview image index, less than or equal to the length of `url-list`.
   */
  initialIndex?: number;
  /**
   * @description whether preview is infinite.
   */
  infinite?: boolean;
  /**
   * @description whether user can emit close event when clicking backdrop.
   */
  hideOnClickModal?: boolean;
  /**
   * @description whether to append image itself to body. A nested parent element attribute transform should have this attribute set to `true`.
   */
  teleported?: boolean;
  /**
   * @description whether the image-viewer can be closed by pressing ESC.
   */
  closeOnPressEscape?: boolean;
  /**
   * @description the zoom rate of the image viewer zoom event.
   */
  zoomRate?: number;
  /**
   * @description preview image scale.
   */
  scale?: number;
  /**
   * @description the min scale of the image viewer zoom event.
   */
  minScale?: number;
  /**
   * @description the max scale of the image viewer zoom event.
   */
  maxScale?: number;
  /**
   * @description show preview image progress content.
   */
  showProgress?: boolean;
  /**
   * @description set HTML attribute: crossorigin.
   */
  crossorigin?: ImageViewerCrossorigin;
}
/**
 * @deprecated Removed after 3.0.0, Use `ImageViewerProps` instead.
 */
declare const imageViewerProps: {
  readonly urlList: EpPropFinalized<(new (...args: any[]) => string[]) | (() => string[]) | (((new (...args: any[]) => string[]) | (() => string[])) | null)[], unknown, unknown, () => [], boolean>;
  readonly zIndex: {
    readonly type: vue.PropType<number>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly initialIndex: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly infinite: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly hideOnClickModal: BooleanConstructor;
  readonly teleported: BooleanConstructor;
  readonly closeOnPressEscape: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly zoomRate: EpPropFinalized<NumberConstructor, unknown, unknown, 1.2, boolean>;
  readonly scale: EpPropFinalized<NumberConstructor, unknown, unknown, 1, boolean>;
  readonly minScale: EpPropFinalized<NumberConstructor, unknown, unknown, 0.2, boolean>;
  readonly maxScale: EpPropFinalized<NumberConstructor, unknown, unknown, 7, boolean>;
  readonly showProgress: BooleanConstructor;
  readonly crossorigin: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => "" | "anonymous" | "use-credentials") | (() => ImageViewerCrossorigin) | (((new (...args: any[]) => "" | "anonymous" | "use-credentials") | (() => ImageViewerCrossorigin)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
/**
 * @deprecated Removed after 3.0.0, Use `ImageViewerProps` instead.
 */
type ImageViewerPropsPublic = ExtractPublicPropTypes<typeof imageViewerProps>;
declare const imageViewerEmits: {
  close: () => boolean;
  error: (evt: Event) => boolean;
  switch: (index: number) => boolean;
  rotate: (deg: number) => boolean;
};
type ImageViewerEmits = typeof imageViewerEmits;
interface ImageViewerMode {
  name: string;
  icon: Component;
}
type ImageViewerInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { ImageViewerAction, ImageViewerCrossorigin, ImageViewerEmits, ImageViewerInstance, ImageViewerMode, ImageViewerProps, ImageViewerPropsPublic, imageViewerEmits, imageViewerProps };