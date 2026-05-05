import { BORDER_HORIZONTAL_WIDTH } from "../../../constants/form.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { selectKey } from "./token.mjs";
import { useResizeObserver } from "@vueuse/core";
import { computed, defineComponent, inject, onMounted, ref } from "vue";

//#region ../../packages/components/select/src/select-dropdown.vue?vue&type=script&lang.ts
var select_dropdown_vue_vue_type_script_lang_default = defineComponent({
	name: "ElSelectDropdown",
	componentName: "ElSelectDropdown",
	setup() {
		const select = inject(selectKey);
		const ns = useNamespace("select");
		const popperClass = computed(() => select.props.popperClass);
		const isMultiple = computed(() => select.props.multiple);
		const isFitInputWidth = computed(() => select.props.fitInputWidth);
		const minWidth = ref("");
		function updateMinWidth() {
			const offsetWidth = select.selectRef?.offsetWidth;
			if (offsetWidth) minWidth.value = `${offsetWidth - BORDER_HORIZONTAL_WIDTH}px`;
			else minWidth.value = "";
		}
		onMounted(() => {
			updateMinWidth();
			useResizeObserver(select.selectRef, updateMinWidth);
		});
		return {
			ns,
			minWidth,
			popperClass,
			isMultiple,
			isFitInputWidth
		};
	}
});

//#endregion
export { select_dropdown_vue_vue_type_script_lang_default as default };
//# sourceMappingURL=select-dropdown.vue_vue_type_script_lang.mjs.map