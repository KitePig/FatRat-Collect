import { useLocale } from "../../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../../hooks/use-namespace/index.mjs";
import { ElInput } from "../../../input/index.mjs";
import { usePagination } from "../usePagination.mjs";
import { paginationJumperProps } from "./jumper.mjs";
import { computed, createElementBlock, createElementVNode, createVNode, defineComponent, normalizeClass, openBlock, ref, toDisplayString, unref } from "vue";

//#region ../../packages/components/pagination/src/components/jumper.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["disabled"];
var jumper_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElPaginationJumper",
	__name: "jumper",
	props: paginationJumperProps,
	setup(__props) {
		const { t } = useLocale();
		const ns = useNamespace("pagination");
		const { pageCount, disabled, currentPage, changeEvent } = usePagination();
		const userInput = ref();
		const innerValue = computed(() => userInput.value ?? currentPage?.value);
		function handleInput(val) {
			userInput.value = val ? +val : "";
		}
		function handleChange(val) {
			val = Math.trunc(+val);
			changeEvent?.(val);
			userInput.value = void 0;
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("span", {
				class: normalizeClass(unref(ns).e("jump")),
				disabled: unref(disabled)
			}, [
				createElementVNode("span", { class: normalizeClass([unref(ns).e("goto")]) }, toDisplayString(unref(t)("el.pagination.goto")), 3),
				createVNode(unref(ElInput), {
					size: _ctx.size,
					class: normalizeClass([unref(ns).e("editor"), unref(ns).is("in-pagination")]),
					min: 1,
					max: unref(pageCount),
					disabled: unref(disabled),
					"model-value": innerValue.value,
					"validate-event": false,
					"aria-label": unref(t)("el.pagination.page"),
					type: "number",
					"onUpdate:modelValue": handleInput,
					onChange: handleChange
				}, null, 8, [
					"size",
					"class",
					"max",
					"disabled",
					"model-value",
					"aria-label"
				]),
				createElementVNode("span", { class: normalizeClass([unref(ns).e("classifier")]) }, toDisplayString(unref(t)("el.pagination.pageClassifier")), 3)
			], 10, _hoisted_1);
		};
	}
});

//#endregion
export { jumper_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=jumper.vue_vue_type_script_setup_true_lang.mjs.map