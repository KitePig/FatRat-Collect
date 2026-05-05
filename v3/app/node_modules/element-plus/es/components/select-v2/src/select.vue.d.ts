import { SFCWithInstall } from "../../../utils/vue/typescript.js";
import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { Arrayable } from "../../../utils/typescript.js";
import "../../../utils/index.js";
import { PopperEffect, PopperInstance, roleTypes } from "../../popper/src/popper.js";
import { TagProps } from "../../tag/src/tag.js";
import "../../tag/index.js";
import { TooltipTriggerType } from "../../tooltip/src/trigger.js";
import { TooltipContentInstance } from "../../tooltip/src/content.js";
import { TooltipInstance, UseTooltipProps } from "../../tooltip/src/tooltip.js";
import "../../tooltip/index.js";
import { IconProps } from "../../icon/src/icon.js";
import "../../icon/index.js";
import { Option, OptionType, SelectStates } from "./select.types.js";
import { SelectDropdownInstance } from "./select-dropdown.js";
import { SelectV2Props, TagTooltipProps } from "./defaults.js";
import { Props } from "./useProps.js";
import "../../../index.js";
import { Options, Placement } from "../../popper/index.js";
import * as vue from "vue";
import * as _vueuse_core0 from "@vueuse/core";
import * as vue_jsx_runtime0 from "vue/jsx-runtime";

//#region ../../packages/components/select-v2/src/select.vue.d.ts
declare const _default: typeof __VLS_export;
declare const __VLS_export: vue.DefineComponent<vue.ExtractPropTypes<{
  readonly ariaLabel: StringConstructor;
  readonly emptyValues: ArrayConstructor;
  readonly valueOnClear: EpPropFinalized<(new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null) | (((new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null)) | null)[], unknown, unknown, undefined, boolean>;
  readonly allowCreate: BooleanConstructor;
  readonly autocomplete: EpPropFinalized<(new (...args: any[]) => "none" | "both" | "inline" | "list") | (() => "none" | "both" | "inline" | "list") | (((new (...args: any[]) => "none" | "both" | "inline" | "list") | (() => "none" | "both" | "inline" | "list")) | null)[], unknown, unknown, "none", boolean>;
  readonly automaticDropdown: BooleanConstructor;
  readonly clearable: BooleanConstructor;
  readonly clearIcon: EpPropFinalized<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown, vue.DefineComponent<{}, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, boolean>;
  readonly effect: EpPropFinalized<(new (...args: any[]) => string) | (() => PopperEffect) | (((new (...args: any[]) => string) | (() => PopperEffect)) | null)[], unknown, unknown, "light", boolean>;
  readonly collapseTags: BooleanConstructor;
  readonly collapseTagsTooltip: BooleanConstructor;
  readonly tagTooltip: EpPropFinalized<(new (...args: any[]) => TagTooltipProps) | (() => TagTooltipProps) | (((new (...args: any[]) => TagTooltipProps) | (() => TagTooltipProps)) | null)[], unknown, unknown, () => {}, boolean>;
  readonly maxCollapseTags: EpPropFinalized<NumberConstructor, unknown, unknown, 1, boolean>;
  readonly defaultFirstOption: BooleanConstructor;
  readonly disabled: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly estimatedOptionHeight: EpPropFinalized<NumberConstructor, unknown, unknown, undefined, boolean>;
  readonly filterable: BooleanConstructor;
  readonly filterMethod: {
    readonly type: vue.PropType<(query: string) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly height: EpPropFinalized<NumberConstructor, unknown, unknown, 274, boolean>;
  readonly itemHeight: EpPropFinalized<NumberConstructor, unknown, unknown, 34, boolean>;
  readonly id: StringConstructor;
  readonly loading: BooleanConstructor;
  readonly loadingText: StringConstructor;
  readonly modelValue: EpPropFinalized<(new (...args: any[]) => any) | (() => any) | {
    (): any;
    new (): any;
    readonly prototype: any;
  } | (((new (...args: any[]) => any) | (() => any) | {
    (): any;
    new (): any;
    readonly prototype: any;
  }) | null)[], unknown, unknown, undefined, boolean>;
  readonly multiple: BooleanConstructor;
  readonly multipleLimit: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly name: StringConstructor;
  readonly noDataText: StringConstructor;
  readonly noMatchText: StringConstructor;
  readonly remoteMethod: {
    readonly type: vue.PropType<(query: string) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly reserveKeyword: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly options: {
    readonly type: vue.PropType<OptionType[]>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly placeholder: {
    readonly type: vue.PropType<string>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly teleported: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly persistent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
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
  readonly popperOptions: EpPropFinalized<(new (...args: any[]) => Partial<Options>) | (() => Partial<Options>) | (((new (...args: any[]) => Partial<Options>) | (() => Partial<Options>)) | null)[], unknown, unknown, () => Partial<Options>, boolean>;
  readonly remote: BooleanConstructor;
  readonly debounce: EpPropFinalized<NumberConstructor, unknown, unknown, 300, boolean>;
  readonly size: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly props: EpPropFinalized<(new (...args: any[]) => Props) | (() => Props) | (((new (...args: any[]) => Props) | (() => Props)) | null)[], unknown, unknown, () => Required<Props>, boolean>;
  readonly valueKey: EpPropFinalized<StringConstructor, unknown, unknown, "value", boolean>;
  readonly scrollbarAlwaysOn: BooleanConstructor;
  readonly validateEvent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly offset: EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
  readonly remoteShowSuffix: BooleanConstructor;
  readonly showArrow: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly placement: EpPropFinalized<(new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement) | (((new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement)) | null)[], Placement, unknown, "bottom-start", boolean>;
  readonly fallbackPlacements: EpPropFinalized<(new (...args: any[]) => Placement[]) | (() => Placement[]) | (((new (...args: any[]) => Placement[]) | (() => Placement[])) | null)[], unknown, unknown, readonly ["bottom-start", "top-start", "right", "left"], boolean>;
  readonly tagType: {
    readonly default: "info";
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "info" | "primary" | "success" | "warning" | "danger", unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    readonly __epPropKey: true;
  };
  readonly tagEffect: {
    readonly default: "light";
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "light" | "dark" | "plain", unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    readonly __epPropKey: true;
  };
  readonly tabindex: EpPropFinalized<readonly [StringConstructor, NumberConstructor], unknown, unknown, 0, boolean>;
  readonly appendTo: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>) | (((new (...args: any[]) => string | HTMLElement) | (() => EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly fitInputWidth: EpPropFinalized<readonly [BooleanConstructor, NumberConstructor], unknown, number | boolean, true, boolean>;
  readonly suffixIcon: EpPropFinalized<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown, vue.DefineComponent<{}, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, boolean>;
}>, {
  modelValue: vue.ComputedRef<any>;
  selectedLabel: vue.ComputedRef<string | string[]>;
  calculatorRef: vue.ShallowRef<HTMLElement | undefined, HTMLElement | undefined>;
  inputStyle: vue.ComputedRef<{
    minWidth: string;
  }>;
  contentId: vue.Ref<string, string>;
  BORDER_HORIZONTAL_WIDTH: number;
  inputId: vue.Ref<string | undefined, string | undefined>;
  collapseTagSize: vue.ComputedRef<"default" | "small">;
  currentPlaceholder: vue.ComputedRef<string>;
  expanded: vue.Ref<boolean, boolean>;
  emptyText: vue.ComputedRef<string | null>;
  popupHeight: vue.ComputedRef<number>;
  debounce: vue.ComputedRef<number>;
  allOptions: vue.ComputedRef<OptionType[]>;
  allOptionsValueMap: vue.ComputedRef<Map<any, any>>;
  filteredOptions: vue.Ref<({
    [x: string]: any;
  } | {
    [x: string]: any;
    created?: boolean | undefined;
  })[], OptionType[] | ({
    [x: string]: any;
  } | {
    [x: string]: any;
    created?: boolean | undefined;
  })[]>;
  iconComponent: vue.ComputedRef<EpPropMergeType<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown>>;
  iconReverse: vue.ComputedRef<string>;
  tagStyle: vue.ComputedRef<{
    maxWidth: string;
  }>;
  collapseTagStyle: vue.ComputedRef<{
    maxWidth: string;
  }>;
  popperSize: vue.Ref<number, number>;
  dropdownMenuVisible: vue.WritableComputedRef<boolean, boolean>;
  hasModelValue: vue.ComputedRef<boolean>;
  shouldShowPlaceholder: vue.ComputedRef<boolean>;
  selectDisabled: vue.ComputedRef<boolean>;
  selectSize: vue.ComputedRef<"" | "default" | "small" | "large">;
  needStatusIcon: vue.ComputedRef<boolean>;
  showClearBtn: vue.ComputedRef<boolean>;
  states: SelectStates;
  isFocused: vue.Ref<boolean, boolean>;
  nsSelect: {
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
  nsInput: {
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
  inputRef: vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  menuRef: vue.Ref<SelectDropdownInstance | undefined, SelectDropdownInstance | undefined>;
  tagMenuRef: vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  tooltipRef: vue.Ref<TooltipInstance | undefined, TooltipInstance | undefined>;
  tagTooltipRef: vue.Ref<TooltipInstance | undefined, TooltipInstance | undefined>;
  selectRef: vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  wrapperRef: vue.ShallowRef<HTMLElement | undefined, HTMLElement | undefined>;
  selectionRef: vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  prefixRef: vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  suffixRef: vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  collapseItemRef: vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  popperRef: vue.ComputedRef<HTMLElement | undefined>;
  validateState: vue.ComputedRef<"error" | "" | "success" | "validating">;
  validateIcon: vue.ComputedRef<vue.DefineComponent<{}, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any> | undefined>;
  showTagList: vue.ComputedRef<Option[]>;
  collapseTagList: vue.ComputedRef<Option[]>;
  debouncedOnInputChange: _vueuse_core0.PromisifyFn<() => void>;
  deleteTag: (event: MouseEvent, option: Option) => void;
  getLabel: (option: Option) => any;
  getValue: (option: Option) => any;
  getDisabled: (option: Option) => any;
  getValueKey: (item: unknown) => any;
  getIndex: (option: Option) => any;
  handleClear: () => void;
  handleClickOutside: (event: Event) => void;
  handleDel: (e: KeyboardEvent) => void;
  handleEsc: () => void;
  focus: () => void;
  blur: () => void;
  handleMenuEnter: () => Promise<void>;
  handleResize: () => void;
  resetSelectionWidth: () => void;
  updateTooltip: () => void;
  updateTagTooltip: () => void;
  updateOptions: () => void;
  toggleMenu: (event?: Event) => void;
  scrollTo: (index: number) => void;
  onInput: (event: Event) => void;
  onKeyboardNavigate: (direction: "forward" | "backward", hoveringIndex?: number | undefined) => void;
  onKeyboardSelect: () => void;
  onSelect: (option: Option) => void;
  onHover: (idx?: number) => void;
  handleCompositionStart: (event: CompositionEvent) => void;
  handleCompositionEnd: (event: CompositionEvent) => void;
  handleCompositionUpdate: (event: CompositionEvent) => void;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  "update:modelValue": (val: SelectV2Props["modelValue"]) => boolean;
  change: (val: SelectV2Props["modelValue"]) => boolean;
  'remove-tag': (val: unknown) => boolean;
  'visible-change': (visible: boolean) => boolean;
  focus: (evt: FocusEvent) => boolean;
  blur: (evt: FocusEvent) => boolean;
  clear: () => boolean;
}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
  readonly ariaLabel: StringConstructor;
  readonly emptyValues: ArrayConstructor;
  readonly valueOnClear: EpPropFinalized<(new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null) | (((new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null)) | null)[], unknown, unknown, undefined, boolean>;
  readonly allowCreate: BooleanConstructor;
  readonly autocomplete: EpPropFinalized<(new (...args: any[]) => "none" | "both" | "inline" | "list") | (() => "none" | "both" | "inline" | "list") | (((new (...args: any[]) => "none" | "both" | "inline" | "list") | (() => "none" | "both" | "inline" | "list")) | null)[], unknown, unknown, "none", boolean>;
  readonly automaticDropdown: BooleanConstructor;
  readonly clearable: BooleanConstructor;
  readonly clearIcon: EpPropFinalized<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown, vue.DefineComponent<{}, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, boolean>;
  readonly effect: EpPropFinalized<(new (...args: any[]) => string) | (() => PopperEffect) | (((new (...args: any[]) => string) | (() => PopperEffect)) | null)[], unknown, unknown, "light", boolean>;
  readonly collapseTags: BooleanConstructor;
  readonly collapseTagsTooltip: BooleanConstructor;
  readonly tagTooltip: EpPropFinalized<(new (...args: any[]) => TagTooltipProps) | (() => TagTooltipProps) | (((new (...args: any[]) => TagTooltipProps) | (() => TagTooltipProps)) | null)[], unknown, unknown, () => {}, boolean>;
  readonly maxCollapseTags: EpPropFinalized<NumberConstructor, unknown, unknown, 1, boolean>;
  readonly defaultFirstOption: BooleanConstructor;
  readonly disabled: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly estimatedOptionHeight: EpPropFinalized<NumberConstructor, unknown, unknown, undefined, boolean>;
  readonly filterable: BooleanConstructor;
  readonly filterMethod: {
    readonly type: vue.PropType<(query: string) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly height: EpPropFinalized<NumberConstructor, unknown, unknown, 274, boolean>;
  readonly itemHeight: EpPropFinalized<NumberConstructor, unknown, unknown, 34, boolean>;
  readonly id: StringConstructor;
  readonly loading: BooleanConstructor;
  readonly loadingText: StringConstructor;
  readonly modelValue: EpPropFinalized<(new (...args: any[]) => any) | (() => any) | {
    (): any;
    new (): any;
    readonly prototype: any;
  } | (((new (...args: any[]) => any) | (() => any) | {
    (): any;
    new (): any;
    readonly prototype: any;
  }) | null)[], unknown, unknown, undefined, boolean>;
  readonly multiple: BooleanConstructor;
  readonly multipleLimit: EpPropFinalized<NumberConstructor, unknown, unknown, 0, boolean>;
  readonly name: StringConstructor;
  readonly noDataText: StringConstructor;
  readonly noMatchText: StringConstructor;
  readonly remoteMethod: {
    readonly type: vue.PropType<(query: string) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly reserveKeyword: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly options: {
    readonly type: vue.PropType<OptionType[]>;
    readonly required: true;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly placeholder: {
    readonly type: vue.PropType<string>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly teleported: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly persistent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
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
  readonly popperOptions: EpPropFinalized<(new (...args: any[]) => Partial<Options>) | (() => Partial<Options>) | (((new (...args: any[]) => Partial<Options>) | (() => Partial<Options>)) | null)[], unknown, unknown, () => Partial<Options>, boolean>;
  readonly remote: BooleanConstructor;
  readonly debounce: EpPropFinalized<NumberConstructor, unknown, unknown, 300, boolean>;
  readonly size: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly props: EpPropFinalized<(new (...args: any[]) => Props) | (() => Props) | (((new (...args: any[]) => Props) | (() => Props)) | null)[], unknown, unknown, () => Required<Props>, boolean>;
  readonly valueKey: EpPropFinalized<StringConstructor, unknown, unknown, "value", boolean>;
  readonly scrollbarAlwaysOn: BooleanConstructor;
  readonly validateEvent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly offset: EpPropFinalized<NumberConstructor, unknown, unknown, 12, boolean>;
  readonly remoteShowSuffix: BooleanConstructor;
  readonly showArrow: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly placement: EpPropFinalized<(new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement) | (((new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement)) | null)[], Placement, unknown, "bottom-start", boolean>;
  readonly fallbackPlacements: EpPropFinalized<(new (...args: any[]) => Placement[]) | (() => Placement[]) | (((new (...args: any[]) => Placement[]) | (() => Placement[])) | null)[], unknown, unknown, readonly ["bottom-start", "top-start", "right", "left"], boolean>;
  readonly tagType: {
    readonly default: "info";
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "info" | "primary" | "success" | "warning" | "danger", unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    readonly __epPropKey: true;
  };
  readonly tagEffect: {
    readonly default: "light";
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "light" | "dark" | "plain", unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    readonly __epPropKey: true;
  };
  readonly tabindex: EpPropFinalized<readonly [StringConstructor, NumberConstructor], unknown, unknown, 0, boolean>;
  readonly appendTo: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>) | (((new (...args: any[]) => string | HTMLElement) | (() => EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly fitInputWidth: EpPropFinalized<readonly [BooleanConstructor, NumberConstructor], unknown, number | boolean, true, boolean>;
  readonly suffixIcon: EpPropFinalized<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown, vue.DefineComponent<{}, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, boolean>;
}>> & Readonly<{
  onBlur?: ((evt: FocusEvent) => any) | undefined;
  onChange?: ((val: any) => any) | undefined;
  onFocus?: ((evt: FocusEvent) => any) | undefined;
  "onUpdate:modelValue"?: ((val: any) => any) | undefined;
  onClear?: (() => any) | undefined;
  "onVisible-change"?: ((visible: boolean) => any) | undefined;
  "onRemove-tag"?: ((val: unknown) => any) | undefined;
}>, {
  readonly offset: number;
  readonly teleported: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly props: Props;
  readonly effect: EpPropMergeType<(new (...args: any[]) => string) | (() => PopperEffect) | (((new (...args: any[]) => string) | (() => PopperEffect)) | null)[], unknown, unknown>;
  readonly disabled: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly modelValue: any;
  readonly autocomplete: EpPropMergeType<(new (...args: any[]) => "none" | "both" | "inline" | "list") | (() => "none" | "both" | "inline" | "list") | (((new (...args: any[]) => "none" | "both" | "inline" | "list") | (() => "none" | "both" | "inline" | "list")) | null)[], unknown, unknown>;
  readonly clearable: boolean;
  readonly clearIcon: EpPropMergeType<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown>;
  readonly suffixIcon: EpPropMergeType<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown>;
  readonly tabindex: EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>;
  readonly validateEvent: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly multiple: boolean;
  readonly fallbackPlacements: Placement[];
  readonly placement: EpPropMergeType<(new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement) | (((new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement)) | null)[], Placement, unknown>;
  readonly popperOptions: Partial<Options>;
  readonly showArrow: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly persistent: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly height: number;
  readonly valueKey: string;
  readonly debounce: number;
  readonly fitInputWidth: EpPropMergeType<readonly [BooleanConstructor, NumberConstructor], unknown, number | boolean>;
  readonly loading: boolean;
  readonly valueOnClear: EpPropMergeType<(new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null) | (((new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null)) | null)[], unknown, unknown>;
  readonly filterable: boolean;
  readonly collapseTags: boolean;
  readonly maxCollapseTags: number;
  readonly collapseTagsTooltip: boolean;
  readonly tagType: EpPropMergeType<StringConstructor, "info" | "primary" | "success" | "warning" | "danger", unknown>;
  readonly tagEffect: EpPropMergeType<StringConstructor, "light" | "dark" | "plain", unknown>;
  readonly automaticDropdown: boolean;
  readonly allowCreate: boolean;
  readonly remote: boolean;
  readonly multipleLimit: number;
  readonly defaultFirstOption: boolean;
  readonly reserveKeyword: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly tagTooltip: TagTooltipProps;
  readonly remoteShowSuffix: boolean;
  readonly estimatedOptionHeight: number;
  readonly itemHeight: number;
  readonly scrollbarAlwaysOn: boolean;
}, {}, {
  ElSelectMenu: vue.DefineComponent<vue.ExtractPropTypes<{
    loading: BooleanConstructor;
    data: {
      type: ArrayConstructor;
      required: true;
    };
    hoveringIndex: NumberConstructor;
    width: NumberConstructor;
    id: StringConstructor;
    ariaLabel: StringConstructor;
  }>, () => vue_jsx_runtime0.JSX.Element, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    loading: BooleanConstructor;
    data: {
      type: ArrayConstructor;
      required: true;
    };
    hoveringIndex: NumberConstructor;
    width: NumberConstructor;
    id: StringConstructor;
    ariaLabel: StringConstructor;
  }>> & Readonly<{}>, {
    loading: boolean;
  }, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
  ElTag: SFCWithInstall<{
    new (...args: any[]): vue.CreateComponentPublicInstanceWithMixins<Readonly<TagProps> & Readonly<{
      onClick?: ((evt: MouseEvent) => any) | undefined;
      onClose?: ((evt: MouseEvent) => any) | undefined;
    }>, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
      click: (evt: MouseEvent) => void;
      close: (evt: MouseEvent) => void;
    }, vue.PublicProps, {
      type: "primary" | "success" | "info" | "warning" | "danger";
      effect: "dark" | "light" | "plain";
    }, false, {}, {}, vue.GlobalComponents, vue.GlobalDirectives, string, {}, any, vue.ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<TagProps> & Readonly<{
      onClick?: ((evt: MouseEvent) => any) | undefined;
      onClose?: ((evt: MouseEvent) => any) | undefined;
    }>, {}, {}, {}, {}, {
      type: "primary" | "success" | "info" | "warning" | "danger";
      effect: "dark" | "light" | "plain";
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & vue.ComponentOptionsBase<Readonly<TagProps> & Readonly<{
    onClick?: ((evt: MouseEvent) => any) | undefined;
    onClose?: ((evt: MouseEvent) => any) | undefined;
  }>, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    click: (evt: MouseEvent) => void;
    close: (evt: MouseEvent) => void;
  }, string, {
    type: "primary" | "success" | "info" | "warning" | "danger";
    effect: "dark" | "light" | "plain";
  }, {}, string, {}, vue.GlobalComponents, vue.GlobalDirectives, string, vue.ComponentProvideOptions> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new () => {
    $slots: {
      default?: (props: {}) => any;
    } & {
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
      style: string | false | vue.CSSProperties | vue.StyleValue[] | null;
      enterable: boolean;
      pure: boolean;
      focusOnShow: boolean;
      trapping: boolean;
      popperStyle: string | false | vue.CSSProperties | vue.StyleValue[] | null;
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
      style: string | false | vue.CSSProperties | vue.StyleValue[] | null;
      enterable: boolean;
      pure: boolean;
      focusOnShow: boolean;
      trapping: boolean;
      popperStyle: string | false | vue.CSSProperties | vue.StyleValue[] | null;
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
    style: string | false | vue.CSSProperties | vue.StyleValue[] | null;
    enterable: boolean;
    pure: boolean;
    focusOnShow: boolean;
    trapping: boolean;
    popperStyle: string | false | vue.CSSProperties | vue.StyleValue[] | null;
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
}, {
  ClickOutside: vue.ObjectDirective<HTMLElement, any, string, any>;
}, string, vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { _default };