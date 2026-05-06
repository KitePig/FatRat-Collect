import { LoadingOptionsResolved, LoadingParentElement } from "./types.js";
import * as vue from "vue";
import { AppContext, VNode } from "vue";

//#region ../../packages/components/loading/src/loading.d.ts
declare function createLoadingComponent(options: LoadingOptionsResolved, appContext: AppContext | null): {
  setText: (text: string | VNode | VNode[]) => void;
  removeElLoadingChild: () => void;
  close: () => void;
  handleAfterLeave: () => void;
  vm: vue.ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, vue.ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string, vue.ComponentProvideOptions>, {}, {}, "", {}, any>;
  $el: HTMLElement;
  originalPosition: vue.Ref<string, string>;
  originalOverflow: vue.Ref<string, string>;
  visible: vue.Ref<boolean, boolean>;
  parent: vue.Ref<LoadingParentElement, LoadingParentElement>;
  background: vue.Ref<string, string>;
  svg: vue.Ref<string, string>;
  svgViewBox: vue.Ref<string, string>;
  spinner: vue.Ref<string | boolean, string | boolean>;
  text: vue.Ref<string | VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
  }> | VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
  }>[], string | VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
  }> | VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
  }>[]>;
  fullscreen: vue.Ref<boolean, boolean>;
  lock: vue.Ref<boolean, boolean>;
  customClass: vue.Ref<string, string>;
  target: vue.Ref<HTMLElement, HTMLElement>;
  beforeClose?: vue.Ref<(() => boolean) | undefined, (() => boolean) | undefined> | undefined;
  closed?: vue.Ref<(() => void) | undefined, (() => void) | undefined> | undefined;
};
type LoadingInstance = ReturnType<typeof createLoadingComponent>;
//#endregion
export { LoadingInstance };