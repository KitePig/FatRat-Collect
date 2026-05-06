import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { Color } from "./utils/color.js";
import { _default } from "./color-picker-panel.vue.js";
import * as vue from "vue";
import { ComputedRef, ExtractPublicPropTypes, InjectionKey, StyleValue } from "vue";
import { ColorFormats } from "@ctrl/tinycolor";

//#region ../../packages/components/color-picker-panel/src/color-picker-panel.d.ts
type ClassObjectType = Record<string, boolean>;
type ClassType = string | ClassObjectType | ClassType[];
interface ColorPickerPanelProps {
  /**
   * @description binding value
   */
  modelValue?: string | null;
  /**
   * @description whether the color picker is bordered
   */
  border?: boolean;
  /**
   * @description whether to display the alpha slider
   */
  showAlpha?: boolean;
  /**
   * @description color format of v-model
   */
  colorFormat?: ColorFormats;
  /**
   * @description whether to disable the color picker
   */
  disabled?: boolean;
  /**
   * @description predefined color options
   */
  predefine?: string[];
  /**
   * @description whether to trigger form validation
   */
  validateEvent?: boolean;
  /**
   * @description class names will be passed to hue-slider
   */
  hueSliderClass?: ClassType;
  /**
   * @description styles will be passed to hue-slider
   */
  hueSliderStyle?: StyleValue;
}
/**
 * @deprecated Removed after 3.0.0, Use `ColorPickerPanelProps` instead.
 */
declare const colorPickerPanelProps: {
  readonly modelValue: EpPropFinalized<(new (...args: any[]) => string) | (() => string | null) | (((new (...args: any[]) => string) | (() => string | null)) | null)[], unknown, unknown, undefined, boolean>;
  readonly border: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly showAlpha: BooleanConstructor;
  readonly colorFormat: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => "name" | "rgb" | "prgb" | "hex" | "hex3" | "hex4" | "hex6" | "hex8" | "hsl" | "hsv" | "cmyk") | (() => ColorFormats) | (((new (...args: any[]) => "name" | "rgb" | "prgb" | "hex" | "hex3" | "hex4" | "hex6" | "hex8" | "hsl" | "hsv" | "cmyk") | (() => ColorFormats)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly disabled: BooleanConstructor;
  readonly predefine: {
    readonly type: vue.PropType<string[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly validateEvent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly hueSliderClass: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | ClassObjectType | ClassType[]) | (() => ClassType) | (((new (...args: any[]) => string | ClassObjectType | ClassType[]) | (() => ClassType)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly hueSliderStyle: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue) | (((new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
declare const colorPickerPanelEmits: {
  "update:modelValue": (val: string | null) => boolean;
};
/**
 * @deprecated Removed after 3.0.0, Use `ColorPickerPanelProps` instead.
 */
type ColorPickerPanelPropsPublic = ExtractPublicPropTypes<typeof colorPickerPanelProps>;
type ColorPickerPanelEmits = typeof colorPickerPanelEmits;
type ColorPickerPanelInstance = InstanceType<typeof _default> & unknown;
interface ColorPickerPanelContext {
  currentColor: ComputedRef<string>;
}
interface CommonColorContext {
  color: Color;
}
declare const ROOT_COMMON_COLOR_INJECTION_KEY: InjectionKey<CommonColorContext>;
declare const colorPickerPanelContextKey: InjectionKey<ColorPickerPanelContext>;
//#endregion
export { ColorPickerPanelContext, ColorPickerPanelEmits, ColorPickerPanelInstance, ColorPickerPanelProps, ColorPickerPanelPropsPublic, CommonColorContext, ROOT_COMMON_COLOR_INJECTION_KEY, colorPickerPanelContextKey, colorPickerPanelEmits, colorPickerPanelProps };