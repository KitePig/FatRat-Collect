import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { ElText } from "../../text/index.mjs";
import { NODE_INSTANCE_INJECTION_KEY, ROOT_TREE_INJECTION_KEY } from "./tokens.mjs";
import { defineComponent, h, inject, renderSlot } from "vue";

//#region ../../packages/components/tree/src/tree-node-content.vue?vue&type=script&lang.ts
var tree_node_content_vue_vue_type_script_lang_default = defineComponent({
	name: "ElTreeNodeContent",
	props: {
		node: {
			type: Object,
			required: true
		},
		renderContent: Function
	},
	setup(props) {
		const ns = useNamespace("tree");
		const nodeInstance = inject(NODE_INSTANCE_INJECTION_KEY);
		const tree = inject(ROOT_TREE_INJECTION_KEY);
		return () => {
			const node = props.node;
			const { data, store } = node;
			return props.renderContent ? props.renderContent(h, {
				_self: nodeInstance,
				node,
				data,
				store
			}) : renderSlot(tree.ctx.slots, "default", {
				node,
				data
			}, () => [h(ElText, {
				tag: "span",
				truncated: true,
				class: ns.be("node", "label")
			}, () => [node.label])]);
		};
	}
});

//#endregion
export { tree_node_content_vue_vue_type_script_lang_default as default };
//# sourceMappingURL=tree-node-content.vue_vue_type_script_lang.mjs.map