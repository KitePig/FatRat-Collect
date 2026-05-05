import { isArray, isDate, isFunction, isObject, isPlainObject, isPromise, isString, isSymbol } from "@vue/shared";

//#region ../../packages/utils/types.d.ts
declare const isUndefined: (val: any) => val is undefined;
declare const isBoolean: (val: any) => val is boolean;
declare const isNumber: (val: any) => val is number;
declare const isEmpty: (val: unknown) => boolean;
declare const isElement: (e: unknown) => e is Element;
declare const isPropAbsent: (prop: unknown) => prop is null | undefined;
declare const isStringNumber: (val: string) => boolean;
declare const isWindow: (val: unknown) => val is Window;
//#endregion
export { isArray, isBoolean, isDate, isElement, isEmpty, isFunction, isNumber, isObject, isPlainObject, isPromise, isPropAbsent, isString, isStringNumber, isSymbol, isUndefined, isWindow };