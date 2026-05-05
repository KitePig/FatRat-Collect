Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../utils/types.js');
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/cascader-panel/src/node.ts
let uid = 0;
const calculatePathNodes = (node) => {
	const nodes = [node];
	let { parent } = node;
	while (parent) {
		nodes.unshift(parent);
		parent = parent.parent;
	}
	return nodes;
};
var Node = class Node {
	constructor(data, config, parent, root = false) {
		this.data = data;
		this.config = config;
		this.parent = parent;
		this.root = root;
		this.uid = uid++;
		this.checked = false;
		this.indeterminate = false;
		this.loading = false;
		const { value: valueKey, label: labelKey, children: childrenKey } = config;
		const childrenData = data[childrenKey];
		const pathNodes = calculatePathNodes(this);
		this.level = root ? 0 : parent ? parent.level + 1 : 1;
		this.value = data[valueKey];
		this.label = data[labelKey];
		this.pathNodes = pathNodes;
		this.pathValues = pathNodes.map((node) => node.value);
		this.pathLabels = pathNodes.map((node) => node.label);
		this.childrenData = childrenData;
		this.children = (childrenData || []).map((child) => new Node(child, config, this));
		this.loaded = !config.lazy || this.isLeaf || !require_types.isEmpty(childrenData);
		this.text = "";
	}
	get isDisabled() {
		const { data, parent, config } = this;
		const { disabled, checkStrictly } = config;
		return ((0, _vue_shared.isFunction)(disabled) ? disabled(data, this) : !!data[disabled]) || !checkStrictly && !!parent?.isDisabled;
	}
	get isLeaf() {
		const { data, config, childrenData, loaded } = this;
		const { lazy, leaf } = config;
		const isLeaf = (0, _vue_shared.isFunction)(leaf) ? leaf(data, this) : data[leaf];
		return require_types.isUndefined(isLeaf) ? lazy && !loaded ? false : !((0, _vue_shared.isArray)(childrenData) && childrenData.length) : !!isLeaf;
	}
	get valueByOption() {
		return this.config.emitPath ? this.pathValues : this.value;
	}
	appendChild(childData) {
		const { childrenData, children } = this;
		const node = new Node(childData, this.config, this);
		if ((0, _vue_shared.isArray)(childrenData)) childrenData.push(childData);
		else this.childrenData = [childData];
		children.push(node);
		return node;
	}
	calcText(allLevels, separator) {
		const text = allLevels ? this.pathLabels.join(separator) : this.label;
		this.text = text;
		return text;
	}
	broadcast(checked) {
		this.children.forEach((child) => {
			if (child) {
				child.broadcast(checked);
				child.onParentCheck?.(checked);
			}
		});
	}
	emit() {
		const { parent } = this;
		if (parent) {
			parent.onChildCheck?.();
			parent.emit();
		}
	}
	onParentCheck(checked) {
		if (!this.isDisabled) this.setCheckState(checked);
	}
	onChildCheck() {
		const { children } = this;
		const validChildren = children.filter((child) => !child.isDisabled);
		const checked = validChildren.length ? validChildren.every((child) => child.checked) : false;
		this.setCheckState(checked);
	}
	setCheckState(checked) {
		const totalNum = this.children.length;
		const checkedNum = this.children.reduce((c, p) => {
			return c + (p.checked ? 1 : p.indeterminate ? .5 : 0);
		}, 0);
		this.checked = this.loaded && this.children.filter((child) => !child.isDisabled).every((child) => child.loaded && child.checked) && checked;
		this.indeterminate = this.loaded && checkedNum !== totalNum && checkedNum > 0;
	}
	doCheck(checked) {
		if (this.checked === checked) return;
		const { checkStrictly, multiple } = this.config;
		if (checkStrictly || !multiple) this.checked = checked;
		else {
			this.broadcast(checked);
			this.setCheckState(checked);
			this.emit();
		}
	}
};

//#endregion
exports.default = Node;
//# sourceMappingURL=node.js.map