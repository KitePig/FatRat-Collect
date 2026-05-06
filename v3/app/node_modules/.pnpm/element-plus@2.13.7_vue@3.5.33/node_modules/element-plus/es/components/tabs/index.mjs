import { withInstall, withNoopInstall } from "../../utils/vue/install.mjs";
import { tabsRootContextKey } from "./src/constants.mjs";
import { tabBarProps } from "./src/tab-bar.mjs";
import { tabNavEmits, tabNavProps } from "./src/tab-nav.mjs";
import Tabs, { tabsEmits, tabsProps } from "./src/tabs.mjs";
import { tabPaneProps } from "./src/tab-pane.mjs";
import tab_pane_default from "./src/tab-pane2.mjs";

//#region ../../packages/components/tabs/index.ts
const ElTabs = withInstall(Tabs, { TabPane: tab_pane_default });
const ElTabPane = withNoopInstall(tab_pane_default);

//#endregion
export { ElTabPane, ElTabs, ElTabs as default, tabBarProps, tabNavEmits, tabNavProps, tabPaneProps, tabsEmits, tabsProps, tabsRootContextKey };
//# sourceMappingURL=index.mjs.map