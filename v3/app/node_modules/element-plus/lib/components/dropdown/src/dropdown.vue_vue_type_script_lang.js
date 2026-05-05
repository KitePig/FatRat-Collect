const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_style = require('../../../utils/dom/style.js');
const require_index = require('../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../hooks/use-namespace/index.js');
const require_index$2 = require('../../../hooks/use-id/index.js');
const require_index$3 = require('../../icon/index.js');
const require_only_child = require('../../slot/src/only-child.js');
const require_use_form_common_props = require('../../form/src/hooks/use-form-common-props.js');
const require_index$4 = require('../../tooltip/index.js');
const require_index$5 = require('../../scrollbar/index.js');
const require_index$6 = require('../../button/index.js');
const require_index$7 = require('../../roving-focus-group/index.js');
const require_dropdown = require('./dropdown.js');
const require_tokens = require('./tokens.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");
let lodash_unified = require("lodash-unified");

//#region ../../packages/components/dropdown/src/dropdown.vue?vue&type=script&lang.ts
const { ButtonGroup: ElButtonGroup } = require_index$6.ElButton;
var dropdown_vue_vue_type_script_lang_default = (0, vue.defineComponent)({
	name: "ElDropdown",
	components: {
		ElButton: require_index$6.ElButton,
		ElButtonGroup,
		ElScrollbar: require_index$5.ElScrollbar,
		ElTooltip: require_index$4.ElTooltip,
		ElRovingFocusGroup: require_index$7.default,
		ElOnlyChild: require_only_child.OnlyChild,
		ElIcon: require_index$3.ElIcon,
		ArrowDown: _element_plus_icons_vue.ArrowDown
	},
	props: require_dropdown.dropdownProps,
	emits: [
		"visible-change",
		"click",
		"command"
	],
	setup(props, { emit }) {
		const _instance = (0, vue.getCurrentInstance)();
		const ns = require_index$1.useNamespace("dropdown");
		const { t } = require_index.useLocale();
		const triggeringElementRef = (0, vue.ref)();
		const referenceElementRef = (0, vue.ref)();
		const popperRef = (0, vue.ref)();
		const contentRef = (0, vue.ref)();
		const scrollbar = (0, vue.ref)(null);
		const currentTabId = (0, vue.ref)(null);
		const isUsingKeyboard = (0, vue.ref)(false);
		const wrapStyle = (0, vue.computed)(() => ({ maxHeight: require_style.addUnit(props.maxHeight) }));
		const dropdownTriggerKls = (0, vue.computed)(() => [ns.m(dropdownSize.value)]);
		const trigger = (0, vue.computed)(() => (0, lodash_unified.castArray)(props.trigger));
		const defaultTriggerId = require_index$2.useId().value;
		const triggerId = (0, vue.computed)(() => props.id || defaultTriggerId);
		function handleClick() {
			popperRef.value?.onClose(void 0, 0);
		}
		function handleClose() {
			popperRef.value?.onClose();
		}
		function handleOpen() {
			popperRef.value?.onOpen();
		}
		const dropdownSize = require_use_form_common_props.useFormSize();
		function commandHandler(...args) {
			emit("command", ...args);
		}
		function onItemEnter() {}
		function onItemLeave() {
			const contentEl = (0, vue.unref)(contentRef);
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
		(0, vue.provide)(require_tokens.DROPDOWN_INJECTION_KEY, {
			contentRef,
			role: (0, vue.computed)(() => props.role),
			triggerId,
			isUsingKeyboard,
			onItemEnter,
			onItemLeave,
			handleClose
		});
		(0, vue.provide)(require_tokens.DROPDOWN_INSTANCE_INJECTION_KEY, {
			instance: _instance,
			dropdownSize,
			handleClick,
			commandHandler,
			trigger: (0, vue.toRef)(props, "trigger"),
			hideOnClick: (0, vue.toRef)(props, "hideOnClick")
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
exports.default = dropdown_vue_vue_type_script_lang_default;
//# sourceMappingURL=dropdown.vue_vue_type_script_lang.js.map