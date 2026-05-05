import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { PopperEffect } from "../../popper/src/popper.js";
import { MenuItemClicked } from "./types.js";
import "../../popper/index.js";
import * as vue from "vue";
import { CSSProperties, Component, ExtractPropTypes, ExtractPublicPropTypes, VNode } from "vue";
import { NavigationFailure } from "vue-router";

//#region ../../packages/components/menu/src/menu.d.ts
declare const menuProps: {
  readonly mode: EpPropFinalized<StringConstructor, "horizontal" | "vertical", unknown, "vertical", boolean>;
  readonly defaultActive: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly defaultOpeneds: EpPropFinalized<(new (...args: any[]) => string[]) | (() => string[]) | (((new (...args: any[]) => string[]) | (() => string[])) | null)[], unknown, unknown, () => [], boolean>;
  readonly uniqueOpened: BooleanConstructor;
  readonly router: BooleanConstructor;
  readonly menuTrigger: EpPropFinalized<StringConstructor, "click" | "hover", unknown, "hover", boolean>;
  readonly collapse: BooleanConstructor;
  readonly backgroundColor: StringConstructor;
  readonly textColor: StringConstructor;
  readonly activeTextColor: StringConstructor;
  readonly closeOnClickOutside: BooleanConstructor;
  readonly collapseTransition: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly ellipsis: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly popperOffset: EpPropFinalized<NumberConstructor, unknown, unknown, 6, boolean>;
  readonly ellipsisIcon: EpPropFinalized<(new (...args: any[]) => (string | Component) & {}) | (() => string | Component) | (((new (...args: any[]) => (string | Component) & {}) | (() => string | Component)) | null)[], unknown, unknown, () => vue.DefineComponent<{}, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, boolean>;
  readonly popperEffect: EpPropFinalized<(new (...args: any[]) => string) | (() => PopperEffect) | (((new (...args: any[]) => string) | (() => PopperEffect)) | null)[], unknown, unknown, "dark", boolean>;
  readonly popperClass: StringConstructor;
  readonly popperStyle: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | CSSProperties) | (() => string | CSSProperties) | (((new (...args: any[]) => string | CSSProperties) | (() => string | CSSProperties)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly showTimeout: EpPropFinalized<NumberConstructor, unknown, unknown, 300, boolean>;
  readonly hideTimeout: EpPropFinalized<NumberConstructor, unknown, unknown, 300, boolean>;
  readonly persistent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
};
type MenuProps = ExtractPropTypes<typeof menuProps>;
type MenuPropsPublic = ExtractPublicPropTypes<typeof menuProps>;
declare const menuEmits: {
  close: (index: string, indexPath: string[]) => boolean;
  open: (index: string, indexPath: string[]) => boolean;
  select: (index: string, indexPath: string[], item: MenuItemClicked, routerResult?: Promise<void | NavigationFailure>) => boolean;
};
type MenuEmits = typeof menuEmits;
declare const _default: vue.DefineComponent<ExtractPropTypes<{
  readonly mode: EpPropFinalized<StringConstructor, "horizontal" | "vertical", unknown, "vertical", boolean>;
  readonly defaultActive: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly defaultOpeneds: EpPropFinalized<(new (...args: any[]) => string[]) | (() => string[]) | (((new (...args: any[]) => string[]) | (() => string[])) | null)[], unknown, unknown, () => [], boolean>;
  readonly uniqueOpened: BooleanConstructor;
  readonly router: BooleanConstructor;
  readonly menuTrigger: EpPropFinalized<StringConstructor, "click" | "hover", unknown, "hover", boolean>;
  readonly collapse: BooleanConstructor;
  readonly backgroundColor: StringConstructor;
  readonly textColor: StringConstructor;
  readonly activeTextColor: StringConstructor;
  readonly closeOnClickOutside: BooleanConstructor;
  readonly collapseTransition: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly ellipsis: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly popperOffset: EpPropFinalized<NumberConstructor, unknown, unknown, 6, boolean>;
  readonly ellipsisIcon: EpPropFinalized<(new (...args: any[]) => (string | Component) & {}) | (() => string | Component) | (((new (...args: any[]) => (string | Component) & {}) | (() => string | Component)) | null)[], unknown, unknown, () => vue.DefineComponent<{}, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, boolean>;
  readonly popperEffect: EpPropFinalized<(new (...args: any[]) => string) | (() => PopperEffect) | (((new (...args: any[]) => string) | (() => PopperEffect)) | null)[], unknown, unknown, "dark", boolean>;
  readonly popperClass: StringConstructor;
  readonly popperStyle: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | CSSProperties) | (() => string | CSSProperties) | (((new (...args: any[]) => string | CSSProperties) | (() => string | CSSProperties)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly showTimeout: EpPropFinalized<NumberConstructor, unknown, unknown, 300, boolean>;
  readonly hideTimeout: EpPropFinalized<NumberConstructor, unknown, unknown, 300, boolean>;
  readonly persistent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
}>, () => VNode<vue.RendererNode, vue.RendererElement, {
  [key: string]: any;
}>, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  close: (index: string, indexPath: string[]) => boolean;
  open: (index: string, indexPath: string[]) => boolean;
  select: (index: string, indexPath: string[], item: MenuItemClicked, routerResult?: Promise<void | NavigationFailure>) => boolean;
}, string, vue.PublicProps, Readonly<ExtractPropTypes<{
  readonly mode: EpPropFinalized<StringConstructor, "horizontal" | "vertical", unknown, "vertical", boolean>;
  readonly defaultActive: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly defaultOpeneds: EpPropFinalized<(new (...args: any[]) => string[]) | (() => string[]) | (((new (...args: any[]) => string[]) | (() => string[])) | null)[], unknown, unknown, () => [], boolean>;
  readonly uniqueOpened: BooleanConstructor;
  readonly router: BooleanConstructor;
  readonly menuTrigger: EpPropFinalized<StringConstructor, "click" | "hover", unknown, "hover", boolean>;
  readonly collapse: BooleanConstructor;
  readonly backgroundColor: StringConstructor;
  readonly textColor: StringConstructor;
  readonly activeTextColor: StringConstructor;
  readonly closeOnClickOutside: BooleanConstructor;
  readonly collapseTransition: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly ellipsis: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly popperOffset: EpPropFinalized<NumberConstructor, unknown, unknown, 6, boolean>;
  readonly ellipsisIcon: EpPropFinalized<(new (...args: any[]) => (string | Component) & {}) | (() => string | Component) | (((new (...args: any[]) => (string | Component) & {}) | (() => string | Component)) | null)[], unknown, unknown, () => vue.DefineComponent<{}, void, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>, boolean>;
  readonly popperEffect: EpPropFinalized<(new (...args: any[]) => string) | (() => PopperEffect) | (((new (...args: any[]) => string) | (() => PopperEffect)) | null)[], unknown, unknown, "dark", boolean>;
  readonly popperClass: StringConstructor;
  readonly popperStyle: {
    readonly type: vue.PropType<EpPropMergeType<(new (...args: any[]) => string | CSSProperties) | (() => string | CSSProperties) | (((new (...args: any[]) => string | CSSProperties) | (() => string | CSSProperties)) | null)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly showTimeout: EpPropFinalized<NumberConstructor, unknown, unknown, 300, boolean>;
  readonly hideTimeout: EpPropFinalized<NumberConstructor, unknown, unknown, 300, boolean>;
  readonly persistent: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
}>> & Readonly<{
  onClose?: ((index: string, indexPath: string[]) => any) | undefined;
  onSelect?: ((index: string, indexPath: string[], item: MenuItemClicked, routerResult?: Promise<void | NavigationFailure> | undefined) => any) | undefined;
  onOpen?: ((index: string, indexPath: string[]) => any) | undefined;
}>, {
  readonly collapse: boolean;
  readonly ellipsis: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly persistent: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly mode: EpPropMergeType<StringConstructor, "horizontal" | "vertical", unknown>;
  readonly showTimeout: number;
  readonly hideTimeout: number;
  readonly defaultActive: string;
  readonly defaultOpeneds: string[];
  readonly menuTrigger: EpPropMergeType<StringConstructor, "click" | "hover", unknown>;
  readonly collapseTransition: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly popperOffset: number;
  readonly ellipsisIcon: EpPropMergeType<(new (...args: any[]) => (string | Component) & {}) | (() => string | Component) | (((new (...args: any[]) => (string | Component) & {}) | (() => string | Component)) | null)[], unknown, unknown>;
  readonly popperEffect: EpPropMergeType<(new (...args: any[]) => string) | (() => PopperEffect) | (((new (...args: any[]) => string) | (() => PopperEffect)) | null)[], unknown, unknown>;
  readonly uniqueOpened: boolean;
  readonly router: boolean;
  readonly closeOnClickOutside: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
//#endregion
export { MenuEmits, MenuProps, MenuPropsPublic, _default, menuEmits, menuProps };