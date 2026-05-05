Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_use_form_common_props = require('../../../form/src/hooks/use-form-common-props.js');
let _vueuse_core = require("@vueuse/core");
let vue = require("vue");

//#region ../../packages/components/table/src/table/style-helper.ts
function useStyle(props, layout, store, table) {
	const isHidden = (0, vue.ref)(false);
	const renderExpanded = (0, vue.ref)(null);
	const resizeProxyVisible = (0, vue.ref)(false);
	const setDragVisible = (visible) => {
		resizeProxyVisible.value = visible;
	};
	const resizeState = (0, vue.ref)({
		width: null,
		height: null,
		headerHeight: null
	});
	const isGroup = (0, vue.ref)(false);
	const scrollbarViewStyle = {
		display: "inline-block",
		verticalAlign: "middle"
	};
	const tableWidth = (0, vue.ref)();
	const tableScrollHeight = (0, vue.ref)(0);
	const bodyScrollHeight = (0, vue.ref)(0);
	const headerScrollHeight = (0, vue.ref)(0);
	const footerScrollHeight = (0, vue.ref)(0);
	const appendScrollHeight = (0, vue.ref)(0);
	(0, vue.watch)(() => props.height, (value) => {
		layout.setHeight(value ?? null);
	}, { immediate: true });
	(0, vue.watch)(() => props.maxHeight, (value) => {
		layout.setMaxHeight(value ?? null);
	}, { immediate: true });
	(0, vue.watch)(() => [props.currentRowKey, store.states.rowKey], ([currentRowKey, rowKey]) => {
		if (!(0, vue.unref)(rowKey) || !(0, vue.unref)(currentRowKey)) return;
		store.setCurrentRowKey(`${currentRowKey}`);
	}, { immediate: true });
	(0, vue.watch)(() => props.data, (data) => {
		table.store.commit("setData", data);
	}, {
		immediate: true,
		deep: true
	});
	(0, vue.watchEffect)(() => {
		if (props.expandRowKeys) store.setExpandRowKeysAdapter(props.expandRowKeys);
	});
	const handleMouseLeave = () => {
		table.store.commit("setHoverRow", null);
		if (table.hoverState) table.hoverState = null;
	};
	const handleHeaderFooterMousewheel = (_event, data) => {
		const { pixelX, pixelY } = data;
		if (Math.abs(pixelX) >= Math.abs(pixelY)) table.refs.bodyWrapper.scrollLeft += data.pixelX / 5;
	};
	const shouldUpdateHeight = (0, vue.computed)(() => {
		return props.height || props.maxHeight || store.states.fixedColumns.value.length > 0 || store.states.rightFixedColumns.value.length > 0;
	});
	const tableBodyStyles = (0, vue.computed)(() => {
		return { width: layout.bodyWidth.value ? `${layout.bodyWidth.value}px` : "" };
	});
	const doLayout = () => {
		if (shouldUpdateHeight.value) layout.updateElsHeight();
		layout.updateColumnsWidth();
		if (typeof window === "undefined") return;
		requestAnimationFrame(syncPosition);
	};
	(0, vue.onMounted)(async () => {
		await (0, vue.nextTick)();
		store.updateColumns();
		bindEvents();
		requestAnimationFrame(doLayout);
		const el = table.vnode.el;
		const tableHeader = table.refs.headerWrapper;
		if (props.flexible && el && el.parentElement) el.parentElement.style.minWidth = "0";
		resizeState.value = {
			width: tableWidth.value = el.offsetWidth,
			height: el.offsetHeight,
			headerHeight: props.showHeader && tableHeader ? tableHeader.offsetHeight : null
		};
		store.states.columns.value.forEach((column) => {
			if (column.filteredValue && column.filteredValue.length) table.store.commit("filterChange", {
				column,
				values: column.filteredValue,
				silent: true
			});
		});
		table.$ready = true;
	});
	const setScrollClassByEl = (el, className) => {
		if (!el) return;
		const classList = Array.from(el.classList).filter((item) => !item.startsWith("is-scrolling-"));
		classList.push(layout.scrollX.value ? className : "is-scrolling-none");
		el.className = classList.join(" ");
	};
	const setScrollClass = (className) => {
		const { tableWrapper } = table.refs;
		setScrollClassByEl(tableWrapper, className);
	};
	const hasScrollClass = (className) => {
		const { tableWrapper } = table.refs;
		return !!(tableWrapper && tableWrapper.classList.contains(className));
	};
	const syncPosition = function() {
		if (!table.refs.scrollBarRef) return;
		if (!layout.scrollX.value) {
			const scrollingNoneClass = "is-scrolling-none";
			if (!hasScrollClass(scrollingNoneClass)) setScrollClass(scrollingNoneClass);
			return;
		}
		const scrollContainer = table.refs.scrollBarRef.wrapRef;
		if (!scrollContainer) return;
		const { scrollLeft, offsetWidth, scrollWidth } = scrollContainer;
		const { headerWrapper, footerWrapper } = table.refs;
		if (headerWrapper) headerWrapper.scrollLeft = scrollLeft;
		if (footerWrapper) footerWrapper.scrollLeft = scrollLeft;
		if (scrollLeft >= scrollWidth - offsetWidth - 1) setScrollClass("is-scrolling-right");
		else if (scrollLeft === 0) setScrollClass("is-scrolling-left");
		else setScrollClass("is-scrolling-middle");
	};
	const bindEvents = () => {
		if (!table.refs.scrollBarRef) return;
		if (table.refs.scrollBarRef.wrapRef) (0, _vueuse_core.useEventListener)(table.refs.scrollBarRef.wrapRef, "scroll", syncPosition, { passive: true });
		if (props.fit) (0, _vueuse_core.useResizeObserver)(table.vnode.el, resizeListener);
		else (0, _vueuse_core.useEventListener)(window, "resize", resizeListener);
		(0, _vueuse_core.useResizeObserver)(table.refs.tableInnerWrapper, () => {
			resizeListener();
			table.refs?.scrollBarRef?.update();
		});
	};
	const resizeListener = () => {
		const el = table.vnode.el;
		if (!table.$ready || !el) return;
		let shouldUpdateLayout = false;
		const { width: oldWidth, height: oldHeight, headerHeight: oldHeaderHeight } = resizeState.value;
		const width = tableWidth.value = el.offsetWidth;
		if (oldWidth !== width) shouldUpdateLayout = true;
		const height = el.offsetHeight;
		if ((props.height || shouldUpdateHeight.value) && oldHeight !== height) shouldUpdateLayout = true;
		const tableHeader = props.tableLayout === "fixed" ? table.refs.headerWrapper : table.refs.tableHeaderRef?.$el;
		if (props.showHeader && tableHeader?.offsetHeight !== oldHeaderHeight) shouldUpdateLayout = true;
		tableScrollHeight.value = table.refs.tableWrapper?.scrollHeight || 0;
		headerScrollHeight.value = tableHeader?.scrollHeight || 0;
		footerScrollHeight.value = table.refs.footerWrapper?.offsetHeight || 0;
		appendScrollHeight.value = table.refs.appendWrapper?.offsetHeight || 0;
		bodyScrollHeight.value = tableScrollHeight.value - headerScrollHeight.value - footerScrollHeight.value - appendScrollHeight.value;
		if (shouldUpdateLayout) {
			resizeState.value = {
				width,
				height,
				headerHeight: props.showHeader && tableHeader?.offsetHeight || 0
			};
			doLayout();
		}
	};
	const tableSize = require_use_form_common_props.useFormSize();
	const bodyWidth = (0, vue.computed)(() => {
		const { bodyWidth: bodyWidth_, scrollY, gutterWidth } = layout;
		return bodyWidth_.value ? `${bodyWidth_.value - (scrollY.value ? gutterWidth : 0)}px` : "";
	});
	const tableLayout = (0, vue.computed)(() => {
		if (props.maxHeight) return "fixed";
		return props.tableLayout;
	});
	return {
		isHidden,
		renderExpanded,
		setDragVisible,
		isGroup,
		handleMouseLeave,
		handleHeaderFooterMousewheel,
		tableSize,
		emptyBlockStyle: (0, vue.computed)(() => {
			if (props.data && props.data.length) return;
			let height = "100%";
			if (props.height && bodyScrollHeight.value) height = `${bodyScrollHeight.value}px`;
			const width = tableWidth.value;
			return {
				width: width ? `${width}px` : "",
				height
			};
		}),
		resizeProxyVisible,
		bodyWidth,
		resizeState,
		doLayout,
		tableBodyStyles,
		tableLayout,
		scrollbarViewStyle,
		scrollbarStyle: (0, vue.computed)(() => {
			if (props.height) return { height: "100%" };
			if (props.maxHeight) if (!Number.isNaN(Number(props.maxHeight))) return { maxHeight: `${+props.maxHeight - headerScrollHeight.value - footerScrollHeight.value}px` };
			else return { maxHeight: `calc(${props.maxHeight} - ${headerScrollHeight.value + footerScrollHeight.value}px)` };
			return {};
		})
	};
}

//#endregion
exports.default = useStyle;
//# sourceMappingURL=style-helper.js.map