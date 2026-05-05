//#region ../../packages/utils/dom/element.d.ts
type GetElement = <T extends string | HTMLElement | Window | null | undefined>(target: T) => T extends string ? HTMLElement | null : T;
declare const getElement: GetElement;
//#endregion
export { getElement };