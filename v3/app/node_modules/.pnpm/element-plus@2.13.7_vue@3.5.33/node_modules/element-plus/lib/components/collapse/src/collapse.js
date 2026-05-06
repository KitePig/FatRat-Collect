Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_types = require('../../../utils/types.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_typescript = require('../../../utils/typescript.js');
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/collapse/src/collapse.ts
const emitChangeFn = (value) => require_types.isNumber(value) || (0, _vue_shared.isString)(value) || (0, _vue_shared.isArray)(value);
/**
* @deprecated Removed after 3.0.0, Use `CollapseProps` instead.
*/
const collapseProps = require_runtime$1.buildProps({
	accordion: Boolean,
	modelValue: {
		type: require_runtime$1.definePropType([
			Array,
			String,
			Number
		]),
		default: () => require_typescript.mutable([])
	},
	expandIconPosition: {
		type: require_runtime$1.definePropType([String]),
		default: "right"
	},
	beforeCollapse: { type: require_runtime$1.definePropType(Function) }
});
const collapseEmits = {
	[require_event.UPDATE_MODEL_EVENT]: emitChangeFn,
	[require_event.CHANGE_EVENT]: emitChangeFn
};

//#endregion
exports.collapseEmits = collapseEmits;
exports.collapseProps = collapseProps;
exports.emitChangeFn = emitChangeFn;
//# sourceMappingURL=collapse.js.map