import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { Arrayable } from "../../../utils/typescript.js";
import "../../../utils/index.js";
import "../../../index.js";
import { Placement } from "../../popper/index.js";
import * as vue from "vue";

//#region ../../packages/components/slider/src/slider.vue.d.ts
declare const __VLS_export: vue.DefineComponent<vue.ExtractPropTypes<{
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
  readonly placement: EpPropFinalized<StringConstructor, Placement, unknown, "top", boolean>;
  readonly marks: {
    readonly type: vue.PropType<{
      [x: number]: EpPropMergeType<(new (...args: any[]) => string | {
        style: vue.CSSProperties;
        label: any;
      }) | (() => string | {
        style: vue.CSSProperties;
        label: any;
      }) | (((new (...args: any[]) => string | {
        style: vue.CSSProperties;
        label: any;
      }) | (() => string | {
        style: vue.CSSProperties;
        label: any;
      })) | null)[], unknown, unknown> | undefined;
    }>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly validateEvent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly persistent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
}>, {
  onSliderClick: (event: MouseEvent | TouchEvent) => void;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  change: (value: Arrayable<number>) => void;
  "update:modelValue": (value: Arrayable<number>) => void;
  input: (value: Arrayable<number>) => void;
}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
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
  readonly placement: EpPropFinalized<StringConstructor, Placement, unknown, "top", boolean>;
  readonly marks: {
    readonly type: vue.PropType<{
      [x: number]: EpPropMergeType<(new (...args: any[]) => string | {
        style: vue.CSSProperties;
        label: any;
      }) | (() => string | {
        style: vue.CSSProperties;
        label: any;
      }) | (((new (...args: any[]) => string | {
        style: vue.CSSProperties;
        label: any;
      }) | (() => string | {
        style: vue.CSSProperties;
        label: any;
      })) | null)[], unknown, unknown> | undefined;
    }>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly validateEvent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly persistent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
}>> & Readonly<{
  onChange?: ((value: Arrayable<number>) => any) | undefined;
  onInput?: ((value: Arrayable<number>) => any) | undefined;
  "onUpdate:modelValue"?: ((value: Arrayable<number>) => any) | undefined;
}>, {
  readonly id: string;
  readonly disabled: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly modelValue: EpPropMergeType<(new (...args: any[]) => number | number[]) | (() => Arrayable<number>) | (((new (...args: any[]) => number | number[]) | (() => Arrayable<number>)) | null)[], unknown, unknown>;
  readonly validateEvent: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly vertical: boolean;
  readonly range: boolean;
  readonly placement: EpPropMergeType<StringConstructor, Placement, unknown>;
  readonly persistent: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly max: number;
  readonly min: number;
  readonly step: EpPropMergeType<(new (...args: any[]) => number | "mark") | (() => number | "mark") | (((new (...args: any[]) => number | "mark") | (() => number | "mark")) | null)[], unknown, unknown>;
  readonly showInputControls: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly showTooltip: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly formatTooltip: (val: number) => number | string;
  readonly rangeStartLabel: string;
  readonly rangeEndLabel: string;
  readonly formatValueText: (val: number) => string;
  readonly tooltipClass: string;
  readonly showInput: boolean;
  readonly showStops: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
declare const _default: typeof __VLS_export;
//#endregion
export { _default };