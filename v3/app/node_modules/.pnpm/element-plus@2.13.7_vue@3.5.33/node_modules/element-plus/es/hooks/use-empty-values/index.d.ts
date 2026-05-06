import { EpPropFinalized } from "../../utils/vue/props/types.js";
import "../../utils/index.js";
import * as vue from "vue";
import { InjectionKey, Ref } from "vue";

//#region ../../packages/hooks/use-empty-values/index.d.ts
type ValueOnClear = string | number | boolean | Function | null;
interface UseEmptyValuesProps {
  /**
   * @description empty values supported by the component
   */
  emptyValues?: unknown[];
  /**
   * @description return value when cleared, if you want to set `undefined`, use `() => undefined`
   */
  valueOnClear?: ValueOnClear;
}
declare const emptyValuesContextKey: InjectionKey<Ref<UseEmptyValuesProps>>;
declare const SCOPE = "use-empty-values";
declare const DEFAULT_EMPTY_VALUES: (string | null | undefined)[];
declare const DEFAULT_VALUE_ON_CLEAR: undefined;
/**
 * @deprecated Removed after 3.0.0, Use `UseEmptyValuesProps` instead.
 */
declare const useEmptyValuesProps: {
  readonly emptyValues: ArrayConstructor;
  readonly valueOnClear: EpPropFinalized<(new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null) | (((new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null)) | null)[], unknown, unknown, undefined, boolean>;
};
declare const useEmptyValues: (props: UseEmptyValuesProps, defaultValue?: null | undefined) => {
  emptyValues: vue.ComputedRef<unknown[]>;
  valueOnClear: vue.ComputedRef<any>;
  isEmptyValue: (value: unknown) => boolean;
};
//#endregion
export { DEFAULT_EMPTY_VALUES, DEFAULT_VALUE_ON_CLEAR, SCOPE, UseEmptyValuesProps, emptyValuesContextKey, useEmptyValues, useEmptyValuesProps };