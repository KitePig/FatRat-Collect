Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../../hooks/use-id/index.js');
const require_constants = require('../constants.js');
let vue = require("vue");

//#region ../../packages/components/form/src/hooks/use-form-item.ts
const useFormItem = () => {
	return {
		form: (0, vue.inject)(require_constants.formContextKey, void 0),
		formItem: (0, vue.inject)(require_constants.formItemContextKey, void 0)
	};
};
const useFormItemInputId = (props, { formItemContext, disableIdGeneration, disableIdManagement }) => {
	if (!disableIdGeneration) disableIdGeneration = (0, vue.ref)(false);
	if (!disableIdManagement) disableIdManagement = (0, vue.ref)(false);
	const instance = (0, vue.getCurrentInstance)();
	const inLabel = () => {
		let parent = instance?.parent;
		while (parent) {
			if (parent.type.name === "ElFormItem") return false;
			if (parent.type.name === "ElLabelWrap") return true;
			parent = parent.parent;
		}
		return false;
	};
	const inputId = (0, vue.ref)();
	let idUnwatch = void 0;
	const isLabeledByFormItem = (0, vue.computed)(() => {
		return !!(!(props.label || props.ariaLabel) && formItemContext && formItemContext.inputIds && formItemContext.inputIds?.length <= 1);
	});
	(0, vue.onMounted)(() => {
		idUnwatch = (0, vue.watch)([(0, vue.toRef)(props, "id"), disableIdGeneration], ([id, disableIdGeneration]) => {
			const newId = id ?? (!disableIdGeneration ? require_index.useId().value : void 0);
			if (newId !== inputId.value) {
				if (formItemContext?.removeInputId && !inLabel()) {
					inputId.value && formItemContext.removeInputId(inputId.value);
					if (!disableIdManagement?.value && !disableIdGeneration && newId) formItemContext.addInputId(newId);
				}
				inputId.value = newId;
			}
		}, { immediate: true });
	});
	(0, vue.onUnmounted)(() => {
		idUnwatch && idUnwatch();
		if (formItemContext?.removeInputId) inputId.value && formItemContext.removeInputId(inputId.value);
	});
	return {
		isLabeledByFormItem,
		inputId
	};
};

//#endregion
exports.useFormItem = useFormItem;
exports.useFormItemInputId = useFormItemInputId;
//# sourceMappingURL=use-form-item.js.map