import { useLocale } from "../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { formItemContextKey } from "../../form/src/constants.mjs";
import FixedSizeList from "../../virtual-list/src/components/fixed-size-list.mjs";
import { ROOT_TREE_INJECTION_KEY, treeEmits, treeProps } from "./virtual-tree.mjs";
import { useTree } from "./composables/useTree.mjs";
import tree_node_default from "./tree-node.mjs";
import { computed, createBlock, createElementBlock, createElementVNode, defineComponent, getCurrentInstance, normalizeClass, normalizeStyle, openBlock, provide, renderSlot, toDisplayString, unref, useSlots, withCtx } from "vue";

//#region ../../packages/components/tree-v2/src/tree.vue?vue&type=script&setup=true&lang.ts
var tree_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElTreeV2",
	__name: "tree",
	props: treeProps,
	emits: treeEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const slots = useSlots();
		const treeNodeSize = computed(() => props.itemSize);
		provide(ROOT_TREE_INJECTION_KEY, {
			ctx: {
				emit,
				slots
			},
			props,
			instance: getCurrentInstance()
		});
		provide(formItemContextKey, void 0);
		const { t } = useLocale();
		const ns = useNamespace("tree");
		const { flattenTree, isNotEmpty, listRef, toggleExpand, isIndeterminate, isChecked, isDisabled, isCurrent, isForceHiddenExpandIcon, handleNodeClick, handleNodeDrop, handleNodeCheck, toggleCheckbox, getCurrentNode, getCurrentKey, setCurrentKey, getCheckedKeys, getCheckedNodes, getHalfCheckedKeys, getHalfCheckedNodes, setChecked, setCheckedKeys, filter, setData, getNode, expandNode, collapseNode, setExpandedKeys, scrollToNode, scrollTo } = useTree(props, emit);
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
			return openBlock(), createElementBlock("div", {
				class: normalizeClass([unref(ns).b(), { [unref(ns).m("highlight-current")]: __props.highlightCurrent }]),
				role: "tree"
			}, [unref(isNotEmpty) ? (openBlock(), createBlock(unref(FixedSizeList), {
				key: 0,
				ref_key: "listRef",
				ref: listRef,
				"class-name": unref(ns).b("virtual-list"),
				data: unref(flattenTree),
				total: unref(flattenTree).length,
				height: __props.height,
				"item-size": treeNodeSize.value,
				"perf-mode": __props.perfMode,
				"scrollbar-always-on": __props.scrollbarAlwaysOn
			}, {
				default: withCtx(({ data, index, style }) => [(openBlock(), createBlock(tree_node_default, {
					key: data[index].key,
					style: normalizeStyle(style),
					node: data[index],
					expanded: data[index].expanded,
					"show-checkbox": __props.showCheckbox,
					checked: unref(isChecked)(data[index]),
					indeterminate: unref(isIndeterminate)(data[index]),
					"item-size": treeNodeSize.value,
					disabled: unref(isDisabled)(data[index]),
					current: unref(isCurrent)(data[index]),
					"hidden-expand-icon": unref(isForceHiddenExpandIcon)(data[index]),
					onClick: unref(handleNodeClick),
					onToggle: unref(toggleExpand),
					onCheck: unref(handleNodeCheck),
					onDrop: unref(handleNodeDrop)
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
			])) : (openBlock(), createElementBlock("div", {
				key: 1,
				class: normalizeClass(unref(ns).e("empty-block"))
			}, [renderSlot(_ctx.$slots, "empty", {}, () => [createElementVNode("span", { class: normalizeClass(unref(ns).e("empty-text")) }, toDisplayString(__props.emptyText ?? unref(t)("el.tree.emptyText")), 3)])], 2))], 2);
		};
	}
});

//#endregion
export { tree_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=tree.vue_vue_type_script_setup_true_lang.mjs.map