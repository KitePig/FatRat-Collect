import Mousewheel from "../../../directives/mousewheel/index.mjs";
import { useLocale } from "../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { ElScrollbar } from "../../scrollbar/index.mjs";
import { useGlobalConfig } from "../../config-provider/src/hooks/use-global-config.mjs";
import { createStore } from "./store/helper.mjs";
import TableLayout from "./table-layout.mjs";
import { TABLE_INJECTION_KEY } from "./tokens.mjs";
import { convertToRows } from "./table-header/utils-helper.mjs";
import table_header_default from "./table-header/index.mjs";
import table_body_default from "./table-body/index.mjs";
import table_footer_default from "./table-footer/index.mjs";
import useUtils from "./table/utils-helper.mjs";
import useStyle from "./table/style-helper.mjs";
import useKeyRender from "./table/key-render-helper.mjs";
import defaults_default from "./table/defaults.mjs";
import { hColgroup } from "./h-helper.mjs";
import { useScrollbar } from "./composables/use-scrollbar.mjs";
import { debounce } from "lodash-unified";
import { computed, defineComponent, getCurrentInstance, onBeforeUnmount, provide } from "vue";

//#region ../../packages/components/table/src/table.vue?vue&type=script&lang.ts
let tableIdSeed = 1;
var table_vue_vue_type_script_lang_default = defineComponent({
	name: "ElTable",
	directives: { Mousewheel },
	components: {
		TableHeader: table_header_default,
		TableBody: table_body_default,
		TableFooter: table_footer_default,
		ElScrollbar,
		hColgroup
	},
	props: defaults_default,
	emits: [
		"select",
		"select-all",
		"selection-change",
		"cell-mouse-enter",
		"cell-mouse-leave",
		"cell-contextmenu",
		"cell-click",
		"cell-dblclick",
		"row-click",
		"row-contextmenu",
		"row-dblclick",
		"header-click",
		"header-contextmenu",
		"sort-change",
		"filter-change",
		"current-change",
		"header-dragend",
		"expand-change",
		"scroll"
	],
	setup(props) {
		const { t } = useLocale();
		const ns = useNamespace("table");
		const globalConfig = useGlobalConfig("table");
		const table = getCurrentInstance();
		provide(TABLE_INJECTION_KEY, table);
		const store = createStore(table, props);
		table.store = store;
		const layout = new TableLayout({
			store: table.store,
			table,
			fit: props.fit,
			showHeader: props.showHeader
		});
		table.layout = layout;
		const isEmpty = computed(() => (store.states.data.value || []).length === 0);
		/**
		* open functions
		*/
		const { setCurrentRow, getSelectionRows, toggleRowSelection, clearSelection, clearFilter, toggleAllSelection, toggleRowExpansion, clearSort, sort, updateKeyChildren } = useUtils(store);
		const { isHidden, renderExpanded, setDragVisible, isGroup, handleMouseLeave, handleHeaderFooterMousewheel, tableSize, emptyBlockStyle, resizeProxyVisible, bodyWidth, resizeState, doLayout, tableBodyStyles, tableLayout, scrollbarViewStyle, scrollbarStyle } = useStyle(props, layout, store, table);
		const { scrollBarRef, scrollTo, setScrollLeft, setScrollTop } = useScrollbar();
		const debouncedUpdateLayout = debounce(doLayout, 50);
		const tableId = `${ns.namespace.value}-table_${tableIdSeed++}`;
		table.tableId = tableId;
		table.state = {
			isGroup,
			resizeState,
			doLayout,
			debouncedUpdateLayout
		};
		const computedSumText = computed(() => props.sumText ?? t("el.table.sumText"));
		const computedEmptyText = computed(() => {
			return props.emptyText ?? t("el.table.emptyText");
		});
		const computedTooltipEffect = computed(() => props.tooltipEffect ?? globalConfig.value?.tooltipEffect);
		const computedTooltipOptions = computed(() => props.tooltipOptions ?? globalConfig.value?.tooltipOptions);
		const columns = computed(() => {
			return convertToRows(store.states.originColumns.value)[0];
		});
		useKeyRender(table);
		onBeforeUnmount(() => {
			debouncedUpdateLayout.cancel();
		});
		return {
			ns,
			layout,
			store,
			columns,
			handleHeaderFooterMousewheel,
			handleMouseLeave,
			tableId,
			tableSize,
			isHidden,
			isEmpty,
			renderExpanded,
			resizeProxyVisible,
			resizeState,
			isGroup,
			bodyWidth,
			tableBodyStyles,
			emptyBlockStyle,
			debouncedUpdateLayout,
			setCurrentRow,
			getSelectionRows,
			toggleRowSelection,
			clearSelection,
			clearFilter,
			toggleAllSelection,
			toggleRowExpansion,
			clearSort,
			doLayout,
			sort,
			updateKeyChildren,
			t,
			setDragVisible,
			context: table,
			computedSumText,
			computedEmptyText,
			computedTooltipEffect,
			computedTooltipOptions,
			tableLayout,
			scrollbarViewStyle,
			scrollbarStyle,
			scrollBarRef,
			scrollTo,
			setScrollLeft,
			setScrollTop,
			allowDragLastColumn: props.allowDragLastColumn
		};
	}
});

//#endregion
export { table_vue_vue_type_script_lang_default as default };
//# sourceMappingURL=table.vue_vue_type_script_lang.mjs.map