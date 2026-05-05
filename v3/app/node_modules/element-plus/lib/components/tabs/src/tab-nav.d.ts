import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { TabPaneName, TabsPaneContext } from "./constants.js";
import { TabBarInstance } from "./tab-bar.js";
import * as vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes } from "vue";
import * as vue_jsx_runtime0 from "vue/jsx-runtime";

//#region ../../packages/components/tabs/src/tab-nav.d.ts
declare const tabNavProps: {
  readonly panes: EpPropFinalized<(new (...args: any[]) => {
    uid: number;
    getVnode: () => vue.VNode;
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
  }[]) | (() => {
    uid: number;
    getVnode: () => vue.VNode;
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
  }[]) | (((new (...args: any[]) => {
    uid: number;
    getVnode: () => vue.VNode;
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
  }[]) | (() => {
    uid: number;
    getVnode: () => vue.VNode;
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
  }[])) | null)[], unknown, unknown, () => [], boolean>;
  readonly currentName: EpPropFinalized<readonly [StringConstructor, NumberConstructor], unknown, unknown, "", boolean>;
  readonly editable: BooleanConstructor;
  readonly type: EpPropFinalized<StringConstructor, "" | "card" | "border-card", unknown, "", boolean>;
  readonly stretch: BooleanConstructor;
  readonly tabindex: EpPropFinalized<readonly [StringConstructor, NumberConstructor], unknown, unknown, undefined, boolean>;
};
declare const tabNavEmits: {
  tabClick: (tab: TabsPaneContext, tabName: TabPaneName, ev: Event) => boolean;
  tabRemove: (tab: TabsPaneContext, ev: Event) => boolean;
};
type TabNavProps = ExtractPropTypes<typeof tabNavProps>;
type TabNavPropsPublic = ExtractPublicPropTypes<typeof tabNavProps>;
type TabNavEmits = typeof tabNavEmits;
declare const TabNav: vue.DefineComponent<ExtractPropTypes<{
  readonly panes: EpPropFinalized<(new (...args: any[]) => {
    uid: number;
    getVnode: () => vue.VNode;
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
  }[]) | (() => {
    uid: number;
    getVnode: () => vue.VNode;
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
  }[]) | (((new (...args: any[]) => {
    uid: number;
    getVnode: () => vue.VNode;
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
  }[]) | (() => {
    uid: number;
    getVnode: () => vue.VNode;
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
  }[])) | null)[], unknown, unknown, () => [], boolean>;
  readonly currentName: EpPropFinalized<readonly [StringConstructor, NumberConstructor], unknown, unknown, "", boolean>;
  readonly editable: BooleanConstructor;
  readonly type: EpPropFinalized<StringConstructor, "" | "card" | "border-card", unknown, "", boolean>;
  readonly stretch: BooleanConstructor;
  readonly tabindex: EpPropFinalized<readonly [StringConstructor, NumberConstructor], unknown, unknown, undefined, boolean>;
}>, () => vue_jsx_runtime0.JSX.Element, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {
  tabClick: (tab: TabsPaneContext, tabName: TabPaneName, ev: Event) => boolean;
  tabRemove: (tab: TabsPaneContext, ev: Event) => boolean;
}, string, vue.PublicProps, Readonly<ExtractPropTypes<{
  readonly panes: EpPropFinalized<(new (...args: any[]) => {
    uid: number;
    getVnode: () => vue.VNode;
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
  }[]) | (() => {
    uid: number;
    getVnode: () => vue.VNode;
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
  }[]) | (((new (...args: any[]) => {
    uid: number;
    getVnode: () => vue.VNode;
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
  }[]) | (() => {
    uid: number;
    getVnode: () => vue.VNode;
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
  }[])) | null)[], unknown, unknown, () => [], boolean>;
  readonly currentName: EpPropFinalized<readonly [StringConstructor, NumberConstructor], unknown, unknown, "", boolean>;
  readonly editable: BooleanConstructor;
  readonly type: EpPropFinalized<StringConstructor, "" | "card" | "border-card", unknown, "", boolean>;
  readonly stretch: BooleanConstructor;
  readonly tabindex: EpPropFinalized<readonly [StringConstructor, NumberConstructor], unknown, unknown, undefined, boolean>;
}>> & Readonly<{
  onTabClick?: ((tab: {
    uid: number;
    getVnode: () => vue.VNode;
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
  }, tabName: TabPaneName, ev: Event) => any) | undefined;
  onTabRemove?: ((tab: {
    uid: number;
    getVnode: () => vue.VNode;
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
}>, {
  readonly type: EpPropMergeType<StringConstructor, "" | "card" | "border-card", unknown>;
  readonly tabindex: EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>;
  readonly stretch: boolean;
  readonly editable: boolean;
  readonly panes: {
    uid: number;
    getVnode: () => vue.VNode;
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
  }[];
  readonly currentName: EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
type TabNavInstance = InstanceType<typeof TabNav> & {
  scrollToActiveTab: () => Promise<void>;
  removeFocus: () => void;
  focusActiveTab: () => void;
  scheduleRender: () => void;
  tabListRef: HTMLDivElement | undefined;
  tabBarRef: TabBarInstance | undefined;
};
//#endregion
export { TabNavEmits, TabNavInstance, TabNavProps, TabNavPropsPublic, tabNavEmits, tabNavProps };