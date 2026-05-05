Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../utils/vue/props/runtime.js');
const require_shared = require('./shared.js');

//#region ../../packages/components/time-picker/src/props/panel-time-range.ts
const panelTimeRangeProps = require_runtime.buildProps({
	...require_shared.timePanelSharedProps,
	parsedValue: { type: require_runtime.definePropType(Array) }
});

//#endregion
exports.panelTimeRangeProps = panelTimeRangeProps;
//# sourceMappingURL=panel-time-range.js.map