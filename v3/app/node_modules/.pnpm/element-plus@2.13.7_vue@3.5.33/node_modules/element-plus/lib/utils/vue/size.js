Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_size = require('../../constants/size.js');

//#region ../../packages/utils/vue/size.ts
const getComponentSize = (size) => {
	return require_size.componentSizeMap[size || "default"];
};

//#endregion
exports.getComponentSize = getComponentSize;
//# sourceMappingURL=size.js.map