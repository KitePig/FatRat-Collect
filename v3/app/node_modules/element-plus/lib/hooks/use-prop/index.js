Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
let vue = require("vue");

//#region ../../packages/hooks/use-prop/index.ts
const useProp = (name) => {
	const vm = (0, vue.getCurrentInstance)();
	return (0, vue.computed)(() => (vm?.proxy?.$props)?.[name]);
};

//#endregion
exports.useProp = useProp;
//# sourceMappingURL=index.js.map