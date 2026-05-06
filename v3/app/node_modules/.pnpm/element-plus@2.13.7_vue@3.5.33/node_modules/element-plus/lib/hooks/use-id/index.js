Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
const require_error = require('../../utils/error.js');
const require_index = require('../use-namespace/index.js');
let _vueuse_core = require("@vueuse/core");
let vue = require("vue");

//#region ../../packages/hooks/use-id/index.ts
const defaultIdInjection = {
	prefix: Math.floor(Math.random() * 1e4),
	current: 0
};
const ID_INJECTION_KEY = Symbol("elIdInjection");
const useIdInjection = () => {
	return (0, vue.getCurrentInstance)() ? (0, vue.inject)(ID_INJECTION_KEY, defaultIdInjection) : defaultIdInjection;
};
const useId = (deterministicId) => {
	const idInjection = useIdInjection();
	if (!_vueuse_core.isClient && idInjection === defaultIdInjection) require_error.debugWarn("IdInjection", `Looks like you are using server rendering, you must provide a id provider to ensure the hydration process to be succeed
usage: app.provide(ID_INJECTION_KEY, {
  prefix: number,
  current: number,
})`);
	const namespace = require_index.useGetDerivedNamespace();
	return (0, _vueuse_core.computedEager)(() => (0, vue.unref)(deterministicId) || `${namespace.value}-id-${idInjection.prefix}-${idInjection.current++}`);
};

//#endregion
exports.ID_INJECTION_KEY = ID_INJECTION_KEY;
exports.useId = useId;
exports.useIdInjection = useIdInjection;
//# sourceMappingURL=index.js.map