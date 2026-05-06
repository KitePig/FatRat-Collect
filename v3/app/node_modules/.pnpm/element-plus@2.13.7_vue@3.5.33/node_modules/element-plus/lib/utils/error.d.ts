//#region ../../packages/utils/error.d.ts
declare function throwError(scope: string, m: string): never;
declare function debugWarn(err: Error): void;
declare function debugWarn(scope: string, message: string): void;
//#endregion
export { debugWarn, throwError };