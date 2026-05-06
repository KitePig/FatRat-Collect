//#region ../../packages/utils/dom/scroll.d.ts
declare const isScroll: (el: HTMLElement, isVertical?: boolean) => boolean;
declare const getScrollContainer: (el: HTMLElement, isVertical?: boolean) => Window | HTMLElement | undefined;
declare const getScrollBarWidth: (namespace: string) => number;
/**
 * Scroll with in the container element, positioning the **selected** element at the top
 * of the container
 */
declare function scrollIntoView(container: HTMLElement, selected: HTMLElement): void;
declare function animateScrollTo(container: HTMLElement | Window, from: number, to: number, duration: number, callback?: unknown): () => void;
declare const getScrollElement: (target: HTMLElement, container: HTMLElement | Window) => HTMLElement;
declare const getScrollTop: (container: HTMLElement | Window) => number;
//#endregion
export { animateScrollTo, getScrollBarWidth, getScrollContainer, getScrollElement, getScrollTop, isScroll, scrollIntoView };