import { isArray } from "./types.mjs";
import { castArray as ensureArray } from "lodash-unified";

//#region ../../packages/utils/arrays.ts
const unique = (arr) => [...new Set(arr)];
const extractFirst = (arr) => {
	return isArray(arr) ? arr[0] : arr;
};
/** like `_.castArray`, except falsy value returns empty array. */
const castArray = (arr) => {
	if (!arr && arr !== 0) return [];
	return isArray(arr) ? arr : [arr];
};

//#endregion
export { castArray, ensureArray, extractFirst, unique };
//# sourceMappingURL=arrays.mjs.map