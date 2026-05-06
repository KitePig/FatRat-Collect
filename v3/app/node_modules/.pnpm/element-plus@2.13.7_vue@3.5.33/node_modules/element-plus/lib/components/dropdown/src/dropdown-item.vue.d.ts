import { SFCWithInstall } from "../../../utils/vue/typescript.js";
import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { IconProps } from "../../icon/src/icon.js";
import "../../../index.js";
import * as vue from "vue";

//#region ../../packages/components/dropdown/src/dropdown-item.vue.d.ts
declare const _default: typeof __VLS_export;
declare const __VLS_export: vue.DefineComponent<vue.ExtractPropTypes<{
  readonly command: EpPropFinalized<readonly [ObjectConstructor, StringConstructor, NumberConstructor], unknown, unknown, () => {}, boolean>;
  readonly disabled: BooleanConstructor;
  readonly divided: BooleanConstructor;
  readonly textValue: StringConstructor;
  readonly icon: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>, {
  handleClick: (event: PointerEvent) => void;
  handlePointerMove: (event: PointerEvent) => void;
  handlePointerLeave: (event: PointerEvent) => void;
  propsAndAttrs: vue.ComputedRef<{
    disabled: boolean;
    command: EpPropMergeType<readonly [ObjectConstructor, StringConstructor, NumberConstructor], unknown, unknown>;
    divided: boolean;
    icon: EpPropMergeType<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown> | undefined;
    textValue: string | undefined;
    onClick: ((...args: any[]) => any) | undefined;
    onPointermove: ((...args: any[]) => any) | undefined;
    onPointerleave: ((...args: any[]) => any) | undefined;
  }>;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("click" | "pointerleave" | "pointermove")[], "click" | "pointerleave" | "pointermove", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
  readonly command: EpPropFinalized<readonly [ObjectConstructor, StringConstructor, NumberConstructor], unknown, unknown, () => {}, boolean>;
  readonly disabled: BooleanConstructor;
  readonly divided: BooleanConstructor;
  readonly textValue: StringConstructor;
  readonly icon: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>> & Readonly<{
  onClick?: ((...args: any[]) => any) | undefined;
  onPointermove?: ((...args: any[]) => any) | undefined;
  onPointerleave?: ((...args: any[]) => any) | undefined;
}>, {
  readonly disabled: boolean;
  readonly command: EpPropMergeType<readonly [ObjectConstructor, StringConstructor, NumberConstructor], unknown, unknown>;
  readonly divided: boolean;
}, {}, {
  ElRovingFocusItem: vue.DefineComponent<vue.ExtractPropTypes<{
    focusable: {
      type: BooleanConstructor;
      default: boolean;
    };
    active: BooleanConstructor;
  }>, {
    id: vue.Ref<string, string>;
    handleKeydown: (event: Event) => void;
    handleFocus: (event: Event) => void;
    handleMousedown: (event: Event) => void;
  }, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("focus" | "keydown" | "mousedown")[], "focus" | "keydown" | "mousedown", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    focusable: {
      type: BooleanConstructor;
      default: boolean;
    };
    active: BooleanConstructor;
  }>> & Readonly<{
    onFocus?: ((...args: any[]) => any) | undefined;
    onKeydown?: ((...args: any[]) => any) | undefined;
    onMousedown?: ((...args: any[]) => any) | undefined;
  }>, {
    active: boolean;
    focusable: boolean;
  }, {}, {
    ElRovingFocusCollectionItem: {
      new (...args: any[]): vue.CreateComponentPublicInstanceWithMixins<Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, vue.PublicProps, {}, true, {}, {}, vue.GlobalComponents, vue.GlobalDirectives, string, {}, any, vue.ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
      }, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, {}>;
      __isFragment?: never;
      __isTeleport?: never;
      __isSuspense?: never;
    } & vue.ComponentOptionsBase<Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, {}, {}, string, {}, vue.GlobalComponents, vue.GlobalDirectives, string, vue.ComponentProvideOptions> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & {
      name: string;
      setup(_: unknown, {
        attrs
      }: vue.SetupContext): void;
    };
  }, {}, string, vue.ComponentProvideOptions, true, {}, any>;
  ElDropdownItemImpl: vue.DefineComponent<vue.ExtractPropTypes<{
    readonly command: EpPropFinalized<readonly [ObjectConstructor, StringConstructor, NumberConstructor], unknown, unknown, () => {}, boolean>;
    readonly disabled: BooleanConstructor;
    readonly divided: BooleanConstructor;
    readonly textValue: StringConstructor;
    readonly icon: {
      readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown>>;
      readonly required: false;
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
    itemRef: (el: Element | vue.ComponentPublicInstance | null) => void;
    dataset: {
      "data-el-collection-item": string;
    };
    role: vue.ComputedRef<string>;
    tabIndex: vue.Ref<number, number>;
    handleFocus: (e: Event) => void;
    handleKeydown: (event: KeyboardEvent) => void;
    handleMousedown: (e: Event) => void;
  }, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("click" | "pointerleave" | "pointermove" | "clickimpl")[], "click" | "pointerleave" | "pointermove" | "clickimpl", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    readonly command: EpPropFinalized<readonly [ObjectConstructor, StringConstructor, NumberConstructor], unknown, unknown, () => {}, boolean>;
    readonly disabled: BooleanConstructor;
    readonly divided: BooleanConstructor;
    readonly textValue: StringConstructor;
    readonly icon: {
      readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown>>;
      readonly required: false;
      readonly validator: ((val: unknown) => boolean) | undefined;
      __epPropKey: true;
    };
  }>> & Readonly<{
    onClick?: ((...args: any[]) => any) | undefined;
    onPointermove?: ((...args: any[]) => any) | undefined;
    onPointerleave?: ((...args: any[]) => any) | undefined;
    onClickimpl?: ((...args: any[]) => any) | undefined;
  }>, {
    readonly disabled: boolean;
    readonly command: EpPropMergeType<readonly [ObjectConstructor, StringConstructor, NumberConstructor], unknown, unknown>;
    readonly divided: boolean;
  }, {}, {
    ElIcon: SFCWithInstall<{
      new (...args: any[]): vue.CreateComponentPublicInstanceWithMixins<Readonly<IconProps> & Readonly<{}>, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, vue.PublicProps, {}, false, {}, {}, vue.GlobalComponents, vue.GlobalDirectives, string, {}, any, vue.ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
      }, Readonly<IconProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
      __isFragment?: never;
      __isTeleport?: never;
      __isSuspense?: never;
    } & vue.ComponentOptionsBase<Readonly<IconProps> & Readonly<{}>, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, {}, {}, string, {}, vue.GlobalComponents, vue.GlobalDirectives, string, vue.ComponentProvideOptions> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new () => {
      $slots: {
        default?: (props: {}) => any;
      };
    })>;
  }, {}, string, vue.ComponentProvideOptions, true, {}, any>;
}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { _default };