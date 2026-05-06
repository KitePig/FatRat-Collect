import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { PaginationEmits, PaginationProps, PaginationPropsPublic, _default, paginationEmits, paginationProps } from "./src/pagination.js";
import { ElPaginationContext, elPaginationKey } from "./src/constants.js";

//#region ../../packages/components/pagination/index.d.ts
declare const ElPagination: SFCWithInstall<typeof _default>;
//#endregion
export { ElPagination, ElPagination as default, ElPaginationContext, PaginationEmits, PaginationProps, PaginationPropsPublic, elPaginationKey, paginationEmits, paginationProps };