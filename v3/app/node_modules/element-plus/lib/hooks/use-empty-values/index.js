Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
const require_error = require('../../utils/error.js');
const require_runtime$1 = require('../../utils/vue/props/runtime.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/hooks/use-empty-values/index.ts
const emptyValuesContextKey = Symbol("emptyValuesContextKey");
const SCOPE = "use-empty-values";
const DEFAULT_EMPTY_VALUES = [
	"",
	void 0,
	null
];
const DEFAULT_VALUE_ON_CLEAR = void 0;
/**
* @deprecated Removed after 3.0.0, Use `UseEmptyValuesProps` instead.
*/
const useEmptyValuesProps = require_runtime$1.buildProps({
	emptyValues: Array,
	valueOnClear: {
		type: require_runtime$1.definePropType([
			String,
			Number,
			Boolean,
			Function
		]),
		default: void 0,
		validator: (val) => {
			val = (0, _vue_shared.isFunction)(val) ? val() : val;
			if ((0, _vue_shared.isArray)(val)) return val.every((item) => !item);
			return !val;
		}
	}
});
const useEmptyValues = (props, defaultValue) => {
	const config = (0, vue.getCurrentInstance)() ? (0, vue.inject)(emptyValuesContextKey, (0, vue.ref)({})) : (0, vue.ref)({});
	const emptyValues = (0, vue.computed)(() => props.emptyValues || config.value.emptyValues || DEFAULT_EMPTY_VALUES);
	const valueOnClear = (0, vue.computed)(() => {
		if ((0, _vue_shared.isFunction)(props.valueOnClear)) return props.valueOnClear();
		else if (props.valueOnClear !== void 0) return props.valueOnClear;
		else if ((0, _vue_shared.isFunction)(config.value.valueOnClear)) return config.value.valueOnClear();
		else if (config.value.valueOnClear !== void 0) return config.value.valueOnClear;
		return defaultValue !== void 0 ? defaultValue : DEFAULT_VALUE_ON_CLEAR;
	});
	const isEmptyValue = (value) => {
		let result = true;
		if ((0, _vue_shared.isArray)(value)) result = emptyValues.value.some((emptyValue) => {
			return (0, lodash_unified.isEqual)(value, emptyValue);
		});
		else result = emptyValues.value.includes(value);
		return result;
	};
	if (!isEmptyValue(valueOnClear.value)) require_error.debugWarn(SCOPE, "value-on-clear should be a value of empty-values");
	return {
		emptyValues,
		valueOnClear,
		isEmptyValue
	};
};

//#endregion
exports.DEFAULT_EMPTY_VALUES = DEFAULT_EMPTY_VALUES;
exports.DEFAULT_VALUE_ON_CLEAR = DEFAULT_VALUE_ON_CLEAR;
exports.SCOPE = SCOPE;
exports.emptyValuesContextKey = emptyValuesContextKey;
exports.useEmptyValues = useEmptyValues;
exports.useEmptyValuesProps = useEmptyValuesProps;
//# sourceMappingURL=index.js.map