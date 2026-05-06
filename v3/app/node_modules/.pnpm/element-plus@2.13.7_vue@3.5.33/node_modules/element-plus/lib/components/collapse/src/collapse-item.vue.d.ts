import { IconPropType } from "../../../utils/vue/icon.js";
import "../../../utils/index.js";
import { CollapseItemProps } from "./collapse-item.js";
import * as vue from "vue";

//#region ../../packages/components/collapse/src/collapse-item.vue.d.ts
declare var __VLS_1: {
    isActive: boolean | undefined;
  }, __VLS_3: {
    isActive: boolean | undefined;
  }, __VLS_22: {};
type __VLS_Slots = {} & {
  title?: (props: typeof __VLS_1) => any;
} & {
  icon?: (props: typeof __VLS_3) => any;
} & {
  default?: (props: typeof __VLS_22) => any;
};
declare const __VLS_base: vue.DefineComponent<CollapseItemProps, {
  /** @description current collapse-item whether active */isActive: vue.ComputedRef<boolean | undefined>;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<CollapseItemProps> & Readonly<{}>, {
  title: string;
  icon: IconPropType;
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