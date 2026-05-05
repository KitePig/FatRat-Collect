import { TooltipInstance } from "../../tooltip/src/tooltip.js";
import "../../tooltip/index.js";
import { Option } from "./select.types.js";
import { OptionV2Props, SelectV2Instance, SelectV2Props } from "./defaults.js";
import { InjectionKey, Ref } from "vue";

//#region ../../packages/components/select-v2/src/token.d.ts
interface SelectV2Context {
  props: SelectV2Props;
  expanded: Ref<boolean>;
  tooltipRef: Ref<TooltipInstance | undefined>;
  contentId: Ref<string>;
  onSelect: (option: Option) => void;
  onHover: (idx?: number) => void;
  onKeyboardNavigate: (direction: 'forward' | 'backward') => void;
  onKeyboardSelect: () => void;
}
declare const selectV2InjectionKey: InjectionKey<SelectV2Context>;
//#endregion
export { SelectV2Context, selectV2InjectionKey };