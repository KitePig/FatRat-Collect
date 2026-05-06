import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { _default } from "./tab-pane.vue.js";
import * as vue from "vue";
import { ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/tabs/src/tab-pane.d.ts
/**
 * @deprecated Removed after 3.0.0, Use `TabPaneProps` instead.
 */
declare const tabPaneProps: {
  readonly label: EpPropFinalized<StringConstructor, unknown, unknown, "", boolean>;
  readonly name: {
    readonly type: vue.PropType<EpPropMergeType<readonly [StringConstructor, NumberConstructor], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly closable: EpPropFinalized<BooleanConstructor, unknown, unknown, undefined, boolean>;
  readonly disabled: BooleanConstructor;
  readonly lazy: BooleanConstructor;
};
type TabPaneProps = {
  /**
   * @description title of the tab
   */
  label?: string;
  /**
   * @description identifier corresponding to the name of Tabs, representing the alias of the tab-pane, the default is ordinal number of the tab-pane in the sequence, e.g. the first tab-pane is '0'
   */
  name?: string | number;
  /**
   * @description whether Tab is closable
   */
  closable?: boolean;
  /**
   * @description whether Tab is disabled
   */
  disabled?: boolean;
  /**
   * @description whether Tab is lazily rendered
   */
  lazy?: boolean;
};
/**
 * @deprecated Removed after 3.0.0, Use `TabPaneProps` instead.
 */
type TabPanePropsPublic = ExtractPublicPropTypes<typeof tabPaneProps>;
type TabPaneInstance = InstanceType<typeof _default> & unknown;
//#endregion
export { TabPaneInstance, TabPaneProps, TabPanePropsPublic, tabPaneProps };