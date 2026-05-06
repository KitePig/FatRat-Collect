import { isArray } from "../../../utils/types.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { CASCADER_PANEL_INJECTION_KEY } from "./types.mjs";
import { Comment, createVNode, defineComponent, inject } from "vue";

//#region ../../packages/components/cascader-panel/src/node-content.tsx
function isVNodeEmpty(vnodes) {
	return !!(isArray(vnodes) ? vnodes.every(({ type }) => type === Comment) : vnodes?.type === Comment);
}
var node_content_default = /* @__PURE__ */ defineComponent({
	name: "NodeContent",
	props: { node: {
		type: Object,
		required: true
	} },
	setup(props) {
		const ns = useNamespace("cascader-node");
		const { renderLabelFn } = inject(CASCADER_PANEL_INJECTION_KEY);
		const { node } = props;
		const { data, label: nodeLabel } = node;
		const label = () => {
			const renderLabel = renderLabelFn?.({
				node,
				data
			});
			return isVNodeEmpty(renderLabel) ? nodeLabel : renderLabel ?? nodeLabel;
		};
		return () => createVNode("span", { "class": ns.e("label") }, [label()]);
	}
});

//#endregion
export { node_content_default as default };
//# sourceMappingURL=node-content.mjs.map