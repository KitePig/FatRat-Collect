import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import { Mutable } from "../../../utils/typescript.js";
import "../../../utils/index.js";
import { _default } from "./transfer.vue.js";
import * as vue from "vue";
import { ComponentInstance, ExtractPublicPropTypes, VNode, h } from "vue";
import { ComponentExposed } from "vue-component-type-helpers";

//#region ../../packages/components/transfer/src/transfer.d.ts
type TransferKey = string | number;
type TransferDirection = 'left' | 'right';
type TransferDataItem = Record<string, any>;
type renderContent<T extends TransferDataItem = TransferDataItem> = (h: typeof h, option: T) => VNode | VNode[];
interface TransferFormat {
  noChecked?: string;
  hasChecked?: string;
}
interface TransferPropsAlias {
  label?: string;
  key?: string;
  disabled?: string;
}
interface TransferCheckedState {
  leftChecked: TransferKey[];
  rightChecked: TransferKey[];
}
declare const LEFT_CHECK_CHANGE_EVENT = "left-check-change";
declare const RIGHT_CHECK_CHANGE_EVENT = "right-check-change";
interface TransferProps<T extends TransferDataItem = TransferDataItem> {
  /**
   * @description data source
   */
  data?: T[];
  /**
   * @description custom list titles
   */
  titles?: [string, string];
  /**
   * @description custom button texts
   */
  buttonTexts?: [string, string];
  /**
   * @description placeholder for the filter input
   */
  filterPlaceholder?: string;
  /**
   * @description custom filter method
   */
  filterMethod?: (query: string, item: T) => boolean;
  /**
   * @description key array of initially checked data items of the left list
   */
  leftDefaultChecked?: TransferKey[];
  /**
   * @description key array of initially checked data items of the right list
   */
  rightDefaultChecked?: TransferKey[];
  /**
   * @description custom render function for data items
   */
  renderContent?: renderContent<T>;
  /**
   * @description binding value
   */
  modelValue?: TransferKey[];
  /**
   * @description texts for checking status in list header
   */
  format?: TransferFormat;
  /**
   * @description whether Transfer is filterable
   */
  filterable?: boolean;
  /**
   * @description prop aliases for data source
   */
  props?: TransferPropsAlias;
  /**
   * @description order strategy for elements in the target list. If set to `original`, the elements will keep the same order as the data source. If set to `push`, the newly added elements will be pushed to the bottom. If set to `unshift`, the newly added elements will be inserted on the top
   */
  targetOrder?: 'original' | 'push' | 'unshift';
  /**
   * @description whether to trigger form validation
   */
  validateEvent?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `TransferProps` instead.
 */
declare const transferProps: {
  readonly data: EpPropFinalized<(new (...args: any[]) => TransferDataItem[]) | (() => TransferDataItem[]) | (((new (...args: any[]) => TransferDataItem[]) | (() => TransferDataItem[])) | null)[], unknown, unknown, () => never[], boolean>;
  readonly titles: EpPropFinalized<(new (...args: any[]) => [string, string]) | (() => [string, string]) | (((new (...args: any[]) => [string, string]) | (() => [string, string])) | null)[], unknown, unknown, () => never[], boolean>;
  readonly buttonTexts: EpPropFinalized<(new (...args: any[]) => [string, string]) | (() => [string, string]) | (((new (...args: any[]) => [string, string]) | (() => [string, string])) | null)[], unknown, unknown, () => never[], boolean>;
  readonly filterPlaceholder: StringConstructor;
  readonly filterMethod: {
    readonly type: vue.PropType<(query: string, item: TransferDataItem) => boolean>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly leftDefaultChecked: EpPropFinalized<(new (...args: any[]) => TransferKey[]) | (() => TransferKey[]) | (((new (...args: any[]) => TransferKey[]) | (() => TransferKey[])) | null)[], unknown, unknown, () => never[], boolean>;
  readonly rightDefaultChecked: EpPropFinalized<(new (...args: any[]) => TransferKey[]) | (() => TransferKey[]) | (((new (...args: any[]) => TransferKey[]) | (() => TransferKey[])) | null)[], unknown, unknown, () => never[], boolean>;
  readonly renderContent: {
    readonly type: vue.PropType<renderContent<TransferDataItem>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly modelValue: EpPropFinalized<(new (...args: any[]) => TransferKey[]) | (() => TransferKey[]) | (((new (...args: any[]) => TransferKey[]) | (() => TransferKey[])) | null)[], unknown, unknown, () => never[], boolean>;
  readonly format: EpPropFinalized<(new (...args: any[]) => TransferFormat) | (() => TransferFormat) | (((new (...args: any[]) => TransferFormat) | (() => TransferFormat)) | null)[], unknown, unknown, () => {}, boolean>;
  readonly filterable: BooleanConstructor;
  readonly props: EpPropFinalized<(new (...args: any[]) => TransferPropsAlias) | (() => TransferPropsAlias) | (((new (...args: any[]) => TransferPropsAlias) | (() => TransferPropsAlias)) | null)[], unknown, unknown, () => Mutable<{
    readonly label: "label";
    readonly key: "key";
    readonly disabled: "disabled";
  }>, boolean>;
  readonly targetOrder: EpPropFinalized<StringConstructor, "push" | "unshift" | "original", unknown, "original", boolean>;
  readonly validateEvent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
};
/**
 * @deprecated Removed after 3.0.0, Use `TransferProps` instead.
 */
type TransferPropsPublic = ExtractPublicPropTypes<typeof transferProps>;
declare const transferCheckedChangeFn: (value: TransferKey[], movedKeys?: TransferKey[]) => boolean;
declare const transferEmits: {
  change: (value: TransferKey[], direction: TransferDirection, movedKeys: TransferKey[]) => boolean;
  "update:modelValue": (value: TransferKey[]) => boolean;
  "left-check-change": (value: TransferKey[], movedKeys?: TransferKey[]) => boolean;
  "right-check-change": (value: TransferKey[], movedKeys?: TransferKey[]) => boolean;
};
type TransferEmits = typeof transferEmits;
type TransferInstance = ComponentInstance<typeof _default> & ComponentExposed<typeof _default>;
//#endregion
export { LEFT_CHECK_CHANGE_EVENT, RIGHT_CHECK_CHANGE_EVENT, TransferCheckedState, TransferDataItem, TransferDirection, TransferEmits, TransferFormat, TransferInstance, TransferKey, TransferProps, TransferPropsAlias, TransferPropsPublic, renderContent, transferCheckedChangeFn, transferEmits, transferProps };