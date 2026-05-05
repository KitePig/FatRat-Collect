import { ensureArray } from "../../../../utils/arrays.mjs";
import { useNamespace } from "../../../../hooks/use-namespace/index.mjs";
import { enforceUnit } from "../utils.mjs";
import { TABLE_V2_GRID_INJECTION_KEY } from "../tokens.mjs";
import { tableV2HeaderProps } from "../header.mjs";
import { computed, createVNode, defineComponent, inject, nextTick, onUpdated, ref, unref } from "vue";

//#region ../../packages/components/table-v2/src/components/header.tsx
const TableV2Header = /* @__PURE__ */ defineComponent({
	name: "ElTableV2Header",
	props: tableV2HeaderProps,
	setup(props, { slots, expose }) {
		const ns = useNamespace("table-v2");
		const scrollLeftInfo = inject(TABLE_V2_GRID_INJECTION_KEY);
		const headerRef = ref();
		const headerStyle = computed(() => enforceUnit({
			width: props.width,
			height: props.height
		}));
		const rowStyle = computed(() => enforceUnit({
			width: props.rowWidth,
			height: props.height
		}));
		const headerHeights = computed(() => ensureArray(unref(props.headerHeight)));
		const scrollToLeft = (left) => {
			const headerEl = unref(headerRef);
			nextTick(() => {
				headerEl?.scroll && headerEl.scroll({ left });
			});
		};
		const renderFixedRows = () => {
			const fixedRowClassName = ns.e("fixed-header-row");
			const { columns, fixedHeaderData, rowHeight } = props;
			return fixedHeaderData?.map((fixedRowData, fixedRowIndex) => {
				const style = enforceUnit({
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
			return unref(headerHeights).map((rowHeight, rowIndex) => {
				const style = enforceUnit({
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
		onUpdated(() => {
			if (scrollLeftInfo?.value) scrollToLeft(scrollLeftInfo.value);
		});
		expose({ scrollToLeft });
		return () => {
			if (props.height <= 0) return;
			return createVNode("div", {
				"ref": headerRef,
				"class": props.class,
				"style": unref(headerStyle),
				"role": "rowgroup"
			}, [createVNode("div", {
				"style": unref(rowStyle),
				"class": ns.e("header")
			}, [renderDynamicRows(), renderFixedRows()])]);
		};
	}
});

//#endregion
export { TableV2Header as default };
//# sourceMappingURL=header.mjs.map