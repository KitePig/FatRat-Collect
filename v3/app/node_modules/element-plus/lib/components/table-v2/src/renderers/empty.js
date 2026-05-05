const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../empty/index.js');
let vue = require("vue");

//#region ../../packages/components/table-v2/src/renderers/empty.tsx
const Footer = (props, { slots }) => {
	const defaultSlot = (0, vue.renderSlot)(slots, "default", {}, () => [(0, vue.createVNode)(require_index.ElEmpty, null, null)]);
	return (0, vue.createVNode)("div", {
		"class": props.class,
		"style": props.style
	}, [defaultSlot]);
};
Footer.displayName = "ElTableV2Empty";

//#endregion
exports.default = Footer;
//# sourceMappingURL=empty.js.map