Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../../utils/types.js');
const require_use_global_config = require('../../../config-provider/src/hooks/use-global-config.js');
const require_index = require('../../../checkbox/index.js');
const require_util = require('../util.js');
const require_config = require('../config.js');
const require_watcher_helper = require('./watcher-helper.js');
const require_render_helper = require('./render-helper.js');
const require_defaults = require('./defaults.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/table/src/table-column/index.ts
let columnIdSeed = 1;
var table_column_default = (0, vue.defineComponent)({
	name: "ElTableColumn",
	components: { ElCheckbox: require_index.ElCheckbox },
	props: require_defaults.default,
	setup(props, { slots }) {
		const instance = (0, vue.getCurrentInstance)();
		const globalConfig = require_use_global_config.useGlobalConfig("table");
		const columnConfig = (0, vue.ref)({});
		const owner = (0, vue.computed)(() => {
			let parent = instance.parent;
			while (parent && !parent.tableId) parent = parent.parent;
			return parent;
		});
		const { registerNormalWatchers, registerComplexWatchers } = require_watcher_helper.default(owner, props);
		const { columnId, isSubColumn, realHeaderAlign, columnOrTableParent, setColumnWidth, setColumnForcedProps, setColumnRenders, getPropsData, getColumnElIndex, realAlign, updateColumnOrder } = require_render_helper.default(props, slots, owner);
		const parent = columnOrTableParent.value;
		columnId.value = `${"tableId" in parent && parent.tableId || "columnId" in parent && parent.columnId}_column_${columnIdSeed++}`;
		(0, vue.onBeforeMount)(() => {
			isSubColumn.value = owner.value !== parent;
			const type = props.type || "default";
			const sortable = props.sortable === "" ? true : props.sortable;
			const showOverflowTooltip = type === "selection" ? false : require_types.isUndefined(props.showOverflowTooltip) ? parent.props.showOverflowTooltip ?? globalConfig.value?.showOverflowTooltip : props.showOverflowTooltip;
			const tooltipFormatter = require_types.isUndefined(props.tooltipFormatter) ? parent.props.tooltipFormatter ?? globalConfig.value?.tooltipFormatter : props.tooltipFormatter;
			const defaults = {
				...require_config.cellStarts[type],
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
			column = require_util.mergeOptions(defaults, column);
			column = require_util.compose(setColumnRenders, setColumnWidth, setColumnForcedProps)(column);
			columnConfig.value = column;
			registerNormalWatchers();
			registerComplexWatchers();
		});
		(0, vue.onMounted)(() => {
			const parent = columnOrTableParent.value;
			const children = isSubColumn.value ? parent.vnode.el?.children : parent.refs.hiddenColumns?.children;
			const getColumnIndex = () => getColumnElIndex(children || [], instance.vnode.el);
			columnConfig.value.getColumnIndex = getColumnIndex;
			getColumnIndex() > -1 && owner.value.store.commit("insertColumn", columnConfig.value, isSubColumn.value ? "columnConfig" in parent && parent.columnConfig.value : null, updateColumnOrder);
		});
		(0, vue.onBeforeUnmount)(() => {
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
			if ((0, _vue_shared.isArray)(renderDefault)) {
				for (const childNode of renderDefault) if (childNode.type?.name === "ElTableColumn" || childNode.shapeFlag & 2) children.push(childNode);
				else if (childNode.type === vue.Fragment && (0, _vue_shared.isArray)(childNode.children)) childNode.children.forEach((vnode) => {
					if (vnode?.patchFlag !== 1024 && !(0, _vue_shared.isString)(vnode?.children)) children.push(vnode);
				});
			}
			return (0, vue.h)("div", children);
		} catch {
			return (0, vue.h)("div", []);
		}
	}
});

//#endregion
exports.default = table_column_default;
//# sourceMappingURL=index.js.map