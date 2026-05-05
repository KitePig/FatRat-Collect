Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/calendar/src/select-controller.ts
/**
*  @deprecated Removed after 3.0.0, Use `SelectControllerProps` instead.
*/
const selectControllerProps = require_runtime$1.buildProps({
	date: {
		type: require_runtime$1.definePropType(Object),
		required: true
	},
	formatter: { type: require_runtime$1.definePropType(Function) }
});
const selectControllerEmits = { "date-change": (date) => (0, _vue_shared.isObject)(date) || (0, _vue_shared.isString)(date) };

//#endregion
exports.selectControllerEmits = selectControllerEmits;
exports.selectControllerProps = selectControllerProps;
//# sourceMappingURL=select-controller.js.map