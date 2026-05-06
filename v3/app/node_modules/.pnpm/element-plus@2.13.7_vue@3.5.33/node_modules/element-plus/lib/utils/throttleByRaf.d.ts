//#region ../../packages/utils/throttleByRaf.d.ts
declare function throttleByRaf(cb: (...args: any[]) => void): {
  (...args: any[]): void;
  cancel(): void;
};
//#endregion
export { throttleByRaf };