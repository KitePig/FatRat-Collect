import { TabPaneName, TabsPaneContext } from "./constants.js";
import { TabBarProps } from "./tab-bar.js";
import * as vue from "vue";
import { CSSProperties } from "vue";

//#region ../../packages/components/tabs/src/tab-bar.vue.d.ts
declare const __VLS_export: vue.DefineComponent<TabBarProps, {
  /** @description tab root html element */ref: vue.Ref<HTMLDivElement | undefined, HTMLDivElement | undefined>; /** @description method to manually update tab bar style, return the updated style */
  update: () => CSSProperties;
}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<TabBarProps> & Readonly<{}>, {
  tabs: TabsPaneContext[];
  tabRefs: {
    [key: TabPaneName]: HTMLDivElement;
  };
}, {}, {}, {}, string, vue.ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
//#endregion
export { _default };