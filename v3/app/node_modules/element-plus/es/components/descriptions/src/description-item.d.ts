import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import * as vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes, Slot, VNode } from "vue";

//#region ../../packages/components/descriptions/src/description-item.d.ts
declare const descriptionItemProps: {
  label: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
  span: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  rowspan: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  width: EpPropFinalized<(NumberConstructor | StringConstructor)[], unknown, unknown, string, boolean>;
  minWidth: EpPropFinalized<(NumberConstructor | StringConstructor)[], unknown, unknown, string, boolean>;
  labelWidth: {
    readonly type: vue.PropType<EpPropMergeType<(NumberConstructor | StringConstructor)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  align: EpPropFinalized<StringConstructor, "center" | "left" | "right", unknown, string, boolean>;
  labelAlign: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "center" | "left" | "right", unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  className: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
  labelClassName: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
};
declare const DescriptionItem: vue.DefineComponent<ExtractPropTypes<{
  label: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
  span: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  rowspan: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  width: EpPropFinalized<(NumberConstructor | StringConstructor)[], unknown, unknown, string, boolean>;
  minWidth: EpPropFinalized<(NumberConstructor | StringConstructor)[], unknown, unknown, string, boolean>;
  labelWidth: {
    readonly type: vue.PropType<EpPropMergeType<(NumberConstructor | StringConstructor)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  align: EpPropFinalized<StringConstructor, "center" | "left" | "right", unknown, string, boolean>;
  labelAlign: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "center" | "left" | "right", unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  className: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
  labelClassName: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
}>, {}, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<ExtractPropTypes<{
  label: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
  span: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  rowspan: EpPropFinalized<NumberConstructor, unknown, unknown, number, boolean>;
  width: EpPropFinalized<(NumberConstructor | StringConstructor)[], unknown, unknown, string, boolean>;
  minWidth: EpPropFinalized<(NumberConstructor | StringConstructor)[], unknown, unknown, string, boolean>;
  labelWidth: {
    readonly type: vue.PropType<EpPropMergeType<(NumberConstructor | StringConstructor)[], unknown, unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  align: EpPropFinalized<StringConstructor, "center" | "left" | "right", unknown, string, boolean>;
  labelAlign: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "center" | "left" | "right", unknown>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  className: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
  labelClassName: EpPropFinalized<StringConstructor, unknown, unknown, string, boolean>;
}>> & Readonly<{}>, {
  className: string;
  minWidth: EpPropMergeType<(NumberConstructor | StringConstructor)[], unknown, unknown>;
  width: EpPropMergeType<(NumberConstructor | StringConstructor)[], unknown, unknown>;
  label: string;
  span: number;
  rowspan: number;
  align: EpPropMergeType<StringConstructor, "center" | "left" | "right", unknown>;
  labelClassName: string;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
type DescriptionItemProps = ExtractPropTypes<typeof descriptionItemProps>;
type DescriptionItemPropsPublic = ExtractPublicPropTypes<typeof descriptionItemProps>;
type DescriptionItemVNode = VNode & {
  children: {
    [name: string]: Slot;
  } | null;
  props: Partial<DescriptionItemProps> | null;
};
//#endregion
export { DescriptionItem, DescriptionItemProps, DescriptionItemPropsPublic, DescriptionItemVNode, descriptionItemProps };