import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import * as vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/timeline/src/timeline.d.ts
declare const timelineProps: {
  readonly mode: EpPropFinalized<StringConstructor, "end" | "start" | "alternate" | "alternate-reverse", unknown, "start", boolean>;
  readonly reverse: BooleanConstructor;
};
type TimelineProps = ExtractPropTypes<typeof timelineProps>;
type TimelinePropsPublic = ExtractPublicPropTypes<typeof timelineProps>;
declare const Timeline: vue.DefineComponent<ExtractPropTypes<{
  readonly mode: EpPropFinalized<StringConstructor, "end" | "start" | "alternate" | "alternate-reverse", unknown, "start", boolean>;
  readonly reverse: BooleanConstructor;
}>, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
  [key: string]: any;
}>, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<ExtractPropTypes<{
  readonly mode: EpPropFinalized<StringConstructor, "end" | "start" | "alternate" | "alternate-reverse", unknown, "start", boolean>;
  readonly reverse: BooleanConstructor;
}>> & Readonly<{}>, {
  readonly reverse: boolean;
  readonly mode: EpPropMergeType<StringConstructor, "end" | "start" | "alternate" | "alternate-reverse", unknown>;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
type TimelineInstance = InstanceType<typeof Timeline> & unknown;
//#endregion
export { Timeline, TimelineInstance, TimelineProps, TimelinePropsPublic, timelineProps };