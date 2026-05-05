import { DROPDOWN_INSTANCE_INJECTION_KEY } from "./tokens.mjs";
import { computed, inject } from "vue";

//#region ../../packages/components/dropdown/src/useDropdown.ts
const useDropdown = () => {
	const elDropdown = inject(DROPDOWN_INSTANCE_INJECTION_KEY, {});
	return {
		elDropdown,
		_elDropdownSize: computed(() => elDropdown?.dropdownSize)
	};
};

//#endregion
export { useDropdown };
//# sourceMappingURL=useDropdown.mjs.map