import { TransferDataItem, TransferDirection, TransferKey, TransferProps } from "./transfer.js";
import { TransferPanelInstance } from "./transfer-panel.js";
import * as vue from "vue";
import { VNode } from "vue";

//#region ../../packages/components/transfer/src/transfer.vue.d.ts
declare const __VLS_export: <T extends TransferDataItem = TransferDataItem>(__VLS_props: NonNullable<Awaited<typeof __VLS_setup>>["props"], __VLS_ctx?: __VLS_PrettifyLocal<Pick<NonNullable<Awaited<typeof __VLS_setup>>, "attrs" | "emit" | "slots">>, __VLS_exposed?: NonNullable<Awaited<typeof __VLS_setup>>["expose"], __VLS_setup?: Promise<{
  props: vue.PublicProps & __VLS_PrettifyLocal<TransferProps<T> & {
    onChange?: ((value: TransferKey[], direction: TransferDirection, movedKeys: TransferKey[]) => any) | undefined;
    "onUpdate:modelValue"?: ((value: TransferKey[]) => any) | undefined;
    "onLeft-check-change"?: ((value: TransferKey[], movedKeys?: TransferKey[] | undefined) => any) | undefined;
    "onRight-check-change"?: ((value: TransferKey[], movedKeys?: TransferKey[] | undefined) => any) | undefined;
  }> & (typeof globalThis extends {
    __VLS_PROPS_FALLBACK: infer P;
  } ? P : {});
  expose: (exposed: vue.ShallowUnwrapRef<{
    /** @description clear the filter keyword of a certain panel */clearQuery: (which: TransferDirection) => void; /** @description left panel ref */
    leftPanel: vue.Ref<TransferPanelInstance | undefined, TransferPanelInstance | undefined>; /** @description right panel ref */
    rightPanel: vue.Ref<TransferPanelInstance | undefined, TransferPanelInstance | undefined>;
  }>) => void;
  attrs: any;
  slots: {
    default?: (props: {
      option: T;
    }) => VNode[];
    'left-empty'?: () => VNode[];
    'left-footer'?: () => VNode[];
    'right-empty'?: () => VNode[];
    'right-footer'?: () => VNode[];
  };
  emit: ((event: "change", value: TransferKey[], direction: TransferDirection, movedKeys: TransferKey[]) => void) & ((event: "update:modelValue", value: TransferKey[]) => void) & ((event: "left-check-change", value: TransferKey[], movedKeys?: TransferKey[] | undefined) => void) & ((event: "right-check-change", value: TransferKey[], movedKeys?: TransferKey[] | undefined) => void);
}>) => VNode<vue.RendererNode, vue.RendererElement, {
  [key: string]: any;
}> & {
  __ctx?: Awaited<typeof __VLS_setup>;
};
declare const _default: typeof __VLS_export;
type __VLS_PrettifyLocal<T> = (T extends any ? { [K in keyof T]: T[K] } : { [K in keyof T as K]: T[K] }) & {};
//#endregion
export { _default };