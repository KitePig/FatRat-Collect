import { InjectionKey, Ref } from "vue";
import { MaybeRef } from "@vueuse/core";

//#region ../../packages/hooks/use-id/index.d.ts
type ElIdInjectionContext = {
  prefix: number;
  current: number;
};
declare const ID_INJECTION_KEY: InjectionKey<ElIdInjectionContext>;
declare const useIdInjection: () => ElIdInjectionContext;
declare const useId: (deterministicId?: MaybeRef<string>) => Ref<string>;
//#endregion
export { ElIdInjectionContext, ID_INJECTION_KEY, useId, useIdInjection };