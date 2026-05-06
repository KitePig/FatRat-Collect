import { AutoResizerProps } from "../auto-resizer.js";
import * as vue from "vue";

//#region ../../packages/components/table-v2/src/composables/use-auto-resize.d.ts
declare const useAutoResize: (props: AutoResizerProps) => {
  sizer: vue.Ref<HTMLElement | undefined, HTMLElement | undefined>;
  width: vue.Ref<number, number>;
  height: vue.Ref<number, number>;
};
//#endregion
export { useAutoResize };