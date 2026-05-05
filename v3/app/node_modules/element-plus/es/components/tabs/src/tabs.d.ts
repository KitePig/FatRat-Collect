import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import { Awaitable } from "../../../utils/typescript.js";
import "../../../utils/index.js";
import { TabPaneName, TabsPaneContext } from "./constants.js";
import { TabNavInstance } from "./tab-nav.js";
import * as vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes, VNode } from "vue";
import * as vue_jsx_runtime0 from "vue/jsx-runtime";

//#region ../../packages/components/tabs/src/tabs.d.ts
declare const tabsProps: {
  readonly type: EpPropFinalized<StringConstructor, "" | "card" | "border-card", unknown, "", boolean>;
  readonly closable: BooleanConstructor;
  readonly addable: BooleanConstructor;
  readonly modelValue: {
    readonly type: vue.PropType<EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly defaultValue: {
    readonly type: vue.PropType<EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly editable: BooleanConstructor;
  readonly tabPosition: EpPropFinalized<StringConstructor, "top" | "bottom" | "left" | "right", unknown, "top", boolean>;
  readonly beforeLeave: EpPropFinalized<(new (...args: any[]) => (newName: TabPaneName, oldName: TabPaneName) => Awaitable<void | boolean>) | (() => (newName: TabPaneName, oldName: TabPaneName) => Awaitable<void | boolean>) | {
    (): (newName: TabPaneName, oldName: TabPaneName) => Awaitable<void | boolean>;
    new (): any;
    readonly prototype: any;
  } | (((new (...args: any[]) => (newName: TabPaneName, oldName: TabPaneName) => Awaitable<void | boolean>) | (() => (newName: TabPaneName, oldName: TabPaneName) => Awaitable<void | boolean>) | {
    (): (newName: TabPaneName, oldName: TabPaneName) => Awaitable<void | boolean>;
    new (): any;
    readonly prototype: any;
  }) | null)[], unknown, unknown, () => true, boolean>;
  readonly stretch: BooleanConstructor;
  readonly tabindex: EpPropFinalized<readonly [StringConstructor, NumberConstructor], unknown, unknown, 0, boolean>;
};
type TabsProps = ExtractPropTypes<typeof tabsProps>;
type TabsPropsPublic = ExtractPublicPropTypes<typeof tabsProps>;
declare const tabsEmits: {
  "update:modelValue": (name: TabPaneName) => name is string | number;
  tabClick: (pane: TabsPaneContext, ev: Event) => boolean;
  tabChange: (name: TabPaneName) => name is string | number;
  edit: (paneName: TabPaneName | undefined, action: "remove" | "add") => boolean;
  tabRemove: (name: TabPaneName) => name is string | number;
  tabAdd: () => boolean;
};
type TabsEmits = typeof tabsEmits;
type TabsPanes = Record<number, TabsPaneContext>;
declare const Tabs: vue.DefineComponent<ExtractPropTypes<{
  readonly type: EpPropFinalized<StringConstructor, "" | "card" | "border-card", unknown, "", boolean>;
  readonly closable: BooleanConstructor;
  readonly addable: BooleanConstructor;
  readonly modelValue: {
    readonly type: vue.PropType<EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly defaultValue: {
    readonly type: vue.PropType<EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly editable: BooleanConstructor;
  readonly tabPosition: EpPropFinalized<StringConstructor, "top" | "bottom" | "left" | "right", unknown, "top", boolean>;
  readonly beforeLeave: EpPropFinalized<(new (...args: any[]) => (newName: TabPaneName, oldName: TabPaneName) => Awaitable<void | boolean>) | (() => (newName: TabPaneName, oldName: TabPaneName) => Awaitable<void | boolean>) | {
    (): (newName: TabPaneName, oldName: TabPaneName) => Awaitable<void | boolean>;
    new (): any;
    readonly prototype: any;
  } | (((new (...args: any[]) => (newName: TabPaneName, oldName: TabPaneName) => Awaitable<void | boolean>) | (() => (newName: TabPaneName, oldName: TabPaneName) => Awaitable<void | boolean>) | {
    (): (newName: TabPaneName, oldName: TabPaneName) => Awaitable<void | boolean>;
    new (): any;
    readonly prototype: any;
  }) | null)[], unknown, unknown, () => true, boolean>;
  readonly stretch: BooleanConstructor;
  readonly tabindex: EpPropFinalized<readonly [StringConstructor, NumberConstructor], unknown, unknown, 0, boolean>;
}>, () => vue_jsx_runtime0.JSX.Element, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  "update:modelValue": (name: TabPaneName) => name is string | number;
  tabClick: (pane: TabsPaneContext, ev: Event) => boolean;
  tabChange: (name: TabPaneName) => name is string | number;
  edit: (paneName: TabPaneName | undefined, action: "remove" | "add") => boolean;
  tabRemove: (name: TabPaneName) => name is string | number;
  tabAdd: () => boolean;
}, string, vue.PublicProps, Readonly<ExtractPropTypes<{
  readonly type: EpPropFinalized<StringConstructor, "" | "card" | "border-card", unknown, "", boolean>;
  readonly closable: BooleanConstructor;
  readonly addable: BooleanConstructor;
  readonly modelValue: {
    readonly type: vue.PropType<EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly defaultValue: {
    readonly type: vue.PropType<EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly editable: BooleanConstructor;
  readonly tabPosition: EpPropFinalized<StringConstructor, "top" | "bottom" | "left" | "right", unknown, "top", boolean>;
  readonly beforeLeave: EpPropFinalized<(new (...args: any[]) => (newName: TabPaneName, oldName: TabPaneName) => Awaitable<void | boolean>) | (() => (newName: TabPaneName, oldName: TabPaneName) => Awaitable<void | boolean>) | {
    (): (newName: TabPaneName, oldName: TabPaneName) => Awaitable<void | boolean>;
    new (): any;
    readonly prototype: any;
  } | (((new (...args: any[]) => (newName: TabPaneName, oldName: TabPaneName) => Awaitable<void | boolean>) | (() => (newName: TabPaneName, oldName: TabPaneName) => Awaitable<void | boolean>) | {
    (): (newName: TabPaneName, oldName: TabPaneName) => Awaitable<void | boolean>;
    new (): any;
    readonly prototype: any;
  }) | null)[], unknown, unknown, () => true, boolean>;
  readonly stretch: BooleanConstructor;
  readonly tabindex: EpPropFinalized<readonly [StringConstructor, NumberConstructor], unknown, unknown, 0, boolean>;
}>> & Readonly<{
  "onUpdate:modelValue"?: ((name: TabPaneName) => any) | undefined;
  onTabClick?: ((pane: {
    uid: number;
    getVnode: () => VNode;
    slots: vue.Slots;
    props: {
      label?: string | undefined;
      name?: (string | number) | undefined;
      closable?: boolean | undefined;
      disabled?: boolean | undefined;
      lazy?: boolean | undefined;
    };
    paneName: TabPaneName | undefined;
    active: boolean;
    index: string | undefined;
    isClosable: boolean;
    isFocusInsidePane: () => boolean | undefined;
  }, ev: Event) => any) | undefined;
  onTabChange?: ((name: TabPaneName) => any) | undefined;
  onEdit?: ((paneName: TabPaneName | undefined, action: "remove" | "add") => any) | undefined;
  onTabRemove?: ((name: TabPaneName) => any) | undefined;
  onTabAdd?: (() => any) | undefined;
}>, {
  readonly type: EpPropMergeType<StringConstructor, "" | "card" | "border-card", unknown>;
  readonly closable: boolean;
  readonly tabindex: EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>;
  readonly stretch: boolean;
  readonly editable: boolean;
  readonly tabPosition: EpPropMergeType<StringConstructor, "top" | "bottom" | "left" | "right", unknown>;
  readonly beforeLeave: (newName: TabPaneName, oldName: TabPaneName) => Awaitable<void | boolean>;
  readonly addable: boolean;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
type TabsInstance = InstanceType<typeof Tabs> & {
  currentName: TabPaneName;
  tabNavRef: TabNavInstance | undefined;
};
//#endregion
export { Tabs, TabsEmits, TabsInstance, TabsPanes, TabsProps, TabsPropsPublic, tabsEmits, tabsProps };