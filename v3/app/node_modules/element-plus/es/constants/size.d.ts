//#region ../../packages/constants/size.d.ts
declare const componentSizes: readonly ["", "default", "small", "large"];
type ComponentSize = (typeof componentSizes)[number];
declare const componentSizeMap: {
  readonly large: 40;
  readonly default: 32;
  readonly small: 24;
};
//#endregion
export { ComponentSize, componentSizeMap, componentSizes };