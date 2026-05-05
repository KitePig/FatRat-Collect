import { InjectionKey, UnwrapRef, VNode } from "vue";

//#region ../../packages/components/splitter/src/type.d.ts
type Layout = 'horizontal' | 'vertical';
type PanelItemState = UnwrapRef<{
  uid: number;
  getVnode: () => VNode;
  collapsible: {
    start?: boolean;
    end?: boolean;
  };
  max?: number | string;
  min?: number | string;
  resizable: boolean;
  size?: number | string;
  setIndex: (val: number) => void;
}>;
//#endregion
export { Layout, PanelItemState };