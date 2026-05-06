import { SFCWithInstall } from "../../utils/vue/typescript.js";
import "../../utils/index.js";
import { SelectEmits, SelectInstance, SelectOptionProps, SelectProps, SelectPropsPublic, TagTooltipProps, selectEmits, selectProps } from "./src/select.js";
import { OptionBasic, OptionPublicInstance, SelectContext } from "./src/type.js";
import { _default } from "./src/select.vue.js";
import { _default as _default$1 } from "./src/option.vue.js";
import { _default as _default$2 } from "./src/option-group.vue.js";
import { selectGroupKey, selectKey } from "./src/token.js";

//#region ../../packages/components/select/index.d.ts
declare const ElSelect: SFCWithInstall<typeof _default> & {
  Option: typeof _default$1;
  OptionGroup: typeof _default$2;
};
declare const ElOption: SFCWithInstall<typeof _default$1>;
declare const ElOptionGroup: SFCWithInstall<typeof _default$2>;
//#endregion
export { ElOption, ElOptionGroup, ElSelect, ElSelect as default, type OptionBasic, type SelectContext, SelectEmits, SelectInstance, SelectOptionProps, type OptionPublicInstance as SelectOptionProxy, SelectProps, SelectPropsPublic, TagTooltipProps, selectEmits, selectGroupKey, selectKey, selectProps };