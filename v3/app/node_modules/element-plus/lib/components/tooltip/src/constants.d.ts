import { Arrayable } from "../../../utils/typescript.js";
import "../../../utils/index.js";
import { TooltipTriggerType } from "./trigger.js";
import { InjectionKey, Ref } from "vue";

//#region ../../packages/components/tooltip/src/constants.d.ts
type ElTooltipInjectionContext = {
  controlled: Ref<boolean>;
  id: Ref<string>;
  open: Ref<boolean>;
  trigger: Ref<Arrayable<TooltipTriggerType>>;
  onOpen: (e?: Event) => void;
  onClose: (e?: Event) => void;
  onToggle: (e: Event) => void;
  onShow: () => void;
  onHide: () => void;
  onBeforeShow: () => void;
  onBeforeHide: () => void;
  updatePopper: () => void;
};
declare const TOOLTIP_INJECTION_KEY: InjectionKey<ElTooltipInjectionContext>;
//#endregion
export { ElTooltipInjectionContext, TOOLTIP_INJECTION_KEY };