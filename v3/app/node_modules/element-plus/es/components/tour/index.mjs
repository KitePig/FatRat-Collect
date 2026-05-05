import { withInstall, withNoopInstall } from "../../utils/vue/install.mjs";
import { tourContentEmits, tourContentProps, tourPlacements, tourStrategies } from "./src/content.mjs";
import { tourEmits, tourProps } from "./src/tour.mjs";
import tour_default from "./src/tour2.mjs";
import { tourStepEmits, tourStepProps } from "./src/step.mjs";
import step_default from "./src/step2.mjs";

//#region ../../packages/components/tour/index.ts
const ElTour = withInstall(tour_default, { TourStep: step_default });
const ElTourStep = withNoopInstall(step_default);

//#endregion
export { ElTour, ElTour as default, ElTourStep, tourContentEmits, tourContentProps, tourEmits, tourPlacements, tourProps, tourStepEmits, tourStepProps, tourStrategies };
//# sourceMappingURL=index.mjs.map