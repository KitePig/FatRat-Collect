Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_transfer = require('./transfer.js');

//#region ../../packages/components/transfer/src/transfer-panel.ts
const CHECKED_CHANGE_EVENT = "checked-change";
/**
* @deprecated Removed after 3.0.0, Use `TransferPanelProps` instead.
*/
const transferPanelProps = require_runtime.buildProps({
	data: require_transfer.transferProps.data,
	optionRender: { type: require_runtime.definePropType(Function) },
	placeholder: String,
	title: String,
	filterable: Boolean,
	format: require_transfer.transferProps.format,
	filterMethod: require_transfer.transferProps.filterMethod,
	defaultChecked: require_transfer.transferProps.leftDefaultChecked,
	props: require_transfer.transferProps.props
});
const transferPanelEmits = { [CHECKED_CHANGE_EVENT]: require_transfer.transferCheckedChangeFn };

//#endregion
exports.CHECKED_CHANGE_EVENT = CHECKED_CHANGE_EVENT;
exports.transferPanelEmits = transferPanelEmits;
exports.transferPanelProps = transferPanelProps;
//# sourceMappingURL=transfer-panel.js.map