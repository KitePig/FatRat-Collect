import { ref } from "vue";

//#region ../../packages/components/input-tag/src/composables/use-hovering.ts
function useHovering() {
	const hovering = ref(false);
	const handleMouseEnter = () => {
		hovering.value = true;
	};
	const handleMouseLeave = () => {
		hovering.value = false;
	};
	return {
		hovering,
		handleMouseEnter,
		handleMouseLeave
	};
}

//#endregion
export { useHovering };
//# sourceMappingURL=use-hovering.mjs.map