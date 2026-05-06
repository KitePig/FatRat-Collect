import { withInstall, withNoopInstall } from "../../utils/vue/install.mjs";
import { selectGroupKey, selectKey } from "./src/token.mjs";
import option_default from "./src/option2.mjs";
import { selectEmits, selectProps } from "./src/select.mjs";
import option_group_default from "./src/option-group.mjs";
import select_default from "./src/select2.mjs";

//#region ../../packages/components/select/index.ts
const ElSelect = withInstall(select_default, {
	Option: option_default,
	OptionGroup: option_group_default
});
const ElOption = withNoopInstall(option_default);
const ElOptionGroup = withNoopInstall(option_group_default);

//#endregion
export { ElOption, ElOptionGroup, ElSelect, ElSelect as default, selectEmits, selectGroupKey, selectKey, selectProps };
//# sourceMappingURL=index.mjs.map