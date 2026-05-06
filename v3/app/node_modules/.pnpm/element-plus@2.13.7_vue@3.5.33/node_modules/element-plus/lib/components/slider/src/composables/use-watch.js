Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../../constants/event.js');
const require_types = require('../../../../utils/types.js');
const require_error = require('../../../../utils/error.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/slider/src/composables/use-watch.ts
const useWatch = (props, initData, minValue, maxValue, emit, elFormItem) => {
	const _emit = (val) => {
		emit(require_event.UPDATE_MODEL_EVENT, val);
		emit(require_event.INPUT_EVENT, val);
	};
	const valueChanged = () => {
		if (props.range) return ![minValue.value, maxValue.value].every((item, index) => item === initData.oldValue[index]);
		else return props.modelValue !== initData.oldValue;
	};
	const setValues = () => {
		if (props.min > props.max) require_error.throwError("Slider", "min should not be greater than max.");
		const val = props.modelValue;
		if (props.range && (0, _vue_shared.isArray)(val)) if (val[1] < props.min) _emit([props.min, props.min]);
		else if (val[0] > props.max) _emit([props.max, props.max]);
		else if (val[0] < props.min) _emit([props.min, val[1]]);
		else if (val[1] > props.max) _emit([val[0], props.max]);
		else {
			initData.firstValue = val[0];
			initData.secondValue = val[1];
			if (valueChanged()) {
				if (props.validateEvent) elFormItem?.validate?.("change").catch((err) => require_error.debugWarn(err));
				initData.oldValue = val.slice();
			}
		}
		else if (!props.range && require_types.isNumber(val) && !Number.isNaN(val)) if (val < props.min) _emit(props.min);
		else if (val > props.max) _emit(props.max);
		else {
			initData.firstValue = val;
			if (valueChanged()) {
				if (props.validateEvent) elFormItem?.validate?.("change").catch((err) => require_error.debugWarn(err));
				initData.oldValue = val;
			}
		}
	};
	setValues();
	(0, vue.watch)(() => initData.dragging, (val) => {
		if (!val) setValues();
	});
	(0, vue.watch)(() => props.modelValue, (val, oldVal) => {
		if (initData.dragging || (0, _vue_shared.isArray)(val) && (0, _vue_shared.isArray)(oldVal) && val.every((item, index) => item === oldVal[index]) && initData.firstValue === val[0] && initData.secondValue === val[1]) return;
		setValues();
	}, { deep: true });
	(0, vue.watch)(() => [props.min, props.max], () => {
		setValues();
	});
};

//#endregion
exports.useWatch = useWatch;
//# sourceMappingURL=use-watch.js.map