Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');

//#region ../../packages/components/tabs/src/tab-pane.ts
/**
* @deprecated Removed after 3.0.0, Use `TabPaneProps` instead.
*/
const tabPaneProps = require_runtime.buildProps({
	label: {
		type: String,
		default: ""
	},
	name: { type: [String, Number] },
	closable: {
		type: Boolean,
		default: void 0
	},
	disabled: Boolean,
	lazy: Boolean
});

//#endregion
exports.tabPaneProps = tabPaneProps;
//# sourceMappingURL=tab-pane.js.map