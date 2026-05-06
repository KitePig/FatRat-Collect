import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { GridItemKeyGetter, ItemSize } from "./types.js";
import * as vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes, StyleValue } from "vue";

//#region ../../packages/components/virtual-list/src/props.d.ts
declare const virtualizedProps: {
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
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue) | (((new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue)) | null)[], unknown, unknown>>;
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
};
declare const virtualizedListProps: {
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
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue) | (((new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue)) | null)[], unknown, unknown>>;
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
  readonly cache: EpPropFinalized<NumberConstructor, never, never, 2, false>;
  readonly estimatedItemSize: {
    readonly type: vue.PropType<number>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly layout: EpPropFinalized<StringConstructor, "horizontal" | "vertical", never, "vertical", false>;
  readonly initScrollOffset: EpPropFinalized<NumberConstructor, never, never, 0, false>;
  readonly total: {
    readonly type: vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly itemSize: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => number | ItemSize) | (() => number | ItemSize) | (((new (...args: any[]) => number | ItemSize) | (() => number | ItemSize)) | null)[], never, never>>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
declare const virtualizedGridProps: {
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
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue) | (((new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue)) | null)[], unknown, unknown>>;
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
};
declare const virtualizedScrollbarProps: {
  readonly alwaysOn: BooleanConstructor;
  readonly class: StringConstructor;
  readonly layout: EpPropFinalized<StringConstructor, "horizontal" | "vertical", never, "vertical", false>;
  readonly total: {
    readonly type: vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly ratio: {
    readonly type: vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly clientSize: {
    readonly type: vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly scrollFrom: {
    readonly type: vue.PropType<number>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly scrollbarSize: EpPropFinalized<NumberConstructor, unknown, unknown, 6, boolean>;
  readonly startGap: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly endGap: EpPropFinalized<NumberConstructor, unknown, unknown, 2, boolean>;
  readonly visible: BooleanConstructor;
};
type VirtualizedProps = ExtractPropTypes<typeof virtualizedProps>;
type VirtualizedPropsPublic = ExtractPublicPropTypes<typeof virtualizedProps>;
type VirtualizedListProps = ExtractPropTypes<typeof virtualizedListProps>;
type VirtualizedListPropsPublic = ExtractPublicPropTypes<typeof virtualizedListProps>;
type VirtualizedGridProps = ExtractPropTypes<typeof virtualizedGridProps>;
type VirtualizedGridPropsPublic = ExtractPublicPropTypes<typeof virtualizedGridProps>;
type VirtualizedScrollbarProps = ExtractPropTypes<typeof virtualizedScrollbarProps>;
type VirtualizedScrollbarPropsPublic = ExtractPublicPropTypes<typeof virtualizedScrollbarProps>;
//#endregion
export { VirtualizedGridProps, VirtualizedGridPropsPublic, VirtualizedListProps, VirtualizedListPropsPublic, VirtualizedProps, VirtualizedPropsPublic, VirtualizedScrollbarProps, VirtualizedScrollbarPropsPublic, virtualizedGridProps, virtualizedListProps, virtualizedProps, virtualizedScrollbarProps };