Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../_virtual/_rolldown/runtime.js');
let _vue_shared = require("@vue/shared");

//#region ../../packages/utils/error.ts
var ElementPlusError = class extends Error {
	constructor(m) {
		super(m);
		this.name = "ElementPlusError";
	}
};
function throwError(scope, m) {
	throw new ElementPlusError(`[${scope}] ${m}`);
}
function debugWarn(scope, message) {
	if (process.env.NODE_ENV !== "production") {
		const error = (0, _vue_shared.isString)(scope) ? new ElementPlusError(`[${scope}] ${message}`) : scope;
		console.warn(error);
	}
}

//#endregion
exports.debugWarn = debugWarn;
exports.throwError = throwError;
//# sourceMappingURL=error.js.map