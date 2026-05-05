import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import * as vue from "vue";
import { CSSProperties, ExtractPropTypes, ExtractPublicPropTypes, VNode } from "vue";

//#region ../../packages/components/pagination/src/pagination.d.ts
declare const paginationProps: {
  readonly pageSize: NumberConstructor;
  readonly defaultPageSize: NumberConstructor;
  readonly total: NumberConstructor;
  readonly pageCount: NumberConstructor;
  readonly pagerCount: EpPropFinalized<NumberConstructor, unknown, unknown, 7, boolean>;
  readonly currentPage: NumberConstructor;
  readonly defaultCurrentPage: NumberConstructor;
  readonly layout: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
  readonly pageSizes: EpPropFinalized<(new (...args: any[]) => number[]) | (() => number[]) | (((new (...args: any[]) => number[]) | (() => number[])) | null)[], unknown, unknown, () => [10, 20, 30, 40, 50, 100], boolean>;
  readonly popperClass: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly popperStyle: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | CSSProperties) | (() => string | CSSProperties) | (((new (...args: any[]) => string | CSSProperties) | (() => string | CSSProperties)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly prevText: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly prevIcon: EpPropFinalized<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown, () => vue.DefineComponent<{}, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, boolean>;
  readonly nextText: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly nextIcon: EpPropFinalized<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown, () => vue.DefineComponent<{}, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, boolean>;
  readonly teleported: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly small: BooleanConstructor;
  readonly size: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly background: BooleanConstructor;
  readonly disabled: BooleanConstructor;
  readonly hideOnSinglePage: BooleanConstructor;
  readonly appendSizeTo: StringConstructor;
};
type PaginationProps = ExtractPropTypes<typeof paginationProps>;
type PaginationPropsPublic = ExtractPublicPropTypes<typeof paginationProps>;
declare const paginationEmits: {
  'update:current-page': (val: number) => boolean;
  'update:page-size': (val: number) => boolean;
  'size-change': (val: number) => boolean;
  change: (currentPage: number, pageSize: number) => boolean;
  'current-change': (val: number) => boolean;
  'prev-click': (val: number) => boolean;
  'next-click': (val: number) => boolean;
};
type PaginationEmits = typeof paginationEmits;
declare const _default: vue.DefineComponent<ExtractPropTypes<{
  readonly pageSize: NumberConstructor;
  readonly defaultPageSize: NumberConstructor;
  readonly total: NumberConstructor;
  readonly pageCount: NumberConstructor;
  readonly pagerCount: EpPropFinalized<NumberConstructor, unknown, unknown, 7, boolean>;
  readonly currentPage: NumberConstructor;
  readonly defaultCurrentPage: NumberConstructor;
  readonly layout: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
  readonly pageSizes: EpPropFinalized<(new (...args: any[]) => number[]) | (() => number[]) | (((new (...args: any[]) => number[]) | (() => number[])) | null)[], unknown, unknown, () => [10, 20, 30, 40, 50, 100], boolean>;
  readonly popperClass: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly popperStyle: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | CSSProperties) | (() => string | CSSProperties) | (((new (...args: any[]) => string | CSSProperties) | (() => string | CSSProperties)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly prevText: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly prevIcon: EpPropFinalized<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown, () => vue.DefineComponent<{}, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, boolean>;
  readonly nextText: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly nextIcon: EpPropFinalized<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown, () => vue.DefineComponent<{}, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, boolean>;
  readonly teleported: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly small: BooleanConstructor;
  readonly size: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly background: BooleanConstructor;
  readonly disabled: BooleanConstructor;
  readonly hideOnSinglePage: BooleanConstructor;
  readonly appendSizeTo: StringConstructor;
}>, () => VNode<vue.RendererNode, vue.RendererElement, {
  [key: string]: any;
}> | null, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  'update:current-page': (val: number) => boolean;
  'update:page-size': (val: number) => boolean;
  'size-change': (val: number) => boolean;
  change: (currentPage: number, pageSize: number) => boolean;
  'current-change': (val: number) => boolean;
  'prev-click': (val: number) => boolean;
  'next-click': (val: number) => boolean;
}, string, vue.PublicProps, Readonly<ExtractPropTypes<{
  readonly pageSize: NumberConstructor;
  readonly defaultPageSize: NumberConstructor;
  readonly total: NumberConstructor;
  readonly pageCount: NumberConstructor;
  readonly pagerCount: EpPropFinalized<NumberConstructor, unknown, unknown, 7, boolean>;
  readonly currentPage: NumberConstructor;
  readonly defaultCurrentPage: NumberConstructor;
  readonly layout: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
  readonly pageSizes: EpPropFinalized<(new (...args: any[]) => number[]) | (() => number[]) | (((new (...args: any[]) => number[]) | (() => number[])) | null)[], unknown, unknown, () => [10, 20, 30, 40, 50, 100], boolean>;
  readonly popperClass: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly popperStyle: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | CSSProperties) | (() => string | CSSProperties) | (((new (...args: any[]) => string | CSSProperties) | (() => string | CSSProperties)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly prevText: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly prevIcon: EpPropFinalized<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown, () => vue.DefineComponent<{}, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, boolean>;
  readonly nextText: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly nextIcon: EpPropFinalized<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown, () => vue.DefineComponent<{}, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, boolean>;
  readonly teleported: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly small: BooleanConstructor;
  readonly size: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly background: BooleanConstructor;
  readonly disabled: BooleanConstructor;
  readonly hideOnSinglePage: BooleanConstructor;
  readonly appendSizeTo: StringConstructor;
}>> & Readonly<{
  onChange?: ((currentPage: number, pageSize: number) => any) | undefined;
  "onUpdate:current-page"?: ((val: number) => any) | undefined;
  "onUpdate:page-size"?: ((val: number) => any) | undefined;
  "onSize-change"?: ((val: number) => any) | undefined;
  "onCurrent-change"?: ((val: number) => any) | undefined;
  "onPrev-click"?: ((val: number) => any) | undefined;
  "onNext-click"?: ((val: number) => any) | undefined;
}>, {
  readonly teleported: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly disabled: boolean;
  readonly small: boolean;
  readonly layout: string;
  readonly popperClass: string;
  readonly background: boolean;
  readonly pagerCount: number;
  readonly pageSizes: number[];
  readonly prevText: string;
  readonly prevIcon: EpPropMergeType<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown>;
  readonly nextText: string;
  readonly nextIcon: EpPropMergeType<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown>;
  readonly hideOnSinglePage: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { PaginationEmits, PaginationProps, PaginationPropsPublic, _default, paginationEmits, paginationProps };