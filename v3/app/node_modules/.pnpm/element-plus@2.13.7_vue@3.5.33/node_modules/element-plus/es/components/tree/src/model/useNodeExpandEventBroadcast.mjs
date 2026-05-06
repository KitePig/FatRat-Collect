import { TREE_NODE_MAP_INJECTION_KEY } from "../tokens.mjs";
import { inject, onBeforeUnmount, provide } from "vue";

//#region ../../packages/components/tree/src/model/useNodeExpandEventBroadcast.ts
function useNodeExpandEventBroadcast(props) {
	const parentNodeMap = inject(TREE_NODE_MAP_INJECTION_KEY, null);
	let currentNodeMap = {
		treeNodeExpand: (node) => {
			if (props.node !== node) props.node?.collapse();
		},
		children: /* @__PURE__ */ new Set()
	};
	if (parentNodeMap) parentNodeMap.children.add(currentNodeMap);
	onBeforeUnmount(() => {
		if (parentNodeMap) parentNodeMap.children.delete(currentNodeMap);
		currentNodeMap = null;
	});
	provide(TREE_NODE_MAP_INJECTION_KEY, currentNodeMap);
	return { broadcastExpanded: (node) => {
		if (!props.accordion) return;
		for (const childNode of currentNodeMap.children) childNode.treeNodeExpand(node);
	} };
}

//#endregion
export { useNodeExpandEventBroadcast };
//# sourceMappingURL=useNodeExpandEventBroadcast.mjs.map