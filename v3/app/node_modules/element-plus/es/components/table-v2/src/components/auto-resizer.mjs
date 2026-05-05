import { useNamespace } from "../../../../hooks/use-namespace/index.mjs";
import { useAutoResize } from "../composables/use-auto-resize.mjs";
import { autoResizerProps } from "../auto-resizer.mjs";
import { createVNode, defineComponent } from "vue";

//#region ../../packages/components/table-v2/src/components/auto-resizer.tsx
const AutoResizer = /* @__PURE__ */ defineComponent({
	name: "ElAutoResizer",
	props: autoResizerProps,
	setup(props, { slots }) {
		const ns = useNamespace("auto-resizer");
		const { height, width, sizer } = useAutoResize(props);
		const style = {
			width: "100%",
			height: "100%"
		};
		return () => {
			return createVNode("div", {
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
export { AutoResizer as default };
//# sourceMappingURL=auto-resizer.mjs.map