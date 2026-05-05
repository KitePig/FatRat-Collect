Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_types = require('../../../utils/types.js');
const require_error = require('../../../utils/error.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_constants = require('./constants.js');
let vue = require("vue");
let lodash_unified = require("lodash-unified");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/collapse/src/use-collapse.ts
const SCOPE = "ElCollapse";
const useCollapse = (props, emit) => {
	const activeNames = (0, vue.ref)((0, lodash_unified.castArray)(props.modelValue));
	const setActiveNames = (_activeNames) => {
		activeNames.value = _activeNames;
		const value = props.accordion ? activeNames.value[0] : activeNames.value;
		emit(require_event.UPDATE_MODEL_EVENT, value);
		emit(require_event.CHANGE_EVENT, value);
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
		if (![(0, _vue_shared.isPromise)(shouldChange), require_types.isBoolean(shouldChange)].includes(true)) require_error.throwError(SCOPE, "beforeCollapse must return type `Promise<boolean>` or `boolean`");
		if ((0, _vue_shared.isPromise)(shouldChange)) shouldChange.then((result) => {
			if (result !== false) handleChange(name);
		}).catch((e) => {
			require_error.debugWarn(SCOPE, `some error occurred: ${e}`);
		});
		else if (shouldChange) handleChange(name);
	};
	(0, vue.watch)(() => props.modelValue, () => activeNames.value = (0, lodash_unified.castArray)(props.modelValue), { deep: true });
	(0, vue.provide)(require_constants.collapseContextKey, {
		activeNames,
		handleItemClick
	});
	return {
		activeNames,
		setActiveNames
	};
};
const useCollapseDOM = (props) => {
	const ns = require_index.useNamespace("collapse");
	return { rootKls: (0, vue.computed)(() => [ns.b(), ns.b(`icon-position-${props.expandIconPosition}`)]) };
};

//#endregion
exports.useCollapse = useCollapse;
exports.useCollapseDOM = useCollapseDOM;
//# sourceMappingURL=use-collapse.js.map