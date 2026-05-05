const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../text/index.js');
const require_tokens = require('./tokens.js');
let vue = require("vue");

//#region ../../packages/components/tree/src/tree-node-content.vue?vue&type=script&lang.ts
var tree_node_content_vue_vue_type_script_lang_default = (0, vue.defineComponent)({
	name: "ElTreeNodeContent",
	props: {
		node: {
			type: Object,
			required: true
		},
		renderContent: Function
	},
	setup(props) {
		const ns = require_index.useNamespace("tree");
		const nodeInstance = (0, vue.inject)(require_tokens.NODE_INSTANCE_INJECTION_KEY);
		const tree = (0, vue.inject)(require_tokens.ROOT_TREE_INJECTION_KEY);
		return () => {
			const node = props.node;
			const { data, store } = node;
			return props.renderContent ? props.renderContent(vue.h, {
				_self: nodeInstance,
				node,
				data,
				store
			}) : (0, vue.renderSlot)(tree.ctx.slots, "default", {
				node,
				data
			}, () => [(0, vue.h)(require_index$1.ElText, {
				tag: "span",
				truncated: true,
				class: ns.be("node", "label")
			}, () => [node.label])]);
		};
	}
});

//#endregion
exports.default = tree_node_content_vue_vue_type_script_lang_default;
//# sourceMappingURL=tree-node-content.vue_vue_type_script_lang.js.map