const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../hooks/use-namespace/index.js');
const require_constants = require('../../form/src/constants.js');
const require_fixed_size_list = require('../../virtual-list/src/components/fixed-size-list.js');
const require_virtual_tree = require('./virtual-tree.js');
const require_useTree = require('./composables/useTree.js');
const require_tree_node = require('./tree-node.js');
let vue = require("vue");

//#region ../../packages/components/tree-v2/src/tree.vue?vue&type=script&setup=true&lang.ts
var tree_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElTreeV2",
	__name: "tree",
	props: require_virtual_tree.treeProps,
	emits: require_virtual_tree.treeEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const slots = (0, vue.useSlots)();
		const treeNodeSize = (0, vue.computed)(() => props.itemSize);
		(0, vue.provide)(require_virtual_tree.ROOT_TREE_INJECTION_KEY, {
			ctx: {
				emit,
				slots
			},
			props,
			instance: (0, vue.getCurrentInstance)()
		});
		(0, vue.provide)(require_constants.formItemContextKey, void 0);
		const { t } = require_index.useLocale();
		const ns = require_index$1.useNamespace("tree");
		const { flattenTree, isNotEmpty, listRef, toggleExpand, isIndeterminate, isChecked, isDisabled, isCurrent, isForceHiddenExpandIcon, handleNodeClick, handleNodeDrop, handleNodeCheck, toggleCheckbox, getCurrentNode, getCurrentKey, setCurrentKey, getCheckedKeys, getCheckedNodes, getHalfCheckedKeys, getHalfCheckedNodes, setChecked, setCheckedKeys, filter, setData, getNode, expandNode, collapseNode, setExpandedKeys, scrollToNode, scrollTo } = require_useTree.useTree(props, emit);
		__expose({
			toggleCheckbox,
			getCurrentNode,
			getCurrentKey,
			setCurrentKey,
			getCheckedKeys,
			getCheckedNodes,
			getHalfCheckedKeys,
			getHalfCheckedNodes,
			setChecked,
			setCheckedKeys,
			filter,
			setData,
			getNode,
			expandNode,
			collapseNode,
			setExpandedKeys,
			scrollToNode,
			scrollTo
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				class: (0, vue.normalizeClass)([(0, vue.unref)(ns).b(), { [(0, vue.unref)(ns).m("highlight-current")]: __props.highlightCurrent }]),
				role: "tree"
			}, [(0, vue.unref)(isNotEmpty) ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_fixed_size_list.default), {
				key: 0,
				ref_key: "listRef",
				ref: listRef,
				"class-name": (0, vue.unref)(ns).b("virtual-list"),
				data: (0, vue.unref)(flattenTree),
				total: (0, vue.unref)(flattenTree).length,
				height: __props.height,
				"item-size": treeNodeSize.value,
				"perf-mode": __props.perfMode,
				"scrollbar-always-on": __props.scrollbarAlwaysOn
			}, {
				default: (0, vue.withCtx)(({ data, index, style }) => [((0, vue.openBlock)(), (0, vue.createBlock)(require_tree_node.default, {
					key: data[index].key,
					style: (0, vue.normalizeStyle)(style),
					node: data[index],
					expanded: data[index].expanded,
					"show-checkbox": __props.showCheckbox,
					checked: (0, vue.unref)(isChecked)(data[index]),
					indeterminate: (0, vue.unref)(isIndeterminate)(data[index]),
					"item-size": treeNodeSize.value,
					disabled: (0, vue.unref)(isDisabled)(data[index]),
					current: (0, vue.unref)(isCurrent)(data[index]),
					"hidden-expand-icon": (0, vue.unref)(isForceHiddenExpandIcon)(data[index]),
					onClick: (0, vue.unref)(handleNodeClick),
					onToggle: (0, vue.unref)(toggleExpand),
					onCheck: (0, vue.unref)(handleNodeCheck),
					onDrop: (0, vue.unref)(handleNodeDrop)
				}, null, 8, [
					"style",
					"node",
					"expanded",
					"show-checkbox",
					"checked",
					"indeterminate",
					"item-size",
					"disabled",
					"current",
					"hidden-expand-icon",
					"onClick",
					"onToggle",
					"onCheck",
					"onDrop"
				]))]),
				_: 1
			}, 8, [
				"class-name",
				"data",
				"total",
				"height",
				"item-size",
				"perf-mode",
				"scrollbar-always-on"
			])) : ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				key: 1,
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("empty-block"))
			}, [(0, vue.renderSlot)(_ctx.$slots, "empty", {}, () => [(0, vue.createElementVNode)("span", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("empty-text")) }, (0, vue.toDisplayString)(__props.emptyText ?? (0, vue.unref)(t)("el.tree.emptyText")), 3)])], 2))], 2);
		};
	}
});

//#endregion
exports.default = tree_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=tree.vue_vue_type_script_setup_true_lang.js.map