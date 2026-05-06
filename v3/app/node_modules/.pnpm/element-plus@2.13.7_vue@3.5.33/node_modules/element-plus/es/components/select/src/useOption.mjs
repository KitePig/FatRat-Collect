import { isObject } from "../../../utils/types.mjs";
import { escapeStringRegexp } from "../../../utils/strings.mjs";
import { throwError } from "../../../utils/error.mjs";
import { ensureArray } from "../../../utils/arrays.mjs";
import { selectGroupKey, selectKey } from "./token.mjs";
import { COMPONENT_NAME } from "./option.mjs";
import { get, isEqual } from "lodash-unified";
import { computed, getCurrentInstance, inject, toRaw, watch } from "vue";

//#region ../../packages/components/select/src/useOption.ts
function useOption(props, states) {
	const select = inject(selectKey);
	if (!select) throwError(COMPONENT_NAME, "usage: <el-select><el-option /></el-select/>");
	const selectGroup = inject(selectGroupKey, { disabled: false });
	const itemSelected = computed(() => {
		return contains(ensureArray(select.props.modelValue), props.value);
	});
	const limitReached = computed(() => {
		if (select.props.multiple) {
			const modelValue = ensureArray(select.props.modelValue ?? []);
			return !itemSelected.value && modelValue.length >= select.props.multipleLimit && select.props.multipleLimit > 0;
		} else return false;
	});
	const currentLabel = computed(() => {
		return props.label ?? (isObject(props.value) ? "" : props.value);
	});
	const currentValue = computed(() => {
		return props.value || props.label || "";
	});
	const isDisabled = computed(() => {
		return props.disabled || states.groupDisabled || limitReached.value;
	});
	const instance = getCurrentInstance();
	const contains = (arr = [], target) => {
		if (!isObject(props.value)) return arr && arr.includes(target);
		else {
			const valueKey = select.props.valueKey;
			return arr && arr.some((item) => {
				return toRaw(get(item, valueKey)) === get(target, valueKey);
			});
		}
	};
	const hoverItem = () => {
		if (!isDisabled.value) select.states.hoveringIndex = select.optionsArray.indexOf(instance.proxy);
	};
	const updateOption = (query) => {
		states.visible = new RegExp(escapeStringRegexp(query), "i").test(String(currentLabel.value)) || props.created;
	};
	watch(() => currentLabel.value, () => {
		if (!props.created && !select.props.remote) select.setSelected();
	});
	watch(() => props.value, (val, oldVal) => {
		const { remote, valueKey } = select.props;
		if (remote ? val !== oldVal : !isEqual(val, oldVal)) {
			select.onOptionDestroy(oldVal, instance.proxy);
			select.onOptionCreate(instance.proxy);
		}
		if (!props.created && !remote) {
			if (valueKey && isObject(val) && isObject(oldVal) && val[valueKey] === oldVal[valueKey]) return;
			select.setSelected();
		}
	});
	watch(() => selectGroup.disabled, () => {
		states.groupDisabled = selectGroup.disabled;
	}, { immediate: true });
	return {
		select,
		currentLabel,
		currentValue,
		itemSelected,
		isDisabled,
		hoverItem,
		updateOption
	};
}

//#endregion
export { useOption };
//# sourceMappingURL=useOption.mjs.map