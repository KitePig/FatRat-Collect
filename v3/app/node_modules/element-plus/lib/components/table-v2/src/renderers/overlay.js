const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
let vue = require("vue");

//#region ../../packages/components/table-v2/src/renderers/overlay.tsx
const Overlay = (props, { slots }) => {
	return (0, vue.createVNode)("div", {
		"class": props.class,
		"style": props.style
	}, [slots.default?.()]);
};
Overlay.displayName = "ElTableV2Overlay";

//#endregion
exports.default = Overlay;
//# sourceMappingURL=overlay.js.map