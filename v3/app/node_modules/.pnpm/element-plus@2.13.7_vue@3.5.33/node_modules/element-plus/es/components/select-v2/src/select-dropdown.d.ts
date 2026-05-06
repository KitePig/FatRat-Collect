import { Option } from "./select.types.js";
import { FixedSizeListInstance } from "../../virtual-list/src/components/fixed-size-list.js";
import { DynamicSizeListInstance } from "../../virtual-list/src/components/dynamic-size-list.js";
import "../../virtual-list/index.js";
import { ComponentPublicInstance, ComputedRef, ExtractPropTypes, Ref } from "vue";
import "vue/jsx-runtime";

//#region ../../packages/components/select-v2/src/select-dropdown.d.ts
declare const props: {
  loading: BooleanConstructor;
  data: {
    type: ArrayConstructor;
    required: true;
  };
  hoveringIndex: NumberConstructor;
  width: NumberConstructor;
  id: StringConstructor;
  ariaLabel: StringConstructor;
};
interface SelectDropdownExposed {
  listRef: Ref<FixedSizeListInstance | DynamicSizeListInstance | undefined>;
  isSized: ComputedRef<boolean>;
  isItemDisabled: (modelValue: any[] | any, selected: boolean) => boolean;
  isItemHovering: (target: number) => boolean;
  isItemSelected: (modelValue: any[] | any, target: Option) => boolean;
  scrollToItem: (index: number) => void;
  resetScrollTop: () => void;
}
type SelectDropdownInstance = ComponentPublicInstance<ExtractPropTypes<typeof props>, SelectDropdownExposed>;
//#endregion
export { SelectDropdownInstance };