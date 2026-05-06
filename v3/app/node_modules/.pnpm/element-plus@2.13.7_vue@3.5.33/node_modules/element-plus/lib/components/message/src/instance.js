Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
let vue = require("vue");

//#region ../../packages/components/message/src/instance.ts
const placementInstances = (0, vue.shallowReactive)({});
const getOrCreatePlacementInstances = (placement) => {
	if (!placementInstances[placement]) placementInstances[placement] = (0, vue.shallowReactive)([]);
	return placementInstances[placement];
};
const getInstance = (id, placement) => {
	const instances = placementInstances[placement] || [];
	const idx = instances.findIndex((instance) => instance.id === id);
	const current = instances[idx];
	let prev;
	if (idx > 0) prev = instances[idx - 1];
	return {
		current,
		prev
	};
};
const getLastOffset = (id, placement) => {
	const { prev } = getInstance(id, placement);
	if (!prev) return 0;
	return prev.vm.exposed.bottom.value;
};
const getOffsetOrSpace = (id, offset, placement) => {
	return (placementInstances[placement] || []).findIndex((instance) => instance.id === id) > 0 ? 16 : offset;
};

//#endregion
exports.getInstance = getInstance;
exports.getLastOffset = getLastOffset;
exports.getOffsetOrSpace = getOffsetOrSpace;
exports.getOrCreatePlacementInstances = getOrCreatePlacementInstances;
exports.placementInstances = placementInstances;
//# sourceMappingURL=instance.js.map