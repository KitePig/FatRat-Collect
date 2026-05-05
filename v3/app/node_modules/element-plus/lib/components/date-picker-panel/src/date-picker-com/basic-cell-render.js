const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../../hooks/use-namespace/index.js');
const require_constants = require('../constants.js');
const require_basic_cell = require('../props/basic-cell.js');
let vue = require("vue");

//#region ../../packages/components/date-picker-panel/src/date-picker-com/basic-cell-render.tsx
var basic_cell_render_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElDatePickerCell",
	props: require_basic_cell.basicCellProps,
	setup(props) {
		const ns = require_index.useNamespace("date-table-cell");
		const { slots } = (0, vue.inject)(require_constants.ROOT_PICKER_INJECTION_KEY);
		return () => {
			const { cell } = props;
			return (0, vue.renderSlot)(slots, "default", { ...cell }, () => [(0, vue.createVNode)("div", { "class": ns.b() }, [(0, vue.createVNode)("span", { "class": ns.e("text") }, [cell?.renderText ?? cell?.text])])]);
		};
	}
});

//#endregion
exports.default = basic_cell_render_default;
//# sourceMappingURL=basic-cell-render.js.map