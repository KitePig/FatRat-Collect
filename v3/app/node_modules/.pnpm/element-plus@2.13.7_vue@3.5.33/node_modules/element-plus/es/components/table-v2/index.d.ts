import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { Alignment, FixedDir, SortOrder } from "./src/constants.js";
import { Column, Columns, SortBy, SortState, TableV2CustomizedHeaderSlotParam } from "./src/types.js";
import { RowEventHandler, RowEventHandlerParams, RowEventHandlers, RowExpandHandler, RowExpandParams, RowHeightChangeHandler, RowHeightChangedParams, RowHoverHandler, RowHoverParams, TableV2RowProps, TableV2RowPropsPublic, tableV2RowProps } from "./src/row.js";
import { ColumnResizeHandler, ColumnSortHandler, ColumnSortParams, ExpandedRowsChangeHandler, ExtraCellPropGetter, ExtractHeaderCellPropGetter, ExtractHeaderPropGetter, ExtractRowPropGetter, HeaderClassNameGetter, RowClassNameGetter, TableV2Props, TableV2PropsPublic, tableV2Props } from "./src/table.js";
import { TableV2, TableV2Instance } from "./src/table-v2.js";
import { AutoResizer } from "./src/components/auto-resizer.js";
import { AutoResizerProps, AutoResizerPropsPublic, autoResizerProps } from "./src/auto-resizer.js";
import { placeholderSign } from "./src/private.js";
import { HeaderCellSlotProps } from "./src/renderers/header-cell.js";

//#region ../../packages/components/table-v2/index.d.ts
declare const ElTableV2: SFCWithInstall<typeof TableV2>;
declare const ElAutoResizer: SFCWithInstall<typeof AutoResizer>;
//#endregion
export { AutoResizerProps, AutoResizerPropsPublic, type Column, ColumnResizeHandler, ColumnSortHandler, ColumnSortParams, type Columns, ElAutoResizer, ElTableV2, ExpandedRowsChangeHandler, ExtraCellPropGetter, ExtractHeaderCellPropGetter, ExtractHeaderPropGetter, ExtractRowPropGetter, type HeaderCellSlotProps, HeaderClassNameGetter, RowClassNameGetter, RowEventHandler, RowEventHandlerParams, RowEventHandlers, RowExpandHandler, RowExpandParams, RowHeightChangeHandler, RowHeightChangedParams, RowHoverHandler, RowHoverParams, type SortBy, type SortState, TableV2, Alignment as TableV2Alignment, type TableV2CustomizedHeaderSlotParam, FixedDir as TableV2FixedDir, type TableV2Instance, placeholderSign as TableV2Placeholder, TableV2Props, TableV2PropsPublic, TableV2RowProps, TableV2RowPropsPublic, SortOrder as TableV2SortOrder, autoResizerProps, tableV2Props, tableV2RowProps };