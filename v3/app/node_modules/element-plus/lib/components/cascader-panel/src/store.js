Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../utils/types.js');
const require_node = require('./node.js');
let lodash_unified = require("lodash-unified");

//#region ../../packages/components/cascader-panel/src/store.ts
const flatNodes = (nodes, leafOnly) => {
	return nodes.reduce((res, node) => {
		if (node.isLeaf) res.push(node);
		else {
			!leafOnly && res.push(node);
			res = res.concat(flatNodes(node.children, leafOnly));
		}
		return res;
	}, []);
};
var Store = class {
	constructor(data, config) {
		this.config = config;
		const nodes = (data || []).map((nodeData) => new require_node.default(nodeData, this.config));
		this.nodes = nodes;
		this.allNodes = flatNodes(nodes, false);
		this.leafNodes = flatNodes(nodes, true);
	}
	getNodes() {
		return this.nodes;
	}
	getFlattedNodes(leafOnly) {
		return leafOnly ? this.leafNodes : this.allNodes;
	}
	appendNode(nodeData, parentNode) {
		const node = parentNode ? parentNode.appendChild(nodeData) : new require_node.default(nodeData, this.config);
		if (!parentNode) this.nodes.push(node);
		this.appendAllNodesAndLeafNodes(node);
	}
	appendNodes(nodeDataList, parentNode) {
		if (nodeDataList.length > 0) nodeDataList.forEach((nodeData) => this.appendNode(nodeData, parentNode));
		else parentNode && parentNode.isLeaf && this.leafNodes.push(parentNode);
	}
	appendAllNodesAndLeafNodes(node) {
		this.allNodes.push(node);
		node.isLeaf && this.leafNodes.push(node);
		if (node.children) node.children.forEach((subNode) => {
			this.appendAllNodesAndLeafNodes(subNode);
		});
	}
	getNodeByValue(value, leafOnly = false) {
		if (require_types.isPropAbsent(value)) return null;
		return this.getFlattedNodes(leafOnly).find((node) => (0, lodash_unified.isEqual)(node.value, value) || (0, lodash_unified.isEqual)(node.pathValues, value)) || null;
	}
	getSameNode(node) {
		if (!node) return null;
		return this.getFlattedNodes(false).find(({ value, level }) => (0, lodash_unified.isEqual)(node.value, value) && node.level === level) || null;
	}
};

//#endregion
exports.default = Store;
//# sourceMappingURL=store.js.map