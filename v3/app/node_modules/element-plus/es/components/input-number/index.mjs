import { withInstall } from "../../utils/vue/install.mjs";
import { inputNumberEmits, inputNumberProps } from "./src/input-number.mjs";
import input_number_default from "./src/input-number2.mjs";

//#region ../../packages/components/input-number/index.ts
const ElInputNumber = withInstall(input_number_default);

//#endregion
export { ElInputNumber, ElInputNumber as default, inputNumberEmits, inputNumberProps };
//# sourceMappingURL=index.mjs.map