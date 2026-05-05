import { EpPropFinalized, EpPropMergeType } from "../../../../utils/vue/props/types.js";
import "../../../../utils/index.js";
import { DayOrDays, GetDisabledHours, GetDisabledMinutes, GetDisabledSeconds, ModelValueType, PickerOptions, SingleOrRange } from "./props.js";
import * as vue from "vue";
import * as _popperjs_core0 from "@popperjs/core";
import { Options } from "@popperjs/core";
import { Dayjs } from "dayjs";

//#region ../../packages/components/time-picker/src/common/picker.vue.d.ts
declare var __VLS_97: {}, __VLS_115: {
    visible: boolean;
    actualVisible: boolean;
    parsedValue: DayOrDays;
    format: string | undefined;
    dateFormat: string | undefined;
    timeFormat: string | undefined;
    unlinkPanels: boolean;
    type: string;
    defaultValue: EpPropMergeType<(new (...args: any[]) => Date | [Date, Date]) | (() => SingleOrRange<Date>) | (((new (...args: any[]) => Date | [Date, Date]) | (() => SingleOrRange<Date>)) | null)[], unknown, unknown> | undefined;
    showNow: EpPropMergeType<BooleanConstructor, unknown, unknown>;
    showConfirm: EpPropMergeType<BooleanConstructor, unknown, unknown>;
    showFooter: EpPropMergeType<BooleanConstructor, unknown, unknown>;
    showWeekNumber: boolean;
    onMousedown: () => void;
    onPanelChange: (value: [Dayjs, Dayjs], mode: "month" | "year", view: unknown) => void;
    onClear: (event?: MouseEvent) => void;
    onCalendarChange: (e: [Date, null | Date]) => void;
    onSetPickerOption: <T extends keyof PickerOptions>(e: [T, PickerOptions[T]]) => void;
    onSelectRange: (start: number, end: number, pos?: "min" | "max") => void;
    onPick: (date?: any, visible?: boolean) => void;
  };
type __VLS_Slots = {} & {
  'range-separator'?: (props: typeof __VLS_97) => any;
} & {
  default?: (props: typeof __VLS_115) => any;
};
declare const __VLS_base: vue.DefineComponent<vue.ExtractPropTypes<{
  readonly showNow: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly showConfirm: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly showFooter: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly showWeekNumber: BooleanConstructor;
  readonly ariaLabel: StringConstructor;
  readonly emptyValues: ArrayConstructor;
  readonly valueOnClear: EpPropFinalized<(new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null) | (((new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null)) | null)[], unknown, unknown, undefined, boolean>;
  readonly disabledDate: {
    readonly type: vue.PropType<Function>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly cellClassName: {
    readonly type: vue.PropType<Function>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly shortcuts: EpPropFinalized<ArrayConstructor, unknown, unknown, () => never[], boolean>;
  readonly arrowControl: BooleanConstructor;
  readonly tabindex: EpPropFinalized<(new (...args: any[]) => string | number) | (() => string | number) | (((new (...args: any[]) => string | number) | (() => string | number)) | null)[], unknown, unknown, 0, boolean>;
  readonly validateEvent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly unlinkPanels: BooleanConstructor;
  readonly placement: EpPropFinalized<(new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => _popperjs_core0.Placement) | (((new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => _popperjs_core0.Placement)) | null)[], _popperjs_core0.Placement, unknown, "bottom", boolean>;
  readonly fallbackPlacements: EpPropFinalized<(new (...args: any[]) => _popperjs_core0.Placement[]) | (() => _popperjs_core0.Placement[]) | (((new (...args: any[]) => _popperjs_core0.Placement[]) | (() => _popperjs_core0.Placement[])) | null)[], unknown, unknown, readonly ["bottom", "top", "right", "left"], boolean>;
  readonly disabledHours: {
    readonly type: vue.PropType<GetDisabledHours>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly disabledMinutes: {
    readonly type: vue.PropType<GetDisabledMinutes>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly disabledSeconds: {
    readonly type: vue.PropType<GetDisabledSeconds>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly automaticDropdown: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly id: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | [string, string]) | (() => SingleOrRange<string>) | (((new (...args: any[]) => string | [string, string]) | (() => SingleOrRange<string>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly name: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | [string, string]) | (() => SingleOrRange<string>) | (((new (...args: any[]) => string | [string, string]) | (() => SingleOrRange<string>)) | null)[], unknown, unknown>>;
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
  readonly format: StringConstructor;
  readonly valueFormat: StringConstructor;
  readonly dateFormat: StringConstructor;
  readonly timeFormat: StringConstructor;
  readonly type: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly clearable: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly clearIcon: EpPropFinalized<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown, vue.DefineComponent<{}, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, boolean>;
  readonly editable: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly saveOnBlur: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly prefixIcon: EpPropFinalized<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown, "", boolean>;
  readonly size: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly readonly: BooleanConstructor;
  readonly disabled: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly placeholder: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly popperOptions: EpPropFinalized<(new (...args: any[]) => Partial<Options>) | (() => Partial<Options>) | (((new (...args: any[]) => Partial<Options>) | (() => Partial<Options>)) | null)[], unknown, unknown, () => {}, boolean>;
  readonly modelValue: EpPropFinalized<(new (...args: any[]) => string | number | string[] | Date | number[] | Date[]) | (() => ModelValueType | null) | (((new (...args: any[]) => string | number | string[] | Date | number[] | Date[]) | (() => ModelValueType | null)) | null)[], unknown, unknown, "", boolean>;
  readonly rangeSeparator: EpPropFinalized<StringConstructor, unknown, unknown, "-", boolean>;
  readonly startPlaceholder: StringConstructor;
  readonly endPlaceholder: StringConstructor;
  readonly defaultValue: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => Date | [Date, Date]) | (() => SingleOrRange<Date>) | (((new (...args: any[]) => Date | [Date, Date]) | (() => SingleOrRange<Date>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly defaultTime: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => Date | [Date, Date]) | (() => SingleOrRange<Date>) | (((new (...args: any[]) => Date | [Date, Date]) | (() => SingleOrRange<Date>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly isRange: BooleanConstructor;
}>, {
  /**
   * @description focus input box.
   */
  focus: () => void;
  /**
   * @description blur input box.
   */
  blur: () => void;
  /**
   * @description opens picker
   */
  handleOpen: () => void;
  /**
   * @description closes picker
   */
  handleClose: () => void;
  /**
   * @description pick item manually
   */
  onPick: (date?: any, visible?: boolean) => void;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  blur: (...args: any[]) => void;
  change: (...args: any[]) => void;
  focus: (...args: any[]) => void;
  keydown: (...args: any[]) => void;
  "update:modelValue": (...args: any[]) => void;
  clear: (...args: any[]) => void;
  "calendar-change": (...args: any[]) => void;
  "panel-change": (...args: any[]) => void;
  "visible-change": (...args: any[]) => void;
}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
  readonly showNow: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly showConfirm: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly showFooter: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly showWeekNumber: BooleanConstructor;
  readonly ariaLabel: StringConstructor;
  readonly emptyValues: ArrayConstructor;
  readonly valueOnClear: EpPropFinalized<(new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null) | (((new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null)) | null)[], unknown, unknown, undefined, boolean>;
  readonly disabledDate: {
    readonly type: vue.PropType<Function>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly cellClassName: {
    readonly type: vue.PropType<Function>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly shortcuts: EpPropFinalized<ArrayConstructor, unknown, unknown, () => never[], boolean>;
  readonly arrowControl: BooleanConstructor;
  readonly tabindex: EpPropFinalized<(new (...args: any[]) => string | number) | (() => string | number) | (((new (...args: any[]) => string | number) | (() => string | number)) | null)[], unknown, unknown, 0, boolean>;
  readonly validateEvent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly unlinkPanels: BooleanConstructor;
  readonly placement: EpPropFinalized<(new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => _popperjs_core0.Placement) | (((new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => _popperjs_core0.Placement)) | null)[], _popperjs_core0.Placement, unknown, "bottom", boolean>;
  readonly fallbackPlacements: EpPropFinalized<(new (...args: any[]) => _popperjs_core0.Placement[]) | (() => _popperjs_core0.Placement[]) | (((new (...args: any[]) => _popperjs_core0.Placement[]) | (() => _popperjs_core0.Placement[])) | null)[], unknown, unknown, readonly ["bottom", "top", "right", "left"], boolean>;
  readonly disabledHours: {
    readonly type: vue.PropType<GetDisabledHours>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly disabledMinutes: {
    readonly type: vue.PropType<GetDisabledMinutes>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly disabledSeconds: {
    readonly type: vue.PropType<GetDisabledSeconds>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly automaticDropdown: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly id: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | [string, string]) | (() => SingleOrRange<string>) | (((new (...args: any[]) => string | [string, string]) | (() => SingleOrRange<string>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly name: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | [string, string]) | (() => SingleOrRange<string>) | (((new (...args: any[]) => string | [string, string]) | (() => SingleOrRange<string>)) | null)[], unknown, unknown>>;
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
  readonly format: StringConstructor;
  readonly valueFormat: StringConstructor;
  readonly dateFormat: StringConstructor;
  readonly timeFormat: StringConstructor;
  readonly type: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly clearable: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly clearIcon: EpPropFinalized<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown, vue.DefineComponent<{}, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, boolean>;
  readonly editable: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly saveOnBlur: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly prefixIcon: EpPropFinalized<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown, "", boolean>;
  readonly size: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly readonly: BooleanConstructor;
  readonly disabled: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly placeholder: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly popperOptions: EpPropFinalized<(new (...args: any[]) => Partial<Options>) | (() => Partial<Options>) | (((new (...args: any[]) => Partial<Options>) | (() => Partial<Options>)) | null)[], unknown, unknown, () => {}, boolean>;
  readonly modelValue: EpPropFinalized<(new (...args: any[]) => string | number | string[] | Date | number[] | Date[]) | (() => ModelValueType | null) | (((new (...args: any[]) => string | number | string[] | Date | number[] | Date[]) | (() => ModelValueType | null)) | null)[], unknown, unknown, "", boolean>;
  readonly rangeSeparator: EpPropFinalized<StringConstructor, unknown, unknown, "-", boolean>;
  readonly startPlaceholder: StringConstructor;
  readonly endPlaceholder: StringConstructor;
  readonly defaultValue: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => Date | [Date, Date]) | (() => SingleOrRange<Date>) | (((new (...args: any[]) => Date | [Date, Date]) | (() => SingleOrRange<Date>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly defaultTime: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => Date | [Date, Date]) | (() => SingleOrRange<Date>) | (((new (...args: any[]) => Date | [Date, Date]) | (() => SingleOrRange<Date>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly isRange: BooleanConstructor;
}>> & Readonly<{
  onBlur?: ((...args: any[]) => any) | undefined;
  onChange?: ((...args: any[]) => any) | undefined;
  onFocus?: ((...args: any[]) => any) | undefined;
  onKeydown?: ((...args: any[]) => any) | undefined;
  "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
  onClear?: ((...args: any[]) => any) | undefined;
  "onCalendar-change"?: ((...args: any[]) => any) | undefined;
  "onPanel-change"?: ((...args: any[]) => any) | undefined;
  "onVisible-change"?: ((...args: any[]) => any) | undefined;
}>, {
  readonly type: string;
  readonly disabled: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly modelValue: EpPropMergeType<(new (...args: any[]) => string | number | string[] | Date | number[] | Date[]) | (() => ModelValueType | null) | (((new (...args: any[]) => string | number | string[] | Date | number[] | Date[]) | (() => ModelValueType | null)) | null)[], unknown, unknown>;
  readonly placeholder: string;
  readonly readonly: boolean;
  readonly clearable: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly clearIcon: EpPropMergeType<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown>;
  readonly prefixIcon: EpPropMergeType<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown>;
  readonly tabindex: EpPropMergeType<(new (...args: any[]) => string | number) | (() => string | number) | (((new (...args: any[]) => string | number) | (() => string | number)) | null)[], unknown, unknown>;
  readonly validateEvent: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly fallbackPlacements: _popperjs_core0.Placement[];
  readonly placement: EpPropMergeType<(new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => _popperjs_core0.Placement) | (((new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => _popperjs_core0.Placement)) | null)[], _popperjs_core0.Placement, unknown>;
  readonly popperOptions: Partial<Options>;
  readonly valueOnClear: EpPropMergeType<(new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null) | (((new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null)) | null)[], unknown, unknown>;
  readonly automaticDropdown: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly editable: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly saveOnBlur: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly rangeSeparator: string;
  readonly shortcuts: unknown[];
  readonly showNow: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly showConfirm: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly showFooter: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly showWeekNumber: boolean;
  readonly arrowControl: boolean;
  readonly unlinkPanels: boolean;
  readonly isRange: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
type __VLS_WithSlots<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
export { _default };