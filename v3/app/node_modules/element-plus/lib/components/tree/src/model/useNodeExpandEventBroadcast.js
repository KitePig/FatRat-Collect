Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_tokens = require('../tokens.js');
let vue = require("vue");

//#region ../../packages/components/tree/src/model/useNodeExpandEventBroadcast.ts
function useNodeExpandEventBroadcast(props) {
	const parentNodeMap = (0, vue.inject)(require_tokens.TREE_NODE_MAP_INJECTION_KEY, null);
	let currentNodeMap = {
		treeNodeExpand: (node) => {
			if (props.node !== node) props.node?.collapse();
		},
		children: /* @__PURE__ */ new Set()
	};
	if (parentNodeMap) parentNodeMap.children.add(currentNodeMap);
	(0, vue.onBeforeUnmount)(() => {
		if (parentNodeMap) parentNodeMap.children.delete(currentNodeMap);
		currentNodeMap = null;
	});
	(0, vue.provide)(require_tokens.TREE_NODE_MAP_INJECTION_KEY, currentNodeMap);
	return { broadcastExpanded: (node) => {
		if (!props.accordion) return;
		for (const childNode of currentNodeMap.children) childNode.treeNodeExpand(node);
	} };
}

//#endregion
exports.useNodeExpandEventBroadcast = useNodeExpandEventBroadcast;
//# sourceMappingURL=useNodeExpandEventBroadcast.js.map