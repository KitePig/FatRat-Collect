import { AnyColumn } from "./common.js";
import * as vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/table-v2/src/header-cell.d.ts
declare const tableV2HeaderCell: {
  class: StringConstructor;
  columnIndex: NumberConstructor;
  column: {
    readonly type: vue.PropType<AnyColumn>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
type TableV2HeaderCell = ExtractPropTypes<typeof tableV2HeaderCell>;
//#endregion
export { TableV2HeaderCell };