import { EpPropFinalized, EpPropMergeType } from "../../../../utils/vue/props/types.js";
import "../../../../utils/index.js";
import * as vue from "vue";
import dayjs from "dayjs";

//#region ../../packages/components/time-picker/src/time-picker-com/panel-time-pick.vue.d.ts
declare const __VLS_export: vue.DefineComponent<vue.ExtractPropTypes<{
  readonly datetimeRole: StringConstructor;
  readonly parsedValue: {
    readonly type: vue.PropType<dayjs.Dayjs>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly visible: BooleanConstructor;
  readonly actualVisible: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly format: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
}>, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  pick: (...args: any[]) => void;
  "select-range": (...args: any[]) => void;
  "set-picker-option": (...args: any[]) => void;
}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
  readonly datetimeRole: StringConstructor;
  readonly parsedValue: {
    readonly type: vue.PropType<dayjs.Dayjs>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly visible: BooleanConstructor;
  readonly actualVisible: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly format: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
}>> & Readonly<{
  onPick?: ((...args: any[]) => any) | undefined;
  "onSelect-range"?: ((...args: any[]) => any) | undefined;
  "onSet-picker-option"?: ((...args: any[]) => any) | undefined;
}>, {
  readonly visible: boolean;
  readonly format: string;
  readonly actualVisible: EpPropMergeType<BooleanConstructor, unknown, unknown>;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
declare const _default: typeof __VLS_export;
//#endregion
export { _default };