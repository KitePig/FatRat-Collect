import { IconPropType } from "../../../utils/vue/icon.js";
import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { ComponentSize } from "../../../constants/size.js";
import "../../../utils/index.js";
import { PopperEffect } from "../../popper/src/popper.js";
import { Node } from "../../cascader-panel/src/node.js";
import { CascaderNodePathValue, CascaderNodeValue, CascaderOption, CascaderProps, CascaderValue } from "../../cascader-panel/src/types.js";
import { CascaderCommonProps } from "../../cascader-panel/src/config.js";
import "../../cascader-panel/index.js";
import { UseEmptyValuesProps } from "../../../hooks/use-empty-values/index.js";
import "../../../hooks/index.js";
import { TagProps } from "../../tag/src/tag.js";
import "../../tag/index.js";
import { Placement } from "../../popper/index.js";
import * as vue from "vue";
import { StyleValue } from "vue";

//#region ../../packages/components/cascader/src/cascader.d.ts
type CascaderClassType = string | Record<string, boolean> | CascaderClassType[];
interface CascaderComponentProps extends CascaderCommonProps, UseEmptyValuesProps {
  /**
   * @description size of input
   */
  size?: ComponentSize;
  /**
   * @description placeholder of input
   */
  placeholder?: string;
  /**
   * @description whether Cascader is disabled
   */
  disabled?: boolean;
  /**
   * @description whether selected value can be cleared
   */
  clearable?: boolean;
  /**
   * @description custom clear icon component
   */
  clearIcon?: IconPropType;
  /**
   * @description whether the options can be searched
   */
  filterable?: boolean;
  /**
   * @description customize search logic, the first parameter is `node`, the second is `keyword`, and need return a boolean value indicating whether it hits.
   */
  filterMethod?: (node: Node, keyword: string) => boolean;
  /**
   * @description option label separator
   */
  separator?: string;
  /**
   * @description whether to display all levels of the selected value in the input
   */
  showAllLevels?: boolean;
  /**
   * @description whether to collapse tags in multiple selection mode
   */
  collapseTags?: boolean;
  /**
   * @description The max tags number to be shown. To use this, collapse-tags must be true
   */
  maxCollapseTags?: number;
  /**
   * @description whether show all selected tags when mouse hover text of collapse-tags. To use this, collapse-tags must be true
   */
  collapseTagsTooltip?: boolean;
  /**
   * @description The max height of collapse tags tooltip, in pixels. To use this, collapse-tags-tooltip must be true
   */
  maxCollapseTagsTooltipHeight?: string | number;
  /**
   * @description debounce delay when typing filter keyword, in milliseconds
   */
  debounce?: number;
  /**
   * @description hook function before filtering with the value to be filtered as its parameter. If `false` is returned or a `Promise` is returned and then is rejected, filtering will be aborted
   */
  beforeFilter?: (value: string) => boolean | Promise<any>;
  /**
   * @description position of dropdown
   */
  placement?: Placement;
  /**
   * @description list of possible positions for dropdown
   */
  fallbackPlacements?: Placement[];
  /**
   * @description custom class name for Cascader's dropdown
   */
  popperClass?: CascaderClassType;
  /**
   * @description custom style for Cascader's dropdown
   */
  popperStyle?: StyleValue;
  /**
   * @description whether cascader popup is teleported
   */
  teleported?: boolean;
  /**
   * @description tooltip theme, built-in theme: `dark` / `light`
   */
  effect?: PopperEffect;
  /**
   * @description tag type
   */
  tagType?: TagProps['type'];
  /**
   * @description tag effect
   */
  tagEffect?: TagProps['effect'];
  /**
   * @description whether to trigger form validation
   */
  validateEvent?: boolean;
  /**
   * @description when dropdown is inactive and `persistent` is `false`, dropdown will be destroyed
   */
  persistent?: boolean;
  /**
   * @description Use `parent` when you want things tidy (like "Entire Collection" instead of listing 100 items)
   * Use `child` when every single item matters (like important settings)
   */
  showCheckedStrategy?: 'parent' | 'child';
  /**
   * @description whether to check or uncheck node when clicking on the node
   */
  checkOnClickNode?: boolean;
  /**
   * @description whether to show the radio or checkbox prefix
   */
  showPrefix?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `CascaderComponentProps` instead.
 */
declare const cascaderProps: {
  emptyValues: ArrayConstructor;
  valueOnClear: EpPropFinalized<(new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null) | (((new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null)) | null)[], unknown, unknown, undefined, boolean>;
  size: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  placeholder: StringConstructor;
  disabled: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  clearable: BooleanConstructor;
  clearIcon: EpPropFinalized<(new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component) | (((new (...args: any[]) => (string | vue.Component) & {}) | (() => string | vue.Component)) | null)[], unknown, unknown, vue.DefineComponent<{}, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, boolean>;
  filterable: BooleanConstructor;
  filterMethod: EpPropFinalized<(new (...args: any[]) => (node: Node, keyword: string) => boolean) | (() => (node: Node, keyword: string) => boolean) | {
    (): (node: Node, keyword: string) => boolean;
    new (): any;
    readonly prototype: any;
  } | (((new (...args: any[]) => (node: Node, keyword: string) => boolean) | (() => (node: Node, keyword: string) => boolean) | {
    (): (node: Node, keyword: string) => boolean;
    new (): any;
    readonly prototype: any;
  }) | null)[], unknown, unknown, (node: Node, keyword: string) => boolean, boolean>;
  separator: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
  showAllLevels: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
  collapseTags: BooleanConstructor;
  maxCollapseTags: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  collapseTagsTooltip: BooleanConstructor;
  maxCollapseTagsTooltipHeight: {
    readonly type: vue.PropType<EpPropMergeType<(NumberConstructor | StringConstructor)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  debounce: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  beforeFilter: EpPropFinalized<(new (...args: any[]) => (value: string) => boolean | Promise<any>) | (() => (value: string) => boolean | Promise<any>) | {
    (): (value: string) => boolean | Promise<any>;
    new (): any;
    readonly prototype: any;
  } | (((new (...args: any[]) => (value: string) => boolean | Promise<any>) | (() => (value: string) => boolean | Promise<any>) | {
    (): (value: string) => boolean | Promise<any>;
    new (): any;
    readonly prototype: any;
  }) | null)[], unknown, unknown, () => true, boolean>;
  placement: EpPropFinalized<(new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement) | (((new (...args: any[]) => "top" | "auto" | "bottom" | "left" | "right" | "auto-start" | "auto-end" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end") | (() => Placement)) | null)[], Placement, unknown, string, boolean>;
  fallbackPlacements: EpPropFinalized<(new (...args: any[]) => Placement[]) | (() => Placement[]) | (((new (...args: any[]) => Placement[]) | (() => Placement[])) | null)[], unknown, unknown, string[], boolean>;
  popperClass: {
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
  popperStyle: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue) | (((new (...args: any[]) => string | false | vue.CSSProperties | StyleValue[]) | (() => StyleValue)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  teleported: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  effect: EpPropFinalized<(new (...args: any[]) => string) | (() => PopperEffect) | (((new (...args: any[]) => string) | (() => PopperEffect)) | null)[], unknown, unknown, string, boolean>;
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
  persistent: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
  showCheckedStrategy: EpPropFinalized<StringConstructor, string, unknown, string, boolean>;
  checkOnClickNode: BooleanConstructor;
  showPrefix: EpPropFinalized<BooleanConstructor, unknown, unknown, boolean, boolean>;
  modelValue: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | number | Record<string, any> | CascaderNodePathValue | (CascaderNodeValue | CascaderNodePathValue)[]) | (() => CascaderValue | null) | (((new (...args: any[]) => string | number | Record<string, any> | CascaderNodePathValue | (CascaderNodeValue | CascaderNodePathValue)[]) | (() => CascaderValue | null)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  options: EpPropFinalized<(new (...args: any[]) => CascaderOption[]) | (() => CascaderOption[]) | (((new (...args: any[]) => CascaderOption[]) | (() => CascaderOption[])) | null)[], unknown, unknown, () => CascaderOption[], boolean>;
  props: EpPropFinalized<(new (...args: any[]) => CascaderProps) | (() => CascaderProps) | (((new (...args: any[]) => CascaderProps) | (() => CascaderProps)) | null)[], unknown, unknown, () => CascaderProps, boolean>;
};
declare const cascaderEmits: {
  "update:modelValue": (value: CascaderValue | null | undefined) => boolean;
  change: (value: CascaderValue | null | undefined) => boolean;
  focus: (evt: FocusEvent) => boolean;
  blur: (evt: FocusEvent) => boolean;
  clear: () => boolean;
  visibleChange: (val: boolean) => boolean;
  expandChange: (val: CascaderValue) => boolean;
  removeTag: (val: Node["valueByOption"]) => boolean;
};
type CascaderEmits = typeof cascaderEmits;
//#endregion
export { CascaderComponentProps, CascaderEmits, cascaderEmits, cascaderProps };