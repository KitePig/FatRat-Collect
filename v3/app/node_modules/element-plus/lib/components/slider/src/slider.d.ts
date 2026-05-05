import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { Arrayable } from "../../../utils/typescript.js";
import "../../../utils/index.js";
import { _default } from "./slider.vue.js";
import { SliderMarkerProps } from "./marker.js";
import * as vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes } from "vue";
import * as _popperjs_core0 from "@popperjs/core";

//#region ../../packages/components/slider/src/slider.d.ts
type SliderMarks = Record<number, string | SliderMarkerProps['mark']>;
interface SliderInitData {
  firstValue: number;
  secondValue: number;
  oldValue?: Arrayable<number>;
  dragging: boolean;
  sliderSize: number;
}
declare const sliderProps: {
  readonly ariaLabel: StringConstructor;
  readonly modelValue: EpPropFinalized<(new (...args: any[]) => number | number[]) | (() => Arrayable<number>) | (((new (...args: any[]) => number | number[]) | (() => Arrayable<number>)) | null)[], unknown, unknown, 0, boolean>;
  readonly id: EpPropFinalized<StringConstructor, unknown, unknown, undefined, boolean>;
  readonly min: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly max: EpPropFinalized<NumberConstructor, unknown, unknown, 100, boolean>;
  readonly step: EpPropFinalized<(new (...args: any[]) => number | "mark") | (() => number | "mark") | (((new (...args: any[]) => number | "mark") | (() => number | "mark")) | null)[], unknown, unknown, 1, boolean>;
  readonly showInput: BooleanConstructor;
  readonly showInputControls: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly size: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly inputSize: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly showStops: BooleanConstructor;
  readonly showTooltip: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly formatTooltip: EpPropFinalized<(new (...args: any[]) => (val: number) => number | string) | (() => (val: number) => number | string) | {
    (): (val: number) => number | string;
    new (): any;
    readonly prototype: any;
  } | (((new (...args: any[]) => (val: number) => number | string) | (() => (val: number) => number | string) | {
    (): (val: number) => number | string;
    new (): any;
    readonly prototype: any;
  }) | null)[], unknown, unknown, undefined, boolean>;
  readonly disabled: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly range: BooleanConstructor;
  readonly vertical: BooleanConstructor;
  readonly height: StringConstructor;
  readonly rangeStartLabel: EpPropFinalized<StringConstructor, unknown, unknown, undefined, boolean>;
  readonly rangeEndLabel: EpPropFinalized<StringConstructor, unknown, unknown, undefined, boolean>;
  readonly formatValueText: EpPropFinalized<(new (...args: any[]) => (val: number) => string) | (() => (val: number) => string) | {
    (): (val: number) => string;
    new (): any;
    readonly prototype: any;
  } | (((new (...args: any[]) => (val: number) => string) | (() => (val: number) => string) | {
    (): (val: number) => string;
    new (): any;
    readonly prototype: any;
  }) | null)[], unknown, unknown, undefined, boolean>;
  readonly tooltipClass: EpPropFinalized<StringConstructor, unknown, unknown, undefined, boolean>;
  readonly placement: EpPropFinalized<StringConstructor, _popperjs_core0.Placement, unknown, "top", boolean>;
  readonly marks: {
    readonly type: vue.PropType<SliderMarks>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly validateEvent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly persistent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
};
type SliderProps = ExtractPropTypes<typeof sliderProps>;
type SliderPropsPublic = ExtractPublicPropTypes<typeof sliderProps>;
declare const sliderEmits: {
  "update:modelValue": (value: Arrayable<number>) => value is number | number[];
  input: (value: Arrayable<number>) => value is number | number[];
  change: (value: Arrayable<number>) => value is number | number[];
};
type SliderEmits = typeof sliderEmits;
type SliderInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { SliderEmits, SliderInitData, SliderInstance, SliderProps, SliderPropsPublic, sliderEmits, sliderProps };