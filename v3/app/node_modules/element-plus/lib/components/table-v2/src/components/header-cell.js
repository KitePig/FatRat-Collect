const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
let vue = require("vue");

//#region ../../packages/components/table-v2/src/components/header-cell.tsx
const HeaderCell = (props, { slots }) => (0, vue.renderSlot)(slots, "default", props, () => [(0, vue.createVNode)("div", {
	"class": props.class,
	"title": props.column?.title
}, [props.column?.title])]);
HeaderCell.displayName = "ElTableV2HeaderCell";
HeaderCell.inheritAttrs = false;

//#endregion
exports.default = HeaderCell;
//# sourceMappingURL=header-cell.js.map