import { ComponentPublicInstance, ObjectDirective } from "vue";

//#region ../../packages/components/infinite-scroll/src/index.d.ts
declare const SCOPE = "ElInfiniteScroll";
declare const CHECK_INTERVAL = 50;
declare const DEFAULT_DELAY = 200;
declare const DEFAULT_DISTANCE = 0;
type InfiniteScrollCallback = () => void;
type InfiniteScrollEl = HTMLElement & {
  [SCOPE]: {
    container: HTMLElement | Window;
    containerEl: HTMLElement;
    instance: ComponentPublicInstance;
    delay: number;
    lastScrollTop: number;
    cb: InfiniteScrollCallback;
    onScroll: () => void;
    observer?: MutationObserver;
  };
};
declare const InfiniteScroll: ObjectDirective<InfiniteScrollEl, InfiniteScrollCallback>;
//#endregion
export { CHECK_INTERVAL, DEFAULT_DELAY, DEFAULT_DISTANCE, SCOPE, InfiniteScroll as default };