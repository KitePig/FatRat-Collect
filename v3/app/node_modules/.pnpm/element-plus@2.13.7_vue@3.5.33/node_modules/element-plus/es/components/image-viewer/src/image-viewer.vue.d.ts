import { ImageViewerAction, ImageViewerProps } from "./image-viewer.js";
import * as vue from "vue";

//#region ../../packages/components/image-viewer/src/image-viewer.vue.d.ts
declare function toggleMode(): void;
declare function setActiveItem(index: number): void;
declare function prev(): void;
declare function next(): void;
declare function handleActions(action: ImageViewerAction, options?: {}): void;
declare var __VLS_56: {
    activeIndex: number;
    total: number;
  }, __VLS_58: {
    actions: typeof handleActions;
    prev: typeof prev;
    next: typeof next;
    reset: typeof toggleMode;
    activeIndex: number;
    setActiveItem: typeof setActiveItem;
  }, __VLS_125: {
    activeIndex: number;
    src: string;
  }, __VLS_127: {};
type __VLS_Slots = {} & {
  progress?: (props: typeof __VLS_56) => any;
} & {
  toolbar?: (props: typeof __VLS_58) => any;
} & {
  'viewer-error'?: (props: typeof __VLS_125) => any;
} & {
  default?: (props: typeof __VLS_127) => any;
};
declare const __VLS_base: vue.DefineComponent<ImageViewerProps, {
  /**
   * @description manually switch image
   */
  setActiveItem: typeof setActiveItem;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  close: () => void;
  error: (evt: Event) => void;
  rotate: (deg: number) => void;
  switch: (index: number) => void;
}, string, vue.PublicProps, Readonly<ImageViewerProps> & Readonly<{
  onClose?: (() => any) | undefined;
  onError?: ((evt: Event) => any) | undefined;
  onRotate?: ((deg: number) => any) | undefined;
  onSwitch?: ((index: number) => any) | undefined;
}>, {
  infinite: boolean;
  scale: number;
  initialIndex: number;
  closeOnPressEscape: boolean;
  zoomRate: number;
  minScale: number;
  maxScale: number;
  urlList: string[];
}, {}, {}, {}, string, vue.ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
type __VLS_WithSlots<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
export { _default };