import { withInstall } from "../../utils/vue/install.mjs";
import { inputEmits, inputProps, inputPropsDefaults } from "./src/input.mjs";
import input_default from "./src/input2.mjs";

//#region ../../packages/components/input/index.ts
const ElInput = withInstall(input_default);

//#endregion
export { ElInput, ElInput as default, inputEmits, inputProps, inputPropsDefaults };
//# sourceMappingURL=index.mjs.map