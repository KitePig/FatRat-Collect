Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../../hooks/use-prop/index.js');
const require_index$1 = require('../../../../hooks/use-size/index.js');
const require_constants = require('../constants.js');
let vue = require("vue");

//#region ../../packages/components/form/src/hooks/use-form-common-props.ts
const useFormSize = (fallback, ignore = {}) => {
	const emptyRef = (0, vue.ref)(void 0);
	const size = ignore.prop ? emptyRef : require_index.useProp("size");
	const globalConfig = ignore.global ? emptyRef : require_index$1.useGlobalSize();
	const form = ignore.form ? { size: void 0 } : (0, vue.inject)(require_constants.formContextKey, void 0);
	const formItem = ignore.formItem ? { size: void 0 } : (0, vue.inject)(require_constants.formItemContextKey, void 0);
	return (0, vue.computed)(() => size.value || (0, vue.unref)(fallback) || formItem?.size || form?.size || globalConfig.value || "");
};
const useFormDisabled = (fallback) => {
	const disabled = require_index.useProp("disabled");
	const form = (0, vue.inject)(require_constants.formContextKey, void 0);
	return (0, vue.computed)(() => {
		return disabled.value ?? (0, vue.unref)(fallback) ?? form?.disabled ?? false;
	});
};
const useSize = useFormSize;
const useDisabled = useFormDisabled;

//#endregion
exports.useDisabled = useDisabled;
exports.useFormDisabled = useFormDisabled;
exports.useFormSize = useFormSize;
exports.useSize = useSize;
//# sourceMappingURL=use-form-common-props.js.map