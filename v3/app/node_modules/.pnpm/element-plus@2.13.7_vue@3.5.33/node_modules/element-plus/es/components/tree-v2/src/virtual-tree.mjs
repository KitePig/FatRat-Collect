import { isBoolean } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { iconPropType } from "../../../utils/vue/icon.mjs";
import { mutable } from "../../../utils/typescript.mjs";

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
const treeProps = buildProps({
	data: {
		type: definePropType(Array),
		default: () => mutable([])
	},
	emptyText: { type: String },
	height: {
		type: Number,
		default: 200
	},
	props: {
		type: definePropType(Object),
		default: () => mutable({
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
		type: definePropType(Array),
		default: () => mutable([])
	},
	checkStrictly: Boolean,
	defaultExpandedKeys: {
		type: definePropType(Array),
		default: () => mutable([])
	},
	indent: {
		type: Number,
		default: 16
	},
	itemSize,
	icon: { type: iconPropType },
	expandOnClickNode: {
		type: Boolean,
		default: true
	},
	checkOnClickNode: Boolean,
	checkOnClickLeaf: {
		type: Boolean,
		default: true
	},
	currentNodeKey: { type: definePropType([String, Number]) },
	accordion: Boolean,
	filterMethod: { type: definePropType(Function) },
	perfMode: {
		type: Boolean,
		default: true
	},
	scrollbarAlwaysOn: Boolean
});
/**
* @deprecated Removed after 3.0.0, Use `TreeNodeProps` instead.
*/
const treeNodeProps = buildProps({
	node: {
		type: definePropType(Object),
		default: () => mutable(EMPTY_NODE)
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
const treeNodeContentProps = buildProps({ node: {
	type: definePropType(Object),
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
	[NODE_CHECK_CHANGE]: (data, checked) => data && isBoolean(checked),
	[NODE_CONTEXTMENU]: (evt, data, node) => evt && data && node
};
const treeNodeEmits = {
	click: (node, e) => !!(node && e),
	drop: (node, e) => !!(node && e),
	toggle: (node) => !!node,
	check: (node, checked) => node && isBoolean(checked)
};

//#endregion
export { CURRENT_CHANGE, EMPTY_NODE, NODE_CHECK, NODE_CHECK_CHANGE, NODE_CLICK, NODE_COLLAPSE, NODE_CONTEXTMENU, NODE_DROP, NODE_EXPAND, ROOT_TREE_INJECTION_KEY, SetOperationEnum, TreeOptionsEnum, treeEmits, treeNodeContentProps, treeNodeEmits, treeNodeProps, treeProps };
//# sourceMappingURL=virtual-tree.mjs.map