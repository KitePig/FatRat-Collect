Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_event = require('../../../../constants/event.js');
const require_use_props_alias = require('./use-props-alias.js');

//#region ../../packages/components/transfer/src/composables/use-move.ts
const useMove = (props, checkedState, emit) => {
	const propsAlias = require_use_props_alias.usePropsAlias(props);
	const _emit = (value, direction, movedKeys) => {
		emit(require_event.UPDATE_MODEL_EVENT, value);
		emit(require_event.CHANGE_EVENT, value, direction, movedKeys);
	};
	const addToLeft = () => {
		const currentValue = props.modelValue.slice();
		checkedState.rightChecked.forEach((item) => {
			const index = currentValue.indexOf(item);
			if (index > -1) currentValue.splice(index, 1);
		});
		_emit(currentValue, "left", checkedState.rightChecked);
	};
	const addToRight = () => {
		let currentValue = props.modelValue.slice();
		const itemsToBeMoved = props.data.filter((item) => {
			const itemKey = item[propsAlias.value.key];
			return checkedState.leftChecked.includes(itemKey) && !props.modelValue.includes(itemKey);
		}).map((item) => item[propsAlias.value.key]);
		currentValue = props.targetOrder === "unshift" ? itemsToBeMoved.concat(currentValue) : currentValue.concat(itemsToBeMoved);
		if (props.targetOrder === "original") currentValue = props.data.filter((item) => currentValue.includes(item[propsAlias.value.key])).map((item) => item[propsAlias.value.key]);
		_emit(currentValue, "right", checkedState.leftChecked);
	};
	return {
		addToLeft,
		addToRight
	};
};

//#endregion
exports.useMove = useMove;
//# sourceMappingURL=use-move.js.map