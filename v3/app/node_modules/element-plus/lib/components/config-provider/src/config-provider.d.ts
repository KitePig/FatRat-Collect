import { EpPropFinalized, EpPropMergeType } from "../../../utils/vue/props/types.js";
import "../../../utils/index.js";
import { ButtonConfigContext } from "../../button/src/button.js";
import { CardConfigContext } from "../../card/src/card.js";
import { Language } from "../../../locale/index.js";
import { DialogConfigContext } from "../../dialog/src/dialog.js";
import { MessageConfigContext } from "../../message/src/message.js";
import "../../message/index.js";
import { LinkConfigContext } from "../../link/src/link.js";
import { TableConfigContext } from "../../table/src/table/defaults.js";
import { ExperimentalFeatures } from "./config-provider-props.js";
import "../../../index.js";
import * as vue from "vue";

//#region ../../packages/components/config-provider/src/config-provider.d.ts
declare const messageConfig: MessageConfigContext;
declare const ConfigProvider: vue.DefineComponent<vue.ExtractPropTypes<{
  readonly emptyValues: ArrayConstructor;
  readonly valueOnClear: EpPropFinalized<(new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null) | (((new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null)) | null)[], unknown, unknown, undefined, boolean>;
  readonly a11y: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly locale: {
    readonly type: vue.PropType<Language>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly size: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly button: {
    readonly type: vue.PropType<ButtonConfigContext>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly card: {
    readonly type: vue.PropType<CardConfigContext>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly dialog: {
    readonly type: vue.PropType<DialogConfigContext>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly link: {
    readonly type: vue.PropType<LinkConfigContext>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly experimentalFeatures: {
    readonly type: vue.PropType<ExperimentalFeatures>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly keyboardNavigation: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly message: {
    readonly type: vue.PropType<MessageConfigContext>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly zIndex: NumberConstructor;
  readonly namespace: EpPropFinalized<StringConstructor, unknown, unknown, "el", boolean>;
  readonly table: {
    readonly type: vue.PropType<TableConfigContext>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
  [key: string]: any;
}>, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.PublicProps, Readonly<vue.ExtractPropTypes<{
  readonly emptyValues: ArrayConstructor;
  readonly valueOnClear: EpPropFinalized<(new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null) | (((new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null)) | null)[], unknown, unknown, undefined, boolean>;
  readonly a11y: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly locale: {
    readonly type: vue.PropType<Language>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly size: {
    readonly type: vue.PropType<EpPropMergeType<StringConstructor, "" | "default" | "small" | "large", never>>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly button: {
    readonly type: vue.PropType<ButtonConfigContext>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly card: {
    readonly type: vue.PropType<CardConfigContext>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly dialog: {
    readonly type: vue.PropType<DialogConfigContext>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly link: {
    readonly type: vue.PropType<LinkConfigContext>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly experimentalFeatures: {
    readonly type: vue.PropType<ExperimentalFeatures>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly keyboardNavigation: EpPropFinalized<BooleanConstructor, unknown, unknown, true, boolean>;
  readonly message: {
    readonly type: vue.PropType<MessageConfigContext>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
  readonly zIndex: NumberConstructor;
  readonly namespace: EpPropFinalized<StringConstructor, unknown, unknown, "el", boolean>;
  readonly table: {
    readonly type: vue.PropType<TableConfigContext>;
    readonly required: false;
    readonly validator: ((val: unknown) => boolean) | undefined;
    __epPropKey: true;
  };
}>> & Readonly<{}>, {
  readonly a11y: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly keyboardNavigation: EpPropMergeType<BooleanConstructor, unknown, unknown>;
  readonly namespace: string;
  readonly valueOnClear: EpPropMergeType<(new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null) | (((new (...args: any[]) => string | number | boolean | Function) | (() => string | number | boolean | Function | null)) | null)[], unknown, unknown>;
}, {}, {}, {}, string, vue.ComponentProvideOptions, true, {}, any>;
type ConfigProviderInstance = InstanceType<typeof ConfigProvider> & unknown;
//#endregion
export { ConfigProvider, ConfigProviderInstance, messageConfig };