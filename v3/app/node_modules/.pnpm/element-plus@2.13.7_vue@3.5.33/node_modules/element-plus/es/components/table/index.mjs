import { withInstall, withNoopInstall } from "../../utils/vue/install.mjs";
import table_default from "./src/table.mjs";
import tableColumn_default from "./src/tableColumn.mjs";

//#region ../../packages/components/table/index.ts
const ElTable = withInstall(table_default, { TableColumn: tableColumn_default });
const ElTableColumn = withNoopInstall(tableColumn_default);

//#endregion
export { ElTable, ElTable as default, ElTableColumn };
//# sourceMappingURL=index.mjs.map