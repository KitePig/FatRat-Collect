Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
const require_index = require('../use-namespace/index.js');
const require_index$1 = require('../use-id/index.js');
let vue = require("vue");
let _vueuse_core = require("@vueuse/core");

//#region ../../packages/hooks/use-popper-container/index.ts
const usePopperContainerId = () => {
	const namespace = require_index.useGetDerivedNamespace();
	const idInjection = require_index$1.useIdInjection();
	const id = (0, vue.computed)(() => {
		return `${namespace.value}-popper-container-${idInjection.prefix}`;
	});
	return {
		id,
		selector: (0, vue.computed)(() => `#${id.value}`)
	};
};
const createContainer = (id) => {
	const container = document.createElement("div");
	container.id = id;
	document.body.appendChild(container);
	return container;
};
const usePopperContainer = () => {
	const { id, selector } = usePopperContainerId();
	(0, vue.onBeforeMount)(() => {
		if (!_vueuse_core.isClient) return;
		if (process.env.NODE_ENV === "test" || !document.body.querySelector(selector.value)) createContainer(id.value);
	});
	return {
		id,
		selector
	};
};

//#endregion
exports.usePopperContainer = usePopperContainer;
exports.usePopperContainerId = usePopperContainerId;
//# sourceMappingURL=index.js.map