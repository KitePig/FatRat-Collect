import { VNode } from "vue";
import { MaybeRef } from "@vueuse/core";

//#region ../../packages/components/loading/src/types.d.ts
type LoadingOptionsResolved = {
  parent: LoadingParentElement;
  /**
   * @description background color of the mask
   */
  background: MaybeRef<string>;
  svg: MaybeRef<string>;
  svgViewBox: MaybeRef<string>;
  /**
   * @description class name of the custom spinner
   */
  spinner: MaybeRef<boolean | string>;
  /**
   * @description loading text that displays under the spinner
   */
  text: MaybeRef<string | VNode | VNode[]>;
  /**
   * @description same as the `fullscreen` modifier of `v-loading`
   */
  fullscreen: boolean;
  /**
   * @description same as the `lock` modifier of `v-loading`
   */
  lock: boolean;
  /**
   * @description custom class name for Loading
   */
  customClass: MaybeRef<string>;
  visible: boolean;
  target: HTMLElement;
  beforeClose?: () => boolean;
  closed?: () => void;
};
type LoadingOptions = Partial<Omit<LoadingOptionsResolved, 'parent' | 'target'> & {
  /**
   * @description the DOM node Loading needs to cover. Accepts a DOM object or a string. If it's a string, it will be passed to `document.querySelector` to get the corresponding DOM node
   */
  target: HTMLElement | string;
  /**
   * @description same as the `body` modifier of `v-loading`
   */
  body: boolean;
}>;
interface LoadingParentElement extends HTMLElement {
  vLoadingAddClassList?: () => void;
}
//#endregion
export { LoadingOptions, LoadingOptionsResolved, LoadingParentElement };