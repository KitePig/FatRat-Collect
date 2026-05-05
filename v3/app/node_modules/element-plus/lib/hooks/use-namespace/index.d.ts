import * as vue from "vue";
import { InjectionKey, Ref } from "vue";

//#region ../../packages/hooks/use-namespace/index.d.ts
declare const defaultNamespace = "el";
declare const namespaceContextKey: InjectionKey<Ref<string | undefined>>;
declare const useGetDerivedNamespace: (namespaceOverrides?: Ref<string | undefined>) => vue.ComputedRef<string>;
declare const useNamespace: (block: string, namespaceOverrides?: Ref<string | undefined>) => {
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
type UseNamespaceReturn = ReturnType<typeof useNamespace>;
//#endregion
export { UseNamespaceReturn, defaultNamespace, namespaceContextKey, useGetDerivedNamespace, useNamespace };