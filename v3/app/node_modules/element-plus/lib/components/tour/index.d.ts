import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { TourContentEmits, TourContentProps, TourContentPropsPublic, tourContentEmits, tourContentProps, tourPlacements, tourStrategies } from "./src/content.js";
import { TourBtnProps, TourGap, TourMask } from "./src/types.js";
import { TourEmits, TourInstance, TourProps, TourPropsPublic, tourEmits, tourProps } from "./src/tour.js";
import { _default } from "./src/tour.vue.js";
import { TourStepEmits, TourStepProps, TourStepPropsPublic, tourStepEmits, tourStepProps } from "./src/step.js";
import { _default as _default$1 } from "./src/step.vue.js";

//#region ../../packages/components/tour/index.d.ts
declare const ElTour: SFCWithInstall<typeof _default> & {
  TourStep: typeof _default$1;
};
declare const ElTourStep: SFCWithInstall<typeof _default$1>;
//#endregion
export { ElTour, ElTour as default, ElTourStep, type TourBtnProps, TourContentEmits, TourContentProps, TourContentPropsPublic, TourEmits, type TourGap, TourInstance, type TourMask, TourProps, TourPropsPublic, TourStepEmits, TourStepProps, TourStepPropsPublic, tourContentEmits, tourContentProps, tourEmits, tourPlacements, tourProps, tourStepEmits, tourStepProps, tourStrategies };