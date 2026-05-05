import { ComponentPublicInstance, Ref } from "vue";

//#region ../../packages/utils/vue/refs.d.ts
declare const composeRefs: (...refs: Ref<HTMLElement | undefined>[]) => (el: Element | ComponentPublicInstance | null) => void;
//#endregion
export { composeRefs };