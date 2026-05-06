Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../_virtual/_rolldown/runtime.js');
let _vue_shared = require("@vue/shared");
let lodash_unified = require("lodash-unified");

//#region ../../packages/utils/types.ts
const isUndefined = (val) => val === void 0;
const isBoolean = (val) => typeof val === "boolean";
const isNumber = (val) => typeof val === "number";
const isEmpty = (val) => !val && val !== 0 || (0, _vue_shared.isArray)(val) && val.length === 0 || (0, _vue_shared.isObject)(val) && !Object.keys(val).length;
const isElement = (e) => {
	if (typeof Element === "undefined") return false;
	return e instanceof Element;
};
const isPropAbsent = (prop) => (0, lodash_unified.isNil)(prop);
const isStringNumber = (val) => {
	if (!(0, _vue_shared.isString)(val)) return false;
	return !Number.isNaN(Number(val));
};
const isWindow = (val) => val === window;

//#endregion
Object.defineProperty(exports, 'isArray', {
  enumerable: true,
  get: function () {
    return _vue_shared.isArray;
  }
});
exports.isBoolean = isBoolean;
Object.defineProperty(exports, 'isDate', {
  enumerable: true,
  get: function () {
    return _vue_shared.isDate;
  }
});
exports.isElement = isElement;
exports.isEmpty = isEmpty;
Object.defineProperty(exports, 'isFunction', {
  enumerable: true,
  get: function () {
    return _vue_shared.isFunction;
  }
});
exports.isNumber = isNumber;
Object.defineProperty(exports, 'isObject', {
  enumerable: true,
  get: function () {
    return _vue_shared.isObject;
  }
});
Object.defineProperty(exports, 'isPlainObject', {
  enumerable: true,
  get: function () {
    return _vue_shared.isPlainObject;
  }
});
Object.defineProperty(exports, 'isPromise', {
  enumerable: true,
  get: function () {
    return _vue_shared.isPromise;
  }
});
exports.isPropAbsent = isPropAbsent;
Object.defineProperty(exports, 'isString', {
  enumerable: true,
  get: function () {
    return _vue_shared.isString;
  }
});
exports.isStringNumber = isStringNumber;
Object.defineProperty(exports, 'isSymbol', {
  enumerable: true,
  get: function () {
    return _vue_shared.isSymbol;
  }
});
exports.isUndefined = isUndefined;
exports.isWindow = isWindow;
//# sourceMappingURL=types.js.map