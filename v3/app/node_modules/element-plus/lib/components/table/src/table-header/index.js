Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../../hooks/use-namespace/index.js');
const require_index$2 = require('../../../checkbox/index.js');
const require_filter_panel = require('../filter-panel.js');
const require_layout_observer = require('../layout-observer.js');
const require_tokens = require('../tokens.js');
const require_event_helper = require('./event-helper.js');
const require_style_helper = require('./style.helper.js');
const require_utils_helper = require('./utils-helper.js');
let vue = require("vue");

//#region ../../packages/components/table/src/table-header/index.ts
var table_header_default = (0, vue.defineComponent)({
	name: "ElTableHeader",
	components: { ElCheckbox: require_index$2.ElCheckbox },
	props: {
		fixed: {
			type: String,
			default: ""
		},
		store: {
			required: true,
			type: Object
		},
		border: Boolean,
		defaultSort: {
			type: Object,
			default: () => {
				return {
					prop: "",
					order: ""
				};
			}
		},
		appendFilterPanelTo: { type: String },
		allowDragLastColumn: { type: Boolean }
	},
	setup(props, { emit }) {
		const instance = (0, vue.getCurrentInstance)();
		const parent = (0, vue.inject)(require_tokens.TABLE_INJECTION_KEY);
		const ns = require_index$1.useNamespace("table");
		const filterPanels = (0, vue.ref)({});
		const { onColumnsChange, onScrollableChange } = require_layout_observer.default(parent);
		const isTableLayoutAuto = parent?.props.tableLayout === "auto";
		const saveIndexSelection = (0, vue.reactive)(/* @__PURE__ */ new Map());
		const theadRef = (0, vue.ref)();
		let delayId;
		const updateFixedColumnStyle = () => {
			delayId = setTimeout(() => {
				if (saveIndexSelection.size > 0) {
					saveIndexSelection.forEach((column, key) => {
						const el = theadRef.value.querySelector(`.${key.replace(/\s/g, ".")}`);
						if (el) column.width = el.getBoundingClientRect().width || column.width;
					});
					saveIndexSelection.clear();
				}
			});
		};
		(0, vue.watch)(saveIndexSelection, updateFixedColumnStyle);
		(0, vue.onBeforeUnmount)(() => {
			if (delayId) {
				clearTimeout(delayId);
				delayId = void 0;
			}
		});
		(0, vue.onMounted)(async () => {
			await (0, vue.nextTick)();
			await (0, vue.nextTick)();
			const { prop, order } = props.defaultSort;
			parent?.store.commit("sort", {
				prop,
				order,
				init: true
			});
			updateFixedColumnStyle();
		});
		const { handleHeaderClick, handleHeaderContextMenu, handleMouseDown, handleMouseMove, handleMouseOut, handleSortClick, handleFilterClick } = require_event_helper.default(props, emit);
		const { getHeaderRowStyle, getHeaderRowClass, getHeaderCellStyle, getHeaderCellClass } = require_style_helper.default(props);
		const { isGroup, toggleAllSelection, columnRows } = require_utils_helper.default(props);
		const { t } = require_index.useLocale();
		instance.state = {
			onColumnsChange,
			onScrollableChange
		};
		instance.filterPanels = filterPanels;
		return {
			ns,
			t,
			filterPanels,
			onColumnsChange,
			onScrollableChange,
			columnRows,
			getHeaderRowClass,
			getHeaderRowStyle,
			getHeaderCellClass,
			getHeaderCellStyle,
			handleHeaderClick,
			handleHeaderContextMenu,
			handleMouseDown,
			handleMouseMove,
			handleMouseOut,
			handleSortClick,
			handleFilterClick,
			isGroup,
			toggleAllSelection,
			saveIndexSelection,
			isTableLayoutAuto,
			theadRef,
			updateFixedColumnStyle
		};
	},
	render() {
		const { ns, t, isGroup, columnRows, getHeaderCellStyle, getHeaderCellClass, getHeaderRowClass, getHeaderRowStyle, handleHeaderClick, handleHeaderContextMenu, handleMouseDown, handleMouseMove, handleSortClick, handleMouseOut, store, $parent, saveIndexSelection, isTableLayoutAuto } = this;
		let rowSpan = 1;
		return (0, vue.h)("thead", {
			ref: "theadRef",
			class: ns.is("group", isGroup)
		}, columnRows.map((subColumns, rowIndex) => (0, vue.h)("tr", {
			class: getHeaderRowClass(rowIndex),
			key: rowIndex,
			style: getHeaderRowStyle(rowIndex)
		}, subColumns.map((column, cellIndex) => {
			if (column.rowSpan > rowSpan) rowSpan = column.rowSpan;
			const _class = getHeaderCellClass(rowIndex, cellIndex, subColumns, column);
			if (isTableLayoutAuto && column.fixed) saveIndexSelection.set(_class, column);
			return (0, vue.h)("th", {
				class: _class,
				colspan: column.colSpan,
				key: `${column.id}-thead`,
				rowspan: column.rowSpan,
				scope: column.colSpan > 1 ? "colgroup" : "col",
				ariaSort: column.sortable ? column.order : void 0,
				style: getHeaderCellStyle(rowIndex, cellIndex, subColumns, column),
				onClick: ($event) => {
					if ($event.currentTarget?.classList.contains("noclick")) return;
					handleHeaderClick($event, column);
				},
				onContextmenu: ($event) => handleHeaderContextMenu($event, column),
				onMousedown: ($event) => handleMouseDown($event, column),
				onMousemove: ($event) => handleMouseMove($event, column),
				onMouseout: handleMouseOut
			}, [(0, vue.h)("div", { class: ["cell", column.filteredValue && column.filteredValue.length > 0 ? "highlight" : ""] }, [
				column.renderHeader ? column.renderHeader({
					column,
					$index: cellIndex,
					store,
					_self: $parent
				}) : column.label,
				column.sortable && (0, vue.h)("button", {
					type: "button",
					class: "caret-wrapper",
					"aria-label": t("el.table.sortLabel", { column: column.label || "" }),
					onClick: ($event) => handleSortClick($event, column)
				}, [(0, vue.h)("i", {
					onClick: ($event) => handleSortClick($event, column, "ascending"),
					class: "sort-caret ascending"
				}), (0, vue.h)("i", {
					onClick: ($event) => handleSortClick($event, column, "descending"),
					class: "sort-caret descending"
				})]),
				column.filterable && (0, vue.h)(require_filter_panel.default, {
					store,
					placement: column.filterPlacement || "bottom-start",
					appendTo: $parent?.appendFilterPanelTo,
					column,
					upDataColumn: (key, value) => {
						column[key] = value;
					}
				}, { "filter-icon": () => column.renderFilterIcon ? column.renderFilterIcon({ filterOpened: column.filterOpened }) : null })
			])]);
		}))));
	}
});

//#endregion
exports.default = table_header_default;
//# sourceMappingURL=index.js.map