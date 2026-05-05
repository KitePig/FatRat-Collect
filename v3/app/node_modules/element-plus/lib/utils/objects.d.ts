import { Arrayable } from "./typescript.js";
import "./index.js";
import { hasOwn } from "@vue/shared";

//#region ../../packages/utils/objects.d.ts
declare const keysOf: <T extends object>(arr: T) => Array<keyof T>;
declare const entriesOf: <T extends object>(arr: T) => [keyof T, T[keyof T]][];
declare const getProp: <T = any>(obj: Record<string, any>, path: Arrayable<string>, defaultValue?: any) => {
  value: T;
};
//#endregion
export { entriesOf, getProp, hasOwn, keysOf };