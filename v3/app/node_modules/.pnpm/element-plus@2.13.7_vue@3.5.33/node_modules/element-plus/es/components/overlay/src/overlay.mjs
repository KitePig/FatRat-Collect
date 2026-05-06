import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { PatchFlags } from "../../../utils/vue/vnode.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { useSameTarget } from "../../../hooks/use-same-target/index.mjs";
import { createVNode, defineComponent, h, renderSlot } from "vue";

//#region ../../packages/components/overlay/src/overlay.ts
const overlayProps = buildProps({
	mask: {
		type: Boolean,
		default: true
	},
	customMaskEvent: Boolean,
	overlayClass: { type: definePropType([
		String,
		Array,
		Object
	]) },
	zIndex: { type: definePropType([String, Number]) }
});
const overlayEmits = { click: (evt) => evt instanceof MouseEvent };
const BLOCK = "overlay";
var overlay_default = defineComponent({
	name: "ElOverlay",
	props: overlayProps,
	emits: overlayEmits,
	setup(props, { slots, emit }) {
		const ns = useNamespace(BLOCK);
		const onMaskClick = (e) => {
			emit("click", e);
		};
		const { onClick, onMousedown, onMouseup } = useSameTarget(props.customMaskEvent ? void 0 : onMaskClick);
		return () => {
			return props.mask ? createVNode("div", {
				class: [ns.b(), props.overlayClass],
				style: { zIndex: props.zIndex },
				onClick,
				onMousedown,
				onMouseup
			}, [renderSlot(slots, "default")], PatchFlags.STYLE | PatchFlags.CLASS | PatchFlags.PROPS, [
				"onClick",
				"onMouseup",
				"onMousedown"
			]) : h("div", {
				class: props.overlayClass,
				style: {
					zIndex: props.zIndex,
					position: "fixed",
					top: "0px",
					right: "0px",
					bottom: "0px",
					left: "0px"
				}
			}, [renderSlot(slots, "default")]);
		};
	}
});

//#endregion
export { overlay_default as default, overlayEmits, overlayProps };
//# sourceMappingURL=overlay.mjs.map