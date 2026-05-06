Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_useProps = require('./useProps.js');
let vue = require("vue");

//#region ../../packages/components/select-v2/src/useAllowCreate.ts
function useAllowCreate(props, states) {
	const { aliasProps, getLabel, getValue } = require_useProps.useProps(props);
	const createOptionCount = (0, vue.ref)(0);
	const cachedSelectedOption = (0, vue.ref)();
	const enableAllowCreateMode = (0, vue.computed)(() => {
		return props.allowCreate && props.filterable;
	});
	(0, vue.watch)(() => props.options, (options) => {
		const optionLabelsSet = new Set(options.map((option) => getLabel(option)));
		states.createdOptions = states.createdOptions.filter((createdOption) => !optionLabelsSet.has(getLabel(createdOption)));
	});
	function hasExistingOption(query) {
		const hasOption = (option) => getLabel(option) === query;
		return props.options && props.options.some(hasOption) || states.createdOptions.some(hasOption);
	}
	function selectNewOption(option) {
		if (!enableAllowCreateMode.value) return;
		if (props.multiple && option.created) createOptionCount.value++;
		else cachedSelectedOption.value = option;
	}
	function createNewOption(query) {
		if (enableAllowCreateMode.value) if (query && query.length > 0) {
			if (hasExistingOption(query)) {
				states.createdOptions = states.createdOptions.filter((createdOption) => getLabel(createdOption) !== states.previousQuery);
				return;
			}
			const newOption = {
				[aliasProps.value.value]: query,
				[aliasProps.value.label]: query,
				created: true,
				[aliasProps.value.disabled]: false
			};
			if (states.createdOptions.length >= createOptionCount.value) states.createdOptions[createOptionCount.value] = newOption;
			else states.createdOptions.push(newOption);
		} else if (props.multiple) states.createdOptions.length = createOptionCount.value;
		else {
			const selectedOption = cachedSelectedOption.value;
			states.createdOptions.length = 0;
			if (selectedOption && selectedOption.created) states.createdOptions.push(selectedOption);
		}
	}
	function removeNewOption(option) {
		if (!enableAllowCreateMode.value || !option || !option.created || option.created && props.reserveKeyword && states.inputValue === getLabel(option)) return;
		const idx = states.createdOptions.findIndex((it) => getValue(it) === getValue(option));
		if (~idx) {
			states.createdOptions.splice(idx, 1);
			createOptionCount.value--;
		}
	}
	function clearAllNewOption() {
		if (enableAllowCreateMode.value) {
			states.createdOptions.length = 0;
			createOptionCount.value = 0;
		}
	}
	return {
		createNewOption,
		removeNewOption,
		selectNewOption,
		clearAllNewOption
	};
}

//#endregion
exports.useAllowCreate = useAllowCreate;
//# sourceMappingURL=useAllowCreate.js.map