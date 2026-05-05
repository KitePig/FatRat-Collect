Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../_virtual/_rolldown/runtime.js');
let _vue_shared = require("@vue/shared");
let lodash_unified = require("lodash-unified");

//#region ../../packages/utils/objects.ts
const keysOf = (arr) => Object.keys(arr);
const entriesOf = (arr) => Object.entries(arr);
const getProp = (obj, path, defaultValue) => {
	return {
		get value() {
			return (0, lodash_unified.get)(obj, path, defaultValue);
		},
		set value(val) {
			(0, lodash_unified.set)(obj, path, val);
		}
	};
};

//#endregion
exports.entriesOf = entriesOf;
exports.getProp = getProp;
Object.defineProperty(exports, 'hasOwn', {
  enumerable: true,
  get: function () {
    return _vue_shared.hasOwn;
  }
});
exports.keysOf = keysOf;
//# sourceMappingURL=objects.js.map