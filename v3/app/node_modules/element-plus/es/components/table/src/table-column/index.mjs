import { isArray, isString, isUndefined } from "../../../../utils/types.mjs";
import { useGlobalConfig } from "../../../config-provider/src/hooks/use-global-config.mjs";
import { ElCheckbox } from "../../../checkbox/index.mjs";
import { compose, mergeOptions } from "../util.mjs";
import { cellStarts } from "../config.mjs";
import useWatcher from "./watcher-helper.mjs";
import useRender from "./render-helper.mjs";
import defaults_default from "./defaults.mjs";
import { Fragment, computed, defineComponent, getCurrentInstance, h, onBeforeMount, onBeforeUnmount, onMounted, ref } from "vue";

//#region ../../packages/components/table/src/table-column/index.ts
let columnIdSeed = 1;
var table_column_default = defineComponent({
	name: "ElTableColumn",
	components: { ElCheckbox },
	props: defaults_default,
	setup(props, { slots }) {
		const instance = getCurrentInstance();
		const globalConfig = useGlobalConfig("table");
		const columnConfig = ref({});
		const owner = computed(() => {
			let parent = instance.parent;
			while (parent && !parent.tableId) parent = parent.parent;
			return parent;
		});
		const { registerNormalWatchers, registerComplexWatchers } = useWatcher(owner, props);
		const { columnId, isSubColumn, realHeaderAlign, columnOrTableParent, setColumnWidth, setColumnForcedProps, setColumnRenders, getPropsData, getColumnElIndex, realAlign, updateColumnOrder } = useRender(props, slots, owner);
		const parent = columnOrTableParent.value;
		columnId.value = `${"tableId" in parent && parent.tableId || "columnId" in parent && parent.columnId}_column_${columnIdSeed++}`;
		onBeforeMount(() => {
			isSubColumn.value = owner.value !== parent;
			const type = props.type || "default";
			const sortable = props.sortable === "" ? true : props.sortable;
			const showOverflowTooltip = type === "selection" ? false : isUndefined(props.showOverflowTooltip) ? parent.props.showOverflowTooltip ?? globalConfig.value?.showOverflowTooltip : props.showOverflowTooltip;
			const tooltipFormatter = isUndefined(props.tooltipFormatter) ? parent.props.tooltipFormatter ?? globalConfig.value?.tooltipFormatter : props.tooltipFormatter;
			const defaults = {
				...cellStarts[type],
				id: columnId.value,
				type,
				property: props.prop || props.property,
				align: realAlign,
				headerAlign: realHeaderAlign,
				showOverflowTooltip,
				tooltipFormatter,
				filterable: props.filters || props.filterMethod,
				filteredValue: [],
				filterPlacement: "",
				filterClassName: "",
				isColumnGroup: false,
				isSubColumn: false,
				filterOpened: false,
				sortable,
				index: props.index,
				rawColumnKey: instance.vnode.key
			};
			let column = getPropsData([
				"columnKey",
				"label",
				"className",
				"labelClassName",
				"type",
				"renderHeader",
				"formatter",
				"fixed",
				"resizable"
			], [
				"sortMethod",
				"sortBy",
				"sortOrders"
			], ["selectable", "reserveSelection"], [
				"filterMethod",
				"filters",
				"filterMultiple",
				"filterOpened",
				"filteredValue",
				"filterPlacement",
				"filterClassName"
			]);
			column = mergeOptions(defaults, column);
			column = compose(setColumnRenders, setColumnWidth, setColumnForcedProps)(column);
			columnConfig.value = column;
			registerNormalWatchers();
			registerComplexWatchers();
		});
		onMounted(() => {
			const parent = columnOrTableParent.value;
			const children = isSubColumn.value ? parent.vnode.el?.children : parent.refs.hiddenColumns?.children;
			const getColumnIndex = () => getColumnElIndex(children || [], instance.vnode.el);
			columnConfig.value.getColumnIndex = getColumnIndex;
			getColumnIndex() > -1 && owner.value.store.commit("insertColumn", columnConfig.value, isSubColumn.value ? "columnConfig" in parent && parent.columnConfig.value : null, updateColumnOrder);
		});
		onBeforeUnmount(() => {
			const getColumnIndex = columnConfig.value.getColumnIndex;
			(getColumnIndex ? getColumnIndex() : -1) > -1 && owner.value.store.commit("removeColumn", columnConfig.value, isSubColumn.value ? "columnConfig" in parent && parent.columnConfig.value : null, updateColumnOrder);
		});
		instance.columnId = columnId.value;
		instance.columnConfig = columnConfig;
	},
	render() {
		try {
			const renderDefault = this.$slots.default?.({
				row: {},
				column: {},
				$index: -1
			});
			const children = [];
			if (isArray(renderDefault)) {
				for (const childNode of renderDefault) if (childNode.type?.name === "ElTableColumn" || childNode.shapeFlag & 2) children.push(childNode);
				else if (childNode.type === Fragment && isArray(childNode.children)) childNode.children.forEach((vnode) => {
					if (vnode?.patchFlag !== 1024 && !isString(vnode?.children)) children.push(vnode);
				});
			}
			return h("div", children);
		} catch {
			return h("div", []);
		}
	}
});

//#endregion
export { table_column_default as default };
//# sourceMappingURL=index.mjs.map