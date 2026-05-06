Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../_virtual/_rolldown/runtime.js');
let lodash_unified = require("lodash-unified");
let _vue_shared = require("@vue/shared");

//#region ../../packages/utils/arrays.ts
const unique = (arr) => [...new Set(arr)];
const extractFirst = (arr) => {
	return (0, _vue_shared.isArray)(arr) ? arr[0] : arr;
};
/** like `_.castArray`, except falsy value returns empty array. */
const castArray = (arr) => {
	if (!arr && arr !== 0) return [];
	return (0, _vue_shared.isArray)(arr) ? arr : [arr];
};

//#endregion
exports.castArray = castArray;
Object.defineProperty(exports, 'ensureArray', {
  enumerable: true,
  get: function () {
    return lodash_unified.castArray;
  }
});
exports.extractFirst = extractFirst;
exports.unique = unique;
//# sourceMappingURL=arrays.js.map