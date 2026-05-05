import { createVNode } from "vue";

//#region ../../packages/components/table-v2/src/renderers/overlay.tsx
const Overlay = (props, { slots }) => {
	return createVNode("div", {
		"class": props.class,
		"style": props.style
	}, [slots.default?.()]);
};
Overlay.displayName = "ElTableV2Overlay";

//#endregion
export { Overlay as default };
//# sourceMappingURL=overlay.mjs.map