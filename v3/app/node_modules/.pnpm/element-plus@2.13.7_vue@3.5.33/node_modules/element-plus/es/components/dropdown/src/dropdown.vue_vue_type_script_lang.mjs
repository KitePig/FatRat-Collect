import { addUnit } from "../../../utils/dom/style.mjs";
import { ensureArray } from "../../../utils/arrays.mjs";
import { useLocale } from "../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { useId } from "../../../hooks/use-id/index.mjs";
import { ElIcon } from "../../icon/index.mjs";
import { OnlyChild } from "../../slot/src/only-child.mjs";
import { useFormSize } from "../../form/src/hooks/use-form-common-props.mjs";
import { ElTooltip } from "../../tooltip/index.mjs";
import { ElScrollbar } from "../../scrollbar/index.mjs";
import { ElButton } from "../../button/index.mjs";
import roving_focus_group_default from "../../roving-focus-group/index.mjs";
import { dropdownProps } from "./dropdown.mjs";
import { DROPDOWN_INJECTION_KEY, DROPDOWN_INSTANCE_INJECTION_KEY } from "./tokens.mjs";
import { ArrowDown } from "@element-plus/icons-vue";
import { computed, defineComponent, getCurrentInstance, provide, ref, toRef, unref } from "vue";

//#region ../../packages/components/dropdown/src/dropdown.vue?vue&type=script&lang.ts
const { ButtonGroup: ElButtonGroup } = ElButton;
var dropdown_vue_vue_type_script_lang_default = defineComponent({
	name: "ElDropdown",
	components: {
		ElButton,
		ElButtonGroup,
		ElScrollbar,
		ElTooltip,
		ElRovingFocusGroup: roving_focus_group_default,
		ElOnlyChild: OnlyChild,
		ElIcon,
		ArrowDown
	},
	props: dropdownProps,
	emits: [
		"visible-change",
		"click",
		"command"
	],
	setup(props, { emit }) {
		const _instance = getCurrentInstance();
		const ns = useNamespace("dropdown");
		const { t } = useLocale();
		const triggeringElementRef = ref();
		const referenceElementRef = ref();
		const popperRef = ref();
		const contentRef = ref();
		const scrollbar = ref(null);
		const currentTabId = ref(null);
		const isUsingKeyboard = ref(false);
		const wrapStyle = computed(() => ({ maxHeight: addUnit(props.maxHeight) }));
		const dropdownTriggerKls = computed(() => [ns.m(dropdownSize.value)]);
		const trigger = computed(() => ensureArray(props.trigger));
		const defaultTriggerId = useId().value;
		const triggerId = computed(() => props.id || defaultTriggerId);
		function handleClick() {
			popperRef.value?.onClose(void 0, 0);
		}
		function handleClose() {
			popperRef.value?.onClose();
		}
		function handleOpen() {
			popperRef.value?.onOpen();
		}
		const dropdownSize = useFormSize();
		function commandHandler(...args) {
			emit("command", ...args);
		}
		function onItemEnter() {}
		function onItemLeave() {
			const contentEl = unref(contentRef);
			trigger.value.includes("hover") && contentEl?.focus({ preventScroll: true });
			currentTabId.value = null;
		}
		function handleCurrentTabIdChange(id) {
			currentTabId.value = id;
		}
		function handleBeforeShowTooltip() {
			emit("visible-change", true);
		}
		function handleShowTooltip(event) {
			isUsingKeyboard.value = event?.type === "keydown";
			contentRef.value?.focus();
		}
		function handleBeforeHideTooltip() {
			emit("visible-change", false);
		}
		provide(DROPDOWN_INJECTION_KEY, {
			contentRef,
			role: computed(() => props.role),
			triggerId,
			isUsingKeyboard,
			onItemEnter,
			onItemLeave,
			handleClose
		});
		provide(DROPDOWN_INSTANCE_INJECTION_KEY, {
			instance: _instance,
			dropdownSize,
			handleClick,
			commandHandler,
			trigger: toRef(props, "trigger"),
			hideOnClick: toRef(props, "hideOnClick")
		});
		const handlerMainButtonClick = (event) => {
			emit("click", event);
		};
		return {
			t,
			ns,
			scrollbar,
			wrapStyle,
			dropdownTriggerKls,
			dropdownSize,
			triggerId,
			currentTabId,
			handleCurrentTabIdChange,
			handlerMainButtonClick,
			handleClose,
			handleOpen,
			handleBeforeShowTooltip,
			handleShowTooltip,
			handleBeforeHideTooltip,
			popperRef,
			contentRef,
			triggeringElementRef,
			referenceElementRef
		};
	}
});

//#endregion
export { dropdown_vue_vue_type_script_lang_default as default };
//# sourceMappingURL=dropdown.vue_vue_type_script_lang.mjs.map