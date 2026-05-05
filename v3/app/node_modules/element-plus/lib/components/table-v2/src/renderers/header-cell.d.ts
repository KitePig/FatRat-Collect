import { Translator } from "../../../../hooks/use-locale/index.js";
import { UseNamespaceReturn } from "../../../../hooks/use-namespace/index.js";
import "../../../../hooks/index.js";
import { TableV2Props } from "../table.js";
import { TableV2HeaderRowCellRendererParams } from "../components/header-row.js";
import "../components/index.js";
import { UseTableReturn } from "../use-table.js";
import { FunctionalComponent, UnwrapNestedRefs } from "vue";

//#region ../../packages/components/table-v2/src/renderers/header-cell.d.ts
type HeaderCellRendererProps = TableV2HeaderRowCellRendererParams & UnwrapNestedRefs<Pick<UseTableReturn, 'onColumnSorted'>> & Pick<TableV2Props, 'sortBy' | 'sortState' | 'headerCellProps'> & {
  ns: UseNamespaceReturn;
  t: Translator;
};
type HeaderCellSlotProps = HeaderCellRendererProps & {
  class: string;
};
//#endregion
export { HeaderCellSlotProps };