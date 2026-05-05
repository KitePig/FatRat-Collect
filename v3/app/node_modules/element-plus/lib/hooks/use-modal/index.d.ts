import { Ref } from "vue";

//#region ../../packages/hooks/use-modal/index.d.ts
type ModalInstance = {
  handleClose: () => void;
};
declare const useModal: (instance: ModalInstance, visibleRef: Ref<boolean>) => void;
//#endregion
export { useModal };