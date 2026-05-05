import { isClient } from "../../../utils/browser.mjs";
import { selectKey } from "../../select/src/token.mjs";
import { defineComponent, inject, watch } from "vue";

//#region ../../packages/components/tree-select/src/cache-options.ts
var cache_options_default = defineComponent({
	props: { data: {
		type: Array,
		default: () => []
	} },
	setup(props) {
		const select = inject(selectKey);
		watch(() => props.data, () => {
			props.data.forEach((item) => {
				if (!select.states.cachedOptions.has(item.value)) select.states.cachedOptions.set(item.value, item);
			});
			const inputs = select.selectRef?.querySelectorAll("input") || [];
			if (isClient && !Array.from(inputs).includes(document.activeElement)) select.setSelected();
		}, {
			flush: "post",
			immediate: true
		});
		return () => void 0;
	}
});

//#endregion
export { cache_options_default as default };
//# sourceMappingURL=cache-options.mjs.map