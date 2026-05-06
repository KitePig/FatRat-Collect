import { ComponentSize } from "../../../../constants/size.js";
import { CheckboxProps, CheckboxValueType } from "../../../checkbox/src/checkbox.js";
import { _default as _default$1 } from "../../../checkbox/src/checkbox-button.vue.js";
import { _default as _default$2 } from "../../../checkbox/src/checkbox-group.vue.js";
import "../../../checkbox/index.js";
import { UseTooltipProps } from "../../../tooltip/src/tooltip.js";
import { TableColumnCtx } from "./defaults.js";
import { TableSortOrder } from "../table/defaults.js";
import "../../../../index.js";
import * as vue from "vue";

//#region ../../packages/components/table/src/table-column/index.d.ts
declare const _default: vue.DefineComponent<vue.ExtractPropTypes<{
  type: {
    type: StringConstructor;
    default: string;
  };
  label: StringConstructor;
  className: StringConstructor;
  labelClassName: StringConstructor;
  property: StringConstructor;
  prop: StringConstructor;
  width: {
    type: (NumberConstructor | StringConstructor)[];
    default: string;
  };
  minWidth: {
    type: (NumberConstructor | StringConstructor)[];
    default: string;
  };
  renderHeader: vue.PropType<TableColumnCtx<any>["renderHeader"]>;
  sortable: {
    type: (BooleanConstructor | StringConstructor)[];
    default: boolean;
  };
  sortMethod: vue.PropType<TableColumnCtx<any>["sortMethod"]>;
  sortBy: vue.PropType<TableColumnCtx<any>["sortBy"]>;
  resizable: {
    type: BooleanConstructor;
    default: boolean;
  };
  columnKey: StringConstructor;
  align: StringConstructor;
  headerAlign: StringConstructor;
  showOverflowTooltip: {
    type: vue.PropType<TableColumnCtx<any>["showOverflowTooltip"]>;
    default: undefined;
  };
  tooltipFormatter: vue.PropType<TableColumnCtx<any>["tooltipFormatter"]>;
  fixed: (BooleanConstructor | StringConstructor)[];
  formatter: vue.PropType<TableColumnCtx<any>["formatter"]>;
  selectable: vue.PropType<TableColumnCtx<any>["selectable"]>;
  reserveSelection: BooleanConstructor;
  filterMethod: vue.PropType<TableColumnCtx<any>["filterMethod"]>;
  filteredValue: vue.PropType<TableColumnCtx<any>["filteredValue"]>;
  filters: vue.PropType<TableColumnCtx<any>["filters"]>;
  filterPlacement: StringConstructor;
  filterMultiple: {
    type: BooleanConstructor;
    default: boolean;
  };
  filterClassName: StringConstructor;
  index: vue.PropType<TableColumnCtx<any>["index"]>;
  sortOrders: {
    type: vue.PropType<TableColumnCtx<any>["sortOrders"]>;
    default: () => (string | null)[];
    validator: (val: TableColumnCtx<any>["sortOrders"]) => boolean;
  };
}>, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
  type: {
    type: StringConstructor;
    default: string;
  };
  label: StringConstructor;
  className: StringConstructor;
  labelClassName: StringConstructor;
  property: StringConstructor;
  prop: StringConstructor;
  width: {
    type: (NumberConstructor | StringConstructor)[];
    default: string;
  };
  minWidth: {
    type: (NumberConstructor | StringConstructor)[];
    default: string;
  };
  renderHeader: vue.PropType<TableColumnCtx<any>["renderHeader"]>;
  sortable: {
    type: (BooleanConstructor | StringConstructor)[];
    default: boolean;
  };
  sortMethod: vue.PropType<TableColumnCtx<any>["sortMethod"]>;
  sortBy: vue.PropType<TableColumnCtx<any>["sortBy"]>;
  resizable: {
    type: BooleanConstructor;
    default: boolean;
  };
  columnKey: StringConstructor;
  align: StringConstructor;
  headerAlign: StringConstructor;
  showOverflowTooltip: {
    type: vue.PropType<TableColumnCtx<any>["showOverflowTooltip"]>;
    default: undefined;
  };
  tooltipFormatter: vue.PropType<TableColumnCtx<any>["tooltipFormatter"]>;
  fixed: (BooleanConstructor | StringConstructor)[];
  formatter: vue.PropType<TableColumnCtx<any>["formatter"]>;
  selectable: vue.PropType<TableColumnCtx<any>["selectable"]>;
  reserveSelection: BooleanConstructor;
  filterMethod: vue.PropType<TableColumnCtx<any>["filterMethod"]>;
  filteredValue: vue.PropType<TableColumnCtx<any>["filteredValue"]>;
  filters: vue.PropType<TableColumnCtx<any>["filters"]>;
  filterPlacement: StringConstructor;
  filterMultiple: {
    type: BooleanConstructor;
    default: boolean;
  };
  filterClassName: StringConstructor;
  index: vue.PropType<TableColumnCtx<any>["index"]>;
  sortOrders: {
    type: vue.PropType<TableColumnCtx<any>["sortOrders"]>;
    default: () => (string | null)[];
    validator: (val: TableColumnCtx<any>["sortOrders"]) => boolean;
  };
}>> & Readonly<{}>, {
  type: string;
  minWidth: string | number;
  width: string | number;
  resizable: boolean;
  showOverflowTooltip: boolean | Partial<Pick<UseTooltipProps, "offset" | "appendTo" | "effect" | "enterable" | "popperClass" | "placement" | "popperOptions" | "showArrow" | "transition" | "showAfter" | "hideAfter">> | undefined;
  sortOrders: (TableSortOrder | null)[];
  sortable: string | boolean;
  reserveSelection: boolean;
  filterMultiple: boolean;
}, {}, {
  ElCheckbox: {
    new (...args: any[]): vue.CreateComponentPublicInstanceWithMixins<Readonly<CheckboxProps> & Readonly<{
      onChange?: ((val: CheckboxValueType) => any) | undefined;
      "onUpdate:modelValue"?: ((val: CheckboxValueType) => any) | undefined;
    }>, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
      change: (val: CheckboxValueType) => void;
      "update:modelValue": (val: CheckboxValueType) => void;
    }, vue.PublicProps, {
      id: string;
      disabled: boolean;
      modelValue: number | string | boolean;
      validateEvent: boolean;
      name: string;
      value: string | boolean | number | object;
      label: string | boolean | number | object;
      trueValue: string | number;
      falseValue: string | number;
      trueLabel: string | number;
      falseLabel: string | number;
    }, false, {}, {}, vue.GlobalComponents, vue.GlobalDirectives, string, {}, any, vue.ComponentProvideOptions, {
      P: {};
      B: {};
      D: {};
      C: {};
      M: {};
      Defaults: {};
    }, Readonly<CheckboxProps> & Readonly<{
      onChange?: ((val: CheckboxValueType) => any) | undefined;
      "onUpdate:modelValue"?: ((val: CheckboxValueType) => any) | undefined;
    }>, {}, {}, {}, {}, {
      id: string;
      disabled: boolean;
      modelValue: number | string | boolean;
      validateEvent: boolean;
      name: string;
      value: string | boolean | number | object;
      label: string | boolean | number | object;
      trueValue: string | number;
      falseValue: string | number;
      trueLabel: string | number;
      falseLabel: string | number;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
  } & vue.ComponentOptionsBase<Readonly<CheckboxProps> & Readonly<{
    onChange?: ((val: CheckboxValueType) => any) | undefined;
    "onUpdate:modelValue"?: ((val: CheckboxValueType) => any) | undefined;
  }>, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
    change: (val: CheckboxValueType) => void;
    "update:modelValue": (val: CheckboxValueType) => void;
  }, string, {
    id: string;
    disabled: boolean;
    modelValue: number | string | boolean;
    validateEvent: boolean;
    name: string;
    value: string | boolean | number | object;
    label: string | boolean | number | object;
    trueValue: string | number;
    falseValue: string | number;
    trueLabel: string | number;
    falseLabel: string | number;
  }, {}, string, {}, vue.GlobalComponents, vue.GlobalDirectives, string, vue.ComponentProvideOptions> & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps & (new () => {
    $slots: {
      default?: (props: {}) => any;
    };
  }) & vue.ObjectPlugin & {
    setPropsDefaults: (defaults: Partial<Omit<{
      readonly modelValue?: (number | string | boolean) | undefined;
      readonly label?: (string | boolean | number | object) | undefined;
      readonly value?: (string | boolean | number | object) | undefined;
      readonly indeterminate?: boolean | undefined;
      readonly disabled?: boolean | undefined;
      readonly checked?: boolean | undefined;
      readonly name?: string | undefined;
      readonly trueValue?: (string | number) | undefined;
      readonly falseValue?: (string | number) | undefined;
      readonly trueLabel?: (string | number) | undefined;
      readonly falseLabel?: (string | number) | undefined;
      readonly id?: string | undefined;
      readonly border?: boolean | undefined;
      readonly size?: ComponentSize | undefined;
      readonly tabindex?: (string | number) | undefined;
      readonly validateEvent?: boolean | undefined;
      readonly ariaLabel?: string | undefined;
      readonly ariaControls?: string | undefined;
      readonly onChange?: ((val: CheckboxValueType) => any) | undefined;
      readonly "onUpdate:modelValue"?: ((val: CheckboxValueType) => any) | undefined;
    } & vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, "onChange" | "onUpdate:modelValue" | keyof vue.VNodeProps | keyof vue.AllowedComponentProps>>) => void;
  } & {
    CheckboxButton: typeof _default$1;
    CheckboxGroup: typeof _default$2;
  };
}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { _default as default };