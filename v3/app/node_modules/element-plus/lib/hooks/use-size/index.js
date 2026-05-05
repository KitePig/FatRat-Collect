Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
const require_size = require('../../constants/size.js');
const require_runtime$1 = require('../../utils/vue/props/runtime.js');
let vue = require("vue");

//#region ../../packages/hooks/use-size/index.ts
const useSizeProp = require_runtime$1.buildProp({
	type: String,
	values: require_size.componentSizes,
	required: false
});
const useSizeProps = { size: useSizeProp };
const SIZE_INJECTION_KEY = Symbol("size");
const useGlobalSize = () => {
	const injectedSize = (0, vue.inject)(SIZE_INJECTION_KEY, {});
	return (0, vue.computed)(() => {
		return (0, vue.unref)(injectedSize.size) || "";
	});
};

//#endregion
exports.SIZE_INJECTION_KEY = SIZE_INJECTION_KEY;
exports.useGlobalSize = useGlobalSize;
exports.useSizeProp = useSizeProp;
exports.useSizeProps = useSizeProps;
//# sourceMappingURL=index.js.map