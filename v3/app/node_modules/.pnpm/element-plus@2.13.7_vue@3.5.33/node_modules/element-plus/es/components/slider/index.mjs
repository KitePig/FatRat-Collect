import { withInstall } from "../../utils/vue/install.mjs";
import { sliderContextKey } from "./src/constants.mjs";
import { sliderEmits, sliderProps } from "./src/slider.mjs";
import slider_default from "./src/slider2.mjs";

//#region ../../packages/components/slider/index.ts
const ElSlider = withInstall(slider_default);

//#endregion
export { ElSlider, ElSlider as default, sliderContextKey, sliderEmits, sliderProps };
//# sourceMappingURL=index.mjs.map