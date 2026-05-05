const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../utils/dom/aria.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../../hooks/use-id/index.js');
const require_option = require('./option.js');
const require_useOption = require('./useOption.js');
let vue = require("vue");

//#region ../../packages/components/select/src/option.vue?vue&type=script&lang.ts
var option_vue_vue_type_script_lang_default = (0, vue.defineComponent)({
	name: require_option.COMPONENT_NAME,
	componentName: require_option.COMPONENT_NAME,
	props: require_option.optionProps,
	setup(props) {
		const ns = require_index.useNamespace("select");
		const id = require_index$1.useId();
		const containerKls = (0, vue.computed)(() => [
			ns.be("dropdown", "item"),
			ns.is("disabled", (0, vue.unref)(isDisabled)),
			ns.is("selected", (0, vue.unref)(itemSelected)),
			ns.is("hovering", (0, vue.unref)(hover))
		]);
		const states = (0, vue.reactive)({
			index: -1,
			groupDisabled: false,
			visible: true,
			hover: false
		});
		const { currentLabel, itemSelected, isDisabled, select, hoverItem, updateOption } = require_useOption.useOption(props, states);
		const { visible, hover } = (0, vue.toRefs)(states);
		const vm = (0, vue.getCurrentInstance)().proxy;
		select.onOptionCreate(vm);
		(0, vue.onBeforeUnmount)(() => {
			const key = vm.value;
			(0, vue.nextTick)(() => {
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
				if (require_aria.isFocusable(target)) return;
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
exports.default = option_vue_vue_type_script_lang_default;
//# sourceMappingURL=option.vue_vue_type_script_lang.js.map