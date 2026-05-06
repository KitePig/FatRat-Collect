import { ComponentSize } from "../../../../constants/size.js";
import { Translator } from "../../../../hooks/use-locale/index.js";
import "../../../../hooks/index.js";
import { CheckboxProps, CheckboxValueType } from "../../../checkbox/src/checkbox.js";
import { _default as _default$1 } from "../../../checkbox/src/checkbox-button.vue.js";
import { _default as _default$2 } from "../../../checkbox/src/checkbox-group.vue.js";
import "../../../checkbox/index.js";
import { TableColumnCtx } from "../table-column/defaults.js";
import { Store } from "../store/index.js";
import { TableLayout } from "../table-layout.js";
import { DefaultRow, Sort, TableSortOrder } from "../table/defaults.js";
import "../../../../index.js";
import * as vue from "vue";
import { ComponentInternalInstance, PropType, Ref } from "vue";

//#region ../../packages/components/table/src/table-header/index.d.ts
interface TableHeader extends ComponentInternalInstance {
  state: {
    onColumnsChange: (layout: TableLayout<any>) => void;
    onScrollableChange: (layout: TableLayout<any>) => void;
  };
  filterPanels: Ref<DefaultRow>;
}
interface TableHeaderProps<T extends DefaultRow> {
  fixed: string;
  store: Store<T>;
  border: boolean;
  defaultSort: Sort;
  allowDragLastColumn: boolean;
}
declare const _default: vue.DefineComponent<vue.ExtractPropTypes<{
  fixed: {
    type: StringConstructor;
    default: string;
  };
  store: {
    required: true;
    type: PropType<TableHeaderProps<any>["store"]>;
  };
  border: BooleanConstructor;
  defaultSort: {
    type: PropType<TableHeaderProps<any>["defaultSort"]>;
    default: () => {
      prop: string;
      order: string;
    };
  };
  appendFilterPanelTo: {
    type: StringConstructor;
  };
  allowDragLastColumn: {
    type: BooleanConstructor;
  };
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
  t: Translator;
  filterPanels: Ref<{}, {}>;
  onColumnsChange: (layout: TableLayout<DefaultRow>) => void;
  onScrollableChange: (layout: TableLayout<DefaultRow>) => void;
  columnRows: vue.ComputedRef<TableColumnCtx<any>[][]>;
  getHeaderRowClass: (rowIndex: number) => string;
  getHeaderRowStyle: (rowIndex: number) => any;
  getHeaderCellClass: (rowIndex: number, columnIndex: number, row: any, column: TableColumnCtx<any>) => string;
  getHeaderCellStyle: (rowIndex: number, columnIndex: number, row: any, column: TableColumnCtx<any>) => vue.CSSProperties;
  handleHeaderClick: (event: Event, column: TableColumnCtx<any>) => void;
  handleHeaderContextMenu: (event: Event, column: TableColumnCtx<any>) => void;
  handleMouseDown: (event: MouseEvent, column: TableColumnCtx<any>) => void;
  handleMouseMove: (event: MouseEvent, column: TableColumnCtx<any>) => void;
  handleMouseOut: () => void;
  handleSortClick: (event: Event, column: TableColumnCtx<any>, givenOrder?: TableSortOrder | boolean) => void;
  handleFilterClick: (event: Event) => void;
  isGroup: vue.ComputedRef<boolean>;
  toggleAllSelection: (event: Event) => void;
  saveIndexSelection: vue.Reactive<Map<any, any>>;
  isTableLayoutAuto: boolean;
  theadRef: Ref<any, any>;
  updateFixedColumnStyle: () => void;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
  fixed: {
    type: StringConstructor;
    default: string;
  };
  store: {
    required: true;
    type: PropType<TableHeaderProps<any>["store"]>;
  };
  border: BooleanConstructor;
  defaultSort: {
    type: PropType<TableHeaderProps<any>["defaultSort"]>;
    default: () => {
      prop: string;
      order: string;
    };
  };
  appendFilterPanelTo: {
    type: StringConstructor;
  };
  allowDragLastColumn: {
    type: BooleanConstructor;
  };
}>> & Readonly<{}>, {
  fixed: string;
  border: boolean;
  defaultSort: Sort;
  allowDragLastColumn: boolean;
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
export { TableHeader, TableHeaderProps, _default as default };