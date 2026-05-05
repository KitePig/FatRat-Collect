import * as vue from "vue";

//#region ../../packages/components/roving-focus-group/src/roving-focus-item.vue.d.ts
declare const _default: typeof __VLS_export;
declare const __VLS_export: vue.DefineComponent<vue.ExtractPropTypes<{
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
//#endregion
export { _default };