import { InputInstance } from "../../input/src/instance.js";
import "../../input/index.js";
import { Color } from "./utils/color.js";
import { ColorPickerPanelProps } from "./color-picker-panel.js";
import * as vue from "vue";

//#region ../../packages/components/color-picker-panel/src/color-picker-panel.vue.d.ts
declare function update(): void;
declare var __VLS_38: {};
type __VLS_Slots = {} & {
  footer?: (props: typeof __VLS_38) => any;
};
declare const __VLS_base: vue.DefineComponent<ColorPickerPanelProps, {
  /**
   * @description current color object
   */
  color: Color;
  /**
   * @description custom input ref
   */
  inputRef: vue.Ref<InputInstance | undefined, InputInstance | undefined>;
  /**
   * @description update sub components
   */
  update: typeof update;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  "update:modelValue": (val: string | null) => void;
}, string, vue.PublicProps, Readonly<ColorPickerPanelProps> & Readonly<{
  "onUpdate:modelValue"?: ((val: string | null) => any) | undefined;
}>, {
  modelValue: string | null;
  validateEvent: boolean;
  border: boolean;
  showAlpha: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
type __VLS_WithSlots<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
export { _default };