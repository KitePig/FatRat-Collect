import * as vue from "vue";

//#region ../../packages/components/focus-trap/src/utils.d.ts
declare const focusReason: vue.Ref<"pointer" | "keyboard" | undefined, "pointer" | "keyboard" | undefined>;
declare const lastUserFocusTimestamp: vue.Ref<number, number>;
declare const lastAutomatedFocusTimestamp: vue.Ref<number, number>;
type FocusLayer = {
  paused: boolean;
  pause: () => void;
  resume: () => void;
};
type FocusStack = FocusLayer[];
declare const obtainAllFocusableElements: (element: HTMLElement) => HTMLElement[];
declare const getVisibleElement: (elements: HTMLElement[], container: HTMLElement) => HTMLElement | undefined;
declare const isHidden: (element: HTMLElement, container: HTMLElement) => boolean;
declare const getEdges: (container: HTMLElement) => (HTMLElement | undefined)[];
declare const tryFocus: (element?: HTMLElement | {
  focus: () => void;
} | null, shouldSelect?: boolean) => void;
declare const focusFirstDescendant: (elements: HTMLElement[], shouldSelect?: boolean) => void;
declare const focusableStack: {
  push: (layer: FocusLayer) => void;
  remove: (layer: FocusLayer) => void;
};
declare const isFocusCausedByUserEvent: () => boolean;
declare const useFocusReason: () => {
  focusReason: typeof focusReason;
  lastUserFocusTimestamp: typeof lastUserFocusTimestamp;
  lastAutomatedFocusTimestamp: typeof lastAutomatedFocusTimestamp;
};
declare const createFocusOutPreventedEvent: (detail: CustomEventInit["detail"]) => CustomEvent<any>;
//#endregion
export { FocusLayer, FocusStack, createFocusOutPreventedEvent, focusFirstDescendant, focusableStack, getEdges, getVisibleElement, isFocusCausedByUserEvent, isHidden, obtainAllFocusableElements, tryFocus, useFocusReason };