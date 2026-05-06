import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { ComponentSize } from "../../../constants/size.js";
import "../../../utils/index.js";
import { UseEmptyValuesProps } from "../../../hooks/use-empty-values/index.js";
import { AriaProps } from "../../../hooks/use-aria/index.js";
import "../../../hooks/index.js";
import { ElTooltipContentProps } from "../../tooltip/src/content.js";
import "../../tooltip/index.js";
import { _default } from "./color-picker.vue.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";
import { ColorFormats } from "@ctrl/tinycolor";

//#region ../../packages/components/color-picker/src/color-picker.d.ts
interface ColorPickerProps extends UseEmptyValuesProps, Pick<AriaProps, 'ariaLabel'> {
  /**
   * @description when color-picker inactive and persistent is false, the color panel will be destroyed
   */
  persistent?: boolean;
  /**
   * @description binding value
   */
  modelValue?: string | null;
  /**
   * @description ColorPicker id
   */
  id?: string;
  /**
   * @description whether to display the alpha slider
   */
  showAlpha?: boolean;
  /**
   * @description color format of v-model
   */
  colorFormat?: ColorFormats;
  /**
   * @description whether to disable the ColorPicker
   */
  disabled?: boolean;
  /**
   * @description whether to show clear button
   */
  clearable?: boolean;
  /**
   * @description size of ColorPicker
   */
  size?: ComponentSize;
  /**
   * @description custom class name for ColorPicker's dropdown
   */
  popperClass?: ElTooltipContentProps['popperClass'];
  /**
   * @description custom style for ColorPicker's dropdown
   */
  popperStyle?: ElTooltipContentProps['popperStyle'];
  /**
   * @description ColorPicker tabindex
   */
  tabindex?: string | number;
  /**
   * @description whether color-picker popper is teleported to the body
   */
  teleported?: ElTooltipContentProps['teleported'];
  /**
   * @description which color-picker panel appends to
   */
  appendTo?: ElTooltipContentProps['appendTo'];
  /**
   * @description predefined color options
   */
  predefine?: string[];
  /**
   * @description whether to trigger form validation
   */
  validateEvent?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `ColorPickerProps` instead.
 */
declare const colorPickerProps: {
  readonly ariaLabel: StringConstructor;
  readonly emptyValues: ArrayConstructor;
  readonly valueOnClear: EpPropFinalized<(new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null) | (((new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null)) | null)[], unknown, unknown, undefined, boolean>;
  readonly persistent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly modelValue: EpPropFinalized<(new (...args: any[]) => string) | (() => string | null) | (((new (...args: any[]) => string) | (() => string | null)) | null)[], unknown, unknown, undefined, boolean>;
  readonly id: StringConstructor;
  readonly showAlpha: BooleanConstructor;
  readonly colorFormat: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => "name" | "rgb" | "prgb" | "hex" | "hex3" | "hex4" | "hex6" | "hex8" | "hsl" | "hsv" | "cmyk") | (() => ColorFormats) | (((new (...args: any[]) => "name" | "rgb" | "prgb" | "hex" | "hex3" | "hex4" | "hex6" | "hex8" | "hsl" | "hsv" | "cmyk") | (() => ColorFormats)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly disabled: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly clearable: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly size: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly popperClass: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | any)[])[])[])[])[])[])[])[])[])[])[]) | (((new (...args: any[]) => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | any)[])[])[])[])[])[])[])[])[])[])[])) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly popperStyle: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | false | vue.CSSProperties | vue.StyleValue[]) | (() => vue.StyleValue) | (((new (...args: any[]) => string | false | vue.CSSProperties | vue.StyleValue[]) | (() => vue.StyleValue)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly tabindex: EpPropFinalized<readonly [StringConstructor, NumberConstructor], unknown, unknown, 0, boolean>;
  readonly teleported: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly appendTo: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>) | (((new (...args: any[]) => string | HTMLElement) | (() => EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly predefine: {
    readonly type: vue.PropType<string[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly validateEvent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
};
declare const colorPickerEmits: {
  "update:modelValue": (val: string | null) => boolean;
  change: (val: string | null) => boolean;
  activeChange: (val: string | null) => boolean;
  focus: (evt: FocusEvent) => boolean;
  blur: (evt: FocusEvent) => boolean;
  clear: () => boolean;
};
/**
 * @deprecated Removed after 3.0.0, Use `ColorPickerProps` instead.
 */
type ColorPickerPropsPublic = ExtractPublicPropTypes<typeof colorPickerProps>;
type ColorPickerEmits = typeof colorPickerEmits;
type ColorPickerInstance = InstanceType<typeof _default> & unknown;
/**
 * @description default values for ColorPickerProps, used in components that extend ColorPickerProps
 */
declare const colorPickerPropsDefaults: {
  readonly persistent: true;
  readonly modelValue: undefined;
  readonly disabled: undefined;
  readonly clearable: true;
  readonly popperStyle: undefined;
  readonly tabindex: 0;
  readonly teleported: true;
  readonly validateEvent: true;
  readonly valueOnClear: undefined;
};
//#endregion
export { ColorPickerEmits, ColorPickerInstance, ColorPickerProps, ColorPickerPropsPublic, colorPickerEmits, colorPickerProps, colorPickerPropsDefaults };