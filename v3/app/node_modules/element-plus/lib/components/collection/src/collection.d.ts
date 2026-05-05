import { ElCollectionInjectionContext, ElCollectionItemInjectionContext } from "./tokens.js";
import * as vue from "vue";
import { InjectionKey, SetupContext } from "vue";

//#region ../../packages/components/collection/src/collection.d.ts
declare const COLLECTION_ITEM_SIGN = "data-el-collection-item";
declare const createCollectionWithScope: (name: string) => {
  COLLECTION_INJECTION_KEY: InjectionKey<ElCollectionInjectionContext>;
  COLLECTION_ITEM_INJECTION_KEY: InjectionKey<ElCollectionItemInjectionContext>;
  ElCollection: {
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
    setup(): void;
  };
  ElCollectionItem: {
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
    }: SetupContext): void;
  };
};
//#endregion
export { COLLECTION_ITEM_SIGN, createCollectionWithScope };