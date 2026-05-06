Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../../utils/types.js');
const require_error = require('../../../../utils/error.js');
const require_index = require('../../../../hooks/use-namespace/index.js');
const require_util = require('../util.js');
const require_config = require('../config.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/table/src/table-column/render-helper.ts
function useRender(props, slots, owner) {
	const instance = (0, vue.getCurrentInstance)();
	const columnId = (0, vue.ref)("");
	const isSubColumn = (0, vue.ref)(false);
	const realAlign = (0, vue.ref)();
	const realHeaderAlign = (0, vue.ref)();
	const ns = require_index.useNamespace("table");
	(0, vue.watchEffect)(() => {
		realAlign.value = props.align ? `is-${props.align}` : null;
		realAlign.value;
	});
	(0, vue.watchEffect)(() => {
		realHeaderAlign.value = props.headerAlign ? `is-${props.headerAlign}` : realAlign.value;
		realHeaderAlign.value;
	});
	const columnOrTableParent = (0, vue.computed)(() => {
		let parent = instance.vnode.vParent || instance.parent;
		while (parent && !parent.tableId && !parent.columnId) parent = parent.vnode.vParent || parent.parent;
		return parent;
	});
	const hasTreeColumn = (0, vue.computed)(() => {
		const { store } = instance.parent;
		if (!store) return false;
		const { treeData } = store.states;
		const treeDataValue = treeData.value;
		return treeDataValue && Object.keys(treeDataValue).length > 0;
	});
	const realWidth = (0, vue.ref)(require_util.parseWidth(props.width));
	const realMinWidth = (0, vue.ref)(require_util.parseMinWidth(props.minWidth));
	const setColumnWidth = (column) => {
		if (realWidth.value) column.width = realWidth.value;
		if (realMinWidth.value) column.minWidth = realMinWidth.value;
		if (!realWidth.value && realMinWidth.value) column.width = void 0;
		if (!column.minWidth) column.minWidth = 80;
		column.realWidth = Number(require_types.isUndefined(column.width) ? column.minWidth : column.width);
		return column;
	};
	const setColumnForcedProps = (column) => {
		const type = column.type;
		const source = require_config.cellForced[type] || {};
		Object.keys(source).forEach((prop) => {
			const value = source[prop];
			if (prop !== "className" && !require_types.isUndefined(value)) column[prop] = value;
		});
		const className = require_config.getDefaultClassName(type);
		if (className) {
			const forceClass = `${(0, vue.unref)(ns.namespace)}-${className}`;
			column.className = column.className ? `${column.className} ${forceClass}` : forceClass;
		}
		return column;
	};
	const checkSubColumn = (children) => {
		if ((0, _vue_shared.isArray)(children)) children.forEach((child) => check(child));
		else check(children);
		function check(item) {
			if (item?.type?.name === "ElTableColumn") item.vParent = instance;
		}
	};
	const setColumnRenders = (column) => {
		if (props.renderHeader) require_error.debugWarn("TableColumn", "Comparing to render-header, scoped-slot header is easier to use. We recommend users to use scoped-slot header.");
		else if (column.type !== "selection") column.renderHeader = (scope) => {
			instance.columnConfig.value["label"];
			if (slots.header) {
				const slotResult = slots.header(scope);
				if (require_util.ensureValidVNode(slotResult)) return (0, vue.h)(vue.Fragment, slotResult);
			}
			return (0, vue.createTextVNode)(column.label);
		};
		if (slots["filter-icon"]) column.renderFilterIcon = (scope) => {
			return (0, vue.renderSlot)(slots, "filter-icon", scope);
		};
		if (slots.expand) column.renderExpand = (scope) => {
			return (0, vue.renderSlot)(slots, "expand", scope);
		};
		let originRenderCell = column.renderCell;
		if (column.type === "expand") {
			column.renderCell = (data) => (0, vue.h)("div", { class: "cell" }, [originRenderCell(data)]);
			owner.value.renderExpanded = (row) => {
				return slots.default ? slots.default(row) : slots.default;
			};
		} else {
			originRenderCell = originRenderCell || require_config.defaultRenderCell;
			column.renderCell = (data) => {
				let children = null;
				if (slots.default) {
					const vnodes = slots.default(data);
					children = vnodes.some((v) => v.type !== vue.Comment) ? vnodes : originRenderCell(data);
				} else children = originRenderCell(data);
				const { columns } = owner.value.store.states;
				const firstUserColumnIndex = columns.value.findIndex((item) => item.type === "default");
				const prefix = require_config.treeCellPrefix(data, hasTreeColumn.value && data.cellIndex === firstUserColumnIndex);
				const props = {
					class: "cell",
					style: {}
				};
				if (column.showOverflowTooltip) {
					props.class = `${props.class} ${(0, vue.unref)(ns.namespace)}-tooltip`;
					props.style = { width: `${(data.column.realWidth || Number(data.column.width)) - 1}px` };
				}
				checkSubColumn(children);
				return (0, vue.h)("div", props, [prefix, children]);
			};
		}
		return column;
	};
	const getPropsData = (...propsKey) => {
		return propsKey.reduce((prev, cur) => {
			if ((0, _vue_shared.isArray)(cur)) cur.forEach((key) => {
				prev[key] = props[key];
			});
			return prev;
		}, {});
	};
	const getColumnElIndex = (children, child) => {
		return Array.prototype.indexOf.call(children, child);
	};
	const updateColumnOrder = () => {
		owner.value.store.commit("updateColumnOrder", instance.columnConfig.value);
	};
	return {
		columnId,
		realAlign,
		isSubColumn,
		realHeaderAlign,
		columnOrTableParent,
		setColumnWidth,
		setColumnForcedProps,
		setColumnRenders,
		getPropsData,
		getColumnElIndex,
		updateColumnOrder
	};
}

//#endregion
exports.default = useRender;
//# sourceMappingURL=render-helper.js.map