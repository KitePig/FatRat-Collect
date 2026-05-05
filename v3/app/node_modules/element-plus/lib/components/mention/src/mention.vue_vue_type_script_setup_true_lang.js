const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../constants/aria.js');
const require_event = require('../../../constants/event.js');
const require_event$1 = require('../../../utils/dom/event.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../../hooks/use-id/index.js');
const require_index$2 = require('../../../hooks/use-focus-controller/index.js');
const require_use_form_common_props = require('../../form/src/hooks/use-form-common-props.js');
const require_index$3 = require('../../tooltip/index.js');
const require_index$4 = require('../../input/index.js');
const require_helper = require('./helper.js');
const require_mention = require('./mention.js');
const require_mention_dropdown = require('./mention-dropdown2.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/mention/src/mention.vue?vue&type=script&setup=true&lang.ts
var mention_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElMention",
	inheritAttrs: false,
	__name: "mention",
	props: require_mention.mentionProps,
	emits: require_mention.mentionEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const passInputProps = (0, vue.computed)(() => {
			const inputProps = require_index$4.ElInput.props ?? [];
			return (0, lodash_unified.pick)(props, (0, _vue_shared.isArray)(inputProps) ? inputProps : Object.keys(inputProps));
		});
		const ns = require_index.useNamespace("mention");
		const disabled = require_use_form_common_props.useFormDisabled();
		const contentId = require_index$1.useId();
		const elInputRef = (0, vue.ref)();
		const tooltipRef = (0, vue.ref)();
		const dropdownRef = (0, vue.ref)();
		const visible = (0, vue.ref)(false);
		const cursorStyle = (0, vue.ref)();
		const mentionCtx = (0, vue.ref)();
		const computedPlacement = (0, vue.computed)(() => props.showArrow ? props.placement : `${props.placement}-start`);
		const computedFallbackPlacements = (0, vue.computed)(() => props.showArrow ? ["bottom", "top"] : ["bottom-start", "top-start"]);
		const aliasProps = (0, vue.computed)(() => ({
			...require_mention.mentionDefaultProps,
			...props.props
		}));
		const mapOption = (option) => {
			const base = {
				label: option[aliasProps.value.label],
				value: option[aliasProps.value.value],
				disabled: option[aliasProps.value.disabled]
			};
			return {
				...option,
				...base
			};
		};
		const options = (0, vue.computed)(() => props.options.map(mapOption));
		const filteredOptions = (0, vue.computed)(() => {
			const { filterOption } = props;
			if (!mentionCtx.value || !filterOption) return options.value;
			return options.value.filter((option) => filterOption(mentionCtx.value.pattern, option));
		});
		const dropdownVisible = (0, vue.computed)(() => {
			return visible.value && (!!filteredOptions.value.length || props.loading);
		});
		const hoveringId = (0, vue.computed)(() => {
			return `${contentId.value}-${dropdownRef.value?.hoveringIndex}`;
		});
		const handleInputChange = (value) => {
			emit(require_event.UPDATE_MODEL_EVENT, value);
			emit(require_event.INPUT_EVENT, value);
			syncAfterCursorMove();
		};
		const handleInputKeyDown = (event) => {
			if (elInputRef.value?.isComposing) return;
			const code = require_event$1.getEventCode(event);
			switch (code) {
				case require_aria.EVENT_CODE.left:
				case require_aria.EVENT_CODE.right:
					syncAfterCursorMove();
					break;
				case require_aria.EVENT_CODE.up:
				case require_aria.EVENT_CODE.down:
					if (!visible.value) return;
					event.preventDefault();
					dropdownRef.value?.navigateOptions(code === require_aria.EVENT_CODE.up ? "prev" : "next");
					break;
				case require_aria.EVENT_CODE.enter:
				case require_aria.EVENT_CODE.numpadEnter:
					if (!visible.value) {
						props.type !== "textarea" && syncAfterCursorMove();
						return;
					}
					event.preventDefault();
					if (dropdownRef.value?.hoverOption) dropdownRef.value?.selectHoverOption();
					else visible.value = false;
					break;
				case require_aria.EVENT_CODE.esc:
					if (!visible.value) return;
					event.preventDefault();
					visible.value = false;
					break;
				case require_aria.EVENT_CODE.backspace: if (props.whole && mentionCtx.value) {
					const { splitIndex, selectionEnd, pattern, prefixIndex, prefix } = mentionCtx.value;
					const inputEl = getInputEl();
					if (!inputEl) return;
					const inputValue = inputEl.value;
					const matchOption = options.value.find((item) => item.value === pattern);
					if (((0, _vue_shared.isFunction)(props.checkIsWhole) ? props.checkIsWhole(pattern, prefix) : matchOption) && splitIndex !== -1 && splitIndex + 1 === selectionEnd) {
						event.preventDefault();
						const newValue = inputValue.slice(0, prefixIndex) + inputValue.slice(splitIndex + 1);
						emit(require_event.UPDATE_MODEL_EVENT, newValue);
						emit(require_event.INPUT_EVENT, newValue);
						emit("whole-remove", pattern, prefix);
						const newSelectionEnd = prefixIndex;
						(0, vue.nextTick)(() => {
							inputEl.selectionStart = newSelectionEnd;
							inputEl.selectionEnd = newSelectionEnd;
							syncDropdownVisible();
						});
					}
				}
			}
		};
		const { wrapperRef } = require_index$2.useFocusController(elInputRef, {
			disabled,
			afterFocus() {
				syncAfterCursorMove();
			},
			beforeBlur(event) {
				return tooltipRef.value?.isFocusInsideContent(event);
			},
			afterBlur() {
				visible.value = false;
			}
		});
		const handleInputMouseDown = () => {
			syncAfterCursorMove();
		};
		const getOriginalOption = (mentionOption) => {
			return props.options.find((option) => {
				return mentionOption.value === option[aliasProps.value.value];
			});
		};
		const handleSelect = (item) => {
			if (!mentionCtx.value) return;
			const inputEl = getInputEl();
			if (!inputEl) return;
			const inputValue = inputEl.value;
			const { split } = props;
			const newEndPart = inputValue.slice(mentionCtx.value.end);
			const alreadySeparated = newEndPart.startsWith(split);
			const newMiddlePart = `${item.value}${alreadySeparated ? "" : split}`;
			const newValue = inputValue.slice(0, mentionCtx.value.start) + newMiddlePart + newEndPart;
			emit(require_event.UPDATE_MODEL_EVENT, newValue);
			emit(require_event.INPUT_EVENT, newValue);
			emit("select", getOriginalOption(item), mentionCtx.value.prefix);
			const newSelectionEnd = mentionCtx.value.start + newMiddlePart.length + (alreadySeparated ? 1 : 0);
			(0, vue.nextTick)(() => {
				inputEl.selectionStart = newSelectionEnd;
				inputEl.selectionEnd = newSelectionEnd;
				inputEl.focus();
				syncDropdownVisible();
			});
		};
		const getInputEl = () => props.type === "textarea" ? elInputRef.value?.textarea : elInputRef.value?.input;
		const syncAfterCursorMove = () => {
			setTimeout(() => {
				syncCursor();
				syncDropdownVisible();
				(0, vue.nextTick)(() => tooltipRef.value?.updatePopper());
			}, 0);
		};
		const syncCursor = () => {
			const inputEl = getInputEl();
			if (!inputEl) return;
			const caretPosition = require_helper.getCursorPosition(inputEl);
			const inputRect = inputEl.getBoundingClientRect();
			const wrapperRect = wrapperRef.value.getBoundingClientRect();
			cursorStyle.value = {
				position: "absolute",
				width: 0,
				height: `${caretPosition.height}px`,
				left: `${caretPosition.left + inputRect.left - wrapperRect.left}px`,
				top: `${caretPosition.top + inputRect.top - wrapperRect.top}px`
			};
		};
		const syncDropdownVisible = () => {
			const inputEl = getInputEl();
			if (document.activeElement !== inputEl) {
				visible.value = false;
				return;
			}
			const { prefix, split } = props;
			mentionCtx.value = require_helper.getMentionCtx(inputEl, prefix, split);
			if (mentionCtx.value && mentionCtx.value.splitIndex === -1) {
				visible.value = true;
				emit("search", mentionCtx.value.pattern, mentionCtx.value.prefix);
				return;
			}
			visible.value = false;
		};
		__expose({
			input: elInputRef,
			tooltip: tooltipRef,
			dropdownVisible
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				ref_key: "wrapperRef",
				ref: wrapperRef,
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).b())
			}, [(0, vue.createVNode)((0, vue.unref)(require_index$4.ElInput), (0, vue.mergeProps)((0, vue.mergeProps)(passInputProps.value, _ctx.$attrs), {
				ref_key: "elInputRef",
				ref: elInputRef,
				"model-value": __props.modelValue,
				disabled: (0, vue.unref)(disabled),
				role: dropdownVisible.value ? "combobox" : void 0,
				"aria-activedescendant": dropdownVisible.value ? hoveringId.value || "" : void 0,
				"aria-controls": dropdownVisible.value ? (0, vue.unref)(contentId) : void 0,
				"aria-expanded": dropdownVisible.value || void 0,
				"aria-label": __props.ariaLabel,
				"aria-autocomplete": dropdownVisible.value ? "none" : void 0,
				"aria-haspopup": dropdownVisible.value ? "listbox" : void 0,
				onInput: handleInputChange,
				onKeydown: handleInputKeyDown,
				onMousedown: handleInputMouseDown
			}), (0, vue.createSlots)({ _: 2 }, [(0, vue.renderList)(_ctx.$slots, (_, name) => {
				return {
					name,
					fn: (0, vue.withCtx)((slotProps) => [(0, vue.renderSlot)(_ctx.$slots, name, (0, vue.normalizeProps)((0, vue.guardReactiveProps)(slotProps)))])
				};
			})]), 1040, [
				"model-value",
				"disabled",
				"role",
				"aria-activedescendant",
				"aria-controls",
				"aria-expanded",
				"aria-label",
				"aria-autocomplete",
				"aria-haspopup"
			]), (0, vue.createVNode)((0, vue.unref)(require_index$3.ElTooltip), {
				ref_key: "tooltipRef",
				ref: tooltipRef,
				visible: dropdownVisible.value,
				"popper-class": [(0, vue.unref)(ns).e("popper"), __props.popperClass],
				"popper-style": __props.popperStyle,
				"popper-options": __props.popperOptions,
				placement: computedPlacement.value,
				"fallback-placements": computedFallbackPlacements.value,
				effect: "light",
				pure: "",
				offset: __props.offset,
				"show-arrow": __props.showArrow
			}, {
				default: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("div", { style: (0, vue.normalizeStyle)(cursorStyle.value) }, null, 4)]),
				content: (0, vue.withCtx)(() => [(0, vue.createVNode)(require_mention_dropdown.default, {
					ref_key: "dropdownRef",
					ref: dropdownRef,
					options: filteredOptions.value,
					disabled: (0, vue.unref)(disabled),
					loading: __props.loading,
					"content-id": (0, vue.unref)(contentId),
					"aria-label": __props.ariaLabel,
					onSelect: handleSelect,
					onClick: _cache[0] || (_cache[0] = (0, vue.withModifiers)(($event) => elInputRef.value?.focus(), ["stop"]))
				}, (0, vue.createSlots)({ _: 2 }, [(0, vue.renderList)(_ctx.$slots, (_, name) => {
					return {
						name,
						fn: (0, vue.withCtx)((slotProps) => [(0, vue.renderSlot)(_ctx.$slots, name, (0, vue.normalizeProps)((0, vue.guardReactiveProps)(slotProps)))])
					};
				})]), 1032, [
					"options",
					"disabled",
					"loading",
					"content-id",
					"aria-label"
				])]),
				_: 3
			}, 8, [
				"visible",
				"popper-class",
				"popper-style",
				"popper-options",
				"placement",
				"fallback-placements",
				"offset",
				"show-arrow"
			])], 2);
		};
	}
});

//#endregion
exports.default = mention_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=mention.vue_vue_type_script_setup_true_lang.js.map