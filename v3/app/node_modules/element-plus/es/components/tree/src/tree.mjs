import { isBoolean } from "../../../utils/types.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { iconPropType } from "../../../utils/vue/icon.mjs";

//#region ../../packages/components/tree/src/tree.ts
const treeProps = buildProps({
	data: {
		type: definePropType(Array),
		default: () => []
	},
	emptyText: { type: String },
	renderAfterExpand: {
		type: Boolean,
		default: true
	},
	nodeKey: String,
	checkStrictly: Boolean,
	defaultExpandAll: Boolean,
	expandOnClickNode: {
		type: Boolean,
		default: true
	},
	checkOnClickNode: Boolean,
	checkOnClickLeaf: {
		type: Boolean,
		default: true
	},
	checkDescendants: Boolean,
	autoExpandParent: {
		type: Boolean,
		default: true
	},
	defaultCheckedKeys: { type: Array },
	defaultExpandedKeys: { type: Array },
	currentNodeKey: { type: [String, Number] },
	renderContent: { type: definePropType(Function) },
	showCheckbox: Boolean,
	draggable: Boolean,
	allowDrag: { type: definePropType(Function) },
	allowDrop: { type: definePropType(Function) },
	props: {
		type: Object,
		default: () => ({
			children: "children",
			label: "label",
			disabled: "disabled"
		})
	},
	lazy: Boolean,
	highlightCurrent: Boolean,
	load: { type: Function },
	filterNodeMethod: { type: Function },
	accordion: Boolean,
	indent: {
		type: Number,
		default: 18
	},
	icon: { type: iconPropType }
});
const treeEmits = {
	"check-change": (data, checked, indeterminate) => data && isBoolean(checked) && isBoolean(indeterminate),
	"current-change": (data, node) => true,
	"node-click": (data, node, nodeInstance, evt) => data && node && evt instanceof Event,
	"node-contextmenu": (evt, data, node, nodeInstance) => evt instanceof Event && data && node,
	"node-collapse": (data, node, nodeInstance) => data && node,
	"node-expand": (data, node, nodeInstance) => data && node,
	check: (data, checkedInfo) => data && checkedInfo,
	"node-drag-start": (node, evt) => node && evt,
	"node-drag-end": (draggingNode, dropNode, dropType, evt) => draggingNode && evt,
	"node-drop": (draggingNode, dropNode, dropType, evt) => draggingNode && dropNode && evt,
	"node-drag-leave": (draggingNode, oldDropNode, evt) => draggingNode && oldDropNode && evt,
	"node-drag-enter": (draggingNode, dropNode, evt) => draggingNode && dropNode && evt,
	"node-drag-over": (draggingNode, dropNode, evt) => draggingNode && dropNode && evt
};

//#endregion
export { treeEmits, treeProps };
//# sourceMappingURL=tree.mjs.map