import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { TableColumnCtx } from "./src/table-column/defaults.js";
import { CellCls, CellStyle, ColumnCls, ColumnStyle, Filter, RenderRowData, Sort, SummaryMethod, Table, TableConfigContext, TableProps, TableRefs, TableTooltipData, TreeNode } from "./src/table/defaults.js";
import { _default } from "./src/table.vue.js";
import _default$1 from "./src/table-column/index.js";
import "./src/tableColumn.js";

//#region ../../packages/components/table/index.d.ts
declare const ElTable: SFCWithInstall<typeof _default> & {
  TableColumn: typeof _default$1;
};
declare const ElTableColumn: SFCWithInstall<typeof _default$1>;
type TableInstance = InstanceType<typeof _default> & unknown;
type TableColumnInstance = InstanceType<typeof _default$1> & unknown;
//#endregion
export { type CellCls, type CellStyle, type ColumnCls, type ColumnStyle, ElTable, ElTable as default, ElTableColumn, type Filter, type RenderRowData, type Sort, type SummaryMethod, type Table, type TableColumnCtx, TableColumnInstance, type TableConfigContext, TableInstance, type TableProps, type TableRefs, type TableTooltipData, type TreeNode };