import * as vue from "vue";
import { ExtractPropTypes, ExtractPublicPropTypes } from "vue";

//#region ../../packages/components/space/src/item.d.ts
declare const spaceItemProps: {
  readonly prefixCls: {
    readonly type: vue.PropType<string>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
};
type SpaceItemProps = ExtractPropTypes<typeof spaceItemProps>;
type SpaceItemPropsPublic = ExtractPublicPropTypes<typeof spaceItemProps>;
declare const SpaceItem: vue.DefineComponent<ExtractPropTypes<{
  readonly prefixCls: {
    readonly type: vue.PropType<string>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
  [key: string]: any;
}>, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<ExtractPropTypes<{
  readonly prefixCls: {
    readonly type: vue.PropType<string>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>> & Readonly<{}>, {}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
type SpaceItemInstance = InstanceType<typeof SpaceItem> & unknown;
//#endregion
export { SpaceItemInstance, SpaceItemProps, SpaceItemPropsPublic, spaceItemProps };