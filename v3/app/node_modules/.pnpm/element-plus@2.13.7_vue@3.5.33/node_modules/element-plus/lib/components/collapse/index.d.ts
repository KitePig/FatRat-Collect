import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { CollapseActiveName, CollapseEmits, CollapseIconPositionType, CollapseModelValue, CollapseProps, CollapsePropsPublic, collapseEmits, collapseProps, emitChangeFn } from "./src/collapse.js";
import { _default } from "./src/collapse.vue.js";
import { CollapseItemProps, CollapseItemPropsPublic, collapseItemProps } from "./src/collapse-item.js";
import { _default as _default$1 } from "./src/collapse-item.vue.js";
import { CollapseContext, collapseContextKey } from "./src/constants.js";
import { CollapseInstance, CollapseItemInstance } from "./src/instance.js";

//#region ../../packages/components/collapse/index.d.ts
declare const ElCollapse: SFCWithInstall<typeof _default> & {
  CollapseItem: typeof _default$1;
};
declare const ElCollapseItem: SFCWithInstall<typeof _default$1>;
//#endregion
export { CollapseActiveName, CollapseContext, CollapseEmits, CollapseIconPositionType, type CollapseInstance, type CollapseItemInstance, CollapseItemProps, CollapseItemPropsPublic, CollapseModelValue, CollapseProps, CollapsePropsPublic, ElCollapse, ElCollapse as default, ElCollapseItem, collapseContextKey, collapseEmits, collapseItemProps, collapseProps, emitChangeFn };