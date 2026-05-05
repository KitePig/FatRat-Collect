import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { ElText } from "../../text/index.mjs";
import { ROOT_TREE_INJECTION_KEY, treeNodeContentProps } from "./virtual-tree.mjs";
import { defineComponent, h, inject } from "vue";

//#region ../../packages/components/tree-v2/src/tree-node-content.ts
var tree_node_content_default = defineComponent({
	name: "ElTreeNodeContent",
	props: treeNodeContentProps,
	setup(props) {
		const tree = inject(ROOT_TREE_INJECTION_KEY);
		const ns = useNamespace("tree");
		return () => {
			const node = props.node;
			const { data } = node;
			return tree?.ctx.slots.default ? tree.ctx.slots.default({
				node,
				data
			}) : h(ElText, {
				tag: "span",
				truncated: true,
				class: ns.be("node", "label")
			}, () => [node?.label]);
		};
	}
});

//#endregion
export { tree_node_content_default as default };
//# sourceMappingURL=tree-node-content.mjs.map