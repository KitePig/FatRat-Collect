import { IconPropType } from "../../../utils/vue/icon.js";
import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { _default } from "./item.vue.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/steps/src/item.d.ts
interface StepProps {
  /**
   * @description step title
   */
  title?: string;
  /**
   * @description step custom icon. Icons can be passed via named slot as well
   */
  icon?: IconPropType;
  /**
   * @description step description
   * @default ''
   */
  description?: string;
  /**
   * @description current status. It will be automatically set by Steps if not configured.
   * @default ''
   */
  status?: '' | 'wait' | 'process' | 'finish' | 'error' | 'success';
}
/**
 * @deprecated Removed after 3.0.0, Use `StepProps` instead.
 */
declare const stepProps: {
  readonly title: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly icon: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly description: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly status: EpPropFinalized<StringConstructor, "" | "error" | "success" | "wait" | "finish" | "process", unknown, "", boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `StepProps` instead.
 */
type StepPropsPublic = ExtractPublicPropTypes<typeof stepProps>;
type StepInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { StepInstance, StepProps, StepPropsPublic, stepProps };