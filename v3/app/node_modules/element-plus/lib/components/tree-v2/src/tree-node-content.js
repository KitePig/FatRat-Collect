Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../text/index.js');
const require_virtual_tree = require('./virtual-tree.js');
let vue = require("vue");

//#region ../../packages/components/tree-v2/src/tree-node-content.ts
var tree_node_content_default = (0, vue.defineComponent)({
	name: "ElTreeNodeContent",
	props: require_virtual_tree.treeNodeContentProps,
	setup(props) {
		const tree = (0, vue.inject)(require_virtual_tree.ROOT_TREE_INJECTION_KEY);
		const ns = require_index.useNamespace("tree");
		return () => {
			const node = props.node;
			const { data } = node;
			return tree?.ctx.slots.default ? tree.ctx.slots.default({
				node,
				data
			}) : (0, vue.h)(require_index$1.ElText, {
				tag: "span",
				truncated: true,
				class: ns.be("node", "label")
			}, () => [node?.label]);
		};
	}
});

//#endregion
exports.default = tree_node_content_default;
//# sourceMappingURL=tree-node-content.js.map