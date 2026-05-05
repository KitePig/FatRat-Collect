import { withInstall } from "../../utils/vue/install.mjs";
import { elPaginationKey } from "./src/constants.mjs";
import pagination_default, { paginationEmits, paginationProps } from "./src/pagination.mjs";

//#region ../../packages/components/pagination/index.ts
const ElPagination = withInstall(pagination_default);

//#endregion
export { ElPagination, ElPagination as default, elPaginationKey, paginationEmits, paginationProps };
//# sourceMappingURL=index.mjs.map