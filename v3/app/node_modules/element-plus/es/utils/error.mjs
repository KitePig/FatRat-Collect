import { isString } from "./types.mjs";

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
	{
		const error = isString(scope) ? new ElementPlusError(`[${scope}] ${message}`) : scope;
		console.warn(error);
	}
}

//#endregion
export { debugWarn, throwError };
//# sourceMappingURL=error.mjs.map