import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { _default } from "./src/tab-pane.vue.js";
import { TabPaneInstance, TabPaneProps, TabPanePropsPublic, tabPaneProps } from "./src/tab-pane.js";
import { TabPaneName, TabsPaneContext, TabsRootContext, tabsRootContextKey } from "./src/constants.js";
import { TabBarInstance, TabBarProps, TabBarPropsPublic, tabBarProps } from "./src/tab-bar.js";
import { TabNavEmits, TabNavInstance, TabNavProps, TabNavPropsPublic, tabNavEmits, tabNavProps } from "./src/tab-nav.js";
import { Tabs, TabsEmits, TabsInstance, TabsPanes, TabsProps, TabsPropsPublic, tabsEmits, tabsProps } from "./src/tabs.js";

//#region ../../packages/components/tabs/index.d.ts
declare const ElTabs: SFCWithInstall<typeof Tabs> & {
  TabPane: typeof _default;
};
declare const ElTabPane: SFCWithInstall<typeof _default>;
//#endregion
export { ElTabPane, ElTabs, ElTabs as default, TabBarInstance, TabBarProps, TabBarPropsPublic, TabNavEmits, TabNavInstance, TabNavProps, TabNavPropsPublic, TabPaneInstance, TabPaneName, TabPaneProps, TabPanePropsPublic, TabsEmits, TabsInstance, TabsPaneContext, TabsPanes, TabsProps, TabsPropsPublic, TabsRootContext, tabBarProps, tabNavEmits, tabNavProps, tabPaneProps, tabsEmits, tabsProps, tabsRootContextKey };