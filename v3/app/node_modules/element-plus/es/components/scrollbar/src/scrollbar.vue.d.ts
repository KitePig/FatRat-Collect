import { ScrollbarDirection, ScrollbarProps } from "./scrollbar.js";
import * as vue from "vue";
import { CSSProperties, StyleValue } from "vue";

//#region ../../packages/components/scrollbar/src/scrollbar.vue.d.ts
declare function scrollTo(xCord: number, yCord?: number): void;
declare function scrollTo(options: ScrollToOptions): void;
declare var __VLS_9: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_9) => any;
};
declare const __VLS_base: vue.DefineComponent<ScrollbarProps, {
  /** @description scrollbar wrap ref */wrapRef: vue.Ref<HTMLDivElement | undefined, HTMLDivElement | undefined>; /** @description update scrollbar state manually */
  update: () => void; /** @description scrolls to a particular set of coordinates */
  scrollTo: typeof scrollTo; /** @description set distance to scroll top */
  setScrollTop: (value: number) => void; /** @description set distance to scroll left */
  setScrollLeft: (value: number) => void; /** @description handle scroll event */
  handleScroll: () => void;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  scroll: (args_0: {
    scrollTop: number;
    scrollLeft: number;
  }) => void;
  "end-reached": (direction: ScrollbarDirection) => void;
}, string, vue.PublicProps, Readonly<ScrollbarProps> & Readonly<{
  onScroll?: ((args_0: {
    scrollTop: number;
    scrollLeft: number;
  }) => any) | undefined;
  "onEnd-reached"?: ((direction: ScrollbarDirection) => any) | undefined;
}>, {
  tabindex: number | string;
  height: number | string;
  maxHeight: number | string;
  tag: keyof HTMLElementTagNameMap | (string & {});
  distance: number;
  wrapStyle: string | false | CSSProperties | StyleValue[] | null;
  wrapClass: string | string[];
  viewClass: string | string[];
  viewStyle: string | false | CSSProperties | StyleValue[] | null;
  minSize: number;
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