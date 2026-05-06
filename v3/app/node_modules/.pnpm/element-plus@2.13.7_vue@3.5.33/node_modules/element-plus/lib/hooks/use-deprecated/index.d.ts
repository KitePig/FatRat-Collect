import { MaybeRef } from "@vueuse/core";

//#region ../../packages/hooks/use-deprecated/index.d.ts
type DeprecationParam = {
  from: string;
  replacement: string;
  scope: string;
  version: string;
  ref: string;
  type?: 'API' | 'Attribute' | 'Event' | 'Slot';
};
declare const useDeprecated: ({
  from,
  replacement,
  scope,
  version,
  ref,
  type
}: DeprecationParam, condition: MaybeRef<boolean>) => void;
//#endregion
export { useDeprecated };