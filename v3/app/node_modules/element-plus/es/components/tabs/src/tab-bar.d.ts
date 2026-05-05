import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import { Mutable } from "../../../utils/typescript.js";
import "../../../utils/index.js";
import { TabPaneName, TabsPaneContext } from "./constants.js";
import { _default } from "./tab-bar.vue.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/tabs/src/tab-bar.d.ts
/**
 * @deprecated Removed after 3.0.0, Use `TabBarProps` instead.
 */
declare const tabBarProps: {
  readonly tabs: EpPropFinalized<(new (...args: any[]) => {
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
  readonly tabRefs: EpPropFinalized<(new (...args: any[]) => {
    [key: string]: HTMLDivElement;
    [key: number]: HTMLDivElement;
  }) | (() => {
    [key: string]: HTMLDivElement;
    [key: number]: HTMLDivElement;
  }) | (((new (...args: any[]) => {
    [key: string]: HTMLDivElement;
    [key: number]: HTMLDivElement;
  }) | (() => {
    [key: string]: HTMLDivElement;
    [key: number]: HTMLDivElement;
  })) | null)[], unknown, unknown, () => Mutable<{}>, boolean>;
};
type TabBarProps = {
  tabs?: TabsPaneContext[];
  tabRefs?: {
    [key: TabPaneName]: HTMLDivElement;
  };
};
/**
 * @deprecated Removed after 3.0.0, Use `TabBarProps` instead.
 */
type TabBarPropsPublic = ExtractPublicPropTypes<typeof tabBarProps>;
type TabBarInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { TabBarInstance, TabBarProps, TabBarPropsPublic, tabBarProps };