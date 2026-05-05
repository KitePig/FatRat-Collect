import { EpPropFinalized, EpPropMergeType } from "../../../../utils/vue/props/types.js";
import "../../../../utils/index.js";
import { GetDisabledHours, GetDisabledMinutes, GetDisabledSeconds, ModelValueType, SingleOrRange } from "../../../time-picker/src/common/props.js";
import "../../../time-picker/index.js";
import { DatePickerType } from "../types.js";
import * as vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/date-picker-panel/src/props/date-picker-panel.d.ts
declare const datePickerPanelProps: {
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
};
type DatePickerPanelProps = ExtractPropTypes<typeof datePickerPanelProps>;
type DatePickerPanelPropsPublic = ExtractPublicPropTypes<typeof datePickerPanelProps>;
//#endregion
export { DatePickerPanelProps, DatePickerPanelPropsPublic, datePickerPanelProps };