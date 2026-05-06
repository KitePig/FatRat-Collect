import { ObjectDirective } from "vue";

//#region ../../packages/directives/trap-focus/index.d.ts
declare const FOCUSABLE_CHILDREN = "_trap-focus-children";
declare const TRAP_FOCUS_HANDLER = "_trap-focus-handler";
interface TrapFocusElement extends HTMLElement {
  [FOCUSABLE_CHILDREN]: HTMLElement[];
  [TRAP_FOCUS_HANDLER]: (e: KeyboardEvent) => void;
}
declare const TrapFocus: ObjectDirective;
//#endregion
export { FOCUSABLE_CHILDREN, TRAP_FOCUS_HANDLER, TrapFocusElement, TrapFocus as default };