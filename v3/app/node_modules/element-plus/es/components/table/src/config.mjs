import { isBoolean, isFunction, isNumber } from "../../../utils/types.mjs";
import { getProp } from "../../../utils/objects.mjs";
import { ElIcon } from "../../icon/index.mjs";
import { ElCheckbox } from "../../checkbox/index.mjs";
import { ArrowRight, Loading } from "@element-plus/icons-vue";
import { h } from "vue";

//#region ../../packages/components/table/src/config.ts
const defaultClassNames = {
	selection: "table-column--selection",
	expand: "table__expand-column"
};
const cellStarts = {
	default: { order: "" },
	selection: {
		width: 48,
		minWidth: 48,
		realWidth: 48,
		order: ""
	},
	expand: {
		width: 48,
		minWidth: 48,
		realWidth: 48,
		order: ""
	},
	index: {
		width: 48,
		minWidth: 48,
		realWidth: 48,
		order: ""
	}
};
const getDefaultClassName = (type) => {
	return defaultClassNames[type] || "";
};
const cellForced = {
	selection: {
		renderHeader({ store }) {
			function isDisabled() {
				return store.states.data.value && store.states.data.value.length === 0;
			}
			return h(ElCheckbox, {
				disabled: isDisabled(),
				size: store.states.tableSize.value,
				indeterminate: store.states.selection.value.length > 0 && !store.states.isAllSelected.value,
				"onUpdate:modelValue": store.toggleAllSelection ?? void 0,
				modelValue: store.states.isAllSelected.value,
				ariaLabel: store.t("el.table.selectAllLabel")
			});
		},
		renderCell({ row, column, store, $index }) {
			return h(ElCheckbox, {
				disabled: column.selectable ? !column.selectable.call(null, row, $index) : false,
				size: store.states.tableSize.value,
				onChange: () => {
					store.commit("rowSelectedChanged", row);
				},
				onClick: (event) => event.stopPropagation(),
				modelValue: store.isSelected(row),
				ariaLabel: store.t("el.table.selectRowLabel")
			});
		},
		sortable: false,
		resizable: false
	},
	index: {
		renderHeader({ column }) {
			return column.label || "#";
		},
		renderCell({ column, $index }) {
			let i = $index + 1;
			const index = column.index;
			if (isNumber(index)) i = $index + index;
			else if (isFunction(index)) i = index($index);
			return h("div", {}, [i]);
		},
		sortable: false
	},
	expand: {
		renderHeader({ column }) {
			return column.label || "";
		},
		renderCell({ column, row, store, expanded, $index }) {
			const { ns } = store;
			const classes = [ns.e("expand-icon")];
			if (!column.renderExpand && expanded) classes.push(ns.em("expand-icon", "expanded"));
			const callback = function(e) {
				e.stopPropagation();
				store.toggleRowExpansion(row);
			};
			const isRowExpandable = store.states.rowExpandable.value?.(row, $index) ?? true;
			if (!isRowExpandable) classes.push(ns.is("disabled"));
			return h("button", {
				type: "button",
				disabled: !isRowExpandable,
				"aria-label": store.t(expanded ? "el.table.collapseRowLabel" : "el.table.expandRowLabel"),
				"aria-expanded": expanded,
				class: classes,
				onClick: callback
			}, { default: () => {
				if (column.renderExpand) return [column.renderExpand({
					expanded,
					expandable: isRowExpandable
				})];
				return [h(ElIcon, null, { default: () => {
					return [h(ArrowRight)];
				} })];
			} });
		},
		sortable: false,
		resizable: false
	}
};
function defaultRenderCell({ row, column, $index }) {
	const property = column.property;
	const value = property && getProp(row, property).value;
	if (column && column.formatter) return column.formatter(row, column, value, $index);
	return value?.toString?.() || "";
}
function treeCellPrefix({ row, treeNode, store }, createPlaceholder = false) {
	const { ns } = store;
	if (!treeNode) {
		if (createPlaceholder) return [h("span", { class: ns.e("placeholder") })];
		return null;
	}
	const ele = [];
	const callback = function(e) {
		e.stopPropagation();
		if (treeNode.loading) return;
		store.loadOrToggle(row);
	};
	if (treeNode.indent) ele.push(h("span", {
		class: ns.e("indent"),
		style: { "padding-left": `${treeNode.indent}px` }
	}));
	if (isBoolean(treeNode.expanded) && !treeNode.noLazyChildren) {
		const expandClasses = [ns.e("expand-icon"), treeNode.expanded ? ns.em("expand-icon", "expanded") : ""];
		let icon = ArrowRight;
		if (treeNode.loading) icon = Loading;
		ele.push(h("button", {
			type: "button",
			"aria-label": store.t(treeNode.expanded ? "el.table.collapseRowLabel" : "el.table.expandRowLabel"),
			"aria-expanded": treeNode.expanded,
			class: expandClasses,
			onClick: callback
		}, { default: () => {
			return [h(ElIcon, { class: ns.is("loading", treeNode.loading) }, { default: () => [h(icon)] })];
		} }));
	} else ele.push(h("span", { class: ns.e("placeholder") }));
	return ele;
}

//#endregion
export { cellForced, cellStarts, defaultRenderCell, getDefaultClassName, treeCellPrefix };
//# sourceMappingURL=config.mjs.map