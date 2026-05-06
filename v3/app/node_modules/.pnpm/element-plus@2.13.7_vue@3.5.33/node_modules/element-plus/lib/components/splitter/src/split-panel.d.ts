import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { _default } from "./split-panel.vue.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/splitter/src/split-panel.d.ts
interface SplitterPanelProps {
  min?: string | number;
  max?: string | number;
  size?: string | number;
  resizable?: boolean;
  collapsible?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `SplitterPanelProps` instead.
 */
declare const splitterPanelProps: {
  readonly min: {
    readonly type: vue.PropType<EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly max: {
    readonly type: vue.PropType<EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly size: {
    readonly type: vue.PropType<EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly resizable: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly collapsible: BooleanConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `SplitterPanelProps` instead.
 */
type SplitterPanelPropsPublic = ExtractPublicPropTypes<typeof splitterPanelProps>;
type SplitterPanelInstance = InstanceType<typeof _default> & unknown;
declare const splitterPanelEmits: {
  'update:size': (value: number | string) => boolean;
};
type SplitterPanelEmits = typeof splitterPanelEmits;
//#endregion
export { SplitterPanelEmits, SplitterPanelInstance, SplitterPanelProps, SplitterPanelPropsPublic, splitterPanelEmits, splitterPanelProps };