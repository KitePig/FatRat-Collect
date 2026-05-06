import { Ref } from "vue";

//#region ../../packages/hooks/use-throttle-render/index.d.ts
type ThrottleType = {
  leading?: number;
  trailing?: number;
  initVal?: boolean;
} | number;
declare const useThrottleRender: (loading: Ref<boolean>, throttle?: ThrottleType) => Ref<boolean, boolean>;
//#endregion
export { ThrottleType, useThrottleRender };