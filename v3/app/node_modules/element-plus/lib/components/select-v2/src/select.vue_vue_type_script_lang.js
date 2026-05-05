const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_form = require('../../../constants/form.js');
const require_index = require('../../../directives/click-outside/index.js');
const require_index$1 = require('../../../hooks/use-calc-input-width/index.js');
const require_index$2 = require('../../../hooks/use-id/index.js');
const require_index$3 = require('../../icon/index.js');
const require_index$4 = require('../../tooltip/index.js');
const require_index$5 = require('../../tag/index.js');
const require_defaults = require('./defaults.js');
const require_token = require('./token.js');
const require_select_dropdown = require('./select-dropdown.js');
const require_useSelect = require('./useSelect.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/select-v2/src/select.vue?vue&type=script&lang.ts
var select_vue_vue_type_script_lang_default = (0, vue.defineComponent)({
	name: "ElSelectV2",
	components: {
		ElSelectMenu: require_select_dropdown.default,
		ElTag: require_index$5.ElTag,
		ElTooltip: require_index$4.ElTooltip,
		ElIcon: require_index$3.ElIcon
	},
	directives: { ClickOutside: require_index.default },
	props: require_defaults.selectV2Props,
	emits: require_defaults.selectV2Emits,
	setup(props, { emit }) {
		const modelValue = (0, vue.computed)(() => {
			const { modelValue: rawModelValue, multiple } = props;
			const fallback = multiple ? [] : void 0;
			if ((0, _vue_shared.isArray)(rawModelValue)) return multiple ? rawModelValue : fallback;
			return multiple ? fallback : rawModelValue;
		});
		const API = require_useSelect.default((0, vue.reactive)({
			...(0, vue.toRefs)(props),
			modelValue
		}), emit);
		const { calculatorRef, inputStyle } = require_index$1.useCalcInputWidth();
		const contentId = require_index$2.useId();
		(0, vue.provide)(require_token.selectV2InjectionKey, {
			props: (0, vue.reactive)({
				...(0, vue.toRefs)(props),
				height: API.popupHeight,
				modelValue
			}),
			expanded: API.expanded,
			tooltipRef: API.tooltipRef,
			contentId,
			onSelect: API.onSelect,
			onHover: API.onHover,
			onKeyboardNavigate: API.onKeyboardNavigate,
			onKeyboardSelect: API.onKeyboardSelect
		});
		const selectedLabel = (0, vue.computed)(() => {
			if (!props.multiple) return API.states.selectedLabel;
			return API.states.cachedOptions.map((i) => API.getLabel(i));
		});
		return {
			...API,
			modelValue,
			selectedLabel,
			calculatorRef,
			inputStyle,
			contentId,
			BORDER_HORIZONTAL_WIDTH: require_form.BORDER_HORIZONTAL_WIDTH
		};
	}
});

//#endregion
exports.default = select_vue_vue_type_script_lang_default;
//# sourceMappingURL=select.vue_vue_type_script_lang.js.map