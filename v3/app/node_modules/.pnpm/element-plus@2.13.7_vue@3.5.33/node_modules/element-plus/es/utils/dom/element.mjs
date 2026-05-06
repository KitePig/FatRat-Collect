import { isClient } from "../browser.mjs";
import { isString } from "../types.mjs";

//#region ../../packages/utils/dom/element.ts
const getElement = ((target) => {
	if (!isClient || target === "") return null;
	if (isString(target)) try {
		return document.querySelector(target);
	} catch {
		return null;
	}
	return target;
});

//#endregion
export { getElement };
//# sourceMappingURL=element.mjs.map