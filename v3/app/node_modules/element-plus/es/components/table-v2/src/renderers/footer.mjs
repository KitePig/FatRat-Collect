import { createVNode } from "vue";

//#region ../../packages/components/table-v2/src/renderers/footer.tsx
const Footer = (props, { slots }) => {
	return createVNode("div", {
		"class": props.class,
		"style": props.style
	}, [slots.default?.()]);
};
Footer.displayName = "ElTableV2Footer";

//#endregion
export { Footer as default };
//# sourceMappingURL=footer.mjs.map