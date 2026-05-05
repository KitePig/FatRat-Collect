import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { RowAlign, RowInstance, RowJustify, RowProps, RowPropsPublic, rowProps } from "./src/row.js";
import { _default } from "./src/row.vue.js";
import { rowContextKey } from "./src/constants.js";

//#region ../../packages/components/row/index.d.ts
declare const ElRow: SFCWithInstall<typeof _default>;
//#endregion
export { ElRow, ElRow as default, RowAlign, RowInstance, RowJustify, RowProps, RowPropsPublic, rowContextKey, rowProps };