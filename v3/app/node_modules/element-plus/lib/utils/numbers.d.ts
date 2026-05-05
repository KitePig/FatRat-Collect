//#region ../../packages/utils/numbers.d.ts
/**
 * Due to browser rendering and calculation precision loss issues,
 * boundary checks cannot be based solely on value equality;
 * a certain range of fluctuation is permissible.
 */
declare function isGreaterThan(a: number, b: number, epsilon?: number): boolean;
//#endregion
export { isGreaterThan };