import { isClient } from "../../utils/browser.mjs";
import { useGetDerivedNamespace } from "../use-namespace/index.mjs";
import { useIdInjection } from "../use-id/index.mjs";
import { computed, onBeforeMount } from "vue";

//#region ../../packages/hooks/use-popper-container/index.ts
const usePopperContainerId = () => {
	const namespace = useGetDerivedNamespace();
	const idInjection = useIdInjection();
	const id = computed(() => {
		return `${namespace.value}-popper-container-${idInjection.prefix}`;
	});
	return {
		id,
		selector: computed(() => `#${id.value}`)
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
	onBeforeMount(() => {
		if (!isClient) return;
		if (!document.body.querySelector(selector.value)) createContainer(id.value);
	});
	return {
		id,
		selector
	};
};

//#endregion
export { usePopperContainer, usePopperContainerId };
//# sourceMappingURL=index.mjs.map