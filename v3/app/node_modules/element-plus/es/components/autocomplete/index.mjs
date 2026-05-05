import { withInstall } from "../../utils/vue/install.mjs";
import { autocompleteEmits, autocompleteProps } from "./src/autocomplete.mjs";
import autocomplete_default from "./src/autocomplete2.mjs";

//#region ../../packages/components/autocomplete/index.ts
const ElAutocomplete = withInstall(autocomplete_default);

//#endregion
export { ElAutocomplete, ElAutocomplete as default, autocompleteEmits, autocompleteProps };
//# sourceMappingURL=index.mjs.map