import { TableOverflowTooltipOptions } from "../util.js";
import { Store } from "../store/index.js";
import { ColumnCls, ColumnStyle, DefaultRow, Table } from "../table/defaults.js";
import { PropType } from "vue";

//#region ../../packages/components/table/src/table-body/defaults.d.ts
interface TableBodyProps<T extends DefaultRow> {
  store: Store<T>;
  stripe?: boolean;
  context: Table<T>;
  rowClassName: ColumnCls<T>;
  rowStyle: ColumnStyle<T>;
  fixed: string;
  highlight: boolean;
  tooltipEffect?: string;
  tooltipOptions?: TableOverflowTooltipOptions;
}
//#endregion
export { TableBodyProps };