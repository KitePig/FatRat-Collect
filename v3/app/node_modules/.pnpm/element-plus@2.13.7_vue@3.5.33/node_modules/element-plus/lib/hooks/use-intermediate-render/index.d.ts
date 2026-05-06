import { Ref } from "vue";

//#region ../../packages/hooks/use-intermediate-render/index.d.ts
type UseDelayedRenderProps = {
  indicator: Ref<boolean>;
  intermediateIndicator: Ref<boolean>;
  shouldSetIntermediate?: (step: 'show' | 'hide') => boolean;
  beforeShow?: () => void;
  beforeHide?: () => void;
  afterShow?: () => void;
  afterHide?: () => void;
};
declare const useDelayedRender: ({
  indicator,
  intermediateIndicator,
  shouldSetIntermediate,
  beforeShow,
  afterShow,
  afterHide,
  beforeHide
}: UseDelayedRenderProps) => void;
//#endregion
export { UseDelayedRenderProps, useDelayedRender };