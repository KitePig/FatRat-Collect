import { AvatarProps } from "./avatar.js";
import * as vue from "vue";
import * as csstype from "csstype";

//#region ../../packages/components/avatar/src/avatar.vue.d.ts
declare var __VLS_12: {};
type __VLS_Slots = {} & {
  default?: (props: typeof __VLS_12) => any;
};
declare const __VLS_base: vue.DefineComponent<AvatarProps, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  error: (evt: Event) => void;
}, string, vue.PublicProps, Readonly<AvatarProps> & Readonly<{
  onError?: ((evt: Event) => any) | undefined;
}>, {
  src: string;
  fit: csstype.Property.ObjectFit;
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