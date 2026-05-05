import { TabPaneProps } from "./tab-pane.js";
import { TabNavInstance } from "./tab-nav.js";
import { TabsProps } from "./tabs.js";
import { ComputedRef, InjectionKey, Ref, Slots, UnwrapRef, VNode } from "vue";

//#region ../../packages/components/tabs/src/constants.d.ts
type TabPaneName = string | number;
type TabsPaneContext = UnwrapRef<{
  uid: number;
  getVnode: () => VNode;
  slots: Slots;
  props: TabPaneProps;
  paneName: ComputedRef<TabPaneName | undefined>;
  active: ComputedRef<boolean>;
  index: Ref<string | undefined>;
  isClosable: ComputedRef<boolean>;
  isFocusInsidePane: () => boolean | undefined;
}>;
interface TabsRootContext {
  props: TabsProps;
  currentName: Ref<TabPaneName>;
  registerPane: (pane: TabsPaneContext) => void;
  unregisterPane: (pane: TabsPaneContext) => void;
  nav$: Ref<TabNavInstance | undefined>;
}
declare const tabsRootContextKey: InjectionKey<TabsRootContext>;
//#endregion
export { TabPaneName, TabsPaneContext, TabsRootContext, tabsRootContextKey };