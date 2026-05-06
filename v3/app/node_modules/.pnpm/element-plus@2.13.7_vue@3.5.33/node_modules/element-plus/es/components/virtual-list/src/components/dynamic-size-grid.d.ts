import { EpPropFinalized, EpPropMergeType } from "../../../../utils/vue/props/types.js";
import "../../../../utils/index.js";
import { GridItemKeyGetter, ItemSize } from "../types.js";
import { GridInstance } from "../builders/build-grid.js";
import * as vue from "vue";

//#region ../../packages/components/virtual-list/src/components/dynamic-size-grid.d.ts
type Indices = {
  columnIndex?: number;
  rowIndex?: number;
};
declare const DynamicSizeGrid: vue.DefineComponent<vue.ExtractPropTypes<{
  readonly className: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly containerElement: EpPropFinalized<(new (...args: any[]) => string | Element) | (() => string | Element) | (((new (...args: any[]) => string | Element) | (() => string | Element)) | null)[], unknown, unknown, "div", boolean>;
  readonly data: EpPropFinalized<(new (...args: any[]) => any[]) | (() => any[]) | (((new (...args: any[]) => any[]) | (() => any[])) | null)[], unknown, unknown, () => [], boolean>;
  readonly direction: EpPropFinalized<StringConstructor, "ltr" | "rtl", never, "ltr", false>;
  readonly height: {
    readonly type: vue.PropType<EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly innerElement: EpPropFinalized<readonly [StringConstructor, ObjectConstructor], unknown, unknown, "div", boolean>;
  readonly innerProps: EpPropFinalized<(new (...args: any[]) => Record<string, unknown>) | (() => Record<string, unknown>) | (((new (...args: any[]) => Record<string, unknown>) | (() => Record<string, unknown>)) | null)[], unknown, unknown, () => {}, boolean>;
  readonly style: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | false | vue.CSSProperties | vue.StyleValue[]) | (() => vue.StyleValue) | (((new (...args: any[]) => string | false | vue.CSSProperties | vue.StyleValue[]) | (() => vue.StyleValue)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly useIsScrolling: BooleanConstructor;
  readonly width: {
    readonly type: vue.PropType<EpPropMergeType<readonly [NumberConstructor, StringConstructor], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly perfMode: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly scrollbarAlwaysOn: BooleanConstructor;
  readonly columnCache: EpPropFinalized<NumberConstructor, never, never, 2, false>;
  readonly columnWidth: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => number | ItemSize) | (() => number | ItemSize) | (((new (...args: any[]) => number | ItemSize) | (() => number | ItemSize)) | null)[], never, never>>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly estimatedColumnWidth: {
    readonly type: vue.PropType<number>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly estimatedRowHeight: {
    readonly type: vue.PropType<number>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly initScrollLeft: EpPropFinalized<NumberConstructor, never, never, 0, false>;
  readonly initScrollTop: EpPropFinalized<NumberConstructor, never, never, 0, false>;
  readonly itemKey: EpPropFinalized<(new (...args: any[]) => GridItemKeyGetter) | (() => GridItemKeyGetter) | {
    (): GridItemKeyGetter;
    new (): any;
    readonly prototype: any;
  } | (((new (...args: any[]) => GridItemKeyGetter) | (() => GridItemKeyGetter) | {
    (): GridItemKeyGetter;
    new (): any;
    readonly prototype: any;
  }) | null)[], unknown, unknown, ({
    columnIndex,
    rowIndex
  }: {
    columnIndex: number;
    rowIndex: number;
  }) => string, boolean>;
  readonly rowCache: EpPropFinalized<NumberConstructor, never, never, 2, false>;
  readonly rowHeight: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => number | ItemSize) | (() => number | ItemSize) | (((new (...args: any[]) => number | ItemSize) | (() => number | ItemSize)) | null)[], never, never>>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly totalColumn: {
    readonly type: vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly totalRow: {
    readonly type: vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly hScrollbarSize: EpPropFinalized<NumberConstructor, unknown, unknown, 6, boolean>;
  readonly vScrollbarSize: EpPropFinalized<NumberConstructor, unknown, unknown, 6, boolean>;
  readonly scrollbarStartGap: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly scrollbarEndGap: EpPropFinalized<NumberConstructor, unknown, unknown, 2, boolean>;
  readonly role: StringConstructor;
}>, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
  [key: string]: any;
}>, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("scroll" | "itemRendered")[], "scroll" | "itemRendered", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
  readonly className: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly containerElement: EpPropFinalized<(new (...args: any[]) => string | Element) | (() => string | Element) | (((new (...args: any[]) => string | Element) | (() => string | Element)) | null)[], unknown, unknown, "div", boolean>;
  readonly data: EpPropFinalized<(new (...args: any[]) => any[]) | (() => any[]) | (((new (...args: any[]) => any[]) | (() => any[])) | null)[], unknown, unknown, () => [], boolean>;
  readonly direction: EpPropFinalized<StringConstructor, "ltr" | "rtl", never, "ltr", false>;
  readonly height: {
    readonly type: vue.PropType<EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly innerElement: EpPropFinalized<readonly [StringConstructor, ObjectConstructor], unknown, unknown, "div", boolean>;
  readonly innerProps: EpPropFinalized<(new (...args: any[]) => Record<string, unknown>) | (() => Record<string, unknown>) | (((new (...args: any[]) => Record<string, unknown>) | (() => Record<string, unknown>)) | null)[], unknown, unknown, () => {}, boolean>;
  readonly style: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | false | vue.CSSProperties | vue.StyleValue[]) | (() => vue.StyleValue) | (((new (...args: any[]) => string | false | vue.CSSProperties | vue.StyleValue[]) | (() => vue.StyleValue)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly useIsScrolling: BooleanConstructor;
  readonly width: {
    readonly type: vue.PropType<EpPropMergeType<readonly [NumberConstructor, StringConstructor], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly perfMode: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly scrollbarAlwaysOn: BooleanConstructor;
  readonly columnCache: EpPropFinalized<NumberConstructor, never, never, 2, false>;
  readonly columnWidth: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => number | ItemSize) | (() => number | ItemSize) | (((new (...args: any[]) => number | ItemSize) | (() => number | ItemSize)) | null)[], never, never>>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly estimatedColumnWidth: {
    readonly type: vue.PropType<number>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly estimatedRowHeight: {
    readonly type: vue.PropType<number>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly initScrollLeft: EpPropFinalized<NumberConstructor, never, never, 0, false>;
  readonly initScrollTop: EpPropFinalized<NumberConstructor, never, never, 0, false>;
  readonly itemKey: EpPropFinalized<(new (...args: any[]) => GridItemKeyGetter) | (() => GridItemKeyGetter) | {
    (): GridItemKeyGetter;
    new (): any;
    readonly prototype: any;
  } | (((new (...args: any[]) => GridItemKeyGetter) | (() => GridItemKeyGetter) | {
    (): GridItemKeyGetter;
    new (): any;
    readonly prototype: any;
  }) | null)[], unknown, unknown, ({
    columnIndex,
    rowIndex
  }: {
    columnIndex: number;
    rowIndex: number;
  }) => string, boolean>;
  readonly rowCache: EpPropFinalized<NumberConstructor, never, never, 2, false>;
  readonly rowHeight: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => number | ItemSize) | (() => number | ItemSize) | (((new (...args: any[]) => number | ItemSize) | (() => number | ItemSize)) | null)[], never, never>>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly totalColumn: {
    readonly type: vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly totalRow: {
    readonly type: vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly hScrollbarSize: EpPropFinalized<NumberConstructor, unknown, unknown, 6, boolean>;
  readonly vScrollbarSize: EpPropFinalized<NumberConstructor, unknown, unknown, 6, boolean>;
  readonly scrollbarStartGap: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly scrollbarEndGap: EpPropFinalized<NumberConstructor, unknown, unknown, 2, boolean>;
  readonly role: StringConstructor;
}>> & Readonly<{
  onScroll?: ((...args: any[]) => any) | undefined;
  onItemRendered?: ((...args: any[]) => any) | undefined;
}>, {
  readonly className: string;
  readonly direction: EpPropMergeType<StringConstructor, "ltr" | "rtl", never>;
  readonly data: any[];
  readonly scrollbarAlwaysOn: boolean;
  readonly itemKey: GridItemKeyGetter;
  readonly containerElement: EpPropMergeType<(new (...args: any[]) => string | Element) | (() => string | Element) | (((new (...args: any[]) => string | Element) | (() => string | Element)) | null)[], unknown, unknown>;
  readonly innerElement: EpPropMergeType<readonly [StringConstructor, ObjectConstructor], unknown, unknown>;
  readonly innerProps: Record<string, unknown>;
  readonly perfMode: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly useIsScrolling: boolean;
  readonly columnCache: number;
  readonly initScrollLeft: number;
  readonly initScrollTop: number;
  readonly rowCache: number;
  readonly hScrollbarSize: number;
  readonly vScrollbarSize: number;
  readonly scrollbarStartGap: number;
  readonly scrollbarEndGap: number;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
type ResetAfterIndex = (idx: number, forceUpdate: boolean) => void;
type ResetAfterIndices = (indices: Indices, forceUpdate: boolean) => void;
type DynamicSizeGridInstance = GridInstance & {
  resetAfterColumnIndex: ResetAfterIndex;
  resetAfterRowIndex: ResetAfterIndex;
  resetAfter: ResetAfterIndices;
};
//#endregion
export { DynamicSizeGrid, DynamicSizeGridInstance, ResetAfterIndex, ResetAfterIndices };