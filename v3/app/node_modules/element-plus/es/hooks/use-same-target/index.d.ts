//#region ../../packages/hooks/use-same-target/index.d.ts
declare const useSameTarget: (handleClick?: (e: MouseEvent) => void) => {
  onClick: (e: MouseEvent) => void;
  onMousedown: (e: MouseEvent) => void;
  onMouseup: (e: MouseEvent) => void;
};
//#endregion
export { useSameTarget };