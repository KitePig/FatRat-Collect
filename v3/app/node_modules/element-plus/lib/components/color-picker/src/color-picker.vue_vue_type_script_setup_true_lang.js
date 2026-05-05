const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../constants/aria.js');
const require_event = require('../../../constants/event.js');
const require_event$1 = require('../../../utils/dom/event.js');
const require_error = require('../../../utils/error.js');
const require_index = require('../../../directives/click-outside/index.js');
const require_index$1 = require('../../../hooks/use-locale/index.js');
const require_index$2 = require('../../../hooks/use-namespace/index.js');
const require_index$3 = require('../../../hooks/use-focus-controller/index.js');
const require_index$4 = require('../../../hooks/use-empty-values/index.js');
const require_index$5 = require('../../icon/index.js');
const require_use_form_common_props = require('../../form/src/hooks/use-form-common-props.js');
const require_use_form_item = require('../../form/src/hooks/use-form-item.js');
const require_index$6 = require('../../tooltip/index.js');
const require_index$7 = require('../../button/index.js');
const require_color_picker_panel = require('../../color-picker-panel/src/color-picker-panel.js');
const require_color = require('../../color-picker-panel/src/utils/color.js');
const require_use_common_color = require('../../color-picker-panel/src/composables/use-common-color.js');
const require_index$8 = require('../../color-picker-panel/index.js');
const require_color_picker = require('./color-picker.js');
let _vueuse_core = require("@vueuse/core");
let lodash_unified = require("lodash-unified");
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");

//#region ../../packages/components/color-picker/src/color-picker.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"id",
	"aria-label",
	"aria-labelledby",
	"aria-description",
	"aria-disabled",
	"tabindex"
];
var color_picker_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElColorPicker",
	__name: "color-picker",
	props: require_color_picker.colorPickerProps,
	emits: require_color_picker.colorPickerEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { t } = require_index$1.useLocale();
		const ns = require_index$2.useNamespace("color");
		const { formItem } = require_use_form_item.useFormItem();
		const colorSize = require_use_form_common_props.useFormSize();
		const colorDisabled = require_use_form_common_props.useFormDisabled();
		const { valueOnClear, isEmptyValue } = require_index$4.useEmptyValues(props, null);
		const commonColor = require_use_common_color.useCommonColor(props, emit);
		const { inputId: buttonId, isLabeledByFormItem } = require_use_form_item.useFormItemInputId(props, { formItemContext: formItem });
		const popper = (0, vue.ref)();
		const triggerRef = (0, vue.ref)();
		const pickerPanelRef = (0, vue.ref)();
		const showPicker = (0, vue.ref)(false);
		const showPanelColor = (0, vue.ref)(false);
		let shouldActiveChange = true;
		const { isFocused, handleFocus, handleBlur } = require_index$3.useFocusController(triggerRef, {
			disabled: colorDisabled,
			beforeBlur(event) {
				return popper.value?.isFocusInsideContent(event);
			},
			afterBlur() {
				setShowPicker(false);
				resetColor();
				if (props.validateEvent) formItem?.validate?.("blur").catch((err) => require_error.debugWarn(err));
			}
		});
		const color = (0, _vueuse_core.reactiveComputed)(() => pickerPanelRef.value?.color ?? commonColor.color);
		const panelProps = (0, vue.computed)(() => (0, lodash_unified.pick)(props, Object.keys(require_color_picker_panel.colorPickerPanelProps)));
		const displayedColor = (0, vue.computed)(() => {
			if (!props.modelValue && !showPanelColor.value) return "transparent";
			return displayedRgb(color, props.showAlpha);
		});
		const currentColor = (0, vue.computed)(() => {
			return !props.modelValue && !showPanelColor.value ? "" : color.value;
		});
		const buttonAriaLabel = (0, vue.computed)(() => {
			return !isLabeledByFormItem.value ? props.ariaLabel || t("el.colorpicker.defaultLabel") : void 0;
		});
		const buttonAriaLabelledby = (0, vue.computed)(() => {
			return isLabeledByFormItem.value ? formItem?.labelId : void 0;
		});
		const btnKls = (0, vue.computed)(() => {
			return [
				ns.b("picker"),
				ns.is("disabled", colorDisabled.value),
				ns.bm("picker", colorSize.value),
				ns.is("focused", isFocused.value)
			];
		});
		function displayedRgb(color, showAlpha) {
			const { r, g, b, a } = color.toRgb();
			return showAlpha ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
		}
		function setShowPicker(value) {
			showPicker.value = value;
		}
		const debounceSetShowPicker = (0, lodash_unified.debounce)(setShowPicker, 100, { leading: true });
		function show() {
			if (colorDisabled.value) return;
			setShowPicker(true);
		}
		function hide() {
			debounceSetShowPicker(false);
			resetColor();
		}
		function resetColor() {
			(0, vue.nextTick)(() => {
				if (props.modelValue) color.fromString(props.modelValue);
				else {
					color.value = "";
					(0, vue.nextTick)(() => {
						showPanelColor.value = false;
					});
				}
			});
		}
		function handleTrigger() {
			if (colorDisabled.value) return;
			if (showPicker.value) resetColor();
			debounceSetShowPicker(!showPicker.value);
		}
		function confirmValue() {
			const value = isEmptyValue(color.value) ? valueOnClear.value : color.value;
			emit(require_event.UPDATE_MODEL_EVENT, value);
			emit(require_event.CHANGE_EVENT, value);
			if (props.validateEvent) formItem?.validate("change").catch((err) => require_error.debugWarn(err));
			debounceSetShowPicker(false);
			(0, vue.nextTick)(() => {
				const newColor = new require_color.default({
					enableAlpha: props.showAlpha,
					format: props.colorFormat || "",
					value: props.modelValue
				});
				if (!color.compare(newColor)) resetColor();
			});
		}
		function clear() {
			debounceSetShowPicker(false);
			emit(require_event.UPDATE_MODEL_EVENT, valueOnClear.value);
			emit(require_event.CHANGE_EVENT, valueOnClear.value);
			if (props.modelValue !== valueOnClear.value && props.validateEvent) formItem?.validate("change").catch((err) => require_error.debugWarn(err));
			resetColor();
			emit("clear");
		}
		function handleShowTooltip() {
			pickerPanelRef?.value?.inputRef?.focus();
		}
		function handleClickOutside() {
			if (!showPicker.value) return;
			hide();
			isFocused.value && focus();
		}
		function handleEsc(event) {
			event.preventDefault();
			event.stopPropagation();
			setShowPicker(false);
			resetColor();
		}
		function handleKeyDown(event) {
			switch (require_event$1.getEventCode(event)) {
				case require_aria.EVENT_CODE.enter:
				case require_aria.EVENT_CODE.numpadEnter:
				case require_aria.EVENT_CODE.space:
					event.preventDefault();
					event.stopPropagation();
					show();
					break;
				case require_aria.EVENT_CODE.esc:
					handleEsc(event);
					break;
			}
		}
		function focus() {
			triggerRef.value.focus();
		}
		function blur() {
			triggerRef.value.blur();
		}
		(0, vue.watch)(() => currentColor.value, (val) => {
			shouldActiveChange && emit("activeChange", val);
			shouldActiveChange = true;
		});
		(0, vue.watch)(() => color.value, () => {
			if (!props.modelValue && !showPanelColor.value) showPanelColor.value = true;
		});
		(0, vue.watch)(() => props.modelValue, (newVal) => {
			if (!newVal) showPanelColor.value = false;
			else if (newVal && newVal !== color.value) {
				shouldActiveChange = false;
				color.fromString(newVal);
			}
		});
		(0, vue.watch)(() => showPicker.value, () => {
			pickerPanelRef.value && (0, vue.nextTick)(pickerPanelRef.value.update);
		});
		(0, vue.provide)(require_color_picker_panel.ROOT_COMMON_COLOR_INJECTION_KEY, commonColor);
		__expose({
			color,
			show,
			hide,
			focus,
			blur
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$6.ElTooltip), {
				ref_key: "popper",
				ref: popper,
				visible: showPicker.value,
				"show-arrow": false,
				"fallback-placements": [
					"bottom",
					"top",
					"right",
					"left"
				],
				offset: 0,
				"gpu-acceleration": false,
				"popper-class": [(0, vue.unref)(ns).be("picker", "panel"), __props.popperClass],
				"popper-style": __props.popperStyle,
				"stop-popper-mouse-event": false,
				pure: "",
				loop: "",
				role: "dialog",
				effect: "light",
				trigger: "click",
				teleported: __props.teleported,
				transition: `${(0, vue.unref)(ns).namespace.value}-zoom-in-top`,
				persistent: __props.persistent,
				"append-to": __props.appendTo,
				onShow: handleShowTooltip,
				onHide: _cache[2] || (_cache[2] = ($event) => setShowPicker(false))
			}, {
				content: (0, vue.withCtx)(() => [(0, vue.withDirectives)(((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$8.ElColorPickerPanel), (0, vue.mergeProps)({
					ref_key: "pickerPanelRef",
					ref: pickerPanelRef
				}, panelProps.value, {
					border: false,
					"validate-event": false,
					onKeydown: (0, vue.withKeys)(handleEsc, ["esc"])
				}), {
					footer: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("div", null, [__props.clearable ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$7.ElButton), {
						key: 0,
						class: (0, vue.normalizeClass)((0, vue.unref)(ns).be("footer", "link-btn")),
						text: "",
						size: "small",
						onClick: clear
					}, {
						default: (0, vue.withCtx)(() => [(0, vue.createTextVNode)((0, vue.toDisplayString)((0, vue.unref)(t)("el.colorpicker.clear")), 1)]),
						_: 1
					}, 8, ["class"])) : (0, vue.createCommentVNode)("v-if", true), (0, vue.createVNode)((0, vue.unref)(require_index$7.ElButton), {
						plain: "",
						size: "small",
						class: (0, vue.normalizeClass)((0, vue.unref)(ns).be("footer", "btn")),
						onClick: confirmValue
					}, {
						default: (0, vue.withCtx)(() => [(0, vue.createTextVNode)((0, vue.toDisplayString)((0, vue.unref)(t)("el.colorpicker.confirm")), 1)]),
						_: 1
					}, 8, ["class"])])]),
					_: 1
				}, 16)), [[
					(0, vue.unref)(require_index.default),
					handleClickOutside,
					triggerRef.value
				]])]),
				default: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("div", (0, vue.mergeProps)({
					id: (0, vue.unref)(buttonId),
					ref_key: "triggerRef",
					ref: triggerRef
				}, _ctx.$attrs, {
					class: btnKls.value,
					role: "button",
					"aria-label": buttonAriaLabel.value,
					"aria-labelledby": buttonAriaLabelledby.value,
					"aria-description": (0, vue.unref)(t)("el.colorpicker.description", { color: __props.modelValue || "" }),
					"aria-disabled": (0, vue.unref)(colorDisabled),
					tabindex: (0, vue.unref)(colorDisabled) ? void 0 : __props.tabindex,
					onKeydown: handleKeyDown,
					onFocus: _cache[0] || (_cache[0] = (...args) => (0, vue.unref)(handleFocus) && (0, vue.unref)(handleFocus)(...args)),
					onBlur: _cache[1] || (_cache[1] = (...args) => (0, vue.unref)(handleBlur) && (0, vue.unref)(handleBlur)(...args))
				}), [(0, vue.createElementVNode)("div", {
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).be("picker", "trigger")),
					onClick: handleTrigger
				}, [(0, vue.createElementVNode)("span", { class: (0, vue.normalizeClass)([(0, vue.unref)(ns).be("picker", "color"), (0, vue.unref)(ns).is("alpha", __props.showAlpha)]) }, [(0, vue.createElementVNode)("span", {
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).be("picker", "color-inner")),
					style: (0, vue.normalizeStyle)({ backgroundColor: displayedColor.value })
				}, [(0, vue.withDirectives)((0, vue.createVNode)((0, vue.unref)(require_index$5.ElIcon), { class: (0, vue.normalizeClass)([(0, vue.unref)(ns).be("picker", "icon"), (0, vue.unref)(ns).is("icon-arrow-down")]) }, {
					default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.ArrowDown))]),
					_: 1
				}, 8, ["class"]), [[vue.vShow, __props.modelValue || showPanelColor.value]]), (0, vue.withDirectives)((0, vue.createVNode)((0, vue.unref)(require_index$5.ElIcon), { class: (0, vue.normalizeClass)([(0, vue.unref)(ns).be("picker", "empty"), (0, vue.unref)(ns).is("icon-close")]) }, {
					default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.Close))]),
					_: 1
				}, 8, ["class"]), [[vue.vShow, !__props.modelValue && !showPanelColor.value]])], 6)], 2)], 2)], 16, _hoisted_1)]),
				_: 1
			}, 8, [
				"visible",
				"popper-class",
				"popper-style",
				"teleported",
				"transition",
				"persistent",
				"append-to"
			]);
		};
	}
});

//#endregion
exports.default = color_picker_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=color-picker.vue_vue_type_script_setup_true_lang.js.map