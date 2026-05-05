import { debugWarn } from "../../utils/error.mjs";
import { unref, watch } from "vue";

//#region ../../packages/hooks/use-deprecated/index.ts
const useDeprecated = ({ from, replacement, scope, version, ref, type = "API" }, condition) => {
	watch(() => unref(condition), (val) => {
		if (val) debugWarn(scope, `[${type}] ${from} is about to be deprecated in version ${version}, please use ${replacement} instead.
For more detail, please visit: ${ref}
`);
	}, { immediate: true });
};

//#endregion
export { useDeprecated };
//# sourceMappingURL=index.mjs.map