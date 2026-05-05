Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_vnode = require('../../../utils/vue/vnode.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../../hooks/use-same-target/index.js');
let vue = require("vue");

//#region ../../packages/components/overlay/src/overlay.ts
const overlayProps = require_runtime$1.buildProps({
	mask: {
		type: Boolean,
		default: true
	},
	customMaskEvent: Boolean,
	overlayClass: { type: require_runtime$1.definePropType([
		String,
		Array,
		Object
	]) },
	zIndex: { type: require_runtime$1.definePropType([String, Number]) }
});
const overlayEmits = { click: (evt) => evt instanceof MouseEvent };
const BLOCK = "overlay";
var overlay_default = (0, vue.defineComponent)({
	name: "ElOverlay",
	props: overlayProps,
	emits: overlayEmits,
	setup(props, { slots, emit }) {
		const ns = require_index.useNamespace(BLOCK);
		const onMaskClick = (e) => {
			emit("click", e);
		};
		const { onClick, onMousedown, onMouseup } = require_index$1.useSameTarget(props.customMaskEvent ? void 0 : onMaskClick);
		return () => {
			return props.mask ? (0, vue.createVNode)("div", {
				class: [ns.b(), props.overlayClass],
				style: { zIndex: props.zIndex },
				onClick,
				onMousedown,
				onMouseup
			}, [(0, vue.renderSlot)(slots, "default")], require_vnode.PatchFlags.STYLE | require_vnode.PatchFlags.CLASS | require_vnode.PatchFlags.PROPS, [
				"onClick",
				"onMouseup",
				"onMousedown"
			]) : (0, vue.h)("div", {
				class: props.overlayClass,
				style: {
					zIndex: props.zIndex,
					position: "fixed",
					top: "0px",
					right: "0px",
					bottom: "0px",
					left: "0px"
				}
			}, [(0, vue.renderSlot)(slots, "default")]);
		};
	}
});

//#endregion
exports.default = overlay_default;
exports.overlayEmits = overlayEmits;
exports.overlayProps = overlayProps;
//# sourceMappingURL=overlay.js.map