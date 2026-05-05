import { castArray as ensureArray } from "lodash-unified";

//#region ../../packages/utils/arrays.d.ts
declare const unique: <T>(arr: T[]) => T[];
declare const extractFirst: <T>(arr: T | T[]) => T;
type Many<T> = T | ReadonlyArray<T>;
/** like `_.castArray`, except falsy value returns empty array. */
declare const castArray: <T>(arr: Many<T>) => T[];
//#endregion
export { castArray, ensureArray, extractFirst, unique };