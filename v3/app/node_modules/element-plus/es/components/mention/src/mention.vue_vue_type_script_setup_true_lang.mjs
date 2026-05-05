import { EVENT_CODE } from "../../../constants/aria.mjs";
import { INPUT_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { getEventCode } from "../../../utils/dom/event.mjs";
import { isArray, isFunction } from "../../../utils/types.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { useId } from "../../../hooks/use-id/index.mjs";
import { useFocusController } from "../../../hooks/use-focus-controller/index.mjs";
import { useFormDisabled } from "../../form/src/hooks/use-form-common-props.mjs";
import { ElTooltip } from "../../tooltip/index.mjs";
import { ElInput } from "../../input/index.mjs";
import { getCursorPosition, getMentionCtx } from "./helper.mjs";
import { mentionDefaultProps, mentionEmits, mentionProps } from "./mention.mjs";
import mention_dropdown_default from "./mention-dropdown2.mjs";
import { pick } from "lodash-unified";
import { computed, createElementBlock, createElementVNode, createSlots, createVNode, defineComponent, guardReactiveProps, mergeProps, nextTick, normalizeClass, normalizeProps, normalizeStyle, openBlock, ref, renderList, renderSlot, unref, withCtx, withModifiers } from "vue";

//#region ../../packages/components/mention/src/mention.vue?vue&type=script&setup=true&lang.ts
var mention_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElMention",
	inheritAttrs: false,
	__name: "mention",
	props: mentionProps,
	emits: mentionEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const passInputProps = computed(() => {
			const inputProps = ElInput.props ?? [];
			return pick(props, isArray(inputProps) ? inputProps : Object.keys(inputProps));
		});
		const ns = useNamespace("mention");
		const disabled = useFormDisabled();
		const contentId = useId();
		const elInputRef = ref();
		const tooltipRef = ref();
		const dropdownRef = ref();
		const visible = ref(false);
		const cursorStyle = ref();
		const mentionCtx = ref();
		const computedPlacement = computed(() => props.showArrow ? props.placement : `${props.placement}-start`);
		const computedFallbackPlacements = computed(() => props.showArrow ? ["bottom", "top"] : ["bottom-start", "top-start"]);
		const aliasProps = computed(() => ({
			...mentionDefaultProps,
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
		const options = computed(() => props.options.map(mapOption));
		const filteredOptions = computed(() => {
			const { filterOption } = props;
			if (!mentionCtx.value || !filterOption) return options.value;
			return options.value.filter((option) => filterOption(mentionCtx.value.pattern, option));
		});
		const dropdownVisible = computed(() => {
			return visible.value && (!!filteredOptions.value.length || props.loading);
		});
		const hoveringId = computed(() => {
			return `${contentId.value}-${dropdownRef.value?.hoveringIndex}`;
		});
		const handleInputChange = (value) => {
			emit(UPDATE_MODEL_EVENT, value);
			emit(INPUT_EVENT, value);
			syncAfterCursorMove();
		};
		const handleInputKeyDown = (event) => {
			if (elInputRef.value?.isComposing) return;
			const code = getEventCode(event);
			switch (code) {
				case EVENT_CODE.left:
				case EVENT_CODE.right:
					syncAfterCursorMove();
					break;
				case EVENT_CODE.up:
				case EVENT_CODE.down:
					if (!visible.value) return;
					event.preventDefault();
					dropdownRef.value?.navigateOptions(code === EVENT_CODE.up ? "prev" : "next");
					break;
				case EVENT_CODE.enter:
				case EVENT_CODE.numpadEnter:
					if (!visible.value) {
						props.type !== "textarea" && syncAfterCursorMove();
						return;
					}
					event.preventDefault();
					if (dropdownRef.value?.hoverOption) dropdownRef.value?.selectHoverOption();
					else visible.value = false;
					break;
				case EVENT_CODE.esc:
					if (!visible.value) return;
					event.preventDefault();
					visible.value = false;
					break;
				case EVENT_CODE.backspace: if (props.whole && mentionCtx.value) {
					const { splitIndex, selectionEnd, pattern, prefixIndex, prefix } = mentionCtx.value;
					const inputEl = getInputEl();
					if (!inputEl) return;
					const inputValue = inputEl.value;
					const matchOption = options.value.find((item) => item.value === pattern);
					if ((isFunction(props.checkIsWhole) ? props.checkIsWhole(pattern, prefix) : matchOption) && splitIndex !== -1 && splitIndex + 1 === selectionEnd) {
						event.preventDefault();
						const newValue = inputValue.slice(0, prefixIndex) + inputValue.slice(splitIndex + 1);
						emit(UPDATE_MODEL_EVENT, newValue);
						emit(INPUT_EVENT, newValue);
						emit("whole-remove", pattern, prefix);
						const newSelectionEnd = prefixIndex;
						nextTick(() => {
							inputEl.selectionStart = newSelectionEnd;
							inputEl.selectionEnd = newSelectionEnd;
							syncDropdownVisible();
						});
					}
				}
			}
		};
		const { wrapperRef } = useFocusController(elInputRef, {
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
			emit(UPDATE_MODEL_EVENT, newValue);
			emit(INPUT_EVENT, newValue);
			emit("select", getOriginalOption(item), mentionCtx.value.prefix);
			const newSelectionEnd = mentionCtx.value.start + newMiddlePart.length + (alreadySeparated ? 1 : 0);
			nextTick(() => {
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
				nextTick(() => tooltipRef.value?.updatePopper());
			}, 0);
		};
		const syncCursor = () => {
			const inputEl = getInputEl();
			if (!inputEl) return;
			const caretPosition = getCursorPosition(inputEl);
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
			mentionCtx.value = getMentionCtx(inputEl, prefix, split);
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
			return openBlock(), createElementBlock("div", {
				ref_key: "wrapperRef",
				ref: wrapperRef,
				class: normalizeClass(unref(ns).b())
			}, [createVNode(unref(ElInput), mergeProps(mergeProps(passInputProps.value, _ctx.$attrs), {
				ref_key: "elInputRef",
				ref: elInputRef,
				"model-value": __props.modelValue,
				disabled: unref(disabled),
				role: dropdownVisible.value ? "combobox" : void 0,
				"aria-activedescendant": dropdownVisible.value ? hoveringId.value || "" : void 0,
				"aria-controls": dropdownVisible.value ? unref(contentId) : void 0,
				"aria-expanded": dropdownVisible.value || void 0,
				"aria-label": __props.ariaLabel,
				"aria-autocomplete": dropdownVisible.value ? "none" : void 0,
				"aria-haspopup": dropdownVisible.value ? "listbox" : void 0,
				onInput: handleInputChange,
				onKeydown: handleInputKeyDown,
				onMousedown: handleInputMouseDown
			}), createSlots({ _: 2 }, [renderList(_ctx.$slots, (_, name) => {
				return {
					name,
					fn: withCtx((slotProps) => [renderSlot(_ctx.$slots, name, normalizeProps(guardReactiveProps(slotProps)))])
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
			]), createVNode(unref(ElTooltip), {
				ref_key: "tooltipRef",
				ref: tooltipRef,
				visible: dropdownVisible.value,
				"popper-class": [unref(ns).e("popper"), __props.popperClass],
				"popper-style": __props.popperStyle,
				"popper-options": __props.popperOptions,
				placement: computedPlacement.value,
				"fallback-placements": computedFallbackPlacements.value,
				effect: "light",
				pure: "",
				offset: __props.offset,
				"show-arrow": __props.showArrow
			}, {
				default: withCtx(() => [createElementVNode("div", { style: normalizeStyle(cursorStyle.value) }, null, 4)]),
				content: withCtx(() => [createVNode(mention_dropdown_default, {
					ref_key: "dropdownRef",
					ref: dropdownRef,
					options: filteredOptions.value,
					disabled: unref(disabled),
					loading: __props.loading,
					"content-id": unref(contentId),
					"aria-label": __props.ariaLabel,
					onSelect: handleSelect,
					onClick: _cache[0] || (_cache[0] = withModifiers(($event) => elInputRef.value?.focus(), ["stop"]))
				}, createSlots({ _: 2 }, [renderList(_ctx.$slots, (_, name) => {
					return {
						name,
						fn: withCtx((slotProps) => [renderSlot(_ctx.$slots, name, normalizeProps(guardReactiveProps(slotProps)))])
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
export { mention_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=mention.vue_vue_type_script_setup_true_lang.mjs.map