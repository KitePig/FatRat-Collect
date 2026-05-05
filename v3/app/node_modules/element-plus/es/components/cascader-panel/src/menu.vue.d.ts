import { Node } from "./node.js";
import "./types.js";
import * as vue from "vue";
import { PropType } from "vue";

//#region ../../packages/components/cascader-panel/src/menu.vue.d.ts
declare var __VLS_29: {};
type __VLS_Slots = {} & {
  empty?: (props: typeof __VLS_29) => any;
};
declare const __VLS_base: vue.DefineComponent<vue.ExtractPropTypes<{
  nodes: {
    type: PropType<Node[]>;
    required: true;
  };
  index: {
    type: NumberConstructor;
    required: true;
  };
}>, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
  nodes: {
    type: PropType<Node[]>;
    required: true;
  };
  index: {
    type: NumberConstructor;
    required: true;
  };
}>> & Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
type __VLS_WithSlots<T, S> = T & {
  new (): {
    $slots: S;
  };
};
//#endregion
export { _default };