import { CHANGE_EVENT, INPUT_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { isClient as isClient$1 } from "../../../utils/browser.mjs";
import { isObject } from "../../../utils/types.mjs";
import { debugWarn } from "../../../utils/error.mjs";
import { ValidateComponentsMap } from "../../../utils/vue/icon.mjs";
import { NOOP } from "../../../utils/functions.mjs";
import { useAttrs as useAttrs$1 } from "../../../hooks/use-attrs/index.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { useCursor } from "../../../hooks/use-cursor/index.mjs";
import { useFocusController } from "../../../hooks/use-focus-controller/index.mjs";
import { useComposition } from "../../../hooks/use-composition/index.mjs";
import { ElIcon } from "../../icon/index.mjs";
import { useFormDisabled, useFormSize } from "../../form/src/hooks/use-form-common-props.mjs";
import { useFormItem, useFormItemInputId } from "../../form/src/hooks/use-form-item.mjs";
import { inputEmits, inputProps } from "./input.mjs";
import { calcTextareaHeight, looseToNumber } from "./utils.mjs";
import { useResizeObserver } from "@vueuse/core";
import { isNil } from "lodash-unified";
import { Hide, View } from "@element-plus/icons-vue";
import { Fragment, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, defineComponent, mergeProps, nextTick, normalizeClass, normalizeStyle, onMounted, openBlock, ref, renderSlot, resolveDynamicComponent, shallowRef, toDisplayString, toRef, unref, useAttrs, useSlots, watch, withCtx, withModifiers } from "vue";

//#region ../../packages/components/input/src/input.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"id",
	"name",
	"minlength",
	"maxlength",
	"type",
	"disabled",
	"readonly",
	"autocomplete",
	"tabindex",
	"aria-label",
	"placeholder",
	"form",
	"autofocus",
	"role",
	"inputmode"
];
const _hoisted_2 = [
	"id",
	"name",
	"minlength",
	"maxlength",
	"tabindex",
	"disabled",
	"readonly",
	"autocomplete",
	"aria-label",
	"placeholder",
	"form",
	"autofocus",
	"rows",
	"role",
	"inputmode"
];
const COMPONENT_NAME = "ElInput";
var input_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: COMPONENT_NAME,
	inheritAttrs: false,
	__name: "input",
	props: inputProps,
	emits: inputEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const rawAttrs = useAttrs();
		const slots = useSlots();
		const containerKls = computed(() => [
			props.type === "textarea" ? nsTextarea.b() : nsInput.b(),
			nsInput.m(inputSize.value),
			nsInput.is("disabled", inputDisabled.value),
			nsInput.is("exceed", inputExceed.value),
			{
				[nsInput.b("group")]: slots.prepend || slots.append,
				[nsInput.m("prefix")]: slots.prefix || props.prefixIcon,
				[nsInput.m("suffix")]: slots.suffix || props.suffixIcon || props.clearable || props.showPassword,
				[nsInput.bm("suffix", "password-clear")]: showClear.value && showPwdVisible.value,
				[nsInput.b("hidden")]: props.type === "hidden"
			},
			rawAttrs.class
		]);
		const wrapperKls = computed(() => [nsInput.e("wrapper"), nsInput.is("focus", isFocused.value)]);
		const attrs = useAttrs$1();
		const maxlength = computed(() => props.maxlength?.toString());
		const { form: elForm, formItem: elFormItem } = useFormItem();
		const { inputId } = useFormItemInputId(props, { formItemContext: elFormItem });
		const inputSize = useFormSize();
		const inputDisabled = useFormDisabled();
		const nsInput = useNamespace("input");
		const nsTextarea = useNamespace("textarea");
		const input = shallowRef();
		const textarea = shallowRef();
		const hovering = ref(false);
		const passwordVisible = ref(false);
		const countStyle = ref();
		const textareaCalcStyle = shallowRef(props.inputStyle);
		const saveValue = ref("");
		const _ref = computed(() => input.value || textarea.value);
		const { wrapperRef, isFocused, handleFocus, handleBlur } = useFocusController(_ref, {
			disabled: inputDisabled,
			afterBlur() {
				if (props.validateEvent) elFormItem?.validate?.("blur").catch((err) => debugWarn(err));
			}
		});
		const needStatusIcon = computed(() => elForm?.statusIcon ?? false);
		const validateState = computed(() => elFormItem?.validateState || "");
		const validateIcon = computed(() => validateState.value && ValidateComponentsMap[validateState.value]);
		const passwordIcon = computed(() => passwordVisible.value ? View : Hide);
		const containerStyle = computed(() => [rawAttrs.style]);
		const textareaStyle = computed(() => [
			props.inputStyle,
			textareaCalcStyle.value,
			{ resize: props.resize }
		]);
		const nativeInputValue = computed(() => isNil(props.modelValue) ? "" : String(props.modelValue));
		const showClear = computed(() => props.clearable && !inputDisabled.value && !props.readonly && !!nativeInputValue.value && (isFocused.value || hovering.value));
		const showPwdVisible = computed(() => props.showPassword && !inputDisabled.value && !!nativeInputValue.value);
		const isWordLimitVisible = computed(() => props.showWordLimit && !!maxlength.value && (props.type === "text" || props.type === "textarea") && !inputDisabled.value && !props.readonly && !props.showPassword);
		const textLength = computed(() => {
			if (props.countGraphemes && props.showWordLimit) return props.countGraphemes(nativeInputValue.value);
			return nativeInputValue.value.length;
		});
		const inputExceed = computed(() => !!isWordLimitVisible.value && textLength.value > Number(maxlength.value));
		const suffixVisible = computed(() => !!slots.suffix || !!props.suffixIcon || showClear.value || props.showPassword || isWordLimitVisible.value || !!validateState.value && needStatusIcon.value);
		const hasModelModifiers = computed(() => !!Object.keys(props.modelModifiers).length);
		const [recordCursor, setCursor] = useCursor(input);
		useResizeObserver(textarea, (entries) => {
			onceInitSizeTextarea();
			if (!isWordLimitVisible.value || props.resize !== "both" && props.resize !== "horizontal") return;
			const { width } = entries[0].contentRect;
			countStyle.value = { right: `calc(100% - ${width + 22 - 10}px)` };
		});
		const resizeTextarea = () => {
			const { type, autosize } = props;
			if (!isClient$1 || type !== "textarea" || !textarea.value) return;
			if (autosize) {
				const minRows = isObject(autosize) ? autosize.minRows : void 0;
				const maxRows = isObject(autosize) ? autosize.maxRows : void 0;
				const textareaStyle = calcTextareaHeight(textarea.value, minRows, maxRows);
				textareaCalcStyle.value = {
					overflowY: "hidden",
					...textareaStyle
				};
				nextTick(() => {
					textarea.value.offsetHeight;
					textareaCalcStyle.value = textareaStyle;
				});
			} else textareaCalcStyle.value = { minHeight: calcTextareaHeight(textarea.value).minHeight };
		};
		const createOnceInitResize = (resizeTextarea) => {
			let isInit = false;
			return () => {
				if (isInit || !props.autosize) return;
				if (!(textarea.value?.offsetParent === null)) {
					setTimeout(resizeTextarea);
					isInit = true;
				}
			};
		};
		const onceInitSizeTextarea = createOnceInitResize(resizeTextarea);
		const setNativeInputValue = () => {
			const input = _ref.value;
			const formatterValue = props.formatter ? props.formatter(nativeInputValue.value) : nativeInputValue.value;
			if (!input || input.value === formatterValue || props.type === "file") return;
			input.value = formatterValue;
		};
		const formatValue = (value) => {
			const { trim, number } = props.modelModifiers;
			if (trim) value = value.trim();
			if (number) value = `${looseToNumber(value)}`;
			if (props.formatter && props.parser) value = props.parser(value);
			return value;
		};
		const handleInput = async (event) => {
			if (isComposing.value) return;
			const { lazy } = props.modelModifiers;
			let { value } = event.target;
			let shouldForceNativeUpdate = false;
			if (lazy) {
				emit(INPUT_EVENT, value);
				return;
			}
			value = formatValue(value);
			if (props.countGraphemes && maxlength.value != null) {
				const limit = Number(maxlength.value);
				const graphemes = props.countGraphemes(value);
				const saveGraphemes = props.countGraphemes(saveValue.value);
				if (graphemes > limit && graphemes > saveGraphemes) if (saveGraphemes > limit) {
					value = saveValue.value;
					shouldForceNativeUpdate = true;
				} else {
					const prevValue = saveValue.value;
					const nextValue = value;
					let prefixLen = 0;
					while (prefixLen < prevValue.length && prefixLen < nextValue.length && prevValue[prefixLen] === nextValue[prefixLen]) prefixLen++;
					let prevSuffixIndex = prevValue.length;
					let nextSuffixIndex = nextValue.length;
					while (prevSuffixIndex > prefixLen && nextSuffixIndex > prefixLen && prevValue[prevSuffixIndex - 1] === nextValue[nextSuffixIndex - 1]) {
						prevSuffixIndex--;
						nextSuffixIndex--;
					}
					const before = nextValue.slice(0, prefixLen);
					const removed = prevValue.slice(prefixLen, prevSuffixIndex);
					const inserted = nextValue.slice(prefixLen, nextSuffixIndex);
					const after = nextValue.slice(nextSuffixIndex);
					const baseCount = saveGraphemes - props.countGraphemes(removed);
					const availableInserted = Math.max(0, limit - baseCount);
					let acceptedInserted = "";
					if (availableInserted > 0) if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
						const segmenter = new Intl.Segmenter(void 0, { granularity: "grapheme" });
						for (const { segment } of segmenter.segment(inserted)) {
							const candidate = acceptedInserted + segment;
							if (props.countGraphemes(candidate) > availableInserted) break;
							acceptedInserted = candidate;
						}
					} else for (const char of Array.from(inserted)) {
						const candidate = acceptedInserted + char;
						if (props.countGraphemes(candidate) > availableInserted) break;
						acceptedInserted = candidate;
					}
					value = before + acceptedInserted + after;
					shouldForceNativeUpdate = true;
				}
			}
			if (String(value) === nativeInputValue.value) {
				if (props.formatter || shouldForceNativeUpdate) {
					const target = event.target;
					const blockedValue = target.value;
					const selectionStart = target.selectionStart;
					const selectionEnd = target.selectionEnd;
					setNativeInputValue();
					if (shouldForceNativeUpdate && _ref.value && selectionStart != null && selectionEnd != null) {
						const restoredValue = _ref.value.value;
						const afterTxt = blockedValue.slice(Math.max(0, selectionEnd));
						let caretPos = Math.min(selectionStart, restoredValue.length);
						if (afterTxt && restoredValue.endsWith(afterTxt)) caretPos = restoredValue.length - afterTxt.length;
						_ref.value.setSelectionRange(caretPos, caretPos);
					}
				}
				return;
			}
			saveValue.value = value;
			recordCursor();
			emit(UPDATE_MODEL_EVENT, value);
			emit(INPUT_EVENT, value);
			await nextTick();
			if (props.formatter && props.parser || !hasModelModifiers.value) setNativeInputValue();
			setCursor();
		};
		const handleChange = async (event) => {
			let { value } = event.target;
			value = formatValue(value);
			if (props.modelModifiers.lazy) emit(UPDATE_MODEL_EVENT, value);
			emit(CHANGE_EVENT, value, event);
			await nextTick();
			setNativeInputValue();
		};
		const { isComposing, handleCompositionStart, handleCompositionUpdate, handleCompositionEnd } = useComposition({
			emit,
			afterComposition: handleInput
		});
		const handlePasswordVisible = () => {
			passwordVisible.value = !passwordVisible.value;
		};
		const focus = () => _ref.value?.focus();
		const blur = () => _ref.value?.blur();
		const handleMouseLeave = (evt) => {
			hovering.value = false;
			emit("mouseleave", evt);
		};
		const handleMouseEnter = (evt) => {
			hovering.value = true;
			emit("mouseenter", evt);
		};
		const handleKeydown = (evt) => {
			emit("keydown", evt);
		};
		const select = () => {
			_ref.value?.select();
		};
		const clear = (evt) => {
			emit(UPDATE_MODEL_EVENT, "");
			emit(CHANGE_EVENT, "");
			emit("clear", evt);
			emit(INPUT_EVENT, "");
		};
		watch(() => props.modelValue, () => {
			nextTick(() => resizeTextarea());
			if (props.validateEvent) elFormItem?.validate?.("change").catch((err) => debugWarn(err));
		});
		watch(() => nativeInputValue.value, (val) => {
			saveValue.value = val;
		}, { immediate: true });
		watch(nativeInputValue, (newValue) => {
			if (!_ref.value) return;
			const { trim, number } = props.modelModifiers;
			const elValue = _ref.value.value;
			const displayValue = (number || props.type === "number") && !/^0\d/.test(elValue) ? `${looseToNumber(elValue)}` : elValue;
			if (displayValue === newValue) return;
			if (document.activeElement === _ref.value && _ref.value.type !== "range") {
				if (trim && displayValue.trim() === newValue) return;
			}
			setNativeInputValue();
		});
		watch(() => props.type, async () => {
			await nextTick();
			setNativeInputValue();
			resizeTextarea();
		});
		onMounted(() => {
			if (!props.formatter && props.parser) debugWarn(COMPONENT_NAME, "If you set the parser, you also need to set the formatter.");
			setNativeInputValue();
			nextTick(resizeTextarea);
		});
		__expose({
			input,
			textarea,
			ref: _ref,
			textareaStyle,
			autosize: toRef(props, "autosize"),
			isComposing,
			passwordVisible,
			focus,
			blur,
			select,
			clear,
			resizeTextarea
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				class: normalizeClass([containerKls.value, {
					[unref(nsInput).bm("group", "append")]: _ctx.$slots.append,
					[unref(nsInput).bm("group", "prepend")]: _ctx.$slots.prepend
				}]),
				style: normalizeStyle(containerStyle.value),
				onMouseenter: handleMouseEnter,
				onMouseleave: handleMouseLeave
			}, [createCommentVNode(" input "), __props.type !== "textarea" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
				createCommentVNode(" prepend slot "),
				_ctx.$slots.prepend ? (openBlock(), createElementBlock("div", {
					key: 0,
					class: normalizeClass(unref(nsInput).be("group", "prepend"))
				}, [renderSlot(_ctx.$slots, "prepend")], 2)) : createCommentVNode("v-if", true),
				createElementVNode("div", {
					ref_key: "wrapperRef",
					ref: wrapperRef,
					class: normalizeClass(wrapperKls.value)
				}, [
					createCommentVNode(" prefix slot "),
					_ctx.$slots.prefix || __props.prefixIcon ? (openBlock(), createElementBlock("span", {
						key: 0,
						class: normalizeClass(unref(nsInput).e("prefix"))
					}, [createElementVNode("span", { class: normalizeClass(unref(nsInput).e("prefix-inner")) }, [renderSlot(_ctx.$slots, "prefix"), __props.prefixIcon ? (openBlock(), createBlock(unref(ElIcon), {
						key: 0,
						class: normalizeClass(unref(nsInput).e("icon"))
					}, {
						default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(__props.prefixIcon)))]),
						_: 1
					}, 8, ["class"])) : createCommentVNode("v-if", true)], 2)], 2)) : createCommentVNode("v-if", true),
					createElementVNode("input", mergeProps({
						id: unref(inputId),
						ref_key: "input",
						ref: input,
						class: unref(nsInput).e("inner")
					}, unref(attrs), {
						name: __props.name,
						minlength: __props.countGraphemes ? void 0 : __props.minlength,
						maxlength: __props.countGraphemes ? void 0 : maxlength.value,
						type: __props.showPassword ? passwordVisible.value ? "text" : "password" : __props.type,
						disabled: unref(inputDisabled),
						readonly: __props.readonly,
						autocomplete: __props.autocomplete,
						tabindex: __props.tabindex,
						"aria-label": __props.ariaLabel,
						placeholder: __props.placeholder,
						style: __props.inputStyle,
						form: __props.form,
						autofocus: __props.autofocus,
						role: __props.containerRole,
						inputmode: __props.inputmode,
						onCompositionstart: _cache[0] || (_cache[0] = (...args) => unref(handleCompositionStart) && unref(handleCompositionStart)(...args)),
						onCompositionupdate: _cache[1] || (_cache[1] = (...args) => unref(handleCompositionUpdate) && unref(handleCompositionUpdate)(...args)),
						onCompositionend: _cache[2] || (_cache[2] = (...args) => unref(handleCompositionEnd) && unref(handleCompositionEnd)(...args)),
						onInput: handleInput,
						onChange: handleChange,
						onKeydown: handleKeydown
					}), null, 16, _hoisted_1),
					createCommentVNode(" suffix slot "),
					suffixVisible.value ? (openBlock(), createElementBlock("span", {
						key: 1,
						class: normalizeClass(unref(nsInput).e("suffix"))
					}, [createElementVNode("span", { class: normalizeClass(unref(nsInput).e("suffix-inner")) }, [
						!showClear.value || !showPwdVisible.value || !isWordLimitVisible.value ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [renderSlot(_ctx.$slots, "suffix"), __props.suffixIcon ? (openBlock(), createBlock(unref(ElIcon), {
							key: 0,
							class: normalizeClass(unref(nsInput).e("icon"))
						}, {
							default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(__props.suffixIcon)))]),
							_: 1
						}, 8, ["class"])) : createCommentVNode("v-if", true)], 64)) : createCommentVNode("v-if", true),
						showClear.value ? (openBlock(), createBlock(unref(ElIcon), {
							key: 1,
							class: normalizeClass([unref(nsInput).e("icon"), unref(nsInput).e("clear")]),
							onMousedown: withModifiers(unref(NOOP), ["prevent"]),
							onClick: clear
						}, {
							default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(__props.clearIcon)))]),
							_: 1
						}, 8, ["class", "onMousedown"])) : createCommentVNode("v-if", true),
						showPwdVisible.value ? (openBlock(), createBlock(unref(ElIcon), {
							key: 2,
							class: normalizeClass([unref(nsInput).e("icon"), unref(nsInput).e("password")]),
							onClick: handlePasswordVisible,
							onMousedown: withModifiers(unref(NOOP), ["prevent"]),
							onMouseup: withModifiers(unref(NOOP), ["prevent"])
						}, {
							default: withCtx(() => [renderSlot(_ctx.$slots, "password-icon", { visible: passwordVisible.value }, () => [(openBlock(), createBlock(resolveDynamicComponent(passwordIcon.value)))])]),
							_: 3
						}, 8, [
							"class",
							"onMousedown",
							"onMouseup"
						])) : createCommentVNode("v-if", true),
						isWordLimitVisible.value ? (openBlock(), createElementBlock("span", {
							key: 3,
							class: normalizeClass([unref(nsInput).e("count"), unref(nsInput).is("outside", __props.wordLimitPosition === "outside")])
						}, [createElementVNode("span", { class: normalizeClass(unref(nsInput).e("count-inner")) }, toDisplayString(textLength.value) + " / " + toDisplayString(maxlength.value), 3)], 2)) : createCommentVNode("v-if", true),
						validateState.value && validateIcon.value && needStatusIcon.value ? (openBlock(), createBlock(unref(ElIcon), {
							key: 4,
							class: normalizeClass([
								unref(nsInput).e("icon"),
								unref(nsInput).e("validateIcon"),
								unref(nsInput).is("loading", validateState.value === "validating")
							])
						}, {
							default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(validateIcon.value)))]),
							_: 1
						}, 8, ["class"])) : createCommentVNode("v-if", true)
					], 2)], 2)) : createCommentVNode("v-if", true)
				], 2),
				createCommentVNode(" append slot "),
				_ctx.$slots.append ? (openBlock(), createElementBlock("div", {
					key: 1,
					class: normalizeClass(unref(nsInput).be("group", "append"))
				}, [renderSlot(_ctx.$slots, "append")], 2)) : createCommentVNode("v-if", true)
			], 64)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
				createCommentVNode(" textarea "),
				createElementVNode("textarea", mergeProps({
					id: unref(inputId),
					ref_key: "textarea",
					ref: textarea,
					class: [
						unref(nsTextarea).e("inner"),
						unref(nsInput).is("focus", unref(isFocused)),
						unref(nsTextarea).is("clearable", __props.clearable)
					]
				}, unref(attrs), {
					name: __props.name,
					minlength: __props.countGraphemes ? void 0 : __props.minlength,
					maxlength: __props.countGraphemes ? void 0 : maxlength.value,
					tabindex: __props.tabindex,
					disabled: unref(inputDisabled),
					readonly: __props.readonly,
					autocomplete: __props.autocomplete,
					style: textareaStyle.value,
					"aria-label": __props.ariaLabel,
					placeholder: __props.placeholder,
					form: __props.form,
					autofocus: __props.autofocus,
					rows: __props.rows,
					role: __props.containerRole,
					inputmode: __props.inputmode,
					onCompositionstart: _cache[3] || (_cache[3] = (...args) => unref(handleCompositionStart) && unref(handleCompositionStart)(...args)),
					onCompositionupdate: _cache[4] || (_cache[4] = (...args) => unref(handleCompositionUpdate) && unref(handleCompositionUpdate)(...args)),
					onCompositionend: _cache[5] || (_cache[5] = (...args) => unref(handleCompositionEnd) && unref(handleCompositionEnd)(...args)),
					onInput: handleInput,
					onFocus: _cache[6] || (_cache[6] = (...args) => unref(handleFocus) && unref(handleFocus)(...args)),
					onBlur: _cache[7] || (_cache[7] = (...args) => unref(handleBlur) && unref(handleBlur)(...args)),
					onChange: handleChange,
					onKeydown: handleKeydown
				}), null, 16, _hoisted_2),
				showClear.value ? (openBlock(), createBlock(unref(ElIcon), {
					key: 0,
					class: normalizeClass([unref(nsTextarea).e("icon"), unref(nsTextarea).e("clear")]),
					onMousedown: withModifiers(unref(NOOP), ["prevent"]),
					onClick: clear
				}, {
					default: withCtx(() => [(openBlock(), createBlock(resolveDynamicComponent(__props.clearIcon)))]),
					_: 1
				}, 8, ["class", "onMousedown"])) : createCommentVNode("v-if", true),
				isWordLimitVisible.value ? (openBlock(), createElementBlock("span", {
					key: 1,
					style: normalizeStyle(countStyle.value),
					class: normalizeClass([unref(nsInput).e("count"), unref(nsInput).is("outside", __props.wordLimitPosition === "outside")])
				}, toDisplayString(textLength.value) + " / " + toDisplayString(maxlength.value), 7)) : createCommentVNode("v-if", true)
			], 64))], 38);
		};
	}
});

//#endregion
export { input_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=input.vue_vue_type_script_setup_true_lang.mjs.map