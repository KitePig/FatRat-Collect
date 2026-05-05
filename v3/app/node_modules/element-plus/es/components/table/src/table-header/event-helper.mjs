import { isClient } from "../../../../utils/browser.mjs";
import { isElement } from "../../../../utils/types.mjs";
import { addClass, hasClass, removeClass } from "../../../../utils/dom/style.mjs";
import { TABLE_INJECTION_KEY } from "../tokens.mjs";
import { isNull } from "lodash-unified";
import { getCurrentInstance, inject, ref } from "vue";

//#region ../../packages/components/table/src/table-header/event-helper.ts
function useEvent(props, emit) {
	const instance = getCurrentInstance();
	const parent = inject(TABLE_INJECTION_KEY);
	const handleFilterClick = (event) => {
		event.stopPropagation();
	};
	const handleHeaderClick = (event, column) => {
		if (!column.filters && column.sortable) handleSortClick(event, column, false);
		else if (column.filterable && !column.sortable) handleFilterClick(event);
		parent?.emit("header-click", column, event);
	};
	const handleHeaderContextMenu = (event, column) => {
		parent?.emit("header-contextmenu", column, event);
	};
	const draggingColumn = ref(null);
	const dragging = ref(false);
	const dragState = ref();
	const handleMouseDown = (event, column) => {
		if (!isClient) return;
		if (column.children && column.children.length > 0) return;
		/* istanbul ignore if */
		if (draggingColumn.value && props.border && draggingColumn.value.id === column.id) {
			dragging.value = true;
			const table = parent;
			emit("set-drag-visible", true);
			const tableLeft = (table?.vnode.el)?.getBoundingClientRect().left;
			const columnEl = instance?.vnode?.el?.querySelector(`th.${column.id}`);
			const columnRect = columnEl.getBoundingClientRect();
			const minLeft = columnRect.left - tableLeft + 30;
			addClass(columnEl, "noclick");
			dragState.value = {
				startMouseLeft: event.clientX,
				startLeft: columnRect.right - tableLeft,
				startColumnLeft: columnRect.left - tableLeft,
				tableLeft
			};
			const resizeProxy = table?.refs.resizeProxy;
			resizeProxy.style.left = `${dragState.value.startLeft}px`;
			document.onselectstart = function() {
				return false;
			};
			document.ondragstart = function() {
				return false;
			};
			const handleMouseMove = (event) => {
				const deltaLeft = event.clientX - dragState.value.startMouseLeft;
				const proxyLeft = dragState.value.startLeft + deltaLeft;
				resizeProxy.style.left = `${Math.max(minLeft, proxyLeft)}px`;
			};
			const handleMouseUp = () => {
				if (dragging.value) {
					const { startColumnLeft, startLeft } = dragState.value;
					column.width = column.realWidth = Number.parseInt(resizeProxy.style.left, 10) - startColumnLeft;
					table?.emit("header-dragend", column.width, startLeft - startColumnLeft, column, event);
					requestAnimationFrame(() => {
						props.store.scheduleLayout(false, true);
					});
					document.body.style.cursor = "";
					dragging.value = false;
					draggingColumn.value = null;
					dragState.value = void 0;
					emit("set-drag-visible", false);
				}
				document.removeEventListener("mousemove", handleMouseMove);
				document.removeEventListener("mouseup", handleMouseUp);
				document.onselectstart = null;
				document.ondragstart = null;
				setTimeout(() => {
					removeClass(columnEl, "noclick");
				}, 0);
			};
			document.addEventListener("mousemove", handleMouseMove);
			document.addEventListener("mouseup", handleMouseUp);
		}
	};
	const handleMouseMove = (event, column) => {
		if (!props.border || column.children && column.children.length > 0) return;
		const el = event.target;
		const target = isElement(el) ? el.closest("th") : null;
		if (!target) return;
		const isSortable = hasClass(target, "is-sortable");
		if (isSortable) {
			const cursor = dragging.value ? "col-resize" : "";
			target.style.cursor = cursor;
			const caret = target.querySelector(".caret-wrapper");
			if (caret) caret.style.cursor = cursor;
		}
		if (!column.resizable || dragging.value) {
			draggingColumn.value = null;
			return;
		}
		const rect = target.getBoundingClientRect();
		const isLastTh = target.parentNode?.lastElementChild === target;
		const allowDrag = props.allowDragLastColumn || !isLastTh;
		const isResizeHandleActive = rect.width > 12 && rect.right - event.clientX < 8 && allowDrag;
		const cursor = isResizeHandleActive ? "col-resize" : "";
		document.body.style.cursor = cursor;
		draggingColumn.value = isResizeHandleActive ? column : null;
		if (isSortable) target.style.cursor = cursor;
	};
	const handleMouseOut = () => {
		if (!isClient || dragging.value) return;
		document.body.style.cursor = "";
	};
	const toggleOrder = ({ order, sortOrders }) => {
		if (order === "") return sortOrders[0];
		const index = sortOrders.indexOf(order || null);
		return sortOrders[index > sortOrders.length - 2 ? 0 : index + 1];
	};
	const handleSortClick = (event, column, givenOrder) => {
		event.stopPropagation();
		const order = column.order === givenOrder ? null : givenOrder || toggleOrder(column);
		const target = event.target?.closest("th");
		if (target) {
			if (hasClass(target, "noclick")) {
				removeClass(target, "noclick");
				return;
			}
		}
		if (!column.sortable) return;
		const clickTarget = event.currentTarget;
		if (["ascending", "descending"].some((str) => hasClass(clickTarget, str) && !column.sortOrders.includes(str))) return;
		const states = props.store.states;
		let sortProp = states.sortProp.value;
		let sortOrder;
		const sortingColumn = states.sortingColumn.value;
		if (sortingColumn !== column || sortingColumn === column && isNull(sortingColumn.order)) {
			if (sortingColumn) sortingColumn.order = null;
			states.sortingColumn.value = column;
			sortProp = column.property;
		}
		if (!order) sortOrder = column.order = null;
		else sortOrder = column.order = order;
		states.sortProp.value = sortProp;
		states.sortOrder.value = sortOrder;
		parent?.store.commit("changeSortCondition");
	};
	return {
		handleHeaderClick,
		handleHeaderContextMenu,
		handleMouseDown,
		handleMouseMove,
		handleMouseOut,
		handleSortClick,
		handleFilterClick
	};
}

//#endregion
export { useEvent as default };
//# sourceMappingURL=event-helper.mjs.map