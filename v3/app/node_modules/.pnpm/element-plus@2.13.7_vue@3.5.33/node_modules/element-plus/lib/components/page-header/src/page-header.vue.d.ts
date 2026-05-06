import { IconPropType } from "../../../utils/vue/icon.js";
import "../../../utils/index.js";
import { PageHeaderProps } from "./page-header.js";
import * as vue from "vue";

//#region ../../packages/components/page-header/src/page-header.vue.d.ts
declare var __VLS_1: {}, __VLS_3: {}, __VLS_16: {}, __VLS_23: {}, __VLS_25: {}, __VLS_27: {};
type __VLS_Slots = {} & {
  breadcrumb?: (props: typeof __VLS_1) => any;
} & {
  icon?: (props: typeof __VLS_3) => any;
} & {
  title?: (props: typeof __VLS_16) => any;
} & {
  content?: (props: typeof __VLS_23) => any;
} & {
  extra?: (props: typeof __VLS_25) => any;
} & {
  default?: (props: typeof __VLS_27) => any;
};
declare const __VLS_base: vue.DefineComponent<PageHeaderProps, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  back: () => void;
}, string, vue.PublicProps, Readonly<PageHeaderProps> & Readonly<{
  onBack?: (() => any) | undefined;
}>, {
  content: string;
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