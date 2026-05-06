import { LoadingOptions } from "./types.js";
import { LoadingInstance } from "./loading.js";
import { Directive, UnwrapRef } from "vue";

//#region ../../packages/components/loading/src/directive.d.ts
declare const INSTANCE_KEY: unique symbol;
type LoadingBinding = boolean | UnwrapRef<LoadingOptions>;
interface ElementLoading extends HTMLElement {
  [INSTANCE_KEY]?: {
    instance: LoadingInstance;
    options: LoadingOptions;
  };
}
declare const vLoading: Directive<ElementLoading, LoadingBinding>;
//#endregion
export { ElementLoading, LoadingBinding, vLoading };