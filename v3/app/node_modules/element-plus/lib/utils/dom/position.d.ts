//#region ../../packages/utils/dom/position.d.ts
declare const isInContainer: (el?: Element, container?: Element | Window) => boolean;
declare const getOffsetTop: (el: HTMLElement) => number;
declare const getOffsetTopDistance: (el: HTMLElement, containerEl: HTMLElement) => number;
declare const getClientXY: (event: MouseEvent | TouchEvent) => {
  clientX: number;
  clientY: number;
};
//#endregion
export { getClientXY, getOffsetTop, getOffsetTopDistance, isInContainer };