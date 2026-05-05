Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_types = require('../../../utils/types.js');
const require_runtime = require('../../../utils/vue/props/runtime.js');
const require_icon = require('../../../utils/vue/icon.js');
const require_typescript = require('../../../utils/typescript.js');

//#region ../../packages/components/tree-v2/src/virtual-tree.ts
const ROOT_TREE_INJECTION_KEY = Symbol();
const EMPTY_NODE = {
	key: -1,
	level: -1,
	data: {}
};
let TreeOptionsEnum = /* @__PURE__ */ function(TreeOptionsEnum) {
	TreeOptionsEnum["KEY"] = "id";
	TreeOptionsEnum["LABEL"] = "label";
	TreeOptionsEnum["CHILDREN"] = "children";
	TreeOptionsEnum["DISABLED"] = "disabled";
	TreeOptionsEnum["CLASS"] = "";
	return TreeOptionsEnum;
}({});
let SetOperationEnum = /* @__PURE__ */ function(SetOperationEnum) {
	SetOperationEnum["ADD"] = "add";
	SetOperationEnum["DELETE"] = "delete";
	return SetOperationEnum;
}({});
const itemSize = {
	type: Number,
	default: 26
};
/**
* @deprecated Removed after 3.0.0, Use `TreeProps` instead.
*/
const treeProps = require_runtime.buildProps({
	data: {
		type: require_runtime.definePropType(Array),
		default: () => require_typescript.mutable([])
	},
	emptyText: { type: String },
	height: {
		type: Number,
		default: 200
	},
	props: {
		type: require_runtime.definePropType(Object),
		default: () => require_typescript.mutable({
			children: TreeOptionsEnum.CHILDREN,
			label: TreeOptionsEnum.LABEL,
			disabled: TreeOptionsEnum.DISABLED,
			value: TreeOptionsEnum.KEY,
			class: TreeOptionsEnum.CLASS
		})
	},
	highlightCurrent: Boolean,
	showCheckbox: Boolean,
	defaultCheckedKeys: {
		type: require_runtime.definePropType(Array),
		default: () => require_typescript.mutable([])
	},
	checkStrictly: Boolean,
	defaultExpandedKeys: {
		type: require_runtime.definePropType(Array),
		default: () => require_typescript.mutable([])
	},
	indent: {
		type: Number,
		default: 16
	},
	itemSize,
	icon: { type: require_icon.iconPropType },
	expandOnClickNode: {
		type: Boolean,
		default: true
	},
	checkOnClickNode: Boolean,
	checkOnClickLeaf: {
		type: Boolean,
		default: true
	},
	currentNodeKey: { type: require_runtime.definePropType([String, Number]) },
	accordion: Boolean,
	filterMethod: { type: require_runtime.definePropType(Function) },
	perfMode: {
		type: Boolean,
		default: true
	},
	scrollbarAlwaysOn: Boolean
});
/**
* @deprecated Removed after 3.0.0, Use `TreeNodeProps` instead.
*/
const treeNodeProps = require_runtime.buildProps({
	node: {
		type: require_runtime.definePropType(Object),
		default: () => require_typescript.mutable(EMPTY_NODE)
	},
	expanded: Boolean,
	checked: Boolean,
	indeterminate: Boolean,
	showCheckbox: Boolean,
	disabled: Boolean,
	current: Boolean,
	hiddenExpandIcon: Boolean,
	itemSize
});
const treeNodeContentProps = require_runtime.buildProps({ node: {
	type: require_runtime.definePropType(Object),
	required: true
} });
const NODE_CLICK = "node-click";
const NODE_DROP = "node-drop";
const NODE_EXPAND = "node-expand";
const NODE_COLLAPSE = "node-collapse";
const CURRENT_CHANGE = "current-change";
const NODE_CHECK = "check";
const NODE_CHECK_CHANGE = "check-change";
const NODE_CONTEXTMENU = "node-contextmenu";
const treeEmits = {
	[NODE_CLICK]: (data, node, e) => data && node && e,
	[NODE_DROP]: (data, node, e) => data && node && e,
	[NODE_EXPAND]: (data, node) => data && node,
	[NODE_COLLAPSE]: (data, node) => data && node,
	[CURRENT_CHANGE]: (data, node) => data && node,
	[NODE_CHECK]: (data, checkedInfo) => data && checkedInfo,
	[NODE_CHECK_CHANGE]: (data, checked) => data && require_types.isBoolean(checked),
	[NODE_CONTEXTMENU]: (evt, data, node) => evt && data && node
};
const treeNodeEmits = {
	click: (node, e) => !!(node && e),
	drop: (node, e) => !!(node && e),
	toggle: (node) => !!node,
	check: (node, checked) => node && require_types.isBoolean(checked)
};

//#endregion
exports.CURRENT_CHANGE = CURRENT_CHANGE;
exports.EMPTY_NODE = EMPTY_NODE;
exports.NODE_CHECK = NODE_CHECK;
exports.NODE_CHECK_CHANGE = NODE_CHECK_CHANGE;
exports.NODE_CLICK = NODE_CLICK;
exports.NODE_COLLAPSE = NODE_COLLAPSE;
exports.NODE_CONTEXTMENU = NODE_CONTEXTMENU;
exports.NODE_DROP = NODE_DROP;
exports.NODE_EXPAND = NODE_EXPAND;
exports.ROOT_TREE_INJECTION_KEY = ROOT_TREE_INJECTION_KEY;
exports.SetOperationEnum = SetOperationEnum;
exports.TreeOptionsEnum = TreeOptionsEnum;
exports.treeEmits = treeEmits;
exports.treeNodeContentProps = treeNodeContentProps;
exports.treeNodeEmits = treeNodeEmits;
exports.treeNodeProps = treeNodeProps;
exports.treeProps = treeProps;
//# sourceMappingURL=virtual-tree.js.map