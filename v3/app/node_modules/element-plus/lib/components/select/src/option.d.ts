import { EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import * as vue from "vue";

//#region ../../packages/components/select/src/option.d.ts
declare const optionProps: {
  value: {
    readonly type: vue.PropType<EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown>>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  label: {
    readonly type: vue.PropType<EpPropMergeType<(NumberConstructor | StringConstructor)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  created: BooleanConstructor;
  disabled: BooleanConstructor;
};
//#endregion
export { optionProps };