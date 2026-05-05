Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
const require_error = require('../../utils/error.js');
let vue = require("vue");

//#region ../../packages/hooks/use-deprecated/index.ts
const useDeprecated = ({ from, replacement, scope, version, ref, type = "API" }, condition) => {
	(0, vue.watch)(() => (0, vue.unref)(condition), (val) => {
		if (val) require_error.debugWarn(scope, `[${type}] ${from} is about to be deprecated in version ${version}, please use ${replacement} instead.
For more detail, please visit: ${ref}
`);
	}, { immediate: true });
};

//#endregion
exports.useDeprecated = useDeprecated;
//# sourceMappingURL=index.js.map