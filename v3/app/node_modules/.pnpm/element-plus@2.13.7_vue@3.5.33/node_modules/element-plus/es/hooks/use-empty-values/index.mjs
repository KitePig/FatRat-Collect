import { isArray, isFunction } from "../../utils/types.mjs";
import { debugWarn } from "../../utils/error.mjs";
import { buildProps, definePropType } from "../../utils/vue/props/runtime.mjs";
import { isEqual } from "lodash-unified";
import { computed, getCurrentInstance, inject, ref } from "vue";

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
const useEmptyValuesProps = buildProps({
	emptyValues: Array,
	valueOnClear: {
		type: definePropType([
			String,
			Number,
			Boolean,
			Function
		]),
		default: void 0,
		validator: (val) => {
			val = isFunction(val) ? val() : val;
			if (isArray(val)) return val.every((item) => !item);
			return !val;
		}
	}
});
const useEmptyValues = (props, defaultValue) => {
	const config = getCurrentInstance() ? inject(emptyValuesContextKey, ref({})) : ref({});
	const emptyValues = computed(() => props.emptyValues || config.value.emptyValues || DEFAULT_EMPTY_VALUES);
	const valueOnClear = computed(() => {
		if (isFunction(props.valueOnClear)) return props.valueOnClear();
		else if (props.valueOnClear !== void 0) return props.valueOnClear;
		else if (isFunction(config.value.valueOnClear)) return config.value.valueOnClear();
		else if (config.value.valueOnClear !== void 0) return config.value.valueOnClear;
		return defaultValue !== void 0 ? defaultValue : DEFAULT_VALUE_ON_CLEAR;
	});
	const isEmptyValue = (value) => {
		let result = true;
		if (isArray(value)) result = emptyValues.value.some((emptyValue) => {
			return isEqual(value, emptyValue);
		});
		else result = emptyValues.value.includes(value);
		return result;
	};
	if (!isEmptyValue(valueOnClear.value)) debugWarn(SCOPE, "value-on-clear should be a value of empty-values");
	return {
		emptyValues,
		valueOnClear,
		isEmptyValue
	};
};

//#endregion
export { DEFAULT_EMPTY_VALUES, DEFAULT_VALUE_ON_CLEAR, SCOPE, emptyValuesContextKey, useEmptyValues, useEmptyValuesProps };
//# sourceMappingURL=index.mjs.map