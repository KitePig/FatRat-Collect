import { CSSProperties } from "vue";

//#region ../../packages/utils/dom/style.d.ts
declare const classNameToArray: (cls?: string) => string[];
declare const hasClass: (el: Element, cls: string) => boolean;
declare const addClass: (el: Element, cls: string) => void;
declare const removeClass: (el: Element, cls: string) => void;
declare const getStyle: (element: HTMLElement, styleName: keyof CSSProperties) => string;
declare const setStyle: (element: HTMLElement, styleName: CSSProperties | keyof CSSProperties, value?: string | number) => void;
declare const removeStyle: (element: HTMLElement, style: CSSProperties | keyof CSSProperties) => void;
declare function addUnit(value?: string | number, defaultUnit?: string): string | undefined;
//#endregion
export { addClass, addUnit, classNameToArray, getStyle, hasClass, removeClass, removeStyle, setStyle };