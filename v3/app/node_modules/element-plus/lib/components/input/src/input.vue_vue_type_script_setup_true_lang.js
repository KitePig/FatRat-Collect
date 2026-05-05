const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_error = require('../../../utils/error.js');
const require_icon = require('../../../utils/vue/icon.js');
const require_index = require('../../../hooks/use-attrs/index.js');
const require_index$1 = require('../../../hooks/use-namespace/index.js');
const require_index$2 = require('../../../hooks/use-cursor/index.js');
const require_index$3 = require('../../../hooks/use-focus-controller/index.js');
const require_index$4 = require('../../../hooks/use-composition/index.js');
const require_index$5 = require('../../icon/index.js');
const require_use_form_common_props = require('../../form/src/hooks/use-form-common-props.js');
const require_use_form_item = require('../../form/src/hooks/use-form-item.js');
const require_input = require('./input.js');
const require_utils = require('./utils.js');
let _vueuse_core = require("@vueuse/core");
let lodash_unified = require("lodash-unified");
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

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
var input_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: COMPONENT_NAME,
	inheritAttrs: false,
	__name: "input",
	props: require_input.inputProps,
	emits: require_input.inputEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const rawAttrs = (0, vue.useAttrs)();
		const slots = (0, vue.useSlots)();
		const containerKls = (0, vue.computed)(() => [
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
		const wrapperKls = (0, vue.computed)(() => [nsInput.e("wrapper"), nsInput.is("focus", isFocused.value)]);
		const attrs = require_index.useAttrs();
		const maxlength = (0, vue.computed)(() => props.maxlength?.toString());
		const { form: elForm, formItem: elFormItem } = require_use_form_item.useFormItem();
		const { inputId } = require_use_form_item.useFormItemInputId(props, { formItemContext: elFormItem });
		const inputSize = require_use_form_common_props.useFormSize();
		const inputDisabled = require_use_form_common_props.useFormDisabled();
		const nsInput = require_index$1.useNamespace("input");
		const nsTextarea = require_index$1.useNamespace("textarea");
		const input = (0, vue.shallowRef)();
		const textarea = (0, vue.shallowRef)();
		const hovering = (0, vue.ref)(false);
		const passwordVisible = (0, vue.ref)(false);
		const countStyle = (0, vue.ref)();
		const textareaCalcStyle = (0, vue.shallowRef)(props.inputStyle);
		const saveValue = (0, vue.ref)("");
		const _ref = (0, vue.computed)(() => input.value || textarea.value);
		const { wrapperRef, isFocused, handleFocus, handleBlur } = require_index$3.useFocusController(_ref, {
			disabled: inputDisabled,
			afterBlur() {
				if (props.validateEvent) elFormItem?.validate?.("blur").catch((err) => require_error.debugWarn(err));
			}
		});
		const needStatusIcon = (0, vue.computed)(() => elForm?.statusIcon ?? false);
		const validateState = (0, vue.computed)(() => elFormItem?.validateState || "");
		const validateIcon = (0, vue.computed)(() => validateState.value && require_icon.ValidateComponentsMap[validateState.value]);
		const passwordIcon = (0, vue.computed)(() => passwordVisible.value ? _element_plus_icons_vue.View : _element_plus_icons_vue.Hide);
		const containerStyle = (0, vue.computed)(() => [rawAttrs.style]);
		const textareaStyle = (0, vue.computed)(() => [
			props.inputStyle,
			textareaCalcStyle.value,
			{ resize: props.resize }
		]);
		const nativeInputValue = (0, vue.computed)(() => (0, lodash_unified.isNil)(props.modelValue) ? "" : String(props.modelValue));
		const showClear = (0, vue.computed)(() => props.clearable && !inputDisabled.value && !props.readonly && !!nativeInputValue.value && (isFocused.value || hovering.value));
		const showPwdVisible = (0, vue.computed)(() => props.showPassword && !inputDisabled.value && !!nativeInputValue.value);
		const isWordLimitVisible = (0, vue.computed)(() => props.showWordLimit && !!maxlength.value && (props.type === "text" || props.type === "textarea") && !inputDisabled.value && !props.readonly && !props.showPassword);
		const textLength = (0, vue.computed)(() => {
			if (props.countGraphemes && props.showWordLimit) return props.countGraphemes(nativeInputValue.value);
			return nativeInputValue.value.length;
		});
		const inputExceed = (0, vue.computed)(() => !!isWordLimitVisible.value && textLength.value > Number(maxlength.value));
		const suffixVisible = (0, vue.computed)(() => !!slots.suffix || !!props.suffixIcon || showClear.value || props.showPassword || isWordLimitVisible.value || !!validateState.value && needStatusIcon.value);
		const hasModelModifiers = (0, vue.computed)(() => !!Object.keys(props.modelModifiers).length);
		const [recordCursor, setCursor] = require_index$2.useCursor(input);
		(0, _vueuse_core.useResizeObserver)(textarea, (entries) => {
			onceInitSizeTextarea();
			if (!isWordLimitVisible.value || props.resize !== "both" && props.resize !== "horizontal") return;
			const { width } = entries[0].contentRect;
			countStyle.value = { right: `calc(100% - ${width + 22 - 10}px)` };
		});
		const resizeTextarea = () => {
			const { type, autosize } = props;
			if (!_vueuse_core.isClient || type !== "textarea" || !textarea.value) return;
			if (autosize) {
				const minRows = (0, _vue_shared.isObject)(autosize) ? autosize.minRows : void 0;
				const maxRows = (0, _vue_shared.isObject)(autosize) ? autosize.maxRows : void 0;
				const textareaStyle = require_utils.calcTextareaHeight(textarea.value, minRows, maxRows);
				textareaCalcStyle.value = {
					overflowY: "hidden",
					...textareaStyle
				};
				(0, vue.nextTick)(() => {
					textarea.value.offsetHeight;
					textareaCalcStyle.value = textareaStyle;
				});
			} else textareaCalcStyle.value = { minHeight: require_utils.calcTextareaHeight(textarea.value).minHeight };
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
			if (number) value = `${require_utils.looseToNumber(value)}`;
			if (props.formatter && props.parser) value = props.parser(value);
			return value;
		};
		const handleInput = async (event) => {
			if (isComposing.value) return;
			const { lazy } = props.modelModifiers;
			let { value } = event.target;
			let shouldForceNativeUpdate = false;
			if (lazy) {
				emit(require_event.INPUT_EVENT, value);
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
			emit(require_event.UPDATE_MODEL_EVENT, value);
			emit(require_event.INPUT_EVENT, value);
			await (0, vue.nextTick)();
			if (props.formatter && props.parser || !hasModelModifiers.value) setNativeInputValue();
			setCursor();
		};
		const handleChange = async (event) => {
			let { value } = event.target;
			value = formatValue(value);
			if (props.modelModifiers.lazy) emit(require_event.UPDATE_MODEL_EVENT, value);
			emit(require_event.CHANGE_EVENT, value, event);
			await (0, vue.nextTick)();
			setNativeInputValue();
		};
		const { isComposing, handleCompositionStart, handleCompositionUpdate, handleCompositionEnd } = require_index$4.useComposition({
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
			emit(require_event.UPDATE_MODEL_EVENT, "");
			emit(require_event.CHANGE_EVENT, "");
			emit("clear", evt);
			emit(require_event.INPUT_EVENT, "");
		};
		(0, vue.watch)(() => props.modelValue, () => {
			(0, vue.nextTick)(() => resizeTextarea());
			if (props.validateEvent) elFormItem?.validate?.("change").catch((err) => require_error.debugWarn(err));
		});
		(0, vue.watch)(() => nativeInputValue.value, (val) => {
			saveValue.value = val;
		}, { immediate: true });
		(0, vue.watch)(nativeInputValue, (newValue) => {
			if (!_ref.value) return;
			const { trim, number } = props.modelModifiers;
			const elValue = _ref.value.value;
			const displayValue = (number || props.type === "number") && !/^0\d/.test(elValue) ? `${require_utils.looseToNumber(elValue)}` : elValue;
			if (displayValue === newValue) return;
			if (document.activeElement === _ref.value && _ref.value.type !== "range") {
				if (trim && displayValue.trim() === newValue) return;
			}
			setNativeInputValue();
		});
		(0, vue.watch)(() => props.type, async () => {
			await (0, vue.nextTick)();
			setNativeInputValue();
			resizeTextarea();
		});
		(0, vue.onMounted)(() => {
			if (!props.formatter && props.parser) require_error.debugWarn(COMPONENT_NAME, "If you set the parser, you also need to set the formatter.");
			setNativeInputValue();
			(0, vue.nextTick)(resizeTextarea);
		});
		__expose({
			input,
			textarea,
			ref: _ref,
			textareaStyle,
			autosize: (0, vue.toRef)(props, "autosize"),
			isComposing,
			passwordVisible,
			focus,
			blur,
			select,
			clear,
			resizeTextarea
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				class: (0, vue.normalizeClass)([containerKls.value, {
					[(0, vue.unref)(nsInput).bm("group", "append")]: _ctx.$slots.append,
					[(0, vue.unref)(nsInput).bm("group", "prepend")]: _ctx.$slots.prepend
				}]),
				style: (0, vue.normalizeStyle)(containerStyle.value),
				onMouseenter: handleMouseEnter,
				onMouseleave: handleMouseLeave
			}, [(0, vue.createCommentVNode)(" input "), __props.type !== "textarea" ? ((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: 0 }, [
				(0, vue.createCommentVNode)(" prepend slot "),
				_ctx.$slots.prepend ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 0,
					class: (0, vue.normalizeClass)((0, vue.unref)(nsInput).be("group", "prepend"))
				}, [(0, vue.renderSlot)(_ctx.$slots, "prepend")], 2)) : (0, vue.createCommentVNode)("v-if", true),
				(0, vue.createElementVNode)("div", {
					ref_key: "wrapperRef",
					ref: wrapperRef,
					class: (0, vue.normalizeClass)(wrapperKls.value)
				}, [
					(0, vue.createCommentVNode)(" prefix slot "),
					_ctx.$slots.prefix || __props.prefixIcon ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("span", {
						key: 0,
						class: (0, vue.normalizeClass)((0, vue.unref)(nsInput).e("prefix"))
					}, [(0, vue.createElementVNode)("span", { class: (0, vue.normalizeClass)((0, vue.unref)(nsInput).e("prefix-inner")) }, [(0, vue.renderSlot)(_ctx.$slots, "prefix"), __props.prefixIcon ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$5.ElIcon), {
						key: 0,
						class: (0, vue.normalizeClass)((0, vue.unref)(nsInput).e("icon"))
					}, {
						default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(__props.prefixIcon)))]),
						_: 1
					}, 8, ["class"])) : (0, vue.createCommentVNode)("v-if", true)], 2)], 2)) : (0, vue.createCommentVNode)("v-if", true),
					(0, vue.createElementVNode)("input", (0, vue.mergeProps)({
						id: (0, vue.unref)(inputId),
						ref_key: "input",
						ref: input,
						class: (0, vue.unref)(nsInput).e("inner")
					}, (0, vue.unref)(attrs), {
						name: __props.name,
						minlength: __props.countGraphemes ? void 0 : __props.minlength,
						maxlength: __props.countGraphemes ? void 0 : maxlength.value,
						type: __props.showPassword ? passwordVisible.value ? "text" : "password" : __props.type,
						disabled: (0, vue.unref)(inputDisabled),
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
						onCompositionstart: _cache[0] || (_cache[0] = (...args) => (0, vue.unref)(handleCompositionStart) && (0, vue.unref)(handleCompositionStart)(...args)),
						onCompositionupdate: _cache[1] || (_cache[1] = (...args) => (0, vue.unref)(handleCompositionUpdate) && (0, vue.unref)(handleCompositionUpdate)(...args)),
						onCompositionend: _cache[2] || (_cache[2] = (...args) => (0, vue.unref)(handleCompositionEnd) && (0, vue.unref)(handleCompositionEnd)(...args)),
						onInput: handleInput,
						onChange: handleChange,
						onKeydown: handleKeydown
					}), null, 16, _hoisted_1),
					(0, vue.createCommentVNode)(" suffix slot "),
					suffixVisible.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("span", {
						key: 1,
						class: (0, vue.normalizeClass)((0, vue.unref)(nsInput).e("suffix"))
					}, [(0, vue.createElementVNode)("span", { class: (0, vue.normalizeClass)((0, vue.unref)(nsInput).e("suffix-inner")) }, [
						!showClear.value || !showPwdVisible.value || !isWordLimitVisible.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: 0 }, [(0, vue.renderSlot)(_ctx.$slots, "suffix"), __props.suffixIcon ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$5.ElIcon), {
							key: 0,
							class: (0, vue.normalizeClass)((0, vue.unref)(nsInput).e("icon"))
						}, {
							default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(__props.suffixIcon)))]),
							_: 1
						}, 8, ["class"])) : (0, vue.createCommentVNode)("v-if", true)], 64)) : (0, vue.createCommentVNode)("v-if", true),
						showClear.value ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$5.ElIcon), {
							key: 1,
							class: (0, vue.normalizeClass)([(0, vue.unref)(nsInput).e("icon"), (0, vue.unref)(nsInput).e("clear")]),
							onMousedown: (0, vue.withModifiers)((0, vue.unref)(_vue_shared.NOOP), ["prevent"]),
							onClick: clear
						}, {
							default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(__props.clearIcon)))]),
							_: 1
						}, 8, ["class", "onMousedown"])) : (0, vue.createCommentVNode)("v-if", true),
						showPwdVisible.value ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$5.ElIcon), {
							key: 2,
							class: (0, vue.normalizeClass)([(0, vue.unref)(nsInput).e("icon"), (0, vue.unref)(nsInput).e("password")]),
							onClick: handlePasswordVisible,
							onMousedown: (0, vue.withModifiers)((0, vue.unref)(_vue_shared.NOOP), ["prevent"]),
							onMouseup: (0, vue.withModifiers)((0, vue.unref)(_vue_shared.NOOP), ["prevent"])
						}, {
							default: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "password-icon", { visible: passwordVisible.value }, () => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(passwordIcon.value)))])]),
							_: 3
						}, 8, [
							"class",
							"onMousedown",
							"onMouseup"
						])) : (0, vue.createCommentVNode)("v-if", true),
						isWordLimitVisible.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("span", {
							key: 3,
							class: (0, vue.normalizeClass)([(0, vue.unref)(nsInput).e("count"), (0, vue.unref)(nsInput).is("outside", __props.wordLimitPosition === "outside")])
						}, [(0, vue.createElementVNode)("span", { class: (0, vue.normalizeClass)((0, vue.unref)(nsInput).e("count-inner")) }, (0, vue.toDisplayString)(textLength.value) + " / " + (0, vue.toDisplayString)(maxlength.value), 3)], 2)) : (0, vue.createCommentVNode)("v-if", true),
						validateState.value && validateIcon.value && needStatusIcon.value ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$5.ElIcon), {
							key: 4,
							class: (0, vue.normalizeClass)([
								(0, vue.unref)(nsInput).e("icon"),
								(0, vue.unref)(nsInput).e("validateIcon"),
								(0, vue.unref)(nsInput).is("loading", validateState.value === "validating")
							])
						}, {
							default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(validateIcon.value)))]),
							_: 1
						}, 8, ["class"])) : (0, vue.createCommentVNode)("v-if", true)
					], 2)], 2)) : (0, vue.createCommentVNode)("v-if", true)
				], 2),
				(0, vue.createCommentVNode)(" append slot "),
				_ctx.$slots.append ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 1,
					class: (0, vue.normalizeClass)((0, vue.unref)(nsInput).be("group", "append"))
				}, [(0, vue.renderSlot)(_ctx.$slots, "append")], 2)) : (0, vue.createCommentVNode)("v-if", true)
			], 64)) : ((0, vue.openBlock)(), (0, vue.createElementBlock)(vue.Fragment, { key: 1 }, [
				(0, vue.createCommentVNode)(" textarea "),
				(0, vue.createElementVNode)("textarea", (0, vue.mergeProps)({
					id: (0, vue.unref)(inputId),
					ref_key: "textarea",
					ref: textarea,
					class: [
						(0, vue.unref)(nsTextarea).e("inner"),
						(0, vue.unref)(nsInput).is("focus", (0, vue.unref)(isFocused)),
						(0, vue.unref)(nsTextarea).is("clearable", __props.clearable)
					]
				}, (0, vue.unref)(attrs), {
					name: __props.name,
					minlength: __props.countGraphemes ? void 0 : __props.minlength,
					maxlength: __props.countGraphemes ? void 0 : maxlength.value,
					tabindex: __props.tabindex,
					disabled: (0, vue.unref)(inputDisabled),
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
					onCompositionstart: _cache[3] || (_cache[3] = (...args) => (0, vue.unref)(handleCompositionStart) && (0, vue.unref)(handleCompositionStart)(...args)),
					onCompositionupdate: _cache[4] || (_cache[4] = (...args) => (0, vue.unref)(handleCompositionUpdate) && (0, vue.unref)(handleCompositionUpdate)(...args)),
					onCompositionend: _cache[5] || (_cache[5] = (...args) => (0, vue.unref)(handleCompositionEnd) && (0, vue.unref)(handleCompositionEnd)(...args)),
					onInput: handleInput,
					onFocus: _cache[6] || (_cache[6] = (...args) => (0, vue.unref)(handleFocus) && (0, vue.unref)(handleFocus)(...args)),
					onBlur: _cache[7] || (_cache[7] = (...args) => (0, vue.unref)(handleBlur) && (0, vue.unref)(handleBlur)(...args)),
					onChange: handleChange,
					onKeydown: handleKeydown
				}), null, 16, _hoisted_2),
				showClear.value ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$5.ElIcon), {
					key: 0,
					class: (0, vue.normalizeClass)([(0, vue.unref)(nsTextarea).e("icon"), (0, vue.unref)(nsTextarea).e("clear")]),
					onMousedown: (0, vue.withModifiers)((0, vue.unref)(_vue_shared.NOOP), ["prevent"]),
					onClick: clear
				}, {
					default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(__props.clearIcon)))]),
					_: 1
				}, 8, ["class", "onMousedown"])) : (0, vue.createCommentVNode)("v-if", true),
				isWordLimitVisible.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("span", {
					key: 1,
					style: (0, vue.normalizeStyle)(countStyle.value),
					class: (0, vue.normalizeClass)([(0, vue.unref)(nsInput).e("count"), (0, vue.unref)(nsInput).is("outside", __props.wordLimitPosition === "outside")])
				}, (0, vue.toDisplayString)(textLength.value) + " / " + (0, vue.toDisplayString)(maxlength.value), 7)) : (0, vue.createCommentVNode)("v-if", true)
			], 64))], 38);
		};
	}
});

//#endregion
exports.default = input_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=input.vue_vue_type_script_setup_true_lang.js.map