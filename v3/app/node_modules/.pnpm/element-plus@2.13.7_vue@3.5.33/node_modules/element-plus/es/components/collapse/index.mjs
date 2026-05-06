import { withInstall, withNoopInstall } from "../../utils/vue/install.mjs";
import { collapseEmits, collapseProps, emitChangeFn } from "./src/collapse.mjs";
import { collapseContextKey } from "./src/constants.mjs";
import collapse_default from "./src/collapse2.mjs";
import { collapseItemProps } from "./src/collapse-item.mjs";
import collapse_item_default from "./src/collapse-item2.mjs";

//#region ../../packages/components/collapse/index.ts
const ElCollapse = withInstall(collapse_default, { CollapseItem: collapse_item_default });
const ElCollapseItem = withNoopInstall(collapse_item_default);

//#endregion
export { ElCollapse, ElCollapse as default, ElCollapseItem, collapseContextKey, collapseEmits, collapseItemProps, collapseProps, emitChangeFn };
//# sourceMappingURL=index.mjs.map