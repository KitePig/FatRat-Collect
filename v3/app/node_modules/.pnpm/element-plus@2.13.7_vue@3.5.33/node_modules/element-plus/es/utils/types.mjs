import { isArray, isArray as isArray$1, isDate, isFunction, isObject, isObject as isObject$1, isPlainObject, isPromise, isString, isString as isString$1, isSymbol } from "@vue/shared";
import { isNil } from "lodash-unified";

//#region ../../packages/utils/types.ts
const isUndefined = (val) => val === void 0;
const isBoolean = (val) => typeof val === "boolean";
const isNumber = (val) => typeof val === "number";
const isEmpty = (val) => !val && val !== 0 || isArray$1(val) && val.length === 0 || isObject$1(val) && !Object.keys(val).length;
const isElement = (e) => {
	if (typeof Element === "undefined") return false;
	return e instanceof Element;
};
const isPropAbsent = (prop) => isNil(prop);
const isStringNumber = (val) => {
	if (!isString$1(val)) return false;
	return !Number.isNaN(Number(val));
};
const isWindow = (val) => val === window;

//#endregion
export { isArray, isBoolean, isDate, isElement, isEmpty, isFunction, isNumber, isObject, isPlainObject, isPromise, isPropAbsent, isString, isStringNumber, isSymbol, isUndefined, isWindow };
//# sourceMappingURL=types.mjs.map