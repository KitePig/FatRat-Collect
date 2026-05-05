Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
let _vueuse_core = require("@vueuse/core");
let _vue_shared = require("@vue/shared");

//#region ../../packages/utils/dom/element.ts
const getElement = ((target) => {
	if (!_vueuse_core.isClient || target === "") return null;
	if ((0, _vue_shared.isString)(target)) try {
		return document.querySelector(target);
	} catch {
		return null;
	}
	return target;
});

//#endregion
exports.getElement = getElement;
//# sourceMappingURL=element.js.map