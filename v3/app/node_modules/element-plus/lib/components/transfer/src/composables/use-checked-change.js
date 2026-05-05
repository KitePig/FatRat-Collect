Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_transfer = require('../transfer.js');

//#region ../../packages/components/transfer/src/composables/use-checked-change.ts
const useCheckedChange = (checkedState, emit) => {
	const onSourceCheckedChange = (val, movedKeys) => {
		checkedState.leftChecked = val;
		if (!movedKeys) return;
		emit(require_transfer.LEFT_CHECK_CHANGE_EVENT, val, movedKeys);
	};
	const onTargetCheckedChange = (val, movedKeys) => {
		checkedState.rightChecked = val;
		if (!movedKeys) return;
		emit(require_transfer.RIGHT_CHECK_CHANGE_EVENT, val, movedKeys);
	};
	return {
		onSourceCheckedChange,
		onTargetCheckedChange
	};
};

//#endregion
exports.useCheckedChange = useCheckedChange;
//# sourceMappingURL=use-checked-change.js.map