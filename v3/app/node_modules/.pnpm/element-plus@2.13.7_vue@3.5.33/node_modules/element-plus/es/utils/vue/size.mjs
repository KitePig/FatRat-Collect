import { componentSizeMap } from "../../constants/size.mjs";

//#region ../../packages/utils/vue/size.ts
const getComponentSize = (size) => {
	return componentSizeMap[size || "default"];
};

//#endregion
export { getComponentSize };
//# sourceMappingURL=size.mjs.map