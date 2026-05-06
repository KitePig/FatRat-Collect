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
import { ScrollbarDirection, ScrollbarInstance, ScrollbarProps } from "../../scrollbar/src/scrollbar.js";
import "../../scrollbar/index.js";
import { IconProps } from "../../icon/src/icon.js";
import "../../icon/index.js";
import { Option } from "../../select-v2/src/select.types.js";
import { Props } from "../../select-v2/src/useProps.js";
import { TagTooltipProps } from "./select.js";
import { OptionBasic, OptionPublicInstance, OptionValue, SelectContext, SelectStates } from "./type.js";
import "../../../index.js";
import { Options, Placement } from "../../popper/index.js";
import * as vue from "vue";
import { VNode } from "vue";
import * as _vueuse_core0 from "@vueuse/core";

//#region ../../packages/components/select/src/select.vue.d.ts
declare const _default: typeof __VLS_export;
declare const __VLS_export: vue.DefineComponent<vue.ExtractPropTypes<{
  ariaLabel: StringConstructor;
  emptyValues: ArrayConstructor;
  valueOnClear: EpPropFinalized<(new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null) | (((new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null)) | null)[], unknown, unknown, undefined, boolean>;
  name: StringConstructor;
  id: StringConstructor;
  modelValue: EpPropFinalized<(new (...args: any[]) => string | number | boolean | Record<string, any> | EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown>[]) | (() => EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown> | EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown>[] | null) | (((new (...args: any[]) => string | number | boolean | Record<string, any> | EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown>[]) | (() => EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown> | EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown>[] | null)) | null)[], unknown, unknown, undefined, boolean>;
  autocomplete: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
  automaticDropdown: BooleanConstructor;
  size: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  effect: EpPropFinalized<(new (...args: any[]) => string) | (() => PopperEffect) | (((new (...args: any[]) => string) | (() => PopperEffect)) | null)[], unknown, unknown, string, boolean>;
  disabled: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  clearable: BooleanConstructor;
  filterable: BooleanConstructor;
  allowCreate: BooleanConstructor;
  loading: BooleanConstructor;
  popperClass: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
  popperStyle: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | vue.CSSProperties) | (() => string | vue.CSSProperties) | (((new (...args: any[]) => string | vue.CSSProperties) | (() => string | vue.CSSProperties)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  popperOptions: EpPropFinalized<(new (...args: any[]) => Partial<Options>) | (() => Partial<Options>) | (((new (...args: any[]) => Partial<Options>) | (() => Partial<Options>)) | null)[], unknown, unknown, () => Partial<Options>, boolean>;
  remote: BooleanConstructor;
  debounce: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  loadingText: StringConstructor;
  noMatchText: StringConstructor;
  noDataText: StringConstructor;
  remoteMethod: {
    readonly type: vue.PropType<(query: string) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  filterMethod: {
    readonly type: vue.PropType<(query: string) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  multiple: BooleanConstructor;
  multipleLimit: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  placeholder: {
    readonly type: vue.PropType<string>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  defaultFirstOption: BooleanConstructor;
  reserveKeyword: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
  valueKey: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
  collapseTags: BooleanConstructor;
  collapseTagsTooltip: BooleanConstructor;
  tagTooltip: EpPropFinalized<(new (...args: any[]) => TagTooltipProps) | (() => TagTooltipProps) | (((new (...args: any[]) => TagTooltipProps) | (() => TagTooltipProps)) | null)[], unknown, unknown, () => {}, boolean>;
  maxCollapseTags: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  teleported: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  persistent: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
  clearIcon: EpPropFinalized<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown, vue.DefineComponent<{}, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, boolean>;
  fitInputWidth: BooleanConstructor;
  suffixIcon: EpPropFinalized<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown, vue.DefineComponent<{}, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, boolean>;
  tagType: {
    default: string;
    type: vue.PropType<EpPropMergeType<StringConstructor, "info" | "primary" | "success" | "warning" | "danger", unknown>>;
    required: false;
    validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  tagEffect: {
    default: string;
    type: vue.PropType<EpPropMergeType<StringConstructor, "light" | "dark" | "plain", unknown>>;
    required: false;
    validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  validateEvent: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
  remoteShowSuffix: BooleanConstructor;
  showArrow: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
  offset: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  placement: EpPropFinalized<(new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement) | (((new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement)) | null)[], Placement, unknown, string, boolean>;
  fallbackPlacements: EpPropFinalized<(new (...args: any[]) => Placement[]) | (() => Placement[]) | (((new (...args: any[]) => Placement[]) | (() => Placement[])) | null)[], unknown, unknown, string[], boolean>;
  tabindex: EpPropFinalized<(NumberConstructor | StringConstructor)[], unknown, unknown, number, boolean>;
  appendTo: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>) | (((new (...args: any[]) => string | HTMLElement) | (() => EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  options: {
    readonly type: vue.PropType<Record<string, any>[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  props: EpPropFinalized<(new (...args: any[]) => Props) | (() => Props) | (((new (...args: any[]) => Props) | (() => Props)) | null)[], unknown, unknown, () => Required<Props>, boolean>;
}>, {
  modelValue: vue.ComputedRef<string | number | boolean | any[] | Record<string, any> | null | undefined>;
  selectedLabel: vue.ComputedRef<string | string[]>;
  calculatorRef: vue.ShallowRef<HTMLElement | undefined, HTMLElement | undefined>;
  inputStyle: vue.ComputedRef<{
    minWidth: string;
  }>;
  getLabel: (option: Option) => any;
  getValue: (option: Option) => any;
  getOptions: (option: Option) => any;
  getDisabled: (option: Option) => any;
  getOptionProps: (option: Record<string, any>) => {
    label: any;
    value: any;
    disabled: any;
  };
  inputId: vue.Ref<string | undefined, string | undefined>;
  contentId: vue.Ref<string, string>;
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
  states: {
    inputValue: string;
    options: Map<EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown>, OptionPublicInstance> & Omit<Map<EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown>, OptionPublicInstance>, keyof Map<any, any>>;
    cachedOptions: Map<EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown>, OptionPublicInstance> & Omit<Map<EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown>, OptionPublicInstance>, keyof Map<any, any>>;
    optionValues: OptionValue[];
    selected: {
      index: number;
      value: OptionValue;
      currentLabel: OptionPublicInstance["currentLabel"];
      isDisabled?: OptionPublicInstance["isDisabled"] | undefined;
    }[];
    hoveringIndex: number;
    inputHovering: boolean;
    selectionWidth: number;
    collapseItemWidth: number;
    previousQuery: string | null;
    selectedLabel: string;
    menuVisibleOnFocus: boolean;
    isBeforeHide: boolean;
  };
  isFocused: vue.Ref<boolean, boolean>;
  expanded: vue.Ref<boolean, boolean>;
  optionsArray: vue.ComputedRef<OptionPublicInstance[]>;
  hoverOption: vue.Ref<any, any>;
  selectSize: vue.ComputedRef<"" | "default" | "small" | "large">;
  filteredOptionsCount: vue.ComputedRef<number>;
  updateTooltip: () => void;
  updateTagTooltip: () => void;
  debouncedOnInputChange: _vueuse_core0.PromisifyFn<() => void>;
  onInput: (event: Event) => void;
  deletePrevTag: (e: KeyboardEvent) => void;
  deleteTag: (event: MouseEvent, tag: OptionBasic) => void;
  deleteSelected: (event: Event) => void;
  handleOptionSelect: (option: OptionPublicInstance) => void;
  scrollToOption: (option: OptionPublicInstance | OptionPublicInstance[] | SelectStates["selected"]) => void;
  hasModelValue: vue.ComputedRef<boolean>;
  shouldShowPlaceholder: vue.ComputedRef<boolean>;
  currentPlaceholder: vue.ComputedRef<string>;
  mouseEnterEventName: vue.ComputedRef<"mouseenter" | null>;
  needStatusIcon: vue.ComputedRef<boolean>;
  showClearBtn: vue.ComputedRef<boolean>;
  iconComponent: vue.ComputedRef<EpPropMergeType<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown>>;
  iconReverse: vue.ComputedRef<string>;
  validateState: vue.ComputedRef<"error" | "" | "success" | "validating">;
  validateIcon: vue.ComputedRef<"" | vue.Component>;
  showNewOption: vue.ComputedRef<boolean>;
  updateOptions: () => void;
  collapseTagSize: vue.ComputedRef<"default" | "small">;
  setSelected: () => void;
  selectDisabled: vue.ComputedRef<boolean>;
  emptyText: vue.ComputedRef<string | null>;
  handleCompositionStart: (event: CompositionEvent) => void;
  handleCompositionUpdate: (event: CompositionEvent) => void;
  handleCompositionEnd: (event: CompositionEvent) => void;
  handleKeydown: (e: KeyboardEvent) => void;
  onOptionCreate: (vm: OptionPublicInstance) => void;
  onOptionDestroy: (key: OptionValue, vm: OptionPublicInstance) => void;
  handleMenuEnter: () => void;
  focus: () => void;
  blur: () => void;
  handleClearClick: (event: Event) => void;
  handleClickOutside: (event: Event) => void;
  handleEsc: () => void;
  toggleMenu: (event?: Event) => void;
  selectOption: () => void;
  getValueKey: (item: OptionPublicInstance | SelectStates["selected"][0]) => any;
  navigateOptions: (direction: "prev" | "next") => void;
  dropdownMenuVisible: vue.WritableComputedRef<boolean, boolean>;
  showTagList: vue.ComputedRef<{
    index: number;
    value: OptionValue;
    currentLabel: OptionPublicInstance["currentLabel"];
    isDisabled?: OptionPublicInstance["isDisabled"] | undefined;
  }[]>;
  collapseTagList: vue.ComputedRef<{
    index: number;
    value: OptionValue;
    currentLabel: OptionPublicInstance["currentLabel"];
    isDisabled?: OptionPublicInstance["isDisabled"] | undefined;
  }[]>;
  popupScroll: (data: {
    scrollTop: number;
    scrollLeft: number;
  }) => void;
  getOption: (value: OptionValue) => {
    index: number;
    value: EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown>;
    currentLabel: any;
  } | {
    index: number;
    value: EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown>;
    currentLabel: string | number | boolean;
    readonly isDisabled: boolean;
  };
  tagStyle: vue.ComputedRef<{
    maxWidth: string;
  }>;
  collapseTagStyle: vue.ComputedRef<{
    maxWidth: string;
  }>;
  popperRef: vue.ComputedRef<HTMLElement | undefined>;
  inputRef: vue.Ref<HTMLInputElement | undefined, HTMLInputElement | undefined>;
  tooltipRef: vue.Ref<TooltipInstance | undefined, TooltipInstance | undefined>;
  tagTooltipRef: vue.Ref<TooltipInstance | undefined, TooltipInstance | undefined>;
  prefixRef: vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  suffixRef: vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  selectRef: vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  wrapperRef: vue.ShallowRef<HTMLElement | undefined, HTMLElement | undefined>;
  selectionRef: vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  scrollbarRef: vue.Ref<ScrollbarInstance | undefined, ScrollbarInstance | undefined>;
  menuRef: vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  tagMenuRef: vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  collapseItemRef: vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("blur" | "change" | "focus" | "update:modelValue" | "clear" | "visible-change" | "remove-tag" | "popup-scroll")[], "blur" | "change" | "focus" | "update:modelValue" | "clear" | "visible-change" | "remove-tag" | "popup-scroll", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
  ariaLabel: StringConstructor;
  emptyValues: ArrayConstructor;
  valueOnClear: EpPropFinalized<(new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null) | (((new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null)) | null)[], unknown, unknown, undefined, boolean>;
  name: StringConstructor;
  id: StringConstructor;
  modelValue: EpPropFinalized<(new (...args: any[]) => string | number | boolean | Record<string, any> | EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown>[]) | (() => EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown> | EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown>[] | null) | (((new (...args: any[]) => string | number | boolean | Record<string, any> | EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown>[]) | (() => EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown> | EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown>[] | null)) | null)[], unknown, unknown, undefined, boolean>;
  autocomplete: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
  automaticDropdown: BooleanConstructor;
  size: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  effect: EpPropFinalized<(new (...args: any[]) => string) | (() => PopperEffect) | (((new (...args: any[]) => string) | (() => PopperEffect)) | null)[], unknown, unknown, string, boolean>;
  disabled: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  clearable: BooleanConstructor;
  filterable: BooleanConstructor;
  allowCreate: BooleanConstructor;
  loading: BooleanConstructor;
  popperClass: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
  popperStyle: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | vue.CSSProperties) | (() => string | vue.CSSProperties) | (((new (...args: any[]) => string | vue.CSSProperties) | (() => string | vue.CSSProperties)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  popperOptions: EpPropFinalized<(new (...args: any[]) => Partial<Options>) | (() => Partial<Options>) | (((new (...args: any[]) => Partial<Options>) | (() => Partial<Options>)) | null)[], unknown, unknown, () => Partial<Options>, boolean>;
  remote: BooleanConstructor;
  debounce: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  loadingText: StringConstructor;
  noMatchText: StringConstructor;
  noDataText: StringConstructor;
  remoteMethod: {
    readonly type: vue.PropType<(query: string) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  filterMethod: {
    readonly type: vue.PropType<(query: string) => void>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  multiple: BooleanConstructor;
  multipleLimit: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  placeholder: {
    readonly type: vue.PropType<string>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  defaultFirstOption: BooleanConstructor;
  reserveKeyword: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
  valueKey: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
  collapseTags: BooleanConstructor;
  collapseTagsTooltip: BooleanConstructor;
  tagTooltip: EpPropFinalized<(new (...args: any[]) => TagTooltipProps) | (() => TagTooltipProps) | (((new (...args: any[]) => TagTooltipProps) | (() => TagTooltipProps)) | null)[], unknown, unknown, () => {}, boolean>;
  maxCollapseTags: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  teleported: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  persistent: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
  clearIcon: EpPropFinalized<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown, vue.DefineComponent<{}, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, boolean>;
  fitInputWidth: BooleanConstructor;
  suffixIcon: EpPropFinalized<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown, vue.DefineComponent<{}, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, boolean>;
  tagType: {
    default: string;
    type: vue.PropType<EpPropMergeType<StringConstructor, "info" | "primary" | "success" | "warning" | "danger", unknown>>;
    required: false;
    validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  tagEffect: {
    default: string;
    type: vue.PropType<EpPropMergeType<StringConstructor, "light" | "dark" | "plain", unknown>>;
    required: false;
    validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  validateEvent: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
  remoteShowSuffix: BooleanConstructor;
  showArrow: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
  offset: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  placement: EpPropFinalized<(new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement) | (((new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement)) | null)[], Placement, unknown, string, boolean>;
  fallbackPlacements: EpPropFinalized<(new (...args: any[]) => Placement[]) | (() => Placement[]) | (((new (...args: any[]) => Placement[]) | (() => Placement[])) | null)[], unknown, unknown, string[], boolean>;
  tabindex: EpPropFinalized<(NumberConstructor | StringConstructor)[], unknown, unknown, number, boolean>;
  appendTo: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>) | (((new (...args: any[]) => string | HTMLElement) | (() => EpPropMergeType<(new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement) | (((new (...args: any[]) => string | HTMLElement) | (() => string | HTMLElement)) | null)[], unknown, unknown>)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  options: {
    readonly type: vue.PropType<Record<string, any>[]>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  props: EpPropFinalized<(new (...args: any[]) => Props) | (() => Props) | (((new (...args: any[]) => Props) | (() => Props)) | null)[], unknown, unknown, () => Required<Props>, boolean>;
}>> & Readonly<{
  onChange?: ((...args: any[]) => any) | undefined;
  onBlur?: ((...args: any[]) => any) | undefined;
  onFocus?: ((...args: any[]) => any) | undefined;
  "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
  onClear?: ((...args: any[]) => any) | undefined;
  "onVisible-change"?: ((...args: any[]) => any) | undefined;
  "onRemove-tag"?: ((...args: any[]) => any) | undefined;
  "onPopup-scroll"?: ((...args: any[]) => any) | undefined;
}>, {
  offset: number;
  teleported: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  props: Props;
  effect: EpPropMergeType<(new (...args: any[]) => string) | (() => PopperEffect) | (((new (...args: any[]) => string) | (() => PopperEffect)) | null)[], unknown, unknown>;
  disabled: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  modelValue: EpPropMergeType<(new (...args: any[]) => string | number | boolean | Record<string, any> | EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown>[]) | (() => EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown> | EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown>[] | null) | (((new (...args: any[]) => string | number | boolean | Record<string, any> | EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown>[]) | (() => EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown> | EpPropMergeType<(BooleanConstructor | ObjectConstructor | NumberConstructor | StringConstructor)[], unknown, unknown>[] | null)) | null)[], unknown, unknown>;
  autocomplete: string;
  clearable: boolean;
  clearIcon: EpPropMergeType<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown>;
  suffixIcon: EpPropMergeType<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown>;
  tabindex: EpPropMergeType<(NumberConstructor | StringConstructor)[], unknown, unknown>;
  validateEvent: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  multiple: boolean;
  popperClass: string;
  fallbackPlacements: Placement[];
  placement: EpPropMergeType<(new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement) | (((new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement)) | null)[], Placement, unknown>;
  popperOptions: Partial<Options>;
  showArrow: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  persistent: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  valueKey: string;
  debounce: number;
  fitInputWidth: boolean;
  loading: boolean;
  valueOnClear: EpPropMergeType<(new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null) | (((new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null)) | null)[], unknown, unknown>;
  filterable: boolean;
  collapseTags: boolean;
  maxCollapseTags: number;
  collapseTagsTooltip: boolean;
  tagType: EpPropMergeType<StringConstructor, "info" | "primary" | "success" | "warning" | "danger", unknown>;
  tagEffect: EpPropMergeType<StringConstructor, "light" | "dark" | "plain", unknown>;
  automaticDropdown: boolean;
  allowCreate: boolean;
  remote: boolean;
  multipleLimit: number;
  defaultFirstOption: boolean;
  reserveKeyword: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  tagTooltip: TagTooltipProps;
  remoteShowSuffix: boolean;
}, {}, {
  ElSelectMenu: vue.DefineComponent<{}, {
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
    minWidth: vue.Ref<string, string>;
    popperClass: vue.ComputedRef<string>;
    isMultiple: vue.ComputedRef<boolean>;
    isFitInputWidth: vue.ComputedRef<boolean>;
  }, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
  ElOption: vue.DefineComponent<vue.ExtractPropTypes<{
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
  }>, {
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
    id: vue.Ref<string, string>;
    containerKls: vue.ComputedRef<string[]>;
    currentLabel: vue.ComputedRef<boolean | EpPropMergeType<(NumberConstructor | StringConstructor)[], unknown, unknown>>;
    itemSelected: vue.ComputedRef<boolean>;
    isDisabled: vue.ComputedRef<boolean>;
    select: SelectContext;
    visible: vue.Ref<boolean, boolean>;
    hover: vue.Ref<boolean, boolean>;
    states: {
      index: number;
      groupDisabled: boolean;
      visible: boolean;
      hover: boolean;
    };
    hoverItem: () => void;
    handleMousedown: (event: MouseEvent) => void;
    updateOption: (query: string) => void;
    selectOptionClick: () => void;
  }, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
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
  }>> & Readonly<{}>, {
    disabled: boolean;
    created: boolean;
  }, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
  ElOptions: vue.DefineComponent<{}, () => VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
  }>[], {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
  ElOptionGroup: vue.DefineComponent<vue.ExtractPropTypes<{
    label: StringConstructor;
    disabled: BooleanConstructor;
  }>, {
    groupRef: vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
    visible: vue.ComputedRef<boolean>;
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
  }, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
    label: StringConstructor;
    disabled: BooleanConstructor;
  }>> & Readonly<{}>, {
    disabled: boolean;
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
      wrapStyle: string | false | vue.CSSProperties | vue.StyleValue[] | null;
      wrapClass: string | string[];
      viewClass: string | string[];
      viewStyle: string | false | vue.CSSProperties | vue.StyleValue[] | null;
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
      wrapStyle: string | false | vue.CSSProperties | vue.StyleValue[] | null;
      wrapClass: string | string[];
      viewClass: string | string[];
      viewStyle: string | false | vue.CSSProperties | vue.StyleValue[] | null;
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
    wrapStyle: string | false | vue.CSSProperties | vue.StyleValue[] | null;
    wrapClass: string | string[];
    viewClass: string | string[];
    viewStyle: string | false | vue.CSSProperties | vue.StyleValue[] | null;
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