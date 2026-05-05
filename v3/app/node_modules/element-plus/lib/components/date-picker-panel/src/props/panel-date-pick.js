Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../utils/vue/props/runtime.js');
const require_shared = require('./shared.js');

//#region ../../packages/components/date-picker-panel/src/props/panel-date-pick.ts
const panelDatePickProps = require_runtime.buildProps({
	...require_shared.panelSharedProps,
	parsedValue: { type: require_runtime.definePropType([Object, Array]) },
	visible: {
		type: Boolean,
		default: true
	},
	format: {
		type: String,
		default: ""
	}
});

//#endregion
exports.panelDatePickProps = panelDatePickProps;
//# sourceMappingURL=panel-date-pick.js.map