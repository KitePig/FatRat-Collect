import { KeyType } from "./types.js";
import { AnyColumn } from "./common.js";
import * as vue from "vue";
import { CSSProperties, ExtractPropTypes, ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/table-v2/src/header-row.d.ts
declare const tableV2HeaderRowProps: {
  readonly class: StringConstructor;
  readonly columns: {
    readonly type: vue.PropType<AnyColumn[]>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly columnsStyles: {
    readonly type: vue.PropType<Record<KeyType, CSSProperties>>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly headerIndex: NumberConstructor;
  readonly style: {
    readonly type: vue.PropType<CSSProperties>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
type TableV2HeaderRowProps = ExtractPropTypes<typeof tableV2HeaderRowProps>;
//#endregion
export { TableV2HeaderRowProps };