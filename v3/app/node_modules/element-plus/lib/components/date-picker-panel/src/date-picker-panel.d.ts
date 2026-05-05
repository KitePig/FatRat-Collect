import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { GetDisabledHours, GetDisabledMinutes, GetDisabledSeconds, ModelValueType, SingleOrRange } from "../../time-picker/src/common/props.js";
import "../../time-picker/index.js";
import { DatePickerType } from "./types.js";
import "../../../index.js";
import * as vue from "vue";
import * as vue_jsx_runtime0 from "vue/jsx-runtime";

//#region ../../packages/components/date-picker-panel/src/date-picker-panel.d.ts
declare const _default: vue.DefineComponent<vue.ExtractPropTypes<{
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
  readonly unlinkPanels: BooleanConstructor;
  readonly showNow: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly showConfirm: BooleanConstructor;
  readonly showFooter: BooleanConstructor;
  readonly showWeekNumber: BooleanConstructor;
  readonly type: EpPropFinalized<(new (...args: any[]) => "year" | "months" | "years" | "month" | "date" | "dates" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange") | (() => DatePickerType) | (((new (...args: any[]) => "year" | "months" | "years" | "month" | "date" | "dates" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange") | (() => DatePickerType)) | null)[], unknown, unknown, "date", boolean>;
  readonly clearable: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly border: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly editable: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
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
  readonly valueFormat: StringConstructor;
  readonly dateFormat: StringConstructor;
  readonly timeFormat: StringConstructor;
  readonly disabled: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly modelValue: EpPropFinalized<(new (...args: any[]) => string | number | string[] | Date | number[] | Date[]) | (() => ModelValueType) | (((new (...args: any[]) => string | number | string[] | Date | number[] | Date[]) | (() => ModelValueType)) | null)[], unknown, unknown, "", boolean>;
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
}>, () => vue_jsx_runtime0.JSX.Element, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("update:modelValue" | "clear" | "calendar-change" | "panel-change" | "visible-change")[], "update:modelValue" | "clear" | "calendar-change" | "panel-change" | "visible-change", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
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
  readonly unlinkPanels: BooleanConstructor;
  readonly showNow: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly showConfirm: BooleanConstructor;
  readonly showFooter: BooleanConstructor;
  readonly showWeekNumber: BooleanConstructor;
  readonly type: EpPropFinalized<(new (...args: any[]) => "year" | "months" | "years" | "month" | "date" | "dates" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange") | (() => DatePickerType) | (((new (...args: any[]) => "year" | "months" | "years" | "month" | "date" | "dates" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange") | (() => DatePickerType)) | null)[], unknown, unknown, "date", boolean>;
  readonly clearable: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly border: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly editable: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
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
  readonly valueFormat: StringConstructor;
  readonly dateFormat: StringConstructor;
  readonly timeFormat: StringConstructor;
  readonly disabled: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly modelValue: EpPropFinalized<(new (...args: any[]) => string | number | string[] | Date | number[] | Date[]) | (() => ModelValueType) | (((new (...args: any[]) => string | number | string[] | Date | number[] | Date[]) | (() => ModelValueType)) | null)[], unknown, unknown, "", boolean>;
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
  "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
  onClear?: ((...args: any[]) => any) | undefined;
  "onCalendar-change"?: ((...args: any[]) => any) | undefined;
  "onPanel-change"?: ((...args: any[]) => any) | undefined;
  "onVisible-change"?: ((...args: any[]) => any) | undefined;
}>, {
  readonly type: EpPropMergeType<(new (...args: any[]) => "year" | "months" | "years" | "month" | "date" | "dates" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange") | (() => DatePickerType) | (((new (...args: any[]) => "year" | "months" | "years" | "month" | "date" | "dates" | "week" | "datetime" | "datetimerange" | "daterange" | "monthrange" | "yearrange") | (() => DatePickerType)) | null)[], unknown, unknown>;
  readonly disabled: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly modelValue: EpPropMergeType<(new (...args: any[]) => string | number | string[] | Date | number[] | Date[]) | (() => ModelValueType) | (((new (...args: any[]) => string | number | string[] | Date | number[] | Date[]) | (() => ModelValueType)) | null)[], unknown, unknown>;
  readonly clearable: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly border: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly editable: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly shortcuts: unknown[];
  readonly showNow: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly showConfirm: boolean;
  readonly showFooter: boolean;
  readonly showWeekNumber: boolean;
  readonly arrowControl: boolean;
  readonly unlinkPanels: boolean;
  readonly isRange: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { _default };