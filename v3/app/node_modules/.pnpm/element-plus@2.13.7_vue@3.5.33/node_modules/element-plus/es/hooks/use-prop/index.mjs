import { computed, getCurrentInstance } from "vue";

//#region ../../packages/hooks/use-prop/index.ts
const useProp = (name) => {
	const vm = getCurrentInstance();
	return computed(() => (vm?.proxy?.$props)?.[name]);
};

//#endregion
export { useProp };
//# sourceMappingURL=index.mjs.map