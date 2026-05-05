const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../../hooks/use-namespace/index.js');
const require_utils = require('../utils.js');
const require_tokens = require('../tokens.js');
const require_header = require('../header.js');
let vue = require("vue");
let lodash_unified = require("lodash-unified");

//#region ../../packages/components/table-v2/src/components/header.tsx
const TableV2Header = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElTableV2Header",
	props: require_header.tableV2HeaderProps,
	setup(props, { slots, expose }) {
		const ns = require_index.useNamespace("table-v2");
		const scrollLeftInfo = (0, vue.inject)(require_tokens.TABLE_V2_GRID_INJECTION_KEY);
		const headerRef = (0, vue.ref)();
		const headerStyle = (0, vue.computed)(() => require_utils.enforceUnit({
			width: props.width,
			height: props.height
		}));
		const rowStyle = (0, vue.computed)(() => require_utils.enforceUnit({
			width: props.rowWidth,
			height: props.height
		}));
		const headerHeights = (0, vue.computed)(() => (0, lodash_unified.castArray)((0, vue.unref)(props.headerHeight)));
		const scrollToLeft = (left) => {
			const headerEl = (0, vue.unref)(headerRef);
			(0, vue.nextTick)(() => {
				headerEl?.scroll && headerEl.scroll({ left });
			});
		};
		const renderFixedRows = () => {
			const fixedRowClassName = ns.e("fixed-header-row");
			const { columns, fixedHeaderData, rowHeight } = props;
			return fixedHeaderData?.map((fixedRowData, fixedRowIndex) => {
				const style = require_utils.enforceUnit({
					height: rowHeight,
					width: "100%"
				});
				return slots.fixed?.({
					class: fixedRowClassName,
					columns,
					rowData: fixedRowData,
					rowIndex: -(fixedRowIndex + 1),
					style
				});
			});
		};
		const renderDynamicRows = () => {
			const dynamicRowClassName = ns.e("dynamic-header-row");
			const { columns } = props;
			return (0, vue.unref)(headerHeights).map((rowHeight, rowIndex) => {
				const style = require_utils.enforceUnit({
					width: "100%",
					height: rowHeight
				});
				return slots.dynamic?.({
					class: dynamicRowClassName,
					columns,
					headerIndex: rowIndex,
					style
				});
			});
		};
		(0, vue.onUpdated)(() => {
			if (scrollLeftInfo?.value) scrollToLeft(scrollLeftInfo.value);
		});
		expose({ scrollToLeft });
		return () => {
			if (props.height <= 0) return;
			return (0, vue.createVNode)("div", {
				"ref": headerRef,
				"class": props.class,
				"style": (0, vue.unref)(headerStyle),
				"role": "rowgroup"
			}, [(0, vue.createVNode)("div", {
				"style": (0, vue.unref)(rowStyle),
				"class": ns.e("header")
			}, [renderDynamicRows(), renderFixedRows()])]);
		};
	}
});

//#endregion
exports.default = TableV2Header;
//# sourceMappingURL=header.js.map