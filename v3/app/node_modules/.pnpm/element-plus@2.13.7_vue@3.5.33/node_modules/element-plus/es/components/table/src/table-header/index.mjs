import { useLocale } from "../../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../../hooks/use-namespace/index.mjs";
import { ElCheckbox } from "../../../checkbox/index.mjs";
import filter_panel_default from "../filter-panel.mjs";
import useLayoutObserver from "../layout-observer.mjs";
import { TABLE_INJECTION_KEY } from "../tokens.mjs";
import useEvent from "./event-helper.mjs";
import useStyle from "./style.helper.mjs";
import useUtils from "./utils-helper.mjs";
import { defineComponent, getCurrentInstance, h, inject, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";

//#region ../../packages/components/table/src/table-header/index.ts
var table_header_default = defineComponent({
	name: "ElTableHeader",
	components: { ElCheckbox },
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
		const instance = getCurrentInstance();
		const parent = inject(TABLE_INJECTION_KEY);
		const ns = useNamespace("table");
		const filterPanels = ref({});
		const { onColumnsChange, onScrollableChange } = useLayoutObserver(parent);
		const isTableLayoutAuto = parent?.props.tableLayout === "auto";
		const saveIndexSelection = reactive(/* @__PURE__ */ new Map());
		const theadRef = ref();
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
		watch(saveIndexSelection, updateFixedColumnStyle);
		onBeforeUnmount(() => {
			if (delayId) {
				clearTimeout(delayId);
				delayId = void 0;
			}
		});
		onMounted(async () => {
			await nextTick();
			await nextTick();
			const { prop, order } = props.defaultSort;
			parent?.store.commit("sort", {
				prop,
				order,
				init: true
			});
			updateFixedColumnStyle();
		});
		const { handleHeaderClick, handleHeaderContextMenu, handleMouseDown, handleMouseMove, handleMouseOut, handleSortClick, handleFilterClick } = useEvent(props, emit);
		const { getHeaderRowStyle, getHeaderRowClass, getHeaderCellStyle, getHeaderCellClass } = useStyle(props);
		const { isGroup, toggleAllSelection, columnRows } = useUtils(props);
		const { t } = useLocale();
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
		return h("thead", {
			ref: "theadRef",
			class: ns.is("group", isGroup)
		}, columnRows.map((subColumns, rowIndex) => h("tr", {
			class: getHeaderRowClass(rowIndex),
			key: rowIndex,
			style: getHeaderRowStyle(rowIndex)
		}, subColumns.map((column, cellIndex) => {
			if (column.rowSpan > rowSpan) rowSpan = column.rowSpan;
			const _class = getHeaderCellClass(rowIndex, cellIndex, subColumns, column);
			if (isTableLayoutAuto && column.fixed) saveIndexSelection.set(_class, column);
			return h("th", {
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
			}, [h("div", { class: ["cell", column.filteredValue && column.filteredValue.length > 0 ? "highlight" : ""] }, [
				column.renderHeader ? column.renderHeader({
					column,
					$index: cellIndex,
					store,
					_self: $parent
				}) : column.label,
				column.sortable && h("button", {
					type: "button",
					class: "caret-wrapper",
					"aria-label": t("el.table.sortLabel", { column: column.label || "" }),
					onClick: ($event) => handleSortClick($event, column)
				}, [h("i", {
					onClick: ($event) => handleSortClick($event, column, "ascending"),
					class: "sort-caret ascending"
				}), h("i", {
					onClick: ($event) => handleSortClick($event, column, "descending"),
					class: "sort-caret descending"
				})]),
				column.filterable && h(filter_panel_default, {
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
export { table_header_default as default };
//# sourceMappingURL=index.mjs.map