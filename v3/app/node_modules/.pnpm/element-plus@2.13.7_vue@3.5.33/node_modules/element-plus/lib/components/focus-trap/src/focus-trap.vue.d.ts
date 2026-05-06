import * as vue from "vue";
import { PropType } from "vue";

//#region ../../packages/components/focus-trap/src/focus-trap.vue.d.ts
declare const _default: typeof __VLS_export;
declare const __VLS_export: vue.DefineComponent<vue.ExtractPropTypes<{
  loop: BooleanConstructor;
  trapped: BooleanConstructor;
  focusTrapEl: PropType<HTMLElement>;
  focusStartEl: {
    type: PropType<"container" | "first" | HTMLElement>;
    default: string;
  };
}>, {
  onKeydown: (e: KeyboardEvent) => void;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, ("focusin" | "focusout" | "focusAfterTrapped" | "focusAfterReleased" | "focusout-prevented" | "release-requested")[], "focusin" | "focusout" | "focusAfterTrapped" | "focusAfterReleased" | "focusout-prevented" | "release-requested", vue.PublicProps, Readonly<vue.ExtractPropTypes<{
  loop: BooleanConstructor;
  trapped: BooleanConstructor;
  focusTrapEl: PropType<HTMLElement>;
  focusStartEl: {
    type: PropType<"container" | "first" | HTMLElement>;
    default: string;
  };
}>> & Readonly<{
  onFocusin?: ((...args: any[]) => any) | undefined;
  onFocusout?: ((...args: any[]) => any) | undefined;
  onFocusAfterTrapped?: ((...args: any[]) => any) | undefined;
  onFocusAfterReleased?: ((...args: any[]) => any) | undefined;
  "onFocusout-prevented"?: ((...args: any[]) => any) | undefined;
  "onRelease-requested"?: ((...args: any[]) => any) | undefined;
}>, {
  loop: boolean;
  trapped: boolean;
  focusStartEl: HTMLElement | "first" | "container";
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { _default };