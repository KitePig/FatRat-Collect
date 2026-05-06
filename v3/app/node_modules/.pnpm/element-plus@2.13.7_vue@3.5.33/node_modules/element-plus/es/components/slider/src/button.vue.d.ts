import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import "../../../index.js";
import { Placement } from "../../popper/index.js";
import * as vue from "vue";

//#region ../../packages/components/slider/src/button.vue.d.ts
declare const __VLS_export: vue.DefineComponent<vue.ExtractPropTypes<{
  readonly modelValue: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly vertical: BooleanConstructor;
  readonly tooltipClass: StringConstructor;
  readonly placement: EpPropFinalized<StringConstructor, Placement, unknown, "top", boolean>;
}>, {
  onButtonDown: (event: MouseEvent | TouchEvent) => void;
  onKeyDown: (event: KeyboardEvent) => void;
  setPosition: (newPosition: number) => Promise<void>;
  hovering: vue.Ref<boolean, boolean>;
  dragging: vue.Ref<boolean, boolean>;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  "update:modelValue": (value: number) => void;
}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
  readonly modelValue: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly vertical: BooleanConstructor;
  readonly tooltipClass: StringConstructor;
  readonly placement: EpPropFinalized<StringConstructor, Placement, unknown, "top", boolean>;
}>> & Readonly<{
  "onUpdate:modelValue"?: ((value: number) => any) | undefined;
}>, {
  readonly modelValue: number;
  readonly vertical: boolean;
  readonly placement: EpPropMergeType<StringConstructor, Placement, unknown>;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
declare const _default: typeof __VLS_export;
//#endregion
export { _default };