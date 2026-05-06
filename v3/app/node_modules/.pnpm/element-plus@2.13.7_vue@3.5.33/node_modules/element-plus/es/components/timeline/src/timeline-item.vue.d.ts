import { TimelineItemProps } from "./timeline-item.js";
import * as vue from "vue";

//#region ../../packages/components/timeline/src/timeline-item.vue.d.ts
declare var __VLS_12: {}, __VLS_14: {};
type __VLS_Slots = {} & {
  dot?: (props: typeof __VLS_12) => any;
} & {
  default?: (props: typeof __VLS_14) => any;
};
declare const __VLS_base: vue.DefineComponent<TimelineItemProps, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<TimelineItemProps> & Readonly<{}>, {
  type: "primary" | "success" | "warning" | "danger" | "info" | "";
  size: "normal" | "large";
  color: string;
  placement: "top" | "bottom";
  timestamp: string;
}, {}, {}, {}, string, vue.ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
type __VLS_WithSlots<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
export { _default };