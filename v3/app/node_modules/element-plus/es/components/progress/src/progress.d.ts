import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { _default } from "./progress.vue.js";
import { ExtractPublicPropTypes, SVGAttributes } from "vue";

//#region ../../packages/components/progress/src/progress.d.ts
type ProgressColor = {
  color: string;
  percentage: number;
};
type ProgressFn = (percentage: number) => string;
interface ProgressProps {
  /**
   * @description type of progress bar
   */
  type?: 'line' | 'circle' | 'dashboard';
  /**
   * @description percentage, required
   */
  percentage?: number;
  /**
   * @description the current status of progress bar
   */
  status?: '' | 'success' | 'exception' | 'warning';
  /**
   * @description set indeterminate progress
   */
  indeterminate?: boolean;
  /**
   * @description control the animation duration of indeterminate progress or striped flow progress
   */
  duration?: number;
  /**
   * @description the width of progress bar
   */
  strokeWidth?: number;
  /**
   * @description butt/circle/dashboard type shape at the end path
   */
  strokeLinecap?: NonNullable<SVGAttributes['stroke-linecap']>;
  /**
   * @description whether to place the percentage inside progress bar, only works when `type` is 'line'
   */
  textInside?: boolean;
  /**
   * @description the canvas width of circle progress bar
   */
  width?: number;
  /**
   * @description whether to show percentage
   */
  showText?: boolean;
  /**
   * @description background color of progress bar. Overrides `status` prop
   */
  color?: string | ProgressColor[] | ProgressFn;
  /**
   * @description stripe over the progress bar's color
   */
  striped?: boolean;
  /**
   * @description get the stripes to flow
   */
  stripedFlow?: boolean;
  /**
   * @description custom text format
   */
  format?: ProgressFn;
}
/**
 * @deprecated Removed after 3.0.0, Use `ProgressProps` instead.
 */
declare const progressProps: {
  readonly type: EpPropFinalized<StringConstructor, "circle" | "line" | "dashboard", unknown, "line", boolean>;
  readonly percentage: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly status: EpPropFinalized<StringConstructor, "" | "success" | "warning" | "exception", unknown, "", boolean>;
  readonly indeterminate: BooleanConstructor;
  readonly duration: EpPropFinalized<NumberConstructor, unknown, unknown, 3, boolean>;
  readonly strokeWidth: EpPropFinalized<NumberConstructor, unknown, unknown, 6, boolean>;
  readonly strokeLinecap: EpPropFinalized<(new (...args: any[]) => "inherit" | "round" | "butt" | "square") | (() => NonNullable<"inherit" | "round" | "butt" | "square" | undefined>) | (((new (...args: any[]) => "inherit" | "round" | "butt" | "square") | (() => NonNullable<"inherit" | "round" | "butt" | "square" | undefined>)) | null)[], unknown, unknown, "round", boolean>;
  readonly textInside: BooleanConstructor;
  readonly width: EpPropFinalized<NumberConstructor, unknown, unknown, 126, boolean>;
  readonly showText: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly color: EpPropFinalized<(new (...args: any[]) => string | ProgressColor[] | ProgressFn) | (() => string | ProgressColor[] | ProgressFn) | (((new (...args: any[]) => string | ProgressColor[] | ProgressFn) | (() => string | ProgressColor[] | ProgressFn)) | null)[], unknown, unknown, "", boolean>;
  readonly striped: BooleanConstructor;
  readonly stripedFlow: BooleanConstructor;
  readonly format: EpPropFinalized<(new (...args: any[]) => ProgressFn) | (() => ProgressFn) | {
    (): ProgressFn;
    new (): any;
    readonly prototype: any;
  } | (((new (...args: any[]) => ProgressFn) | (() => ProgressFn) | {
    (): ProgressFn;
    new (): any;
    readonly prototype: any;
  }) | null)[], unknown, unknown, (percentage: number) => string, boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `ProgressProps` instead.
 */
type ProgressPropsPublic = ExtractPublicPropTypes<typeof progressProps>;
type ProgressInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { ProgressColor, ProgressFn, ProgressInstance, ProgressProps, ProgressPropsPublic, progressProps };