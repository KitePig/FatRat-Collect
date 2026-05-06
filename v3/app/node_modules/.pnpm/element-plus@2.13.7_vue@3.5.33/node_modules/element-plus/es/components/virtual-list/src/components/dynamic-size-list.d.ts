import { EpPropFinalized, EpPropMergeType } from "../../../../utils/vue/props/types.js";
import "../../../../utils/index.js";
import { Alignment, ItemSize } from "../types.js";
import * as vue from "vue";

//#region ../../packages/components/virtual-list/src/components/dynamic-size-list.d.ts
declare const DynamicSizeList: vue.DefineComponent<vue.ExtractPropTypes<{
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
}>, {
  ns: {
    namespace: vue.ComputedRef<string>;
    b: (blockSuffix?: string) => string;
    e: (element?: string) => string;
    m: (modifier?: string) => string;
    be: (blockSuffix?: string, element?: string) => string;
    em: (element?: string, modifier?: string) => string;
    bm: (blockSuffix?: string, modifier?: string) => string;
    bem: (blockSuffix?: string, element?: string, modifier?: string) => string;
    is: {
      (name: string, state: boolean | undefined): string;
      (name: string): string;
    };
    cssVar: (object: Record<string, string>) => Record<string, string>;
    cssVarName: (name: string) => string;
    cssVarBlock: (object: Record<string, string>) => Record<string, string>;
    cssVarBlockName: (name: string) => string;
  };
  clientSize: vue.ComputedRef<string | number | undefined>;
  estimatedTotalSize: vue.ComputedRef<number>;
  windowStyle: vue.ComputedRef<(string | false | vue.CSSProperties | vue.StyleValue[] | {
    [x: string]: string;
    position: string;
    WebkitOverflowScrolling: string;
    willChange: string;
  } | null | undefined)[]>;
  windowRef: vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  innerRef: vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  innerStyle: vue.ComputedRef<{
    height: string;
    pointerEvents: string | undefined;
    width: string;
    margin: number;
    boxSizing: string;
  }>;
  itemsToRender: vue.ComputedRef<number[]>;
  scrollbarRef: vue.Ref<any, any>;
  states: vue.Ref<{
    isScrolling: boolean;
    scrollDir: string;
    scrollOffset: number;
    updateRequested: boolean;
    isScrollbarDragging: boolean;
    scrollbarAlwaysOn: boolean;
  }, {
    isScrolling: boolean;
    scrollDir: string;
    scrollOffset: number;
    updateRequested: boolean;
    isScrollbarDragging: boolean;
    scrollbarAlwaysOn: boolean;
  } | {
    isScrolling: boolean;
    scrollDir: string;
    scrollOffset: number;
    updateRequested: boolean;
    isScrollbarDragging: boolean;
    scrollbarAlwaysOn: boolean;
  }>;
  getItemStyle: (idx: number) => vue.CSSProperties;
  onScroll: (e: Event) => void;
  onScrollbarScroll: (distanceToGo: number, totalSteps: number) => void;
  onWheel: (e: WheelEvent) => void;
  scrollTo: (offset: number) => void;
  scrollToItem: (idx: number, alignment?: Alignment) => void;
  resetScrollTop: () => void;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("scroll" | "itemRendered")[], "scroll" | "itemRendered", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
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
}>> & Readonly<{
  onScroll?: ((...args: any[]) => any) | undefined;
  onItemRendered?: ((...args: any[]) => any) | undefined;
}>, {
  readonly layout: EpPropMergeType<StringConstructor, "horizontal" | "vertical", never>;
  readonly className: string;
  readonly direction: EpPropMergeType<StringConstructor, "ltr" | "rtl", never>;
  readonly data: any[];
  readonly scrollbarAlwaysOn: boolean;
  readonly containerElement: EpPropMergeType<(new (...args: any[]) => string | Element) | (() => string | Element) | (((new (...args: any[]) => string | Element) | (() => string | Element)) | null)[], unknown, unknown>;
  readonly innerElement: EpPropMergeType<readonly [StringConstructor, ObjectConstructor], unknown, unknown>;
  readonly innerProps: Record<string, unknown>;
  readonly perfMode: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly useIsScrolling: boolean;
  readonly cache: number;
  readonly initScrollOffset: number;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
type DynamicSizeListInstance = InstanceType<typeof DynamicSizeList> & unknown;
//#endregion
export { DynamicSizeList, DynamicSizeListInstance };