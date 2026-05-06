Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../utils/vue/props/runtime.js');
const require_shared = require('./shared.js');

//#region ../../packages/components/time-picker/src/props/panel-time-picker.ts
const panelTimePickerProps = require_runtime.buildProps({
	...require_shared.timePanelSharedProps,
	datetimeRole: String,
	parsedValue: { type: require_runtime.definePropType(Object) }
});

//#endregion
exports.panelTimePickerProps = panelTimePickerProps;
//# sourceMappingURL=panel-time-picker.js.map