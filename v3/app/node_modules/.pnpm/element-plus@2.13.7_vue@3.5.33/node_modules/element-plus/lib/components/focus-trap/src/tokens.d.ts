import { InjectionKey, Ref } from "vue";

//#region ../../packages/components/focus-trap/src/tokens.d.ts
declare const FOCUS_AFTER_TRAPPED = "focus-trap.focus-after-trapped";
declare const FOCUS_AFTER_RELEASED = "focus-trap.focus-after-released";
declare const FOCUSOUT_PREVENTED = "focus-trap.focusout-prevented";
declare const FOCUS_AFTER_TRAPPED_OPTS: EventInit;
declare const FOCUSOUT_PREVENTED_OPTS: EventInit;
declare const ON_TRAP_FOCUS_EVT = "focusAfterTrapped";
declare const ON_RELEASE_FOCUS_EVT = "focusAfterReleased";
type FocusTrapInjectionContext = {
  focusTrapRef: Ref<HTMLElement | undefined>;
  onKeydown: (e: KeyboardEvent) => void;
};
declare const FOCUS_TRAP_INJECTION_KEY: InjectionKey<FocusTrapInjectionContext>;
//#endregion
export { FOCUSOUT_PREVENTED, FOCUSOUT_PREVENTED_OPTS, FOCUS_AFTER_RELEASED, FOCUS_AFTER_TRAPPED, FOCUS_AFTER_TRAPPED_OPTS, FOCUS_TRAP_INJECTION_KEY, FocusTrapInjectionContext, ON_RELEASE_FOCUS_EVT, ON_TRAP_FOCUS_EVT };