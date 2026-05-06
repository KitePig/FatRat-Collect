import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { Alignment, GridScrollOptions, ItemSize } from "../../virtual-list/src/types.js";
import { ResetAfterIndex } from "../../virtual-list/src/components/dynamic-size-grid.js";
import "../../virtual-list/index.js";
import { KeyType } from "./types.js";
import { AnyColumn } from "./common.js";
import { onRowRenderedParams } from "./grid.js";
import * as vue from "vue";
import { UnwrapRef } from "vue";
import * as vue_jsx_runtime0 from "vue/jsx-runtime";

//#region ../../packages/components/table-v2/src/table-grid.d.ts
declare const TableGrid: vue.DefineComponent<vue.ExtractPropTypes<{
  readonly columns: {
    readonly type: vue.PropType<AnyColumn[]>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly data: {
    readonly type: vue.PropType<any[]>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly fixedData: {
    readonly type: vue.PropType<any[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly estimatedRowHeight: {
    readonly default: undefined;
    readonly type: vue.PropType<number>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    readonly __epPropKey: true;
  };
  readonly width: {
    readonly type: vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly height: {
    readonly type: vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly headerWidth: {
    readonly type: vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly headerHeight: EpPropFinalized<(new (...args: any[]) => number | number[]) | (() => number | number[]) | (((new (...args: any[]) => number | number[]) | (() => number | number[])) | null)[], unknown, unknown, 50, boolean>;
  readonly bodyWidth: {
    readonly type: vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowHeight: {
    readonly type: vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly cache: EpPropFinalized<NumberConstructor, never, never, 2, false>;
  readonly useIsScrolling: BooleanConstructor;
  readonly scrollbarAlwaysOn: BooleanConstructor;
  readonly scrollbarStartGap: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly scrollbarEndGap: EpPropFinalized<NumberConstructor, unknown, unknown, 2, boolean>;
  readonly class: StringConstructor;
  readonly style: {
    readonly type: vue.PropType<vue.CSSProperties>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly containerStyle: {
    readonly type: vue.PropType<vue.CSSProperties>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly getRowHeight: {
    readonly type: vue.PropType<ItemSize>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowKey: EpPropFinalized<(new (...args: any[]) => string | number | symbol) | (() => KeyType) | (((new (...args: any[]) => string | number | symbol) | (() => KeyType)) | null)[], unknown, unknown, "id", boolean>;
  readonly onRowsRendered: {
    readonly type: vue.PropType<(params: onRowRenderedParams) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onScroll: {
    readonly type: vue.PropType<(...args: any[]) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>, () => vue_jsx_runtime0.JSX.Element, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
  readonly columns: {
    readonly type: vue.PropType<AnyColumn[]>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly data: {
    readonly type: vue.PropType<any[]>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly fixedData: {
    readonly type: vue.PropType<any[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly estimatedRowHeight: {
    readonly default: undefined;
    readonly type: vue.PropType<number>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    readonly __epPropKey: true;
  };
  readonly width: {
    readonly type: vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly height: {
    readonly type: vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly headerWidth: {
    readonly type: vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly headerHeight: EpPropFinalized<(new (...args: any[]) => number | number[]) | (() => number | number[]) | (((new (...args: any[]) => number | number[]) | (() => number | number[])) | null)[], unknown, unknown, 50, boolean>;
  readonly bodyWidth: {
    readonly type: vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowHeight: {
    readonly type: vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly cache: EpPropFinalized<NumberConstructor, never, never, 2, false>;
  readonly useIsScrolling: BooleanConstructor;
  readonly scrollbarAlwaysOn: BooleanConstructor;
  readonly scrollbarStartGap: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly scrollbarEndGap: EpPropFinalized<NumberConstructor, unknown, unknown, 2, boolean>;
  readonly class: StringConstructor;
  readonly style: {
    readonly type: vue.PropType<vue.CSSProperties>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly containerStyle: {
    readonly type: vue.PropType<vue.CSSProperties>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly getRowHeight: {
    readonly type: vue.PropType<ItemSize>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly rowKey: EpPropFinalized<(new (...args: any[]) => string | number | symbol) | (() => KeyType) | (((new (...args: any[]) => string | number | symbol) | (() => KeyType)) | null)[], unknown, unknown, "id", boolean>;
  readonly onRowsRendered: {
    readonly type: vue.PropType<(params: onRowRenderedParams) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly onScroll: {
    readonly type: vue.PropType<(...args: any[]) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>> & Readonly<{}>, {
  readonly scrollbarAlwaysOn: boolean;
  readonly rowKey: EpPropMergeType<(new (...args: any[]) => string | number | symbol) | (() => KeyType) | (((new (...args: any[]) => string | number | symbol) | (() => KeyType)) | null)[], unknown, unknown>;
  readonly headerHeight: EpPropMergeType<(new (...args: any[]) => number | number[]) | (() => number | number[]) | (((new (...args: any[]) => number | number[]) | (() => number | number[])) | null)[], unknown, unknown>;
  readonly estimatedRowHeight: number;
  readonly useIsScrolling: boolean;
  readonly scrollbarStartGap: number;
  readonly scrollbarEndGap: number;
  readonly cache: number;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
type TableGridInstance = InstanceType<typeof TableGrid> & UnwrapRef<{
  forceUpdate: () => void;
  /**
   * @description fetch total height
   */
  totalHeight: number;
  /**
   * @description scrollTo a position
   * @param { number | ScrollToOptions } arg1
   * @param { number } arg2
   */
  scrollTo(leftOrOptions: number | GridScrollOptions, top?: number): void;
  /**
   * @description scroll vertically to position y
   */
  scrollToTop(scrollTop: number): void;
  /**
   * @description scroll to a given row
   * @params row {Number} which row to scroll to
   * @params @optional strategy {ScrollStrategy} use what strategy to scroll to
   */
  scrollToRow(row: number, strategy: Alignment): void;
  /**
   * @description reset rendered state after row index
   * @param { number } rowIndex
   * @param { boolean } forceUpdate
   */
  resetAfterRowIndex: ResetAfterIndex;
}>;
//#endregion
export { TableGridInstance };