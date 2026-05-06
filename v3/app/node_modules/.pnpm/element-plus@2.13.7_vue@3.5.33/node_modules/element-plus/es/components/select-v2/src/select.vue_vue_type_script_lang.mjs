import { BORDER_HORIZONTAL_WIDTH } from "../../../constants/form.mjs";
import { isArray } from "../../../utils/types.mjs";
import ClickOutside from "../../../directives/click-outside/index.mjs";
import { useCalcInputWidth } from "../../../hooks/use-calc-input-width/index.mjs";
import { useId } from "../../../hooks/use-id/index.mjs";
import { ElIcon } from "../../icon/index.mjs";
import { ElTooltip } from "../../tooltip/index.mjs";
import { ElTag } from "../../tag/index.mjs";
import { selectV2Emits, selectV2Props } from "./defaults.mjs";
import { selectV2InjectionKey } from "./token.mjs";
import select_dropdown_default from "./select-dropdown.mjs";
import useSelect from "./useSelect.mjs";
import { computed, defineComponent, provide, reactive, toRefs } from "vue";

//#region ../../packages/components/select-v2/src/select.vue?vue&type=script&lang.ts
var select_vue_vue_type_script_lang_default = defineComponent({
	name: "ElSelectV2",
	components: {
		ElSelectMenu: select_dropdown_default,
		ElTag,
		ElTooltip,
		ElIcon
	},
	directives: { ClickOutside },
	props: selectV2Props,
	emits: selectV2Emits,
	setup(props, { emit }) {
		const modelValue = computed(() => {
			const { modelValue: rawModelValue, multiple } = props;
			const fallback = multiple ? [] : void 0;
			if (isArray(rawModelValue)) return multiple ? rawModelValue : fallback;
			return multiple ? fallback : rawModelValue;
		});
		const API = useSelect(reactive({
			...toRefs(props),
			modelValue
		}), emit);
		const { calculatorRef, inputStyle } = useCalcInputWidth();
		const contentId = useId();
		provide(selectV2InjectionKey, {
			props: reactive({
				...toRefs(props),
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
		const selectedLabel = computed(() => {
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
			BORDER_HORIZONTAL_WIDTH
		};
	}
});

//#endregion
export { select_vue_vue_type_script_lang_default as default };
//# sourceMappingURL=select.vue_vue_type_script_lang.mjs.map