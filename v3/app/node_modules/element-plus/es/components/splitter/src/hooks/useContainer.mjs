import { useElementSize } from "@vueuse/core";
import { computed, ref } from "vue";

//#region ../../packages/components/splitter/src/hooks/useContainer.ts
function useContainer(layout) {
	const containerEl = ref();
	const { width, height } = useElementSize(containerEl);
	return {
		containerEl,
		containerSize: computed(() => {
			return layout.value === "horizontal" ? width.value : height.value;
		})
	};
}

//#endregion
export { useContainer };
//# sourceMappingURL=useContainer.mjs.map