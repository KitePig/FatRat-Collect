import { shallowReactive } from "vue";

//#region ../../packages/components/message/src/instance.ts
const placementInstances = shallowReactive({});
const getOrCreatePlacementInstances = (placement) => {
	if (!placementInstances[placement]) placementInstances[placement] = shallowReactive([]);
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
export { getInstance, getLastOffset, getOffsetOrSpace, getOrCreatePlacementInstances, placementInstances };
//# sourceMappingURL=instance.mjs.map