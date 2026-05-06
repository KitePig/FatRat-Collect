import { ElRovingFocusGroupProps } from "./roving-focus-group.js";
import { InjectionKey, Ref, StyleValue } from "vue";

//#region ../../packages/components/roving-focus-group/src/tokens.d.ts
type EventHandler<T = Event> = (e: T) => void;
type RovingGroupInjectionContext = {
  currentTabbedId: Ref<string | null>;
  dir: Ref<ElRovingFocusGroupProps['dir']>;
  loop: Ref<ElRovingFocusGroupProps['loop']>;
  orientation: Ref<ElRovingFocusGroupProps['orientation']>;
  tabIndex: Ref<number>;
  rovingFocusGroupRef: Ref<HTMLElement | undefined>;
  rovingFocusGroupRootStyle: Ref<StyleValue>;
  onBlur: EventHandler;
  onFocus: EventHandler<FocusEvent>;
  onMousedown: EventHandler;
  onItemFocus: (id: string) => void;
  onItemShiftTab: () => void;
  onKeydown: EventHandler<KeyboardEvent>;
};
type RovingFocusGroupItemInjectionContext = {
  rovingFocusGroupItemRef: Ref<HTMLElement | undefined>;
  tabIndex: Ref<number>;
  handleMousedown: EventHandler;
  handleFocus: EventHandler;
  handleKeydown: EventHandler;
};
declare const ROVING_FOCUS_GROUP_INJECTION_KEY: InjectionKey<RovingGroupInjectionContext>;
declare const ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY: InjectionKey<RovingFocusGroupItemInjectionContext>;
//#endregion
export { ROVING_FOCUS_GROUP_INJECTION_KEY, ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY, RovingFocusGroupItemInjectionContext, RovingGroupInjectionContext };