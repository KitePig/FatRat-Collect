//#region ../../packages/utils/raf.d.ts
declare const rAF: (fn: () => void) => number;
declare const cAF: (handle: number) => void;
//#endregion
export { cAF, rAF };