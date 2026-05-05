import { isFocusable } from "../../../utils/dom/aria.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { useId } from "../../../hooks/use-id/index.mjs";
import { COMPONENT_NAME, optionProps } from "./option.mjs";
import { useOption } from "./useOption.mjs";
import { computed, defineComponent, getCurrentInstance, nextTick, onBeforeUnmount, reactive, toRefs, unref } from "vue";

//#region ../../packages/components/select/src/option.vue?vue&type=script&lang.ts
var option_vue_vue_type_script_lang_default = defineComponent({
	name: COMPONENT_NAME,
	componentName: COMPONENT_NAME,
	props: optionProps,
	setup(props) {
		const ns = useNamespace("select");
		const id = useId();
		const containerKls = computed(() => [
			ns.be("dropdown", "item"),
			ns.is("disabled", unref(isDisabled)),
			ns.is("selected", unref(itemSelected)),
			ns.is("hovering", unref(hover))
		]);
		const states = reactive({
			index: -1,
			groupDisabled: false,
			visible: true,
			hover: false
		});
		const { currentLabel, itemSelected, isDisabled, select, hoverItem, updateOption } = useOption(props, states);
		const { visible, hover } = toRefs(states);
		const vm = getCurrentInstance().proxy;
		select.onOptionCreate(vm);
		onBeforeUnmount(() => {
			const key = vm.value;
			nextTick(() => {
				const { selected: selectedOptions } = select.states;
				const doesSelected = selectedOptions.some((item) => {
					return item.value === vm.value;
				});
				if (select.states.cachedOptions.get(key) === vm && !doesSelected) select.states.cachedOptions.delete(key);
			});
			select.onOptionDestroy(key, vm);
		});
		function selectOptionClick() {
			if (!isDisabled.value) select.handleOptionSelect(vm);
		}
		const handleMousedown = (event) => {
			let target = event.target;
			const currentTarget = event.currentTarget;
			while (target && target !== currentTarget) {
				if (isFocusable(target)) return;
				target = target.parentElement;
			}
			event.preventDefault();
		};
		return {
			ns,
			id,
			containerKls,
			currentLabel,
			itemSelected,
			isDisabled,
			select,
			visible,
			hover,
			states,
			hoverItem,
			handleMousedown,
			updateOption,
			selectOptionClick
		};
	}
});

//#endregion
export { option_vue_vue_type_script_lang_default as default };
//# sourceMappingURL=option.vue_vue_type_script_lang.mjs.map