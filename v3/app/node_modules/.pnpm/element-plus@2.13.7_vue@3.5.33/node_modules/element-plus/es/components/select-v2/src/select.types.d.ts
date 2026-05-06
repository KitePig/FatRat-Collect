//#region ../../packages/components/select-v2/src/select.types.d.ts
type OptionCommon = Record<string, any>;
type Option = OptionCommon & {
  created?: boolean;
};
type OptionGroup = OptionCommon;
type OptionType = Option | OptionGroup;
type SelectStates = {
  inputValue: string;
  cachedOptions: Option[];
  createdOptions: Option[];
  hoveringIndex: number;
  inputHovering: boolean;
  selectionWidth: number;
  collapseItemWidth: number;
  previousQuery: string | null;
  previousValue: unknown;
  selectedLabel: string;
  menuVisibleOnFocus: boolean;
  isBeforeHide: boolean;
};
//#endregion
export { Option, OptionType, SelectStates };