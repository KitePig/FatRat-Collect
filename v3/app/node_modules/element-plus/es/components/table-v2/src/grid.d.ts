import "../../../utils/index.js";
import "../../virtual-list/index.js";
import "./types.js";
import "./common.js";
import { ExtractPropTypes, ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/table-v2/src/grid.d.ts
type onRowRenderedParams = {
  rowCacheStart: number;
  rowCacheEnd: number;
  rowVisibleStart: number;
  rowVisibleEnd: number;
};
//#endregion
export { onRowRenderedParams };