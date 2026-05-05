Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../utils/types.js');
const require_objects = require('../../../utils/objects.js');
const require_index = require('../../icon/index.js');
const require_index$1 = require('../../checkbox/index.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

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
			return (0, vue.h)(require_index$1.ElCheckbox, {
				disabled: isDisabled(),
				size: store.states.tableSize.value,
				indeterminate: store.states.selection.value.length > 0 && !store.states.isAllSelected.value,
				"onUpdate:modelValue": store.toggleAllSelection ?? void 0,
				modelValue: store.states.isAllSelected.value,
				ariaLabel: store.t("el.table.selectAllLabel")
			});
		},
		renderCell({ row, column, store, $index }) {
			return (0, vue.h)(require_index$1.ElCheckbox, {
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
			if (require_types.isNumber(index)) i = $index + index;
			else if ((0, _vue_shared.isFunction)(index)) i = index($index);
			return (0, vue.h)("div", {}, [i]);
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
			return (0, vue.h)("button", {
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
				return [(0, vue.h)(require_index.ElIcon, null, { default: () => {
					return [(0, vue.h)(_element_plus_icons_vue.ArrowRight)];
				} })];
			} });
		},
		sortable: false,
		resizable: false
	}
};
function defaultRenderCell({ row, column, $index }) {
	const property = column.property;
	const value = property && require_objects.getProp(row, property).value;
	if (column && column.formatter) return column.formatter(row, column, value, $index);
	return value?.toString?.() || "";
}
function treeCellPrefix({ row, treeNode, store }, createPlaceholder = false) {
	const { ns } = store;
	if (!treeNode) {
		if (createPlaceholder) return [(0, vue.h)("span", { class: ns.e("placeholder") })];
		return null;
	}
	const ele = [];
	const callback = function(e) {
		e.stopPropagation();
		if (treeNode.loading) return;
		store.loadOrToggle(row);
	};
	if (treeNode.indent) ele.push((0, vue.h)("span", {
		class: ns.e("indent"),
		style: { "padding-left": `${treeNode.indent}px` }
	}));
	if (require_types.isBoolean(treeNode.expanded) && !treeNode.noLazyChildren) {
		const expandClasses = [ns.e("expand-icon"), treeNode.expanded ? ns.em("expand-icon", "expanded") : ""];
		let icon = _element_plus_icons_vue.ArrowRight;
		if (treeNode.loading) icon = _element_plus_icons_vue.Loading;
		ele.push((0, vue.h)("button", {
			type: "button",
			"aria-label": store.t(treeNode.expanded ? "el.table.collapseRowLabel" : "el.table.expandRowLabel"),
			"aria-expanded": treeNode.expanded,
			class: expandClasses,
			onClick: callback
		}, { default: () => {
			return [(0, vue.h)(require_index.ElIcon, { class: ns.is("loading", treeNode.loading) }, { default: () => [(0, vue.h)(icon)] })];
		} }));
	} else ele.push((0, vue.h)("span", { class: ns.e("placeholder") }));
	return ele;
}

//#endregion
exports.cellForced = cellForced;
exports.cellStarts = cellStarts;
exports.defaultRenderCell = defaultRenderCell;
exports.getDefaultClassName = getDefaultClassName;
exports.treeCellPrefix = treeCellPrefix;
//# sourceMappingURL=config.js.map