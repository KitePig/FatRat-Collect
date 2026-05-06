Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../utils/vue/props/runtime.js');

//#region ../../packages/components/time-picker/src/props/shared.ts
const disabledTimeListsProps = require_runtime.buildProps({
	disabledHours: { type: require_runtime.definePropType(Function) },
	disabledMinutes: { type: require_runtime.definePropType(Function) },
	disabledSeconds: { type: require_runtime.definePropType(Function) }
});
const timePanelSharedProps = require_runtime.buildProps({
	visible: Boolean,
	actualVisible: {
		type: Boolean,
		default: void 0
	},
	format: {
		type: String,
		default: ""
	}
});

//#endregion
exports.disabledTimeListsProps = disabledTimeListsProps;
exports.timePanelSharedProps = timePanelSharedProps;
//# sourceMappingURL=shared.js.map