import { EpPropFinalized } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { Layout } from "./type.js";
import { _default } from "./splitter.vue.js";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/splitter/src/splitter.d.ts
interface SplitterProps {
  layout?: Layout;
  lazy?: boolean;
}
/**
 * @deprecated Removed after 3.0.0, Use `SplitterProps` instead.
 */
declare const splitterProps: {
  readonly layout: EpPropFinalized<StringConstructor, "horizontal" | "vertical", unknown, "horizontal", boolean>;
  readonly lazy: BooleanConstructor;
};
/**
 * @deprecated Removed after 3.0.0, Use `SplitterProps` instead.
 */
type SplitterPropsPublic = ExtractPublicPropTypes<typeof splitterProps>;
type SplitterInstance = InstanceType<typeof _default> & unknown;
declare const splitterEmits: {
  resizeStart: (index: number, sizes: number[]) => boolean;
  resize: (index: number, sizes: number[]) => boolean;
  resizeEnd: (index: number, sizes: number[]) => boolean;
  collapse: (index: number, type: "start" | "end", sizes: number[]) => boolean;
};
type SplitterEmits = typeof splitterEmits;
//#endregion
export { SplitterEmits, SplitterInstance, SplitterProps, SplitterPropsPublic, splitterEmits, splitterProps };