import { withInstall } from "../../utils/vue/install.mjs";
import { Alignment, FixedDir, SortOrder } from "./src/constants.mjs";
import { placeholderSign } from "./src/private.mjs";
import { tableV2RowProps } from "./src/row.mjs";
import { tableV2Props } from "./src/table.mjs";
import TableV2 from "./src/table-v2.mjs";
import { autoResizerProps } from "./src/auto-resizer.mjs";
import AutoResizer from "./src/components/auto-resizer.mjs";

//#region ../../packages/components/table-v2/index.ts
const ElTableV2 = withInstall(TableV2);
const ElAutoResizer = withInstall(AutoResizer);

//#endregion
export { ElAutoResizer, ElTableV2, TableV2, Alignment as TableV2Alignment, FixedDir as TableV2FixedDir, placeholderSign as TableV2Placeholder, SortOrder as TableV2SortOrder, autoResizerProps, tableV2Props, tableV2RowProps };
//# sourceMappingURL=index.mjs.map