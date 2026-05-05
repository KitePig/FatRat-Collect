import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { virtualizedGridProps, virtualizedListProps } from "../../virtual-list/src/props.mjs";
import { classType, columns, dataType, fixedDataType, requiredNumber, styleType } from "./common.mjs";
import { tableV2RowProps } from "./row.mjs";
import { tableV2HeaderProps } from "./header.mjs";

//#region ../../packages/components/table-v2/src/grid.ts
const tableV2GridProps = buildProps({
	columns,
	data: dataType,
	fixedData: fixedDataType,
	estimatedRowHeight: tableV2RowProps.estimatedRowHeight,
	width: requiredNumber,
	height: requiredNumber,
	headerWidth: requiredNumber,
	headerHeight: tableV2HeaderProps.headerHeight,
	bodyWidth: requiredNumber,
	rowHeight: requiredNumber,
	cache: virtualizedListProps.cache,
	useIsScrolling: Boolean,
	scrollbarAlwaysOn: virtualizedGridProps.scrollbarAlwaysOn,
	scrollbarStartGap: virtualizedGridProps.scrollbarStartGap,
	scrollbarEndGap: virtualizedGridProps.scrollbarEndGap,
	class: classType,
	style: styleType,
	containerStyle: styleType,
	getRowHeight: {
		type: definePropType(Function),
		required: true
	},
	rowKey: tableV2RowProps.rowKey,
	onRowsRendered: { type: definePropType(Function) },
	onScroll: { type: definePropType(Function) }
});

//#endregion
export { tableV2GridProps };
//# sourceMappingURL=grid.mjs.map