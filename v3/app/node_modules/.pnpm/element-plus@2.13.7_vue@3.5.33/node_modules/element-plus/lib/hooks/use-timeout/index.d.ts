//#region ../../packages/hooks/use-timeout/index.d.ts
declare function useTimeout(): {
  registerTimeout: (fn: (...args: any[]) => any, delay: number) => void;
  cancelTimeout: () => void;
};
//#endregion
export { useTimeout };