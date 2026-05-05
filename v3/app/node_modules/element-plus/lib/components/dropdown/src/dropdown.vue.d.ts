import { IconPropType } from "../../../utils/vue/icon.js";
import { SFCWithInstall } from "../../../utils/vue/typescript.js";
import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { ComponentSize } from "../../../constants/size.js";
import { Arrayable } from "../../../utils/typescript.js";
import "../../../utils/index.js";
import { PopperEffect, PopperInstance, roleTypes } from "../../popper/src/popper.js";
import { Measurable } from "../../popper/src/constants.js";
import { ButtonNativeType, ButtonProps, ButtonType } from "../../button/src/button.js";
import { ButtonGroupProps } from "../../button/src/button-group.js";
import { _default as _default$1 } from "../../button/src/button-group.vue.js";
import "../../button/index.js";
import { Translator } from "../../../hooks/use-locale/index.js";
import "../../../hooks/index.js";
import { TooltipTriggerType } from "../../tooltip/src/trigger.js";
import { TooltipContentInstance } from "../../tooltip/src/content.js";
import { TooltipInstance, UseTooltipProps } from "../../tooltip/src/tooltip.js";
import "../../tooltip/index.js";
import { ScrollbarDirection, ScrollbarProps } from "../../scrollbar/src/scrollbar.js";
import "../../scrollbar/index.js";
import { IconProps } from "../../icon/src/icon.js";
import "../../icon/index.js";
import "../../../index.js";
import { Options, Placement } from "../../popper/index.js";
import * as vue from "vue";
import { CSSProperties } from "vue";

//#region ../../packages/components/dropdown/src/dropdown.vue.d.ts
declare const _default: typeof __VLS_export;
declare const __VLS_export: vue.DefineComponent<vue.ExtractPropTypes<{
  readonly trigger: {
    readonly type: vue.PropType<Arrayable<"click" | "contextmenu" | "hover">>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    readonly __epPropKey: true;
    readonly default: "hover";
  };
  readonly triggerKeys: EpPropFinalized<(new (...args: any[]) => string[]) | (() => string[]) | (((new (...args: any[]) => string[]) | (() => string[])) | null)[], unknown, unknown, () => string[], boolean>;
  readonly virtualTriggering: BooleanConstructor;
  readonly virtualRef: {
    readonly type: vue.PropType<Measurable>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly effect: {
    readonly default: "light";
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string) | (() => PopperEffect) | (((new (...args: any[]) => string) | (() => PopperEffect)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    readonly __epPropKey: true;
  };
  readonly type: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => "" | "default" | "info" | "primary" | "success" | "warning" | "text" | "danger") | (() => "" | "default" | "info" | "primary" | "success" | "warning" | "text" | "danger") | (((new (...args: any[]) => "" | "default" | "info" | "primary" | "success" | "warning" | "text" | "danger") | (() => "" | "default" | "info" | "primary" | "success" | "warning" | "text" | "danger")) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly placement: EpPropFinalized<(new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement) | (((new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement)) | null)[], unknown, unknown, "bottom", boolean>;
  readonly popperOptions: EpPropFinalized<(new (...args: any[]) => Partial<Options>) | (() => Partial<Options>) | (((new (...args: any[]) => Partial<Options>) | (() => Partial<Options>)) | null)[], unknown, unknown, () => {}, boolean>;
  readonly id: StringConstructor;
  readonly size: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly splitButton: BooleanConstructor;
  readonly hideOnClick: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly loop: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly showArrow: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly showTimeout: EpPropFinalized<NumberConstructor, unknown, unknown, 150, boolean>;
  readonly hideTimeout: EpPropFinalized<NumberConstructor, unknown, unknown, 150, boolean>;
  readonly tabindex: EpPropFinalized<(new (...args: any[]) => string | number) | (() => string | number) | (((new (...args: any[]) => string | number) | (() => string | number)) | null)[], unknown, unknown, 0, boolean>;
  readonly maxHeight: EpPropFinalized<(new (...args: any[]) => string | number) | (() => string | number) | (((new (...args: any[]) => string | number) | (() => string | number)) | null)[], unknown, unknown, "", boolean>;
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
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | false | CSSProperties | vue.StyleValue[]) | (() => vue.StyleValue) | (((new (...args: any[]) => string | false | CSSProperties | vue.StyleValue[]) | (() => vue.StyleValue)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly disabled: BooleanConstructor;
  readonly role: EpPropFinalized<StringConstructor, "listbox" | "grid" | "menu" | "tooltip" | "dialog" | "group" | "navigation" | "tree", unknown, "menu", boolean>;
  readonly buttonProps: {
    readonly type: vue.PropType<Partial<ButtonProps>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly teleported: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly appendTo: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>) | (((new (...args: any[]) => string | HTMLElement) | (() => EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly persistent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
}>, {
  t: Translator;
  ns: {
    namespace: vue.ComputedRef<string>;
    b: (blockSuffix?: string) => string;
    e: (element?: string) => string;
    m: (modifier?: string) => string;
    be: (blockSuffix?: string, element?: string) => string;
    em: (element?: string, modifier?: string) => string;
    bm: (blockSuffix?: string, modifier?: string) => string;
    bem: (blockSuffix?: string, element?: string, modifier?: string) => string;
    is: {
      (name: string, state: boolean | undefined): string;
      (name: string): string;
    };
    cssVar: (object: Record<string, string>) => Record<string, string>;
    cssVarName: (name: string) => string;
    cssVarBlock: (object: Record<string, string>) => Record<string, string>;
    cssVarBlockName: (name: string) => string;
  };
  scrollbar: vue.Ref<null, null>;
  wrapStyle: vue.ComputedRef<CSSProperties>;
  dropdownTriggerKls: vue.ComputedRef<string[]>;
  dropdownSize: vue.ComputedRef<"" | "default" | "small" | "large">;
  triggerId: vue.ComputedRef<string>;
  currentTabId: vue.Ref<string | null, string | null>;
  handleCurrentTabIdChange: (id: string) => void;
  handlerMainButtonClick: (event: MouseEvent) => void;
  handleClose: () => void;
  handleOpen: () => void;
  handleBeforeShowTooltip: () => void;
  handleShowTooltip: (event?: Event) => void;
  handleBeforeHideTooltip: () => void;
  popperRef: vue.Ref<TooltipInstance | undefined, TooltipInstance | undefined>;
  contentRef: vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  triggeringElementRef: vue.Ref<any, any>;
  referenceElementRef: vue.Ref<any, any>;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("click" | "visible-change" | "command")[], "click" | "visible-change" | "command", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
  readonly trigger: {
    readonly type: vue.PropType<Arrayable<"click" | "contextmenu" | "hover">>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    readonly __epPropKey: true;
    readonly default: "hover";
  };
  readonly triggerKeys: EpPropFinalized<(new (...args: any[]) => string[]) | (() => string[]) | (((new (...args: any[]) => string[]) | (() => string[])) | null)[], unknown, unknown, () => string[], boolean>;
  readonly virtualTriggering: BooleanConstructor;
  readonly virtualRef: {
    readonly type: vue.PropType<Measurable>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly effect: {
    readonly default: "light";
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string) | (() => PopperEffect) | (((new (...args: any[]) => string) | (() => PopperEffect)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    readonly __epPropKey: true;
  };
  readonly type: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => "" | "default" | "info" | "primary" | "success" | "warning" | "text" | "danger") | (() => "" | "default" | "info" | "primary" | "success" | "warning" | "text" | "danger") | (((new (...args: any[]) => "" | "default" | "info" | "primary" | "success" | "warning" | "text" | "danger") | (() => "" | "default" | "info" | "primary" | "success" | "warning" | "text" | "danger")) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly placement: EpPropFinalized<(new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement) | (((new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement)) | null)[], unknown, unknown, "bottom", boolean>;
  readonly popperOptions: EpPropFinalized<(new (...args: any[]) => Partial<Options>) | (() => Partial<Options>) | (((new (...args: any[]) => Partial<Options>) | (() => Partial<Options>)) | null)[], unknown, unknown, () => {}, boolean>;
  readonly id: StringConstructor;
  readonly size: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly splitButton: BooleanConstructor;
  readonly hideOnClick: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly loop: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly showArrow: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly showTimeout: EpPropFinalized<NumberConstructor, unknown, unknown, 150, boolean>;
  readonly hideTimeout: EpPropFinalized<NumberConstructor, unknown, unknown, 150, boolean>;
  readonly tabindex: EpPropFinalized<(new (...args: any[]) => string | number) | (() => string | number) | (((new (...args: any[]) => string | number) | (() => string | number)) | null)[], unknown, unknown, 0, boolean>;
  readonly maxHeight: EpPropFinalized<(new (...args: any[]) => string | number) | (() => string | number) | (((new (...args: any[]) => string | number) | (() => string | number)) | null)[], unknown, unknown, "", boolean>;
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
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | false | CSSProperties | vue.StyleValue[]) | (() => vue.StyleValue) | (((new (...args: any[]) => string | false | CSSProperties | vue.StyleValue[]) | (() => vue.StyleValue)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly disabled: BooleanConstructor;
  readonly role: EpPropFinalized<StringConstructor, "listbox" | "grid" | "menu" | "tooltip" | "dialog" | "group" | "navigation" | "tree", unknown, "menu", boolean>;
  readonly buttonProps: {
    readonly type: vue.PropType<Partial<ButtonProps>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly teleported: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly appendTo: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>) | (((new (...args: any[]) => string | HTMLElement) | (() => EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly persistent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
}>> & Readonly<{
  onClick?: ((...args: any[]) => any) | undefined;
  "onVisible-change"?: ((...args: any[]) => any) | undefined;
  onCommand?: ((...args: any[]) => any) | undefined;
}>, {
  readonly teleported: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly effect: EpPropMergeType<(new (...args: any[]) => string) | (() => PopperEffect) | (((new (...args: any[]) => string) | (() => PopperEffect)) | null)[], unknown, unknown>;
  readonly size: string;
  readonly disabled: boolean;
  readonly tabindex: EpPropMergeType<(new (...args: any[]) => string | number) | (() => string | number) | (((new (...args: any[]) => string | number) | (() => string | number)) | null)[], unknown, unknown>;
  readonly virtualTriggering: boolean;
  readonly loop: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly placement: EpPropMergeType<(new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement) | (((new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement)) | null)[], unknown, unknown>;
  readonly popperOptions: Partial<Options>;
  readonly showArrow: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly role: EpPropMergeType<StringConstructor, "listbox" | "grid" | "menu" | "tooltip" | "dialog" | "group" | "navigation" | "tree", unknown>;
  readonly persistent: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly trigger: Arrayable<"click" | "contextmenu" | "hover">;
  readonly triggerKeys: string[];
  readonly maxHeight: EpPropMergeType<(new (...args: any[]) => string | number) | (() => string | number) | (((new (...args: any[]) => string | number) | (() => string | number)) | null)[], unknown, unknown>;
  readonly hideOnClick: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly showTimeout: number;
  readonly hideTimeout: number;
  readonly splitButton: boolean;
}, {}, {
  ElButton: {
    new (...args: any[]): vue.CreateComponentPublicInstanceWithMixins<Readonly<ButtonProps> & Readonly<{
      onClick?: ((evt: MouseEvent) => any) | undefined;
    }>, {
      ref: vue.Ref<HTMLButtonElement | undefined, HTMLButtonElement | undefined>;
      size: vue.ComputedRef<"" | "default" | "small" | "large">;
      type: vue.ComputedRef<"default" | "" | "info" | "primary" | "success" | "warning" | "text" | "danger">;
      disabled: vue.ComputedRef<boolean>;
      shouldAddSpace: vue.ComputedRef<boolean>;
    }, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
      click: (evt: MouseEvent) => void;
    }, vue.PublicProps, {
      type: ButtonType;
      text: boolean;
      disabled: boolean;
      round: boolean;
      dashed: boolean;
      nativeType: ButtonNativeType;
      loadingIcon: IconPropType;
      plain: boolean;
      autoInsertSpace: boolean;
      tag: string | vue.Component;
    }, false, {}, {}, vue.GlobalComponents, vue.GlobalDirectives, string, {}, any, vue.ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<ButtonProps> & Readonly<{
      onClick?: ((evt: MouseEvent) => any) | undefined;
    }>, {
      ref: vue.Ref<HTMLButtonElement | undefined, HTMLButtonElement | undefined>;
      size: vue.ComputedRef<"" | "default" | "small" | "large">;
      type: vue.ComputedRef<"default" | "" | "info" | "primary" | "success" | "warning" | "text" | "danger">;
      disabled: vue.ComputedRef<boolean>;
      shouldAddSpace: vue.ComputedRef<boolean>;
    }, {}, {}, {}, {
      type: ButtonType;
      text: boolean;
      disabled: boolean;
      round: boolean;
      dashed: boolean;
      nativeType: ButtonNativeType;
      loadingIcon: IconPropType;
      plain: boolean;
      autoInsertSpace: boolean;
      tag: string | vue.Component;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & vue.ComponentOptionsBase<Readonly<ButtonProps> & Readonly<{
    onClick?: ((evt: MouseEvent) => any) | undefined;
  }>, {
    ref: vue.Ref<HTMLButtonElement | undefined, HTMLButtonElement | undefined>;
    size: vue.ComputedRef<"" | "default" | "small" | "large">;
    type: vue.ComputedRef<"default" | "" | "info" | "primary" | "success" | "warning" | "text" | "danger">;
    disabled: vue.ComputedRef<boolean>;
    shouldAddSpace: vue.ComputedRef<boolean>;
  }, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    click: (evt: MouseEvent) => void;
  }, string, {
    type: ButtonType;
    text: boolean;
    disabled: boolean;
    round: boolean;
    dashed: boolean;
    nativeType: ButtonNativeType;
    loadingIcon: IconPropType;
    plain: boolean;
    autoInsertSpace: boolean;
    tag: string | vue.Component;
  }, {}, string, {}, vue.GlobalComponents, vue.GlobalDirectives, string, vue.ComponentProvideOptions> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new () => {
    $slots: {
      loading?: (props: {}) => any;
    } & {
      icon?: (props: {}) => any;
    } & {
      default?: (props: {}) => any;
    };
  }) & vue.ObjectPlugin & {
    setPropsDefaults: (defaults: Partial<Omit<{
      readonly size?: ComponentSize | undefined;
      readonly disabled?: boolean | undefined;
      readonly type?: ButtonType | undefined;
      readonly icon?: IconPropType | undefined;
      readonly nativeType?: ButtonNativeType | undefined;
      readonly loading?: boolean | undefined;
      readonly loadingIcon?: IconPropType | undefined;
      readonly plain?: boolean | undefined;
      readonly text?: boolean | undefined;
      readonly link?: boolean | undefined;
      readonly bg?: boolean | undefined;
      readonly autofocus?: boolean | undefined;
      readonly round?: boolean | undefined;
      readonly circle?: boolean | undefined;
      readonly dashed?: boolean | undefined;
      readonly color?: string | undefined;
      readonly dark?: boolean | undefined;
      readonly autoInsertSpace?: boolean | undefined;
      readonly tag?: (string | vue.Component) | undefined;
      readonly onClick?: ((evt: MouseEvent) => any) | undefined;
    } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "onClick" | keyof vue.VNodeProps | keyof vue.AllowedComponentProps>>) => void;
  } & {
    ButtonGroup: typeof _default$1;
  };
  ElButtonGroup: {
    new (...args: any[]): vue.CreateComponentPublicInstanceWithMixins<Readonly<ButtonGroupProps> & Readonly<{}>, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, vue.PublicProps, {
      type: "" | "default" | "info" | "primary" | "success" | "warning" | "text" | "danger";
      direction: "horizontal" | "vertical";
    }, false, {}, {}, vue.GlobalComponents, vue.GlobalDirectives, string, {}, any, vue.ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<ButtonGroupProps> & Readonly<{}>, {}, {}, {}, {}, {
      type: "" | "default" | "info" | "primary" | "success" | "warning" | "text" | "danger";
      direction: "horizontal" | "vertical";
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & vue.ComponentOptionsBase<Readonly<ButtonGroupProps> & Readonly<{}>, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, {
    type: "" | "default" | "info" | "primary" | "success" | "warning" | "text" | "danger";
    direction: "horizontal" | "vertical";
  }, {}, string, {}, vue.GlobalComponents, vue.GlobalDirectives, string, vue.ComponentProvideOptions> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new () => {
    $slots: {
      default?: (props: {}) => any;
    };
  });
  ElScrollbar: SFCWithInstall<{
    new (...args: any[]): vue.CreateComponentPublicInstanceWithMixins<Readonly<ScrollbarProps> & Readonly<{
      onScroll?: ((args_0: {
        scrollTop: number;
        scrollLeft: number;
      }) => any) | undefined;
      "onEnd-reached"?: ((direction: ScrollbarDirection) => any) | undefined;
    }>, {
      wrapRef: vue.Ref<HTMLDivElement | undefined, HTMLDivElement | undefined>;
      update: () => void;
      scrollTo: {
        (xCord: number, yCord?: number): void;
        (options: ScrollToOptions): void;
      };
      setScrollTop: (value: number) => void;
      setScrollLeft: (value: number) => void;
      handleScroll: () => void;
    }, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
      scroll: (args_0: {
        scrollTop: number;
        scrollLeft: number;
      }) => void;
      "end-reached": (direction: ScrollbarDirection) => void;
    }, vue.PublicProps, {
      tabindex: number | string;
      height: number | string;
      maxHeight: number | string;
      tag: keyof HTMLElementTagNameMap | (string & {});
      distance: number;
      wrapStyle: string | false | CSSProperties | vue.StyleValue[] | null;
      wrapClass: string | string[];
      viewClass: string | string[];
      viewStyle: string | false | CSSProperties | vue.StyleValue[] | null;
      minSize: number;
    }, false, {}, {}, vue.GlobalComponents, vue.GlobalDirectives, string, {}, any, vue.ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<ScrollbarProps> & Readonly<{
      onScroll?: ((args_0: {
        scrollTop: number;
        scrollLeft: number;
      }) => any) | undefined;
      "onEnd-reached"?: ((direction: ScrollbarDirection) => any) | undefined;
    }>, {
      wrapRef: vue.Ref<HTMLDivElement | undefined, HTMLDivElement | undefined>;
      update: () => void;
      scrollTo: {
        (xCord: number, yCord?: number): void;
        (options: ScrollToOptions): void;
      };
      setScrollTop: (value: number) => void;
      setScrollLeft: (value: number) => void;
      handleScroll: () => void;
    }, {}, {}, {}, {
      tabindex: number | string;
      height: number | string;
      maxHeight: number | string;
      tag: keyof HTMLElementTagNameMap | (string & {});
      distance: number;
      wrapStyle: string | false | CSSProperties | vue.StyleValue[] | null;
      wrapClass: string | string[];
      viewClass: string | string[];
      viewStyle: string | false | CSSProperties | vue.StyleValue[] | null;
      minSize: number;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & vue.ComponentOptionsBase<Readonly<ScrollbarProps> & Readonly<{
    onScroll?: ((args_0: {
      scrollTop: number;
      scrollLeft: number;
    }) => any) | undefined;
    "onEnd-reached"?: ((direction: ScrollbarDirection) => any) | undefined;
  }>, {
    wrapRef: vue.Ref<HTMLDivElement | undefined, HTMLDivElement | undefined>;
    update: () => void;
    scrollTo: {
      (xCord: number, yCord?: number): void;
      (options: ScrollToOptions): void;
    };
    setScrollTop: (value: number) => void;
    setScrollLeft: (value: number) => void;
    handleScroll: () => void;
  }, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    scroll: (args_0: {
      scrollTop: number;
      scrollLeft: number;
    }) => void;
    "end-reached": (direction: ScrollbarDirection) => void;
  }, string, {
    tabindex: number | string;
    height: number | string;
    maxHeight: number | string;
    tag: keyof HTMLElementTagNameMap | (string & {});
    distance: number;
    wrapStyle: string | false | CSSProperties | vue.StyleValue[] | null;
    wrapClass: string | string[];
    viewClass: string | string[];
    viewStyle: string | false | CSSProperties | vue.StyleValue[] | null;
    minSize: number;
  }, {}, string, {}, vue.GlobalComponents, vue.GlobalDirectives, string, vue.ComponentProvideOptions> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new () => {
    $slots: {
      default?: (props: {}) => any;
    };
  })>;
  ElTooltip: SFCWithInstall<{
    new (...args: any[]): vue.CreateComponentPublicInstanceWithMixins<Readonly<UseTooltipProps> & Readonly<{
      onClose?: ((...args: any[]) => any) | undefined;
      onHide?: ((...args: any[]) => any) | undefined;
      onShow?: ((...args: any[]) => any) | undefined;
      onOpen?: ((...args: any[]) => any) | undefined;
      "onUpdate:visible"?: ((...args: any[]) => any) | undefined;
      "onBefore-show"?: ((...args: any[]) => any) | undefined;
      "onBefore-hide"?: ((...args: any[]) => any) | undefined;
    }>, {
      popperRef: vue.Ref<PopperInstance | undefined, PopperInstance | undefined>;
      contentRef: vue.Ref<TooltipContentInstance | undefined, TooltipContentInstance | undefined>;
      isFocusInsideContent: (event?: FocusEvent) => boolean | undefined;
      updatePopper: () => void;
      onOpen: (event?: Event, delay?: number) => void;
      onClose: (event?: Event, delay?: number) => void;
      hide: (event?: Event) => void;
    }, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
      close: (...args: any[]) => void;
      hide: (...args: any[]) => void;
      show: (...args: any[]) => void;
      open: (...args: any[]) => void;
      "update:visible": (...args: any[]) => void;
      "before-show": (...args: any[]) => void;
      "before-hide": (...args: any[]) => void;
    }, vue.PublicProps, {
      offset: number;
      teleported: boolean;
      effect: PopperEffect;
      visible: boolean | null;
      content: string;
      style: string | false | CSSProperties | vue.StyleValue[] | null;
      enterable: boolean;
      pure: boolean;
      focusOnShow: boolean;
      trapping: boolean;
      popperStyle: string | false | CSSProperties | vue.StyleValue[] | null;
      stopPopperMouseEvent: boolean;
      virtualTriggering: boolean;
      loop: boolean;
      boundariesPadding: number;
      gpuAcceleration: boolean;
      placement: Placement;
      popperOptions: Partial<Options>;
      strategy: "fixed" | "absolute";
      arrowOffset: number;
      showArrow: boolean;
      role: typeof roleTypes[number];
      showAfter: number;
      hideAfter: number;
      autoClose: number;
      trigger: Arrayable<TooltipTriggerType>;
      triggerKeys: string[];
    }, false, {}, {}, vue.GlobalComponents, vue.GlobalDirectives, string, {}, any, vue.ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<UseTooltipProps> & Readonly<{
      onClose?: ((...args: any[]) => any) | undefined;
      onHide?: ((...args: any[]) => any) | undefined;
      onShow?: ((...args: any[]) => any) | undefined;
      onOpen?: ((...args: any[]) => any) | undefined;
      "onUpdate:visible"?: ((...args: any[]) => any) | undefined;
      "onBefore-show"?: ((...args: any[]) => any) | undefined;
      "onBefore-hide"?: ((...args: any[]) => any) | undefined;
    }>, {
      popperRef: vue.Ref<PopperInstance | undefined, PopperInstance | undefined>;
      contentRef: vue.Ref<TooltipContentInstance | undefined, TooltipContentInstance | undefined>;
      isFocusInsideContent: (event?: FocusEvent) => boolean | undefined;
      updatePopper: () => void;
      onOpen: (event?: Event, delay?: number) => void;
      onClose: (event?: Event, delay?: number) => void;
      hide: (event?: Event) => void;
    }, {}, {}, {}, {
      offset: number;
      teleported: boolean;
      effect: PopperEffect;
      visible: boolean | null;
      content: string;
      style: string | false | CSSProperties | vue.StyleValue[] | null;
      enterable: boolean;
      pure: boolean;
      focusOnShow: boolean;
      trapping: boolean;
      popperStyle: string | false | CSSProperties | vue.StyleValue[] | null;
      stopPopperMouseEvent: boolean;
      virtualTriggering: boolean;
      loop: boolean;
      boundariesPadding: number;
      gpuAcceleration: boolean;
      placement: Placement;
      popperOptions: Partial<Options>;
      strategy: "fixed" | "absolute";
      arrowOffset: number;
      showArrow: boolean;
      role: typeof roleTypes[number];
      showAfter: number;
      hideAfter: number;
      autoClose: number;
      trigger: Arrayable<TooltipTriggerType>;
      triggerKeys: string[];
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & vue.ComponentOptionsBase<Readonly<UseTooltipProps> & Readonly<{
    onClose?: ((...args: any[]) => any) | undefined;
    onHide?: ((...args: any[]) => any) | undefined;
    onShow?: ((...args: any[]) => any) | undefined;
    onOpen?: ((...args: any[]) => any) | undefined;
    "onUpdate:visible"?: ((...args: any[]) => any) | undefined;
    "onBefore-show"?: ((...args: any[]) => any) | undefined;
    "onBefore-hide"?: ((...args: any[]) => any) | undefined;
  }>, {
    popperRef: vue.Ref<PopperInstance | undefined, PopperInstance | undefined>;
    contentRef: vue.Ref<TooltipContentInstance | undefined, TooltipContentInstance | undefined>;
    isFocusInsideContent: (event?: FocusEvent) => boolean | undefined;
    updatePopper: () => void;
    onOpen: (event?: Event, delay?: number) => void;
    onClose: (event?: Event, delay?: number) => void;
    hide: (event?: Event) => void;
  }, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    close: (...args: any[]) => void;
    hide: (...args: any[]) => void;
    show: (...args: any[]) => void;
    open: (...args: any[]) => void;
    "update:visible": (...args: any[]) => void;
    "before-show": (...args: any[]) => void;
    "before-hide": (...args: any[]) => void;
  }, string, {
    offset: number;
    teleported: boolean;
    effect: PopperEffect;
    visible: boolean | null;
    content: string;
    style: string | false | CSSProperties | vue.StyleValue[] | null;
    enterable: boolean;
    pure: boolean;
    focusOnShow: boolean;
    trapping: boolean;
    popperStyle: string | false | CSSProperties | vue.StyleValue[] | null;
    stopPopperMouseEvent: boolean;
    virtualTriggering: boolean;
    loop: boolean;
    boundariesPadding: number;
    gpuAcceleration: boolean;
    placement: Placement;
    popperOptions: Partial<Options>;
    strategy: "fixed" | "absolute";
    arrowOffset: number;
    showArrow: boolean;
    role: typeof roleTypes[number];
    showAfter: number;
    hideAfter: number;
    autoClose: number;
    trigger: Arrayable<TooltipTriggerType>;
    triggerKeys: string[];
  }, {}, string, {}, vue.GlobalComponents, vue.GlobalDirectives, string, vue.ComponentProvideOptions> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new () => {
    $slots: {
      default?: (props: {}) => any;
    } & {
      content?: (props: {}) => any;
    };
  })>;
  ElRovingFocusGroup: vue.DefineComponent<{}, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
    ElFocusGroupCollection: {
      new (...args: any[]): vue.CreateComponentPublicInstanceWithMixins<Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, vue.PublicProps, {}, true, {}, {}, vue.GlobalComponents, vue.GlobalDirectives, string, {}, any, vue.ComponentProvideOptions, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
      }, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, {}>;
      __isFragment?: never;
      __isTeleport?: never;
      __isSuspense?: never;
    } & vue.ComponentOptionsBase<Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, {}, {}, string, {}, vue.GlobalComponents, vue.GlobalDirectives, string, vue.ComponentProvideOptions> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & {
      name: string;
      setup(): void;
    };
    ElRovingFocusGroupImpl: vue.DefineComponent<vue.ExtractPropTypes<{
      style: {
        readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | false | CSSProperties | vue.StyleValue[]) | (() => vue.StyleValue) | (((new (...args: any[]) => string | false | CSSProperties | vue.StyleValue[]) | (() => vue.StyleValue)) | null)[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
      };
      currentTabId: {
        readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string) | (() => string | null) | (((new (...args: any[]) => string) | (() => string | null)) | null)[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
      };
      defaultCurrentTabId: StringConstructor;
      loop: BooleanConstructor;
      dir: EpPropFinalized<StringConstructor, string, unknown, string, boolean>;
      orientation: {
        readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => "horizontal" | "vertical") | (() => "horizontal" | "vertical" | undefined) | (((new (...args: any[]) => "horizontal" | "vertical") | (() => "horizontal" | "vertical" | undefined)) | null)[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
      };
      onBlur: FunctionConstructor;
      onFocus: FunctionConstructor;
      onMousedown: FunctionConstructor;
    }>, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("currentTabIdChange" | "entryFocus")[], "currentTabIdChange" | "entryFocus", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
      style: {
        readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | false | CSSProperties | vue.StyleValue[]) | (() => vue.StyleValue) | (((new (...args: any[]) => string | false | CSSProperties | vue.StyleValue[]) | (() => vue.StyleValue)) | null)[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
      };
      currentTabId: {
        readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string) | (() => string | null) | (((new (...args: any[]) => string) | (() => string | null)) | null)[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
      };
      defaultCurrentTabId: StringConstructor;
      loop: BooleanConstructor;
      dir: EpPropFinalized<StringConstructor, string, unknown, string, boolean>;
      orientation: {
        readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => "horizontal" | "vertical") | (() => "horizontal" | "vertical" | undefined) | (((new (...args: any[]) => "horizontal" | "vertical") | (() => "horizontal" | "vertical" | undefined)) | null)[], unknown, unknown>>;
        readonly required: false;
        readonly validator: ((val: unknown) => boolean) | undefined;
        __epPropKey: true;
      };
      onBlur: FunctionConstructor;
      onFocus: FunctionConstructor;
      onMousedown: FunctionConstructor;
    }>> & Readonly<{
      onCurrentTabIdChange?: ((...args: any[]) => any) | undefined;
      onEntryFocus?: ((...args: any[]) => any) | undefined;
    }>, {
      loop: boolean;
      dir: string;
    }, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
  }, {}, string, vue.ComponentProvideOptions, true, {}, any>;
  ElOnlyChild: vue.DefineComponent<{}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
  }> | null, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
  ElIcon: SFCWithInstall<{
    new (...args: any[]): vue.CreateComponentPublicInstanceWithMixins<Readonly<IconProps> & Readonly<{}>, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, vue.PublicProps, {}, false, {}, {}, vue.GlobalComponents, vue.GlobalDirectives, string, {}, any, vue.ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<IconProps> & Readonly<{}>, {}, {}, {}, {}, {}>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & vue.ComponentOptionsBase<Readonly<IconProps> & Readonly<{}>, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, {}, {}, string, {}, vue.GlobalComponents, vue.GlobalDirectives, string, vue.ComponentProvideOptions> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new () => {
    $slots: {
      default?: (props: {}) => any;
    };
  })>;
  ArrowDown: vue.DefineComponent<{}, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { _default };