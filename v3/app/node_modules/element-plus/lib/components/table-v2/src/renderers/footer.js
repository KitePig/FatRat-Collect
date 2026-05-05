const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
let vue = require("vue");

//#region ../../packages/components/table-v2/src/renderers/footer.tsx
const Footer = (props, { slots }) => {
	return (0, vue.createVNode)("div", {
		"class": props.class,
		"style": props.style
	}, [slots.default?.()]);
};
Footer.displayName = "ElTableV2Footer";

//#endregion
exports.default = Footer;
//# sourceMappingURL=footer.js.map