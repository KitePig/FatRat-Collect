import { CollapseActiveName } from "./collapse.js";
import { InjectionKey, Ref } from "vue";

//#region ../../packages/components/collapse/src/constants.d.ts
interface CollapseContext {
  activeNames: Ref<CollapseActiveName[]>;
  handleItemClick: (name: CollapseActiveName) => void;
}
declare const collapseContextKey: InjectionKey<CollapseContext>;
//#endregion
export { CollapseContext, collapseContextKey };