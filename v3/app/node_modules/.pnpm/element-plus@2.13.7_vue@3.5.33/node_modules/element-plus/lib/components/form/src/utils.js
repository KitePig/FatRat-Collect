Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_error = require('../../../utils/error.js');
let vue = require("vue");
let lodash_unified = require("lodash-unified");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/form/src/utils.ts
const SCOPE = "ElForm";
function useFormLabelWidth() {
	const potentialLabelWidthArr = (0, vue.ref)([]);
	const autoLabelWidth = (0, vue.computed)(() => {
		if (!potentialLabelWidthArr.value.length) return "0";
		const max = Math.max(...potentialLabelWidthArr.value);
		return max ? `${max}px` : "";
	});
	function getLabelWidthIndex(width) {
		const index = potentialLabelWidthArr.value.indexOf(width);
		if (index === -1 && autoLabelWidth.value === "0") require_error.debugWarn(SCOPE, `unexpected width ${width}`);
		return index;
	}
	function registerLabelWidth(val, oldVal) {
		if (val && oldVal) {
			const index = getLabelWidthIndex(oldVal);
			potentialLabelWidthArr.value.splice(index, 1, val);
		} else if (val) potentialLabelWidthArr.value.push(val);
	}
	function deregisterLabelWidth(val) {
		const index = getLabelWidthIndex(val);
		if (index > -1) potentialLabelWidthArr.value.splice(index, 1);
	}
	return {
		autoLabelWidth,
		registerLabelWidth,
		deregisterLabelWidth
	};
}
const filterFields = (fields, props) => {
	const normalized = (0, lodash_unified.castArray)(props).map((prop) => (0, _vue_shared.isArray)(prop) ? prop.join(".") : prop);
	return normalized.length > 0 ? fields.filter((field) => field.propString && normalized.includes(field.propString)) : fields;
};

//#endregion
exports.filterFields = filterFields;
exports.useFormLabelWidth = useFormLabelWidth;
//# sourceMappingURL=utils.js.map