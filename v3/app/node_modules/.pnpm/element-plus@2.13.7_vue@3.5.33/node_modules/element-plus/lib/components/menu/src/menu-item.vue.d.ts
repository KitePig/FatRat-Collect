import { MenuItemRegistered, MenuProvider } from "./types.js";
import { MenuItemProps } from "./menu-item.js";
import * as vue from "vue";

//#region ../../packages/components/menu/src/menu-item.vue.d.ts
declare var __VLS_8: {}, __VLS_10: {}, __VLS_12: {}, __VLS_14: {};
type __VLS_Slots = {} & {
  title?: (props: typeof __VLS_8) => any;
} & {
  default?: (props: typeof __VLS_10) => any;
} & {
  default?: (props: typeof __VLS_12) => any;
} & {
  title?: (props: typeof __VLS_14) => any;
};
declare const __VLS_base: vue.DefineComponent<MenuItemProps, {
  parentMenu: vue.ComputedRef<vue.ComponentInternalInstance>;
  rootMenu: MenuProvider;
  active: vue.ComputedRef<boolean>;
  nsMenu: {
    namespace: vue.ComputedRef<string>;
    b: (blockSuffix?: string) => string;
    e: (element?: string) => string;
    m: (modifier?: string) => string;
    be: (blockSuffix?: string, element?: string) => string;
    em: (element?: string, modifier?: string) => string;
    bm: (blockSuffix?: string, modifier?: string) => string;
    bem: (blockSuffix?: string, element?: string, modifier?: string) => string;
    is: {
      (name: string, state: boolean | undefined): string;
      (name: string): string;
    };
    cssVar: (object: Record<string, string>) => Record<string, string>;
    cssVarName: (name: string) => string;
    cssVarBlock: (object: Record<string, string>) => Record<string, string>;
    cssVarBlockName: (name: string) => string;
  };
  nsMenuItem: {
    namespace: vue.ComputedRef<string>;
    b: (blockSuffix?: string) => string;
    e: (element?: string) => string;
    m: (modifier?: string) => string;
    be: (blockSuffix?: string, element?: string) => string;
    em: (element?: string, modifier?: string) => string;
    bm: (blockSuffix?: string, modifier?: string) => string;
    bem: (blockSuffix?: string, element?: string, modifier?: string) => string;
    is: {
      (name: string, state: boolean | undefined): string;
      (name: string): string;
    };
    cssVar: (object: Record<string, string>) => Record<string, string>;
    cssVarName: (name: string) => string;
    cssVarBlock: (object: Record<string, string>) => Record<string, string>;
    cssVarBlockName: (name: string) => string;
  };
  handleClick: () => void;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  click: (item: MenuItemRegistered) => void;
}, string, vue.PublicProps, Readonly<MenuItemProps> & Readonly<{
  onClick?: ((item: MenuItemRegistered) => any) | undefined;
}>, {
  index: string | null;
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