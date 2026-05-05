import { isArray, isUndefined } from "../../../../utils/types.mjs";
import { debugWarn } from "../../../../utils/error.mjs";
import { useNamespace } from "../../../../hooks/use-namespace/index.mjs";
import { ensureValidVNode, parseMinWidth, parseWidth } from "../util.mjs";
import { cellForced, defaultRenderCell, getDefaultClassName, treeCellPrefix } from "../config.mjs";
import { Comment, Fragment, computed, createTextVNode, getCurrentInstance, h, ref, renderSlot, unref, watchEffect } from "vue";

//#region ../../packages/components/table/src/table-column/render-helper.ts
function useRender(props, slots, owner) {
	const instance = getCurrentInstance();
	const columnId = ref("");
	const isSubColumn = ref(false);
	const realAlign = ref();
	const realHeaderAlign = ref();
	const ns = useNamespace("table");
	watchEffect(() => {
		realAlign.value = props.align ? `is-${props.align}` : null;
		realAlign.value;
	});
	watchEffect(() => {
		realHeaderAlign.value = props.headerAlign ? `is-${props.headerAlign}` : realAlign.value;
		realHeaderAlign.value;
	});
	const columnOrTableParent = computed(() => {
		let parent = instance.vnode.vParent || instance.parent;
		while (parent && !parent.tableId && !parent.columnId) parent = parent.vnode.vParent || parent.parent;
		return parent;
	});
	const hasTreeColumn = computed(() => {
		const { store } = instance.parent;
		if (!store) return false;
		const { treeData } = store.states;
		const treeDataValue = treeData.value;
		return treeDataValue && Object.keys(treeDataValue).length > 0;
	});
	const realWidth = ref(parseWidth(props.width));
	const realMinWidth = ref(parseMinWidth(props.minWidth));
	const setColumnWidth = (column) => {
		if (realWidth.value) column.width = realWidth.value;
		if (realMinWidth.value) column.minWidth = realMinWidth.value;
		if (!realWidth.value && realMinWidth.value) column.width = void 0;
		if (!column.minWidth) column.minWidth = 80;
		column.realWidth = Number(isUndefined(column.width) ? column.minWidth : column.width);
		return column;
	};
	const setColumnForcedProps = (column) => {
		const type = column.type;
		const source = cellForced[type] || {};
		Object.keys(source).forEach((prop) => {
			const value = source[prop];
			if (prop !== "className" && !isUndefined(value)) column[prop] = value;
		});
		const className = getDefaultClassName(type);
		if (className) {
			const forceClass = `${unref(ns.namespace)}-${className}`;
			column.className = column.className ? `${column.className} ${forceClass}` : forceClass;
		}
		return column;
	};
	const checkSubColumn = (children) => {
		if (isArray(children)) children.forEach((child) => check(child));
		else check(children);
		function check(item) {
			if (item?.type?.name === "ElTableColumn") item.vParent = instance;
		}
	};
	const setColumnRenders = (column) => {
		if (props.renderHeader) debugWarn("TableColumn", "Comparing to render-header, scoped-slot header is easier to use. We recommend users to use scoped-slot header.");
		else if (column.type !== "selection") column.renderHeader = (scope) => {
			instance.columnConfig.value["label"];
			if (slots.header) {
				const slotResult = slots.header(scope);
				if (ensureValidVNode(slotResult)) return h(Fragment, slotResult);
			}
			return createTextVNode(column.label);
		};
		if (slots["filter-icon"]) column.renderFilterIcon = (scope) => {
			return renderSlot(slots, "filter-icon", scope);
		};
		if (slots.expand) column.renderExpand = (scope) => {
			return renderSlot(slots, "expand", scope);
		};
		let originRenderCell = column.renderCell;
		if (column.type === "expand") {
			column.renderCell = (data) => h("div", { class: "cell" }, [originRenderCell(data)]);
			owner.value.renderExpanded = (row) => {
				return slots.default ? slots.default(row) : slots.default;
			};
		} else {
			originRenderCell = originRenderCell || defaultRenderCell;
			column.renderCell = (data) => {
				let children = null;
				if (slots.default) {
					const vnodes = slots.default(data);
					children = vnodes.some((v) => v.type !== Comment) ? vnodes : originRenderCell(data);
				} else children = originRenderCell(data);
				const { columns } = owner.value.store.states;
				const firstUserColumnIndex = columns.value.findIndex((item) => item.type === "default");
				const prefix = treeCellPrefix(data, hasTreeColumn.value && data.cellIndex === firstUserColumnIndex);
				const props = {
					class: "cell",
					style: {}
				};
				if (column.showOverflowTooltip) {
					props.class = `${props.class} ${unref(ns.namespace)}-tooltip`;
					props.style = { width: `${(data.column.realWidth || Number(data.column.width)) - 1}px` };
				}
				checkSubColumn(children);
				return h("div", props, [prefix, children]);
			};
		}
		return column;
	};
	const getPropsData = (...propsKey) => {
		return propsKey.reduce((prev, cur) => {
			if (isArray(cur)) cur.forEach((key) => {
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
export { useRender as default };
//# sourceMappingURL=render-helper.mjs.map