import { IconPropType } from "../../../utils/vue/icon.js";
import "../../../utils/index.js";
import { InputAutoSize, InputModelModifiers, InputProps, InputType } from "./input.js";
import * as vue from "vue";
import { StyleValue } from "vue";

//#region ../../packages/components/input/src/input.vue.d.ts
declare var __VLS_1: {}, __VLS_3: {}, __VLS_16: {}, __VLS_53: {
    visible: boolean;
  }, __VLS_71: {};
type __VLS_Slots = {} & {
  prepend?: (props: typeof __VLS_1) => any;
} & {
  prefix?: (props: typeof __VLS_3) => any;
} & {
  suffix?: (props: typeof __VLS_16) => any;
} & {
  'password-icon'?: (props: typeof __VLS_53) => any;
} & {
  append?: (props: typeof __VLS_71) => any;
};
declare const __VLS_base: vue.DefineComponent<InputProps, {
  /** @description HTML input element */input: vue.ShallowRef<HTMLInputElement | undefined, HTMLInputElement | undefined>; /** @description HTML textarea element */
  textarea: vue.ShallowRef<HTMLTextAreaElement | undefined, HTMLTextAreaElement | undefined>; /** @description HTML element, input or textarea */
  ref: vue.ComputedRef<HTMLInputElement | HTMLTextAreaElement | undefined>; /** @description style of textarea. */
  textareaStyle: vue.ComputedRef<StyleValue>; /** @description from props (used on unit test) */
  autosize: vue.Ref<InputAutoSize | undefined, InputAutoSize | undefined>; /** @description is input composing */
  isComposing: vue.Ref<boolean, boolean>; /** @description whether the password is visible */
  passwordVisible: vue.Ref<boolean, boolean>; /** @description HTML input element native method */
  focus: () => void | undefined; /** @description HTML input element native method */
  blur: () => void | undefined; /** @description HTML input element native method */
  select: () => void; /** @description clear input value */
  clear: (evt?: MouseEvent) => void; /** @description resize textarea. */
  resizeTextarea: () => void;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  blur: (evt: FocusEvent) => void;
  change: (value: string, evt?: Event | undefined) => void;
  compositionend: (evt: CompositionEvent) => void;
  compositionstart: (evt: CompositionEvent) => void;
  compositionupdate: (evt: CompositionEvent) => void;
  focus: (evt: FocusEvent) => void;
  input: (value: string) => void;
  keydown: (evt: Event | KeyboardEvent) => void;
  mouseenter: (evt: MouseEvent) => void;
  mouseleave: (evt: MouseEvent) => void;
  "update:modelValue": (value: string) => void;
  clear: (evt: MouseEvent | undefined) => void;
}, string, vue.PublicProps, Readonly<InputProps> & Readonly<{
  onBlur?: ((evt: FocusEvent) => any) | undefined;
  onChange?: ((value: string, evt?: Event | undefined) => any) | undefined;
  onCompositionend?: ((evt: CompositionEvent) => any) | undefined;
  onCompositionstart?: ((evt: CompositionEvent) => any) | undefined;
  onCompositionupdate?: ((evt: CompositionEvent) => any) | undefined;
  onFocus?: ((evt: FocusEvent) => any) | undefined;
  onInput?: ((value: string) => any) | undefined;
  onKeydown?: ((evt: Event | KeyboardEvent) => any) | undefined;
  onMouseenter?: ((evt: MouseEvent) => any) | undefined;
  onMouseleave?: ((evt: MouseEvent) => any) | undefined;
  "onUpdate:modelValue"?: ((value: string) => any) | undefined;
  onClear?: ((evt: MouseEvent | undefined) => any) | undefined;
}>, {
  type: InputType;
  disabled: boolean;
  modelValue: string | number | null;
  modelModifiers: InputModelModifiers;
  autocomplete: string;
  clearIcon: IconPropType;
  wordLimitPosition: "inside" | "outside";
  tabindex: string | number;
  validateEvent: boolean;
  inputStyle: string | false | vue.CSSProperties | StyleValue[] | null;
  rows: number;
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