import { ElTooltipProps } from "../../tooltip/src/tooltip.js";
import "../../tooltip/index.js";
import { TableColumnCtx } from "./table-column/defaults.js";
import { DefaultRow } from "./table/defaults.js";
import { CSSProperties, VNode } from "vue";

//#region ../../packages/components/table/src/util.d.ts
type TableOverflowTooltipOptions = Partial<Pick<ElTooltipProps, 'appendTo' | 'effect' | 'enterable' | 'hideAfter' | 'offset' | 'placement' | 'popperClass' | 'popperOptions' | 'showAfter' | 'showArrow' | 'transition'>>;
type TableOverflowTooltipFormatter<T extends DefaultRow> = (data: {
  row: T;
  column: TableColumnCtx<T>;
  cellValue: any;
}) => VNode | string;
//#endregion
export { TableOverflowTooltipFormatter, TableOverflowTooltipOptions };