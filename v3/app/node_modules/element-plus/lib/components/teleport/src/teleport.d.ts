import { EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { _default } from "./teleport.vue.js";
import * as vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/teleport/src/teleport.d.ts
declare const teleportProps: {
  readonly to: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly disabled: BooleanConstructor;
};
type TeleportProps = ExtractPropTypes<typeof teleportProps>;
type TeleportPropsPublic = ExtractPublicPropTypes<typeof teleportProps>;
type TeleportInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { TeleportInstance, TeleportProps, TeleportPropsPublic, teleportProps };