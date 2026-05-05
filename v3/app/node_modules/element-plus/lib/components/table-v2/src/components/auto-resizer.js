const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../../hooks/use-namespace/index.js');
const require_use_auto_resize = require('../composables/use-auto-resize.js');
const require_auto_resizer = require('../auto-resizer.js');
let vue = require("vue");

//#region ../../packages/components/table-v2/src/components/auto-resizer.tsx
const AutoResizer = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElAutoResizer",
	props: require_auto_resizer.autoResizerProps,
	setup(props, { slots }) {
		const ns = require_index.useNamespace("auto-resizer");
		const { height, width, sizer } = require_use_auto_resize.useAutoResize(props);
		const style = {
			width: "100%",
			height: "100%"
		};
		return () => {
			return (0, vue.createVNode)("div", {
				"ref": sizer,
				"class": ns.b(),
				"style": style
			}, [slots.default?.({
				height: height.value,
				width: width.value
			})]);
		};
	}
});

//#endregion
exports.default = AutoResizer;
//# sourceMappingURL=auto-resizer.js.map