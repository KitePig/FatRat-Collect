import { SortOrder } from "../constants.js";
import { FunctionalComponent } from "vue";

//#region ../../packages/components/table-v2/src/components/sort-icon.d.ts
type SortIconProps = {
  sortOrder: SortOrder;
  ariaLabel?: string;
  class?: JSX.IntrinsicAttributes['class'];
};
declare const SortIcon: FunctionalComponent<SortIconProps>;
//#endregion
export { SortIcon };