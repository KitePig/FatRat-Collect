const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_utils = require('../utils.js');
const require_header_row = require('../components/header-row.js');
let vue = require("vue");

//#region ../../packages/components/table-v2/src/renderers/header.tsx
function _isSlot(s) {
	return typeof s === "function" || Object.prototype.toString.call(s) === "[object Object]" && !(0, vue.isVNode)(s);
}
const HeaderRenderer = ({ columns, columnsStyles, headerIndex, style, headerClass, headerProps, ns }, { slots }) => {
	const param = {
		columns,
		headerIndex
	};
	const kls = [
		ns.e("header-row"),
		require_utils.tryCall(headerClass, param, ""),
		ns.is("customized", Boolean(slots.header))
	];
	return (0, vue.createVNode)(require_header_row.default, {
		...require_utils.tryCall(headerProps, param),
		columnsStyles,
		class: kls,
		columns,
		headerIndex,
		style
	}, _isSlot(slots) ? slots : { default: () => [slots] });
};

//#endregion
exports.default = HeaderRenderer;
//# sourceMappingURL=header.js.map