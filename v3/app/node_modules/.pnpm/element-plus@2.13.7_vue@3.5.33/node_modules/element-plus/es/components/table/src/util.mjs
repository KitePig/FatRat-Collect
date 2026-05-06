import { isArray, isBoolean, isFunction, isNumber, isObject, isString, isUndefined as isUndefined$1 } from "../../../utils/types.mjs";
import { getProp, hasOwn } from "../../../utils/objects.mjs";
import { throwError } from "../../../utils/error.mjs";
import { ensureArray } from "../../../utils/arrays.mjs";
import { ElTooltip } from "../../tooltip/index.mjs";
import { flatMap, get, isNull, merge } from "lodash-unified";
import { Comment, Fragment, createVNode, isVNode, render } from "vue";

//#region ../../packages/components/table/src/util.ts
const getCell = function(event) {
	return event.target?.closest("td");
};
const orderBy = function(array, sortKey, reverse, sortMethod, sortBy) {
	if (!sortKey && !sortMethod && (!sortBy || isArray(sortBy) && !sortBy.length)) return array;
	if (isString(reverse)) reverse = reverse === "descending" ? -1 : 1;
	else reverse = reverse && reverse < 0 ? -1 : 1;
	const getKey = sortMethod ? null : function(value, index) {
		if (sortBy) return flatMap(ensureArray(sortBy), (by) => {
			if (isString(by)) return get(value, by);
			else return by(value, index, array);
		});
		if (sortKey !== "$key") {
			if (isObject(value) && "$value" in value) value = value.$value;
		}
		return [isObject(value) ? sortKey ? get(value, sortKey) : null : value];
	};
	const compare = function(a, b) {
		if (sortMethod) return sortMethod(a.value, b.value);
		for (let i = 0, len = a.key?.length ?? 0; i < len; i++) {
			if (a.key?.[i] < b.key?.[i]) return -1;
			if (a.key?.[i] > b.key?.[i]) return 1;
		}
		return 0;
	};
	return array.map((value, index) => {
		return {
			value,
			index,
			key: getKey ? getKey(value, index) : null
		};
	}).sort((a, b) => {
		let order = compare(a, b);
		if (!order) order = a.index - b.index;
		return order * +reverse;
	}).map((item) => item.value);
};
const getColumnById = function(table, columnId) {
	let column = null;
	table.columns.forEach((item) => {
		if (item.id === columnId) column = item;
	});
	return column;
};
const getColumnByKey = function(table, columnKey) {
	let column = null;
	for (let i = 0; i < table.columns.length; i++) {
		const item = table.columns[i];
		if (item.columnKey === columnKey) {
			column = item;
			break;
		}
	}
	if (!column) throwError("ElTable", `No column matching with column-key: ${columnKey}`);
	return column;
};
const getColumnByCell = function(table, cell, namespace) {
	const matches = (cell.className || "").match(new RegExp(`${namespace}-table_[^\\s]+`, "gm"));
	if (matches) return getColumnById(table, matches[0]);
	return null;
};
const getRowIdentity = (row, rowKey) => {
	if (!row) throw new Error("Row is required when get row identity");
	if (isString(rowKey)) {
		if (!rowKey.includes(".")) return `${row[rowKey]}`;
		const key = rowKey.split(".");
		let current = row;
		for (const element of key) current = current[element];
		return `${current}`;
	} else if (isFunction(rowKey)) return rowKey.call(null, row);
	return "";
};
const getKeysMap = function(array, rowKey, flatten = false, childrenKey = "children") {
	const data = array || [];
	const arrayMap = {};
	data.forEach((row, index) => {
		arrayMap[getRowIdentity(row, rowKey)] = {
			row,
			index
		};
		if (flatten) {
			const children = row[childrenKey];
			if (isArray(children)) Object.assign(arrayMap, getKeysMap(children, rowKey, true, childrenKey));
		}
	});
	return arrayMap;
};
function mergeOptions(defaults, config) {
	const options = {};
	let key;
	for (key in defaults) options[key] = defaults[key];
	for (key in config) if (hasOwn(config, key)) {
		const value = config[key];
		if (!isUndefined$1(value)) options[key] = value;
	}
	return options;
}
function parseWidth(width) {
	if (width === "") return width;
	if (!isUndefined$1(width)) {
		width = Number.parseInt(width, 10);
		if (Number.isNaN(width)) width = "";
	}
	return width;
}
function parseMinWidth(minWidth) {
	if (minWidth === "") return minWidth;
	if (!isUndefined$1(minWidth)) {
		minWidth = parseWidth(minWidth);
		if (Number.isNaN(minWidth)) minWidth = 80;
	}
	return minWidth;
}
function parseHeight(height) {
	if (isNumber(height)) return height;
	if (isString(height)) if (/^\d+(?:px)?$/.test(height)) return Number.parseInt(height, 10);
	else return height;
	return null;
}
function compose(...funcs) {
	if (funcs.length === 0) return (arg) => arg;
	if (funcs.length === 1) return funcs[0];
	return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
function toggleRowStatus(statusArr, row, newVal, tableTreeProps, selectable, rowIndex, rowKey) {
	let _rowIndex = rowIndex ?? 0;
	let changed = false;
	const getIndex = () => {
		if (!rowKey) return statusArr.indexOf(row);
		const id = getRowIdentity(row, rowKey);
		return statusArr.findIndex((item) => getRowIdentity(item, rowKey) === id);
	};
	const index = getIndex();
	const included = index !== -1;
	const isRowSelectable = selectable?.call(null, row, _rowIndex);
	const toggleStatus = (type) => {
		if (type === "add") statusArr.push(row);
		else statusArr.splice(index, 1);
		changed = true;
	};
	const getChildrenCount = (row) => {
		let count = 0;
		const children = tableTreeProps?.children && row[tableTreeProps.children];
		if (children && isArray(children)) {
			count += children.length;
			children.forEach((item) => {
				count += getChildrenCount(item);
			});
		}
		return count;
	};
	if (!selectable || isRowSelectable) if (isBoolean(newVal)) {
		if (newVal && !included) toggleStatus("add");
		else if (!newVal && included) toggleStatus("remove");
	} else included ? toggleStatus("remove") : toggleStatus("add");
	if (!tableTreeProps?.checkStrictly && tableTreeProps?.children && isArray(row[tableTreeProps.children])) row[tableTreeProps.children].forEach((item) => {
		const childChanged = toggleRowStatus(statusArr, item, newVal ?? !included, tableTreeProps, selectable, _rowIndex + 1, rowKey);
		_rowIndex += getChildrenCount(item) + 1;
		if (childChanged) changed = childChanged;
	});
	return changed;
}
function walkTreeNode(root, cb, childrenKey = "children", lazyKey = "hasChildren", lazy = false) {
	const isNil = (array) => !(isArray(array) && array.length);
	function _walker(parent, children, level) {
		cb(parent, children, level);
		children.forEach((item) => {
			if (item[lazyKey] && lazy) {
				cb(item, null, level + 1);
				return;
			}
			const children = item[childrenKey];
			if (!isNil(children)) _walker(item, children, level + 1);
		});
	}
	root.forEach((item) => {
		if (item[lazyKey] && lazy) {
			cb(item, null, 0);
			return;
		}
		const children = item[childrenKey];
		if (!isNil(children)) _walker(item, children, 0);
	});
}
const getTableOverflowTooltipProps = (props, innerText, row, column) => {
	const popperOptions = {
		strategy: "fixed",
		...props.popperOptions
	};
	const tooltipFormatterContent = isFunction(column?.tooltipFormatter) ? column.tooltipFormatter({
		row,
		column,
		cellValue: getProp(row, column.property).value
	}) : void 0;
	if (isVNode(tooltipFormatterContent)) return {
		slotContent: tooltipFormatterContent,
		content: null,
		...props,
		popperOptions
	};
	return {
		slotContent: null,
		content: tooltipFormatterContent ?? innerText,
		...props,
		popperOptions
	};
};
let removePopper = null;
function createTablePopper(props, popperContent, row, column, trigger, table) {
	const tableOverflowTooltipProps = getTableOverflowTooltipProps(props, popperContent, row, column);
	const mergedProps = {
		...tableOverflowTooltipProps,
		slotContent: void 0
	};
	if (removePopper?.trigger === trigger) {
		const comp = removePopper.vm?.component;
		merge(comp?.props, mergedProps);
		if (comp && tableOverflowTooltipProps.slotContent) comp.slots.content = () => [tableOverflowTooltipProps.slotContent];
		return;
	}
	removePopper?.();
	const parentNode = table?.refs.tableWrapper;
	const ns = parentNode?.dataset.prefix;
	const vm = createVNode(ElTooltip, {
		virtualTriggering: true,
		virtualRef: trigger,
		appendTo: parentNode,
		placement: "top",
		transition: "none",
		offset: 0,
		hideAfter: 0,
		...mergedProps
	}, tableOverflowTooltipProps.slotContent ? { content: () => tableOverflowTooltipProps.slotContent } : void 0);
	vm.appContext = {
		...table.appContext,
		...table
	};
	const container = document.createElement("div");
	render(vm, container);
	vm.component.exposed.onOpen();
	const scrollContainer = parentNode?.querySelector(`.${ns}-scrollbar__wrap`);
	removePopper = () => {
		if (vm.component?.exposed?.onClose) vm.component.exposed.onClose();
		render(null, container);
		const currentRemovePopper = removePopper;
		scrollContainer?.removeEventListener("scroll", currentRemovePopper);
		currentRemovePopper.trigger = void 0;
		currentRemovePopper.vm = void 0;
		removePopper = null;
	};
	removePopper.trigger = trigger ?? void 0;
	removePopper.vm = vm;
	scrollContainer?.addEventListener("scroll", removePopper);
}
function getCurrentColumns(column) {
	if (column.children) return flatMap(column.children, getCurrentColumns);
	else return [column];
}
function getColSpan(colSpan, column) {
	return colSpan + column.colSpan;
}
const isFixedColumn = (index, fixed, store, realColumns) => {
	let start = 0;
	let after = index;
	const columns = store.states.columns.value;
	if (realColumns) {
		const curColumns = getCurrentColumns(realColumns[index]);
		start = columns.slice(0, columns.indexOf(curColumns[0])).reduce(getColSpan, 0);
		after = start + curColumns.reduce(getColSpan, 0) - 1;
	} else start = index;
	let fixedLayout;
	switch (fixed) {
		case "left":
			if (after < store.states.fixedLeafColumnsLength.value) fixedLayout = "left";
			break;
		case "right":
			if (start >= columns.length - store.states.rightFixedLeafColumnsLength.value) fixedLayout = "right";
			break;
		default: if (after < store.states.fixedLeafColumnsLength.value) fixedLayout = "left";
		else if (start >= columns.length - store.states.rightFixedLeafColumnsLength.value) fixedLayout = "right";
	}
	return fixedLayout ? {
		direction: fixedLayout,
		start,
		after
	} : {};
};
const getFixedColumnsClass = (namespace, index, fixed, store, realColumns, offset = 0) => {
	const classes = [];
	const { direction, start, after } = isFixedColumn(index, fixed, store, realColumns);
	if (direction) {
		const isLeft = direction === "left";
		classes.push(`${namespace}-fixed-column--${direction}`);
		if (isLeft && after + offset === store.states.fixedLeafColumnsLength.value - 1) classes.push("is-last-column");
		else if (!isLeft && start - offset === store.states.columns.value.length - store.states.rightFixedLeafColumnsLength.value) classes.push("is-first-column");
	}
	return classes;
};
function getOffset(offset, column) {
	return offset + (isNull(column.realWidth) || Number.isNaN(column.realWidth) ? Number(column.width) : column.realWidth);
}
const getFixedColumnOffset = (index, fixed, store, realColumns) => {
	const { direction, start = 0, after = 0 } = isFixedColumn(index, fixed, store, realColumns);
	if (!direction) return;
	const styles = {};
	const isLeft = direction === "left";
	const columns = store.states.columns.value;
	if (isLeft) styles.left = columns.slice(0, start).reduce(getOffset, 0);
	else styles.right = columns.slice(after + 1).reverse().reduce(getOffset, 0);
	return styles;
};
const ensurePosition = (style, key) => {
	if (!style) return;
	if (!Number.isNaN(style[key])) style[key] = `${style[key]}px`;
};
function ensureValidVNode(vnodes) {
	return vnodes.some((child) => {
		if (!isVNode(child)) return true;
		if (child.type === Comment) return false;
		if (child.type === Fragment && !ensureValidVNode(child.children)) return false;
		return true;
	}) ? vnodes : null;
}

//#endregion
export { compose, createTablePopper, ensurePosition, ensureValidVNode, getCell, getColumnByCell, getColumnById, getColumnByKey, getFixedColumnOffset, getFixedColumnsClass, getKeysMap, getRowIdentity, isFixedColumn, mergeOptions, orderBy, parseHeight, parseMinWidth, parseWidth, removePopper, toggleRowStatus, walkTreeNode };
//# sourceMappingURL=util.mjs.map