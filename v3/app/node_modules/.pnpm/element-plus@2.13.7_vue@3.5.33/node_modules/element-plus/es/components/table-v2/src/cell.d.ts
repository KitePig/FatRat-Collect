import { EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { AnyColumn } from "./common.js";
import * as vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes, StyleValue } from "vue";

//#region ../../packages/components/table-v2/src/cell.d.ts
declare const tableV2CellProps: {
  readonly class: StringConstructor;
  readonly cellData: {
    readonly type: vue.PropType<any>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly column: {
    readonly type: vue.PropType<AnyColumn>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly columnIndex: NumberConstructor;
  readonly style: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue) | (((new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowData: {
    readonly type: vue.PropType<any>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowIndex: NumberConstructor;
};
type TableV2CellProps = ExtractPropTypes<typeof tableV2CellProps>;
//#endregion
export { TableV2CellProps };