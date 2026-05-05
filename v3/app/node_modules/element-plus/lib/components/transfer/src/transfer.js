Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_typescript = require('../../../utils/typescript.js');
let lodash_unified = require("lodash-unified");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/transfer/src/transfer.ts
const LEFT_CHECK_CHANGE_EVENT = "left-check-change";
const RIGHT_CHECK_CHANGE_EVENT = "right-check-change";
/**
* @deprecated Removed after 3.0.0, Use `TransferProps` instead.
*/
const transferProps = require_runtime$1.buildProps({
	data: {
		type: require_runtime$1.definePropType(Array),
		default: () => []
	},
	titles: {
		type: require_runtime$1.definePropType(Array),
		default: () => []
	},
	buttonTexts: {
		type: require_runtime$1.definePropType(Array),
		default: () => []
	},
	filterPlaceholder: String,
	filterMethod: { type: require_runtime$1.definePropType(Function) },
	leftDefaultChecked: {
		type: require_runtime$1.definePropType(Array),
		default: () => []
	},
	rightDefaultChecked: {
		type: require_runtime$1.definePropType(Array),
		default: () => []
	},
	renderContent: { type: require_runtime$1.definePropType(Function) },
	modelValue: {
		type: require_runtime$1.definePropType(Array),
		default: () => []
	},
	format: {
		type: require_runtime$1.definePropType(Object),
		default: () => ({})
	},
	filterable: Boolean,
	props: {
		type: require_runtime$1.definePropType(Object),
		default: () => require_typescript.mutable({
			label: "label",
			key: "key",
			disabled: "disabled"
		})
	},
	targetOrder: {
		type: String,
		values: [
			"original",
			"push",
			"unshift"
		],
		default: "original"
	},
	validateEvent: {
		type: Boolean,
		default: true
	}
});
const transferCheckedChangeFn = (value, movedKeys) => [value, movedKeys].every(_vue_shared.isArray) || (0, _vue_shared.isArray)(value) && (0, lodash_unified.isNil)(movedKeys);
const transferEmits = {
	[require_event.CHANGE_EVENT]: (value, direction, movedKeys) => [value, movedKeys].every(_vue_shared.isArray) && ["left", "right"].includes(direction),
	[require_event.UPDATE_MODEL_EVENT]: (value) => (0, _vue_shared.isArray)(value),
	[LEFT_CHECK_CHANGE_EVENT]: transferCheckedChangeFn,
	[RIGHT_CHECK_CHANGE_EVENT]: transferCheckedChangeFn
};

//#endregion
exports.LEFT_CHECK_CHANGE_EVENT = LEFT_CHECK_CHANGE_EVENT;
exports.RIGHT_CHECK_CHANGE_EVENT = RIGHT_CHECK_CHANGE_EVENT;
exports.transferCheckedChangeFn = transferCheckedChangeFn;
exports.transferEmits = transferEmits;
exports.transferProps = transferProps;
//# sourceMappingURL=transfer.js.map