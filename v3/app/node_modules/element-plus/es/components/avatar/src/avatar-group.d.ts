import { EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { PopperEffect } from "../../popper/src/popper.js";
import "../../../index.js";
import { Placement } from "../../popper/index.js";
import * as vue from "vue";
import * as vue_jsx_runtime0 from "vue/jsx-runtime";

//#region ../../packages/components/avatar/src/avatar-group.d.ts
declare const _default: vue.DefineComponent<vue.ExtractPropTypes<{
  readonly size: {
    readonly type: vue.PropType<number | "" | "default" | "small" | "large" | undefined>;
    readonly values: readonly ["", "default", "small", "large"];
    readonly validator: (val: unknown) => val is number;
  };
  readonly shape: {
    readonly type: vue.PropType<"square" | "circle" | undefined>;
    readonly values: readonly ["circle", "square"];
  };
  readonly collapseAvatars: BooleanConstructor;
  readonly collapseAvatarsTooltip: BooleanConstructor;
  readonly maxCollapseAvatars: {
    readonly type: NumberConstructor;
    readonly default: 1;
  };
  readonly effect: {
    readonly type: vue.PropType<PopperEffect>;
    readonly default: "light";
  };
  readonly placement: {
    readonly type: vue.PropType<Placement>;
    readonly values: Placement[];
    readonly default: "top";
  };
  readonly popperClass: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | any)[])[])[])[])[])[])[])[])[])[])[]) | (((new (...args: any[]) => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | any)[])[])[])[])[])[])[])[])[])[])[])) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly popperStyle: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | false | vue.CSSProperties | vue.StyleValue[]) | (() => vue.StyleValue) | (((new (...args: any[]) => string | false | vue.CSSProperties | vue.StyleValue[]) | (() => vue.StyleValue)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly collapseClass: StringConstructor;
  readonly collapseStyle: {
    readonly type: vue.PropType<vue.StyleValue>;
  };
}>, () => vue_jsx_runtime0.JSX.Element, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
  readonly size: {
    readonly type: vue.PropType<number | "" | "default" | "small" | "large" | undefined>;
    readonly values: readonly ["", "default", "small", "large"];
    readonly validator: (val: unknown) => val is number;
  };
  readonly shape: {
    readonly type: vue.PropType<"square" | "circle" | undefined>;
    readonly values: readonly ["circle", "square"];
  };
  readonly collapseAvatars: BooleanConstructor;
  readonly collapseAvatarsTooltip: BooleanConstructor;
  readonly maxCollapseAvatars: {
    readonly type: NumberConstructor;
    readonly default: 1;
  };
  readonly effect: {
    readonly type: vue.PropType<PopperEffect>;
    readonly default: "light";
  };
  readonly placement: {
    readonly type: vue.PropType<Placement>;
    readonly values: Placement[];
    readonly default: "top";
  };
  readonly popperClass: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | any)[])[])[])[])[])[])[])[])[])[])[]) | (((new (...args: any[]) => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | any)[])[])[])[])[])[])[])[])[])[])[]) | (() => string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | (string | {
      [x: string]: boolean;
    } | any)[])[])[])[])[])[])[])[])[])[])[])) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly popperStyle: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | false | vue.CSSProperties | vue.StyleValue[]) | (() => vue.StyleValue) | (((new (...args: any[]) => string | false | vue.CSSProperties | vue.StyleValue[]) | (() => vue.StyleValue)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly collapseClass: StringConstructor;
  readonly collapseStyle: {
    readonly type: vue.PropType<vue.StyleValue>;
  };
}>> & Readonly<{}>, {
  readonly effect: PopperEffect;
  readonly placement: Placement;
  readonly collapseAvatars: boolean;
  readonly collapseAvatarsTooltip: boolean;
  readonly maxCollapseAvatars: number;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { _default };