import { EpPropFinalized, EpPropMergeType } from "../../../../utils/vue/props/types.js";
import "../../../../utils/index.js";
import { Placement as Placement$1 } from "../../../popper/index.js";
import * as vue from "vue";
import { Component, ExtractPropTypes, ExtractPublicPropTypes } from "vue";
import { Options } from "@popperjs/core";
import { Dayjs } from "dayjs";

//#region ../../packages/components/time-picker/src/common/props.d.ts
type SingleOrRange<T> = T | [T, T];
type DateModelType = number | string | Date;
type ModelValueType = DateModelType | number[] | string[] | Date[];
type DayOrDays = SingleOrRange<Dayjs>;
type DateOrDates = SingleOrRange<Date>;
type UserInput = SingleOrRange<string | null>;
type GetDisabledHours = (role: string, comparingDate?: Dayjs) => number[];
type GetDisabledMinutes = (hour: number, role: string, comparingDate?: Dayjs) => number[];
type GetDisabledSeconds = (hour: number, minute: number, role: string, comparingDate?: Dayjs) => number[];
declare const timePickerDefaultProps: {
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
  readonly placement: EpPropFinalized<(new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement$1) | (((new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement$1)) | null)[], Placement$1, unknown, "bottom", boolean>;
  readonly fallbackPlacements: EpPropFinalized<(new (...args: any[]) => Placement$1[]) | (() => Placement$1[]) | (((new (...args: any[]) => Placement$1[]) | (() => Placement$1[])) | null)[], unknown, unknown, readonly ["bottom", "top", "right", "left"], boolean>;
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
  readonly clearIcon: EpPropFinalized<(new (...args: any[]) => (string | Component) & {}) | (() => string | Component) | (((new (...args: any[]) => (string | Component) & {}) | (() => string | Component)) | null)[], unknown, unknown, vue.DefineComponent<{}, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, boolean>;
  readonly editable: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly saveOnBlur: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly prefixIcon: EpPropFinalized<(new (...args: any[]) => (string | Component) & {}) | (() => string | Component) | (((new (...args: any[]) => (string | Component) & {}) | (() => string | Component)) | null)[], unknown, unknown, "", boolean>;
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
};
type TimePickerDefaultProps = ExtractPropTypes<typeof timePickerDefaultProps>;
type TimePickerDefaultPropsPublic = ExtractPublicPropTypes<typeof timePickerDefaultProps>;
interface PickerOptions {
  isValidValue: (date: DayOrDays) => boolean;
  handleKeydownInput: (event: KeyboardEvent) => void;
  parseUserInput: (value: UserInput) => DayOrDays;
  getRangeAvailableTime: (date: DayOrDays) => DayOrDays;
  getDefaultValue: () => DayOrDays;
  panelReady: boolean;
  handleClear: () => void;
  handleFocusPicker?: () => void;
  handleCancel?: () => void;
}
declare const timePickerRangeTriggerProps: {
  readonly id: {
    readonly type: vue.PropType<string[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly name: {
    readonly type: vue.PropType<string[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly modelValue: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | [string | null, string | null]) | (() => UserInput) | (((new (...args: any[]) => string | [string | null, string | null]) | (() => UserInput)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly startPlaceholder: StringConstructor;
  readonly endPlaceholder: StringConstructor;
  readonly disabled: BooleanConstructor;
};
/**
 * @deprecated Use `timePickerRangeTriggerProps` instead. This will be removed in future versions.
 */
declare const timePickerRngeTriggerProps: {
  readonly id: {
    readonly type: vue.PropType<string[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly name: {
    readonly type: vue.PropType<string[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly modelValue: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | [string | null, string | null]) | (() => UserInput) | (((new (...args: any[]) => string | [string | null, string | null]) | (() => UserInput)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly startPlaceholder: StringConstructor;
  readonly endPlaceholder: StringConstructor;
  readonly disabled: BooleanConstructor;
};
//#endregion
export { DateModelType, DateOrDates, DayOrDays, GetDisabledHours, GetDisabledMinutes, GetDisabledSeconds, ModelValueType, PickerOptions, SingleOrRange, TimePickerDefaultProps, TimePickerDefaultPropsPublic, UserInput, timePickerDefaultProps, timePickerRangeTriggerProps, timePickerRngeTriggerProps };