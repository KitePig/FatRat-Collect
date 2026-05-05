import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { Arrayable } from "../../../utils/typescript.js";
import "../../../utils/index.js";
import * as vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes, StyleValue, VNode, VNodeChild } from "vue";
import * as csstype from "csstype";

//#region ../../packages/components/space/src/space.d.ts
declare const spaceProps: {
  readonly direction: EpPropFinalized<StringConstructor, "horizontal" | "vertical", unknown, "horizontal", boolean>;
  readonly class: EpPropFinalized<(new (...args: any[]) => string | Record<string, boolean> | (string | Record<string, boolean>)[]) | (() => Arrayable<string | Record<string, boolean>>) | (((new (...args: any[]) => string | Record<string, boolean> | (string | Record<string, boolean>)[]) | (() => Arrayable<string | Record<string, boolean>>)) | null)[], unknown, unknown, "", boolean>;
  readonly style: EpPropFinalized<(new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue) | (((new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue)) | null)[], unknown, unknown, "", boolean>;
  readonly alignment: EpPropFinalized<(new (...args: any[]) => string) | (() => csstype.Property.AlignItems | undefined) | (((new (...args: any[]) => string) | (() => csstype.Property.AlignItems | undefined)) | null)[], unknown, unknown, "center", boolean>;
  readonly prefixCls: {
    readonly type: vue.PropType<string>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly spacer: EpPropFinalized<(new (...args: any[]) => VNodeChild & {}) | (() => VNodeChild) | (((new (...args: any[]) => VNodeChild & {}) | (() => VNodeChild)) | null)[], unknown, string | number | VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
  }>, null, boolean>;
  readonly wrap: BooleanConstructor;
  readonly fill: BooleanConstructor;
  readonly fillRatio: EpPropFinalized<NumberConstructor, unknown, unknown, 100, boolean>;
  readonly size: {
    readonly type: vue.PropType<EpPropMergeType<readonly [StringConstructor, ArrayConstructor, NumberConstructor], "" | "default" | "small" | "large", number | [number, number]>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
type SpaceProps = ExtractPropTypes<typeof spaceProps>;
type SpacePropsPublic = ExtractPublicPropTypes<typeof spaceProps>;
declare const Space: vue.DefineComponent<ExtractPropTypes<{
  readonly direction: EpPropFinalized<StringConstructor, "horizontal" | "vertical", unknown, "horizontal", boolean>;
  readonly class: EpPropFinalized<(new (...args: any[]) => string | Record<string, boolean> | (string | Record<string, boolean>)[]) | (() => Arrayable<string | Record<string, boolean>>) | (((new (...args: any[]) => string | Record<string, boolean> | (string | Record<string, boolean>)[]) | (() => Arrayable<string | Record<string, boolean>>)) | null)[], unknown, unknown, "", boolean>;
  readonly style: EpPropFinalized<(new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue) | (((new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue)) | null)[], unknown, unknown, "", boolean>;
  readonly alignment: EpPropFinalized<(new (...args: any[]) => string) | (() => csstype.Property.AlignItems | undefined) | (((new (...args: any[]) => string) | (() => csstype.Property.AlignItems | undefined)) | null)[], unknown, unknown, "center", boolean>;
  readonly prefixCls: {
    readonly type: vue.PropType<string>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly spacer: EpPropFinalized<(new (...args: any[]) => VNodeChild & {}) | (() => VNodeChild) | (((new (...args: any[]) => VNodeChild & {}) | (() => VNodeChild)) | null)[], unknown, string | number | VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
  }>, null, boolean>;
  readonly wrap: BooleanConstructor;
  readonly fill: BooleanConstructor;
  readonly fillRatio: EpPropFinalized<NumberConstructor, unknown, unknown, 100, boolean>;
  readonly size: {
    readonly type: vue.PropType<EpPropMergeType<readonly [StringConstructor, ArrayConstructor, NumberConstructor], "" | "default" | "small" | "large", number | [number, number]>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>, () => string | VNode<vue.RendererNode, vue.RendererElement, {
  [key: string]: any;
}> | {
  [name: string]: unknown;
  $stable?: boolean;
} | null, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<ExtractPropTypes<{
  readonly direction: EpPropFinalized<StringConstructor, "horizontal" | "vertical", unknown, "horizontal", boolean>;
  readonly class: EpPropFinalized<(new (...args: any[]) => string | Record<string, boolean> | (string | Record<string, boolean>)[]) | (() => Arrayable<string | Record<string, boolean>>) | (((new (...args: any[]) => string | Record<string, boolean> | (string | Record<string, boolean>)[]) | (() => Arrayable<string | Record<string, boolean>>)) | null)[], unknown, unknown, "", boolean>;
  readonly style: EpPropFinalized<(new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue) | (((new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue)) | null)[], unknown, unknown, "", boolean>;
  readonly alignment: EpPropFinalized<(new (...args: any[]) => string) | (() => csstype.Property.AlignItems | undefined) | (((new (...args: any[]) => string) | (() => csstype.Property.AlignItems | undefined)) | null)[], unknown, unknown, "center", boolean>;
  readonly prefixCls: {
    readonly type: vue.PropType<string>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly spacer: EpPropFinalized<(new (...args: any[]) => VNodeChild & {}) | (() => VNodeChild) | (((new (...args: any[]) => VNodeChild & {}) | (() => VNodeChild)) | null)[], unknown, string | number | VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
  }>, null, boolean>;
  readonly wrap: BooleanConstructor;
  readonly fill: BooleanConstructor;
  readonly fillRatio: EpPropFinalized<NumberConstructor, unknown, unknown, 100, boolean>;
  readonly size: {
    readonly type: vue.PropType<EpPropMergeType<readonly [StringConstructor, ArrayConstructor, NumberConstructor], "" | "default" | "small" | "large", number | [number, number]>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>> & Readonly<{}>, {
  readonly fill: boolean;
  readonly style: StyleValue;
  readonly wrap: boolean;
  readonly direction: EpPropMergeType<StringConstructor, "horizontal" | "vertical", unknown>;
  readonly class: EpPropMergeType<(new (...args: any[]) => string | Record<string, boolean> | (string | Record<string, boolean>)[]) | (() => Arrayable<string | Record<string, boolean>>) | (((new (...args: any[]) => string | Record<string, boolean> | (string | Record<string, boolean>)[]) | (() => Arrayable<string | Record<string, boolean>>)) | null)[], unknown, unknown>;
  readonly alignment: EpPropMergeType<(new (...args: any[]) => string) | (() => csstype.Property.AlignItems | undefined) | (((new (...args: any[]) => string) | (() => csstype.Property.AlignItems | undefined)) | null)[], unknown, unknown>;
  readonly spacer: EpPropMergeType<(new (...args: any[]) => VNodeChild & {}) | (() => VNodeChild) | (((new (...args: any[]) => VNodeChild & {}) | (() => VNodeChild)) | null)[], unknown, string | number | VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
  }>>;
  readonly fillRatio: number;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
type SpaceInstance = InstanceType<typeof Space> & unknown;
//#endregion
export { Space, SpaceInstance, SpaceProps, SpacePropsPublic, spaceProps };