const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_icon = require('../../../utils/vue/icon.js');
const require_validator = require('../../../utils/vue/validator.js');
const require_index = require('../../../directives/trap-focus/index.js');
const require_index$1 = require('../../../hooks/use-draggable/index.js');
const require_index$2 = require('../../../hooks/use-lockscreen/index.js');
const require_index$3 = require('../../../hooks/use-same-target/index.js');
const require_index$4 = require('../../../hooks/use-id/index.js');
const require_index$5 = require('../../icon/index.js');
const require_index$6 = require('../../focus-trap/index.js');
const require_index$7 = require('../../input/index.js');
const require_use_global_config = require('../../config-provider/src/hooks/use-global-config.js');
const require_index$8 = require('../../button/index.js');
const require_index$9 = require('../../overlay/index.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/message-box/src/index.vue?vue&type=script&lang.ts
var index_vue_vue_type_script_lang_default = (0, vue.defineComponent)({
	name: "ElMessageBox",
	directives: { TrapFocus: require_index.default },
	components: {
		ElButton: require_index$8.ElButton,
		ElFocusTrap: require_index$6.default,
		ElInput: require_index$7.ElInput,
		ElOverlay: require_index$9.ElOverlay,
		ElIcon: require_index$5.ElIcon,
		...require_icon.TypeComponents
	},
	inheritAttrs: false,
	props: {
		buttonSize: {
			type: String,
			validator: require_validator.isValidComponentSize
		},
		modal: {
			type: Boolean,
			default: true
		},
		lockScroll: {
			type: Boolean,
			default: true
		},
		showClose: {
			type: Boolean,
			default: true
		},
		closeOnClickModal: {
			type: Boolean,
			default: true
		},
		closeOnPressEscape: {
			type: Boolean,
			default: true
		},
		closeOnHashChange: {
			type: Boolean,
			default: true
		},
		center: Boolean,
		draggable: Boolean,
		overflow: Boolean,
		roundButton: Boolean,
		container: {
			type: String,
			default: "body"
		},
		boxType: {
			type: String,
			default: ""
		}
	},
	emits: ["vanish", "action"],
	setup(props, { emit }) {
		const { locale, zIndex, ns, size: btnSize } = require_use_global_config.useGlobalComponentSettings("message-box", (0, vue.computed)(() => props.buttonSize));
		const { t } = locale;
		const { nextZIndex } = zIndex;
		const visible = (0, vue.ref)(false);
		const state = (0, vue.reactive)({
			autofocus: true,
			beforeClose: null,
			callback: null,
			cancelButtonText: "",
			cancelButtonClass: "",
			confirmButtonText: "",
			confirmButtonClass: "",
			cancelButtonType: "",
			confirmButtonType: "primary",
			customClass: "",
			customStyle: {},
			dangerouslyUseHTMLString: false,
			distinguishCancelAndClose: false,
			icon: "",
			closeIcon: "",
			inputPattern: null,
			inputPlaceholder: "",
			inputType: "text",
			inputValue: "",
			inputValidator: void 0,
			inputErrorMessage: "",
			message: "",
			modalFade: true,
			modalClass: "",
			showCancelButton: false,
			showConfirmButton: true,
			type: "",
			title: void 0,
			showInput: false,
			action: "",
			confirmButtonLoading: false,
			cancelButtonLoading: false,
			confirmButtonLoadingIcon: (0, vue.markRaw)(_element_plus_icons_vue.Loading),
			cancelButtonLoadingIcon: (0, vue.markRaw)(_element_plus_icons_vue.Loading),
			confirmButtonDisabled: false,
			editorErrorMessage: "",
			validateError: false,
			zIndex: nextZIndex()
		});
		const typeClass = (0, vue.computed)(() => {
			const type = state.type;
			return { [ns.bm("icon", type)]: type && require_icon.TypeComponentsMap[type] };
		});
		const contentId = require_index$4.useId();
		const inputId = require_index$4.useId();
		const iconComponent = (0, vue.computed)(() => {
			const type = state.type;
			return state.icon || type && require_icon.TypeComponentsMap[type] || "";
		});
		const hasMessage = (0, vue.computed)(() => !!state.message);
		const rootRef = (0, vue.ref)();
		const headerRef = (0, vue.ref)();
		const focusStartRef = (0, vue.ref)();
		const inputRef = (0, vue.ref)();
		const confirmRef = (0, vue.ref)();
		const confirmButtonClasses = (0, vue.computed)(() => state.confirmButtonClass);
		(0, vue.watch)(() => state.inputValue, async (val) => {
			await (0, vue.nextTick)();
			if (props.boxType === "prompt" && val) validate();
		}, { immediate: true });
		(0, vue.watch)(() => visible.value, (val) => {
			if (val) {
				if (props.boxType !== "prompt") if (state.autofocus) focusStartRef.value = confirmRef.value?.$el ?? rootRef.value;
				else focusStartRef.value = rootRef.value;
				state.zIndex = nextZIndex();
			}
			if (props.boxType !== "prompt") return;
			if (val) (0, vue.nextTick)().then(() => {
				if (inputRef.value && inputRef.value.$el) if (state.autofocus) focusStartRef.value = getInputElement() ?? rootRef.value;
				else focusStartRef.value = rootRef.value;
			});
			else {
				state.editorErrorMessage = "";
				state.validateError = false;
			}
		});
		const { isDragging } = require_index$1.useDraggable(rootRef, headerRef, (0, vue.computed)(() => props.draggable), (0, vue.computed)(() => props.overflow));
		(0, vue.onMounted)(async () => {
			await (0, vue.nextTick)();
			if (props.closeOnHashChange) window.addEventListener("hashchange", doClose);
		});
		(0, vue.onBeforeUnmount)(() => {
			if (props.closeOnHashChange) window.removeEventListener("hashchange", doClose);
		});
		function doClose() {
			if (!visible.value) return;
			visible.value = false;
			(0, vue.nextTick)(() => {
				if (state.action) emit("action", state.action);
			});
		}
		const handleWrapperClick = () => {
			if (props.closeOnClickModal) handleAction(state.distinguishCancelAndClose ? "close" : "cancel");
		};
		const overlayEvent = require_index$3.useSameTarget(handleWrapperClick);
		const handleInputEnter = (e) => {
			if (state.inputType !== "textarea" && !inputRef.value?.isComposing) {
				e.preventDefault();
				return handleAction("confirm");
			}
		};
		const handleAction = (action) => {
			if (props.boxType === "prompt" && action === "confirm" && !validate()) return;
			state.action = action;
			if (state.beforeClose) state.beforeClose?.(action, state, doClose);
			else doClose();
		};
		const validate = () => {
			if (props.boxType === "prompt") {
				const inputPattern = state.inputPattern;
				if (inputPattern && !inputPattern.test(state.inputValue || "")) {
					state.editorErrorMessage = state.inputErrorMessage || t("el.messagebox.error");
					state.validateError = true;
					return false;
				}
				const inputValidator = state.inputValidator;
				if ((0, _vue_shared.isFunction)(inputValidator)) {
					const validateResult = inputValidator(state.inputValue);
					if (validateResult === false) {
						state.editorErrorMessage = state.inputErrorMessage || t("el.messagebox.error");
						state.validateError = true;
						return false;
					}
					if ((0, _vue_shared.isString)(validateResult)) {
						state.editorErrorMessage = validateResult;
						state.validateError = true;
						return false;
					}
				}
			}
			state.editorErrorMessage = "";
			state.validateError = false;
			return true;
		};
		const getInputElement = () => {
			const inputRefs = inputRef.value?.$refs;
			return inputRefs?.input ?? inputRefs?.textarea;
		};
		const handleClose = () => {
			handleAction("close");
		};
		const onCloseRequested = () => {
			if (props.closeOnPressEscape) handleClose();
		};
		if (props.lockScroll) require_index$2.useLockscreen(visible, { ns });
		return {
			...(0, vue.toRefs)(state),
			ns,
			overlayEvent,
			visible,
			hasMessage,
			typeClass,
			contentId,
			inputId,
			btnSize,
			iconComponent,
			confirmButtonClasses,
			rootRef,
			focusStartRef,
			headerRef,
			inputRef,
			isDragging,
			confirmRef,
			doClose,
			handleClose,
			onCloseRequested,
			handleWrapperClick,
			handleInputEnter,
			handleAction,
			t
		};
	}
});

//#endregion
exports.default = index_vue_vue_type_script_lang_default;
//# sourceMappingURL=index.vue_vue_type_script_lang.js.map