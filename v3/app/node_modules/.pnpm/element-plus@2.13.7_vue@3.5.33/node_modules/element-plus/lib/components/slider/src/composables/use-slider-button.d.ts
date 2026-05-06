import { EpPropMergeType } from "../../../../utils/vue/props/types.js";
import "../../../../utils/index.js";
import { TooltipInstance } from "../../../tooltip/src/tooltip.js";
import "../../../tooltip/index.js";
import { SliderButtonEmits, SliderButtonInitData, SliderButtonProps } from "../button.js";
import { CSSProperties, ComputedRef, Ref, SetupContext } from "vue";

//#region ../../packages/components/slider/src/composables/use-slider-button.d.ts
declare const useSliderButton: (props: SliderButtonProps, initData: SliderButtonInitData, emit: SetupContext<SliderButtonEmits>["emit"]) => {
  disabled: ComputedRef<boolean>;
  button: Ref<HTMLDivElement | undefined, HTMLDivElement | undefined>;
  tooltip: Ref<TooltipInstance | undefined, TooltipInstance | undefined>;
  tooltipVisible: Ref<boolean, boolean>;
  showTooltip: Ref<EpPropMergeType<BooleanConstructor, unknown, unknown>, EpPropMergeType<BooleanConstructor, unknown, unknown>>;
  persistent: Ref<EpPropMergeType<BooleanConstructor, unknown, unknown>, EpPropMergeType<BooleanConstructor, unknown, unknown>>;
  wrapperStyle: ComputedRef<CSSProperties>;
  formatValue: ComputedRef<string | number>;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  onButtonDown: (event: MouseEvent | TouchEvent) => void;
  onKeyDown: (event: KeyboardEvent) => void;
  setPosition: (newPosition: number) => Promise<void>;
};
//#endregion
export { useSliderButton };