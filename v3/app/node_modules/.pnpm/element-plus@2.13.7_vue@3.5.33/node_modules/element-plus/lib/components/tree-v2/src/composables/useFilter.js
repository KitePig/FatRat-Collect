Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/tree-v2/src/composables/useFilter.ts
function useFilter(props, tree) {
	const hiddenNodeKeySet = (0, vue.ref)(/* @__PURE__ */ new Set([]));
	const hiddenExpandIconKeySet = (0, vue.ref)(/* @__PURE__ */ new Set([]));
	const filterable = (0, vue.computed)(() => {
		return (0, _vue_shared.isFunction)(props.filterMethod);
	});
	function doFilter(query) {
		if (!filterable.value) return;
		const expandKeySet = /* @__PURE__ */ new Set();
		const hiddenExpandIconKeys = hiddenExpandIconKeySet.value;
		const hiddenKeys = hiddenNodeKeySet.value;
		const family = [];
		const nodes = tree.value?.treeNodes || [];
		const filter = props.filterMethod;
		hiddenKeys.clear();
		function traverse(nodes) {
			nodes.forEach((node) => {
				family.push(node);
				if (filter?.(query, node.data, node)) family.forEach((member) => {
					expandKeySet.add(member.key);
					member.expanded = true;
				});
				else {
					node.expanded = false;
					if (node.isLeaf) hiddenKeys.add(node.key);
				}
				const children = node.children;
				if (children) traverse(children);
				if (!node.isLeaf) {
					if (!expandKeySet.has(node.key)) hiddenKeys.add(node.key);
					else if (children) {
						let allHidden = true;
						for (const childNode of children) if (!hiddenKeys.has(childNode.key)) {
							allHidden = false;
							break;
						}
						if (allHidden) hiddenExpandIconKeys.add(node.key);
						else hiddenExpandIconKeys.delete(node.key);
					}
				}
				family.pop();
			});
		}
		traverse(nodes);
		return expandKeySet;
	}
	function isForceHiddenExpandIcon(node) {
		return hiddenExpandIconKeySet.value.has(node.key);
	}
	return {
		hiddenExpandIconKeySet,
		hiddenNodeKeySet,
		doFilter,
		isForceHiddenExpandIcon
	};
}

//#endregion
exports.useFilter = useFilter;
//# sourceMappingURL=useFilter.js.map