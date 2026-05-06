Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../../utils/types.js');
const require_scroll = require('../../../../utils/dom/scroll.js');
const require_index = require('../../../../hooks/use-namespace/index.js');
const require_use_cache = require('../hooks/use-cache.js');
const require_defaults = require('../defaults.js');
const require_props = require('../props.js');
const require_utils = require('../utils.js');
const require_scrollbar = require('../components/scrollbar.js');
const require_use_grid_wheel = require('../hooks/use-grid-wheel.js');
const require_use_grid_touch = require('../hooks/use-grid-touch.js');
let _vueuse_core = require("@vueuse/core");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/virtual-list/src/builders/build-grid.ts
const createGrid = ({ name, clearCache, getColumnPosition, getColumnStartIndexForOffset, getColumnStopIndexForStartIndex, getEstimatedTotalHeight, getEstimatedTotalWidth, getColumnOffset, getRowOffset, getRowPosition, getRowStartIndexForOffset, getRowStopIndexForStartIndex, initCache, injectToInstance, validateProps }) => {
	return (0, vue.defineComponent)({
		name: name ?? "ElVirtualList",
		props: require_props.virtualizedGridProps,
		emits: [require_defaults.ITEM_RENDER_EVT, require_defaults.SCROLL_EVT],
		setup(props, { emit, expose, slots }) {
			const ns = require_index.useNamespace("vl");
			validateProps(props);
			const instance = (0, vue.getCurrentInstance)();
			const cache = (0, vue.ref)(initCache(props, instance));
			injectToInstance?.(instance, cache);
			const windowRef = (0, vue.ref)();
			const hScrollbar = (0, vue.ref)();
			const vScrollbar = (0, vue.ref)();
			const innerRef = (0, vue.ref)();
			const states = (0, vue.ref)({
				isScrolling: false,
				scrollLeft: require_types.isNumber(props.initScrollLeft) ? props.initScrollLeft : 0,
				scrollTop: require_types.isNumber(props.initScrollTop) ? props.initScrollTop : 0,
				updateRequested: false,
				xAxisScrollDir: require_defaults.FORWARD,
				yAxisScrollDir: require_defaults.FORWARD
			});
			const getItemStyleCache = require_use_cache.useCache();
			const parsedHeight = (0, vue.computed)(() => Number.parseInt(`${props.height}`, 10));
			const parsedWidth = (0, vue.computed)(() => Number.parseInt(`${props.width}`, 10));
			const columnsToRender = (0, vue.computed)(() => {
				const { totalColumn, totalRow, columnCache } = props;
				const { isScrolling, xAxisScrollDir, scrollLeft } = (0, vue.unref)(states);
				if (totalColumn === 0 || totalRow === 0) return [
					0,
					0,
					0,
					0
				];
				const startIndex = getColumnStartIndexForOffset(props, scrollLeft, (0, vue.unref)(cache));
				const stopIndex = getColumnStopIndexForStartIndex(props, startIndex, scrollLeft, (0, vue.unref)(cache));
				const cacheBackward = !isScrolling || xAxisScrollDir === require_defaults.BACKWARD ? Math.max(1, columnCache) : 1;
				const cacheForward = !isScrolling || xAxisScrollDir === require_defaults.FORWARD ? Math.max(1, columnCache) : 1;
				return [
					Math.max(0, startIndex - cacheBackward),
					Math.max(0, Math.min(totalColumn - 1, stopIndex + cacheForward)),
					startIndex,
					stopIndex
				];
			});
			const rowsToRender = (0, vue.computed)(() => {
				const { totalColumn, totalRow, rowCache } = props;
				const { isScrolling, yAxisScrollDir, scrollTop } = (0, vue.unref)(states);
				if (totalColumn === 0 || totalRow === 0) return [
					0,
					0,
					0,
					0
				];
				const startIndex = getRowStartIndexForOffset(props, scrollTop, (0, vue.unref)(cache));
				const stopIndex = getRowStopIndexForStartIndex(props, startIndex, scrollTop, (0, vue.unref)(cache));
				const cacheBackward = !isScrolling || yAxisScrollDir === require_defaults.BACKWARD ? Math.max(1, rowCache) : 1;
				const cacheForward = !isScrolling || yAxisScrollDir === require_defaults.FORWARD ? Math.max(1, rowCache) : 1;
				return [
					Math.max(0, startIndex - cacheBackward),
					Math.max(0, Math.min(totalRow - 1, stopIndex + cacheForward)),
					startIndex,
					stopIndex
				];
			});
			const estimatedTotalHeight = (0, vue.computed)(() => getEstimatedTotalHeight(props, (0, vue.unref)(cache)));
			const estimatedTotalWidth = (0, vue.computed)(() => getEstimatedTotalWidth(props, (0, vue.unref)(cache)));
			const windowStyle = (0, vue.computed)(() => [
				{
					position: "relative",
					overflow: "hidden",
					WebkitOverflowScrolling: "touch",
					willChange: "transform"
				},
				{
					direction: props.direction,
					height: require_types.isNumber(props.height) ? `${props.height}px` : props.height,
					width: require_types.isNumber(props.width) ? `${props.width}px` : props.width
				},
				props.style ?? {}
			]);
			const innerStyle = (0, vue.computed)(() => {
				const width = `${(0, vue.unref)(estimatedTotalWidth)}px`;
				return {
					height: `${(0, vue.unref)(estimatedTotalHeight)}px`,
					pointerEvents: (0, vue.unref)(states).isScrolling ? "none" : void 0,
					width,
					margin: 0,
					boxSizing: "border-box"
				};
			});
			const emitEvents = () => {
				const { totalColumn, totalRow } = props;
				if (totalColumn > 0 && totalRow > 0) {
					const [columnCacheStart, columnCacheEnd, columnVisibleStart, columnVisibleEnd] = (0, vue.unref)(columnsToRender);
					const [rowCacheStart, rowCacheEnd, rowVisibleStart, rowVisibleEnd] = (0, vue.unref)(rowsToRender);
					emit(require_defaults.ITEM_RENDER_EVT, {
						columnCacheStart,
						columnCacheEnd,
						rowCacheStart,
						rowCacheEnd,
						columnVisibleStart,
						columnVisibleEnd,
						rowVisibleStart,
						rowVisibleEnd
					});
				}
				const { scrollLeft, scrollTop, updateRequested, xAxisScrollDir, yAxisScrollDir } = (0, vue.unref)(states);
				emit(require_defaults.SCROLL_EVT, {
					xAxisScrollDir,
					scrollLeft,
					yAxisScrollDir,
					scrollTop,
					updateRequested
				});
			};
			const onScroll = (e) => {
				const { clientHeight, clientWidth, scrollHeight, scrollLeft, scrollTop, scrollWidth } = e.currentTarget;
				const _states = (0, vue.unref)(states);
				if (_states.scrollTop === scrollTop && _states.scrollLeft === scrollLeft) return;
				let _scrollLeft = scrollLeft;
				if (require_utils.isRTL(props.direction)) switch (require_utils.getRTLOffsetType()) {
					case require_defaults.RTL_OFFSET_NAG:
						_scrollLeft = -scrollLeft;
						break;
					case require_defaults.RTL_OFFSET_POS_DESC:
						_scrollLeft = scrollWidth - clientWidth - scrollLeft;
						break;
				}
				states.value = {
					..._states,
					isScrolling: true,
					scrollLeft: _scrollLeft,
					scrollTop: Math.max(0, Math.min(scrollTop, scrollHeight - clientHeight)),
					updateRequested: true,
					xAxisScrollDir: require_utils.getScrollDir(_states.scrollLeft, _scrollLeft),
					yAxisScrollDir: require_utils.getScrollDir(_states.scrollTop, scrollTop)
				};
				(0, vue.nextTick)(() => resetIsScrolling());
				onUpdated();
				emitEvents();
			};
			const onVerticalScroll = (distance, totalSteps) => {
				const height = (0, vue.unref)(parsedHeight);
				const offset = (estimatedTotalHeight.value - height) / totalSteps * distance;
				scrollTo({ scrollTop: Math.min(estimatedTotalHeight.value - height, offset) });
			};
			const onHorizontalScroll = (distance, totalSteps) => {
				const width = (0, vue.unref)(parsedWidth);
				const offset = (estimatedTotalWidth.value - width) / totalSteps * distance;
				scrollTo({ scrollLeft: Math.min(estimatedTotalWidth.value - width, offset) });
			};
			const { onWheel } = require_use_grid_wheel.useGridWheel({
				atXStartEdge: (0, vue.computed)(() => states.value.scrollLeft <= 0),
				atXEndEdge: (0, vue.computed)(() => states.value.scrollLeft >= estimatedTotalWidth.value - (0, vue.unref)(parsedWidth)),
				atYStartEdge: (0, vue.computed)(() => states.value.scrollTop <= 0),
				atYEndEdge: (0, vue.computed)(() => states.value.scrollTop >= estimatedTotalHeight.value - (0, vue.unref)(parsedHeight))
			}, (x, y) => {
				hScrollbar.value?.onMouseUp?.();
				vScrollbar.value?.onMouseUp?.();
				const width = (0, vue.unref)(parsedWidth);
				const height = (0, vue.unref)(parsedHeight);
				scrollTo({
					scrollLeft: Math.min(states.value.scrollLeft + x, estimatedTotalWidth.value - width),
					scrollTop: Math.min(states.value.scrollTop + y, estimatedTotalHeight.value - height)
				});
			});
			(0, _vueuse_core.useEventListener)(windowRef, "wheel", onWheel, { passive: false });
			const scrollTo = ({ scrollLeft = states.value.scrollLeft, scrollTop = states.value.scrollTop }) => {
				scrollLeft = Math.max(scrollLeft, 0);
				scrollTop = Math.max(scrollTop, 0);
				const _states = (0, vue.unref)(states);
				if (scrollTop === _states.scrollTop && scrollLeft === _states.scrollLeft) return;
				states.value = {
					..._states,
					xAxisScrollDir: require_utils.getScrollDir(_states.scrollLeft, scrollLeft),
					yAxisScrollDir: require_utils.getScrollDir(_states.scrollTop, scrollTop),
					scrollLeft,
					scrollTop,
					updateRequested: true
				};
				(0, vue.nextTick)(() => resetIsScrolling());
				onUpdated();
				emitEvents();
			};
			const { touchStartX, touchStartY, handleTouchStart, handleTouchMove } = require_use_grid_touch.useGridTouch(windowRef, states, scrollTo, estimatedTotalWidth, estimatedTotalHeight, parsedWidth, parsedHeight);
			const scrollToItem = (rowIndex = 0, columnIdx = 0, alignment = require_defaults.AUTO_ALIGNMENT) => {
				const _states = (0, vue.unref)(states);
				columnIdx = Math.max(0, Math.min(columnIdx, props.totalColumn - 1));
				rowIndex = Math.max(0, Math.min(rowIndex, props.totalRow - 1));
				const scrollBarWidth = require_scroll.getScrollBarWidth(ns.namespace.value);
				const _cache = (0, vue.unref)(cache);
				const estimatedHeight = getEstimatedTotalHeight(props, _cache);
				const estimatedWidth = getEstimatedTotalWidth(props, _cache);
				scrollTo({
					scrollLeft: getColumnOffset(props, columnIdx, alignment, _states.scrollLeft, _cache, estimatedWidth > props.width ? scrollBarWidth : 0),
					scrollTop: getRowOffset(props, rowIndex, alignment, _states.scrollTop, _cache, estimatedHeight > props.height ? scrollBarWidth : 0)
				});
			};
			const getItemStyle = (rowIndex, columnIndex) => {
				const { columnWidth, direction, rowHeight } = props;
				const itemStyleCache = getItemStyleCache.value(clearCache && columnWidth, clearCache && rowHeight, clearCache && direction);
				const key = `${rowIndex},${columnIndex}`;
				if ((0, _vue_shared.hasOwn)(itemStyleCache, key)) return itemStyleCache[key];
				else {
					const [, left] = getColumnPosition(props, columnIndex, (0, vue.unref)(cache));
					const _cache = (0, vue.unref)(cache);
					const rtl = require_utils.isRTL(direction);
					const [height, top] = getRowPosition(props, rowIndex, _cache);
					const [width] = getColumnPosition(props, columnIndex, _cache);
					itemStyleCache[key] = {
						position: "absolute",
						left: rtl ? void 0 : `${left}px`,
						right: rtl ? `${left}px` : void 0,
						top: `${top}px`,
						height: `${height}px`,
						width: `${width}px`
					};
					return itemStyleCache[key];
				}
			};
			const resetIsScrolling = () => {
				states.value.isScrolling = false;
				(0, vue.nextTick)(() => {
					getItemStyleCache.value(-1, null, null);
				});
			};
			(0, vue.onMounted)(() => {
				if (!_vueuse_core.isClient) return;
				const { initScrollLeft, initScrollTop } = props;
				const windowElement = (0, vue.unref)(windowRef);
				if (windowElement) {
					if (require_types.isNumber(initScrollLeft)) windowElement.scrollLeft = initScrollLeft;
					if (require_types.isNumber(initScrollTop)) windowElement.scrollTop = initScrollTop;
				}
				emitEvents();
			});
			const onUpdated = () => {
				const { direction } = props;
				const { scrollLeft, scrollTop, updateRequested } = (0, vue.unref)(states);
				const windowElement = (0, vue.unref)(windowRef);
				if (updateRequested && windowElement) {
					if (direction === require_defaults.RTL) switch (require_utils.getRTLOffsetType()) {
						case require_defaults.RTL_OFFSET_NAG:
							windowElement.scrollLeft = -scrollLeft;
							break;
						case require_defaults.RTL_OFFSET_POS_ASC:
							windowElement.scrollLeft = scrollLeft;
							break;
						default: {
							const { clientWidth, scrollWidth } = windowElement;
							windowElement.scrollLeft = scrollWidth - clientWidth - scrollLeft;
							break;
						}
					}
					else windowElement.scrollLeft = Math.max(0, scrollLeft);
					windowElement.scrollTop = Math.max(0, scrollTop);
				}
			};
			const { resetAfterColumnIndex, resetAfterRowIndex, resetAfter } = instance.proxy;
			expose({
				windowRef,
				innerRef,
				getItemStyleCache,
				touchStartX,
				touchStartY,
				handleTouchStart,
				handleTouchMove,
				scrollTo,
				scrollToItem,
				states,
				resetAfterColumnIndex,
				resetAfterRowIndex,
				resetAfter
			});
			const renderScrollbars = () => {
				const { scrollbarAlwaysOn, scrollbarStartGap, scrollbarEndGap, totalColumn, totalRow } = props;
				const width = (0, vue.unref)(parsedWidth);
				const height = (0, vue.unref)(parsedHeight);
				const estimatedWidth = (0, vue.unref)(estimatedTotalWidth);
				const estimatedHeight = (0, vue.unref)(estimatedTotalHeight);
				const { scrollLeft, scrollTop } = (0, vue.unref)(states);
				return {
					horizontalScrollbar: (0, vue.h)(require_scrollbar.default, {
						ref: hScrollbar,
						alwaysOn: scrollbarAlwaysOn,
						startGap: scrollbarStartGap,
						endGap: scrollbarEndGap,
						class: ns.e("horizontal"),
						clientSize: width,
						layout: "horizontal",
						onScroll: onHorizontalScroll,
						ratio: width * 100 / estimatedWidth,
						scrollFrom: scrollLeft / (estimatedWidth - width),
						total: totalRow,
						visible: true
					}),
					verticalScrollbar: (0, vue.h)(require_scrollbar.default, {
						ref: vScrollbar,
						alwaysOn: scrollbarAlwaysOn,
						startGap: scrollbarStartGap,
						endGap: scrollbarEndGap,
						class: ns.e("vertical"),
						clientSize: height,
						layout: "vertical",
						onScroll: onVerticalScroll,
						ratio: height * 100 / estimatedHeight,
						scrollFrom: scrollTop / (estimatedHeight - height),
						total: totalColumn,
						visible: true
					})
				};
			};
			const renderItems = () => {
				const [columnStart, columnEnd] = (0, vue.unref)(columnsToRender);
				const [rowStart, rowEnd] = (0, vue.unref)(rowsToRender);
				const { data, totalColumn, totalRow, useIsScrolling, itemKey } = props;
				const children = [];
				if (totalRow > 0 && totalColumn > 0) for (let row = rowStart; row <= rowEnd; row++) for (let column = columnStart; column <= columnEnd; column++) {
					const key = itemKey({
						columnIndex: column,
						data,
						rowIndex: row
					});
					children.push((0, vue.h)(vue.Fragment, { key }, slots.default?.({
						columnIndex: column,
						data,
						isScrolling: useIsScrolling ? (0, vue.unref)(states).isScrolling : void 0,
						style: getItemStyle(row, column),
						rowIndex: row
					})));
				}
				return children;
			};
			const renderInner = () => {
				const Inner = (0, vue.resolveDynamicComponent)(props.innerElement);
				const children = renderItems();
				return [(0, vue.h)(Inner, (0, vue.mergeProps)(props.innerProps, {
					style: (0, vue.unref)(innerStyle),
					ref: innerRef
				}), !(0, _vue_shared.isString)(Inner) ? { default: () => children } : children)];
			};
			const renderWindow = () => {
				const Container = (0, vue.resolveDynamicComponent)(props.containerElement);
				const { horizontalScrollbar, verticalScrollbar } = renderScrollbars();
				const Inner = renderInner();
				return (0, vue.h)("div", {
					key: 0,
					class: ns.e("wrapper"),
					role: props.role
				}, [
					(0, vue.h)(Container, {
						class: props.className,
						style: (0, vue.unref)(windowStyle),
						onScroll,
						ref: windowRef
					}, !(0, _vue_shared.isString)(Container) ? { default: () => Inner } : Inner),
					horizontalScrollbar,
					verticalScrollbar
				]);
			};
			return renderWindow;
		}
	});
};

//#endregion
exports.default = createGrid;
//# sourceMappingURL=build-grid.js.map