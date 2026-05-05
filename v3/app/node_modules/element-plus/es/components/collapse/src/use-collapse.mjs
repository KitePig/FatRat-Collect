import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isBoolean, isPromise } from "../../../utils/types.mjs";
import { debugWarn, throwError } from "../../../utils/error.mjs";
import { ensureArray } from "../../../utils/arrays.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { collapseContextKey } from "./constants.mjs";
import { computed, provide, ref, watch } from "vue";

//#region ../../packages/components/collapse/src/use-collapse.ts
const SCOPE = "ElCollapse";
const useCollapse = (props, emit) => {
	const activeNames = ref(ensureArray(props.modelValue));
	const setActiveNames = (_activeNames) => {
		activeNames.value = _activeNames;
		const value = props.accordion ? activeNames.value[0] : activeNames.value;
		emit(UPDATE_MODEL_EVENT, value);
		emit(CHANGE_EVENT, value);
	};
	const handleChange = (name) => {
		if (props.accordion) setActiveNames([activeNames.value[0] === name ? "" : name]);
		else {
			const _activeNames = [...activeNames.value];
			const index = _activeNames.indexOf(name);
			if (index > -1) _activeNames.splice(index, 1);
			else _activeNames.push(name);
			setActiveNames(_activeNames);
		}
	};
	const handleItemClick = async (name) => {
		const { beforeCollapse } = props;
		if (!beforeCollapse) {
			handleChange(name);
			return;
		}
		const shouldChange = beforeCollapse(name);
		if (![isPromise(shouldChange), isBoolean(shouldChange)].includes(true)) throwError(SCOPE, "beforeCollapse must return type `Promise<boolean>` or `boolean`");
		if (isPromise(shouldChange)) shouldChange.then((result) => {
			if (result !== false) handleChange(name);
		}).catch((e) => {
			debugWarn(SCOPE, `some error occurred: ${e}`);
		});
		else if (shouldChange) handleChange(name);
	};
	watch(() => props.modelValue, () => activeNames.value = ensureArray(props.modelValue), { deep: true });
	provide(collapseContextKey, {
		activeNames,
		handleItemClick
	});
	return {
		activeNames,
		setActiveNames
	};
};
const useCollapseDOM = (props) => {
	const ns = useNamespace("collapse");
	return { rootKls: computed(() => [ns.b(), ns.b(`icon-position-${props.expandIconPosition}`)]) };
};

//#endregion
export { useCollapse, useCollapseDOM };
//# sourceMappingURL=use-collapse.mjs.map