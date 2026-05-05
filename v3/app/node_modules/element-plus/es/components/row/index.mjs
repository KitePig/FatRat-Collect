import { withInstall } from "../../utils/vue/install.mjs";
import { RowAlign, RowJustify, rowProps } from "./src/row.mjs";
import { rowContextKey } from "./src/constants.mjs";
import row_default from "./src/row2.mjs";

//#region ../../packages/components/row/index.ts
const ElRow = withInstall(row_default);

//#endregion
export { ElRow, ElRow as default, RowAlign, RowJustify, rowContextKey, rowProps };
//# sourceMappingURL=index.mjs.map