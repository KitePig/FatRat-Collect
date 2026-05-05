//#region ../../packages/utils/dom/aria.d.ts
declare const isShadowRoot: (e: unknown) => e is ShadowRoot;
/**
 * Determine if the testing element is visible on screen no matter if its on the viewport or not
 */
declare const isVisible: (element: HTMLElement) => boolean;
declare const obtainAllFocusableElements: (element: HTMLElement) => HTMLElement[];
/**
 * @desc Determine if target element is focusable
 * @param element {HTMLElement}
 * @returns {Boolean} true if it is focusable
 */
declare const isFocusable: (element: HTMLElement) => boolean;
/**
 * Trigger an event
 * mouseenter, mouseleave, mouseover, keyup, change, click, etc.
 * @param  {HTMLElement} elm
 * @param  {String} name
 * @param  {*} opts
 */
declare const triggerEvent: (elm: HTMLElement, name: string, ...opts: Array<boolean>) => HTMLElement;
declare const isLeaf: (el: HTMLElement) => boolean;
declare const getSibling: (el: HTMLElement, distance: number, elClass: string) => Element | null;
declare const focusElement: (el?: HTMLElement | {
  focus: () => void;
} | null, options?: FocusOptions) => void;
declare const focusNode: (el: HTMLElement) => void;
//#endregion
export { focusElement, focusNode, getSibling, isFocusable, isLeaf, isShadowRoot, isVisible, obtainAllFocusableElements, triggerEvent };