import { CHANGE_EVENT } from "../../../constants/event.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { checkTagEmits, checkTagProps } from "./check-tag.mjs";
import { computed, createElementBlock, defineComponent, normalizeClass, openBlock, renderSlot } from "vue";

//#region ../../packages/components/check-tag/src/check-tag.vue?vue&type=script&setup=true&lang.ts
var check_tag_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElCheckTag",
	__name: "check-tag",
	props: checkTagProps,
	emits: checkTagEmits,
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const ns = useNamespace("check-tag");
		const containerKls = computed(() => [
			ns.b(),
			ns.is("checked", props.checked),
			ns.is("disabled", props.disabled),
			ns.m(props.type || "primary")
		]);
		const handleChange = () => {
			if (props.disabled) return;
			const checked = !props.checked;
			emit(CHANGE_EVENT, checked);
			emit("update:checked", checked);
		};
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("span", {
				class: normalizeClass(containerKls.value),
				onClick: handleChange
			}, [renderSlot(_ctx.$slots, "default")], 2);
		};
	}
});

//#endregion
export { check_tag_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=check-tag.vue_vue_type_script_setup_true_lang.mjs.map