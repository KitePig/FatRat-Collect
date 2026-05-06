import { SelectProps } from "./select.js";
import { optionProps } from "./option.js";
import { ComponentInternalInstance, ComponentPublicInstance, ComputedRef, ExtractPropTypes, ExtractPublicPropTypes, Ref } from "vue";

//#region ../../packages/components/select/src/type.d.ts
interface SelectGroupContext {
  disabled: boolean;
}
interface SelectContext {
  props: SelectProps;
  states: SelectStates;
  selectRef: HTMLElement | undefined;
  optionsArray: OptionPublicInstance[];
  setSelected(): void;
  onOptionCreate(vm: OptionPublicInstance): void;
  onOptionDestroy(key: OptionValue, vm: OptionPublicInstance): void;
  handleOptionSelect(vm: OptionPublicInstance): void;
}
type SelectStates = {
  inputValue: string;
  options: Map<OptionValue, OptionPublicInstance>;
  cachedOptions: Map<OptionValue, OptionPublicInstance>;
  optionValues: OptionValue[];
  selected: OptionBasic[];
  hoveringIndex: number;
  inputHovering: boolean;
  selectionWidth: number;
  collapseItemWidth: number;
  previousQuery: string | null;
  selectedLabel: string;
  menuVisibleOnFocus: boolean;
  isBeforeHide: boolean;
};
type OptionProps = ExtractPropTypes<typeof optionProps>;
interface OptionStates {
  index: number;
  groupDisabled: boolean;
  visible: boolean;
  hover: boolean;
}
interface OptionExposed {
  ns: unknown;
  id: unknown;
  containerKls: unknown;
  currentLabel: ComputedRef<string | number | boolean>;
  itemSelected: ComputedRef<boolean>;
  isDisabled: ComputedRef<boolean>;
  visible: Ref<boolean>;
  hover: Ref<boolean>;
  states: OptionStates;
  select: SelectContext;
  hoverItem: () => void;
  handleMousedown: (event: MouseEvent) => void;
  updateOption: (query: string) => void;
  selectOptionClick: () => void;
}
type OptionPublicInstance = ComponentPublicInstance<OptionProps, OptionExposed>;
type OptionValue = OptionProps['value'];
type OptionBasic = {
  index: number;
  value: OptionValue;
  currentLabel: OptionPublicInstance['currentLabel'];
  isDisabled?: OptionPublicInstance['isDisabled'];
};
//#endregion
export { OptionBasic, OptionPublicInstance, OptionValue, SelectContext, SelectGroupContext, SelectStates };