import { EpPropFinalized, ExtractPropType } from "../../utils/vue/props/types.js";
import "../../utils/index.js";
import * as vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes, Ref } from "vue";

//#region ../../packages/hooks/use-model-toggle/index.d.ts
declare const _prop: EpPropFinalized<(new (...args: any[]) => boolean) | (() => boolean | null) | (((new (...args: any[]) => boolean) | (() => boolean | null)) | null)[], never, never, null, false>;
declare const _event: {
  readonly type: vue.PropType<(val: boolean) => void>;
  readonly required: false;
  readonly validator: ((val: unknown) => boolean) | undefined;
  __epPropKey: true;
};
type UseModelTogglePropsRaw<T extends string> = { [K in T]: typeof _prop } & { [K in `onUpdate:${T}`]: typeof _event };
type UseModelTogglePropsGeneric<T extends string> = { [K in T]: ExtractPropType<typeof _prop> } & { [K in `onUpdate:${T}`]: ExtractPropType<typeof _event> };
declare const createModelToggleComposable: <T extends string>(name: T) => {
  useModelToggle: ({
    indicator,
    toggleReason,
    shouldHideWhenRouteChanges,
    shouldProceed,
    onShow,
    onHide
  }: ModelToggleParams) => {
    hide: (event?: Event) => void;
    show: (event?: Event) => void;
    toggle: () => void;
    hasUpdateHandler: vue.ComputedRef<boolean>;
  };
  useModelToggleProps: UseModelTogglePropsRaw<T>;
  useModelToggleEmits: `update:${T}`[];
};
declare const useModelToggle: ({
    indicator,
    toggleReason,
    shouldHideWhenRouteChanges,
    shouldProceed,
    onShow,
    onHide
  }: ModelToggleParams) => {
    hide: (event?: Event) => void;
    show: (event?: Event) => void;
    toggle: () => void;
    hasUpdateHandler: vue.ComputedRef<boolean>;
  }, useModelToggleProps: UseModelTogglePropsRaw<"modelValue">, useModelToggleEmits: "update:modelValue"[];
type UseModelToggleProps = ExtractPropTypes<typeof useModelToggleProps>;
type UseModelTogglePropsPublic = ExtractPublicPropTypes<typeof useModelToggleProps>;
type ModelToggleParams = {
  indicator: Ref<boolean>;
  toggleReason?: Ref<Event | undefined>;
  shouldHideWhenRouteChanges?: Ref<boolean>;
  shouldProceed?: () => boolean;
  onShow?: (event?: Event) => void;
  onHide?: (event?: Event) => void;
};
//#endregion
export { ModelToggleParams, UseModelToggleProps, UseModelTogglePropsGeneric, UseModelTogglePropsPublic, UseModelTogglePropsRaw, createModelToggleComposable, useModelToggle, useModelToggleEmits, useModelToggleProps };