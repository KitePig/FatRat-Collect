const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../constants/aria.js');
const require_event = require('../../../constants/event.js');
const require_event$1 = require('../../../utils/dom/event.js');
const require_error = require('../../../utils/error.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_index$1 = require('../../../hooks/use-id/index.js');
const require_index$2 = require('../../icon/index.js');
const require_use_form_common_props = require('../../form/src/hooks/use-form-common-props.js');
const require_index$3 = require('../../tooltip/index.js');
const require_index$4 = require('../../input/index.js');
const require_autocomplete = require('./autocomplete.js');
const require_index$5 = require('../../scrollbar/index.js');
let _vueuse_core = require("@vueuse/core");
let lodash_unified = require("lodash-unified");
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/autocomplete/src/autocomplete.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["aria-expanded", "aria-owns"];
const _hoisted_2 = { key: 0 };
const _hoisted_3 = [
	"id",
	"aria-selected",
	"onClick"
];
const COMPONENT_NAME = "ElAutocomplete";
var autocomplete_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: COMPONENT_NAME,
	inheritAttrs: false,
	__name: "autocomplete",
	props: require_autocomplete.autocompleteProps,
	emits: require_autocomplete.autocompleteEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const passInputProps = (0, vue.computed)(() => {
			const inputProps = require_index$4.ElInput.props ?? [];
			return (0, lodash_unified.pick)(props, (0, _vue_shared.isArray)(inputProps) ? inputProps : Object.keys(inputProps));
		});
		const rawAttrs = (0, vue.useAttrs)();
		const disabled = require_use_form_common_props.useFormDisabled();
		const ns = require_index.useNamespace("autocomplete");
		const inputRef = (0, vue.ref)();
		const regionRef = (0, vue.ref)();
		const popperRef = (0, vue.ref)();
		const listboxRef = (0, vue.ref)();
		let readonly = false;
		let ignoreFocusEvent = false;
		const suggestions = (0, vue.ref)([]);
		const highlightedIndex = (0, vue.ref)(-1);
		const dropdownWidth = (0, vue.ref)("");
		const activated = (0, vue.ref)(false);
		const suggestionDisabled = (0, vue.ref)(false);
		const loading = (0, vue.ref)(false);
		const listboxId = require_index$1.useId();
		const styles = (0, vue.computed)(() => rawAttrs.style);
		const suggestionVisible = (0, vue.computed)(() => {
			return (suggestions.value.length > 0 || loading.value) && activated.value;
		});
		const suggestionLoading = (0, vue.computed)(() => !props.hideLoading && loading.value);
		const refInput = (0, vue.computed)(() => {
			if (inputRef.value) return Array.from(inputRef.value.$el.querySelectorAll("input"));
			return [];
		});
		const onSuggestionShow = () => {
			if (suggestionVisible.value) dropdownWidth.value = `${inputRef.value.$el.offsetWidth}px`;
		};
		const onHide = () => {
			highlightedIndex.value = -1;
		};
		const getData = async (queryString) => {
			if (suggestionDisabled.value) return;
			const cb = (suggestionList) => {
				loading.value = false;
				if (suggestionDisabled.value) return;
				if ((0, _vue_shared.isArray)(suggestionList)) {
					suggestions.value = suggestionList;
					highlightedIndex.value = props.highlightFirstItem ? 0 : -1;
				} else require_error.throwError(COMPONENT_NAME, "autocomplete suggestions must be an array");
			};
			loading.value = true;
			if ((0, _vue_shared.isArray)(props.fetchSuggestions)) cb(props.fetchSuggestions);
			else {
				const result = await props.fetchSuggestions(queryString, cb);
				if ((0, _vue_shared.isArray)(result)) cb(result);
			}
		};
		const debouncedGetData = (0, _vueuse_core.useDebounceFn)(getData, (0, vue.computed)(() => props.debounce));
		const handleInput = (value) => {
			const valuePresented = !!value;
			emit(require_event.INPUT_EVENT, value);
			emit(require_event.UPDATE_MODEL_EVENT, value);
			suggestionDisabled.value = false;
			activated.value ||= valuePresented;
			if (!props.triggerOnFocus && !value) {
				suggestionDisabled.value = true;
				suggestions.value = [];
				return;
			}
			debouncedGetData(value);
		};
		const handleMouseDown = (event) => {
			if (disabled.value) return;
			if (event.target?.tagName !== "INPUT" || refInput.value.includes(document.activeElement)) activated.value = true;
		};
		const handleChange = (value) => {
			emit(require_event.CHANGE_EVENT, value);
		};
		const handleFocus = (evt) => {
			if (!ignoreFocusEvent) {
				activated.value = true;
				emit("focus", evt);
				const queryString = props.modelValue ?? "";
				if (props.triggerOnFocus && !readonly) debouncedGetData(String(queryString));
			} else ignoreFocusEvent = false;
		};
		const handleBlur = (evt) => {
			setTimeout(() => {
				if (popperRef.value?.isFocusInsideContent()) {
					ignoreFocusEvent = true;
					return;
				}
				activated.value && close();
				emit("blur", evt);
			});
		};
		const handleClear = () => {
			activated.value = false;
			emit(require_event.UPDATE_MODEL_EVENT, "");
			emit("clear");
		};
		const handleKeyEnter = async () => {
			if (inputRef.value?.isComposing) return;
			if (suggestionVisible.value && highlightedIndex.value >= 0 && highlightedIndex.value < suggestions.value.length) handleSelect(suggestions.value[highlightedIndex.value]);
			else {
				if (props.selectWhenUnmatched) {
					emit("select", { value: props.modelValue });
					suggestions.value = [];
					highlightedIndex.value = -1;
				}
				activated.value = true;
				debouncedGetData(String(props.modelValue));
			}
		};
		const handleKeyEscape = (evt) => {
			if (suggestionVisible.value) {
				evt.preventDefault();
				evt.stopPropagation();
				close();
			}
		};
		const close = () => {
			activated.value = false;
		};
		const focus = () => {
			inputRef.value?.focus();
		};
		const blur = () => {
			inputRef.value?.blur();
		};
		const handleSelect = async (item) => {
			emit(require_event.INPUT_EVENT, item[props.valueKey]);
			emit(require_event.UPDATE_MODEL_EVENT, item[props.valueKey]);
			emit("select", item);
			suggestions.value = [];
			highlightedIndex.value = -1;
		};
		const highlight = (index) => {
			if (!suggestionVisible.value || loading.value) return;
			if (index < 0) {
				if (!props.loopNavigation) {
					highlightedIndex.value = -1;
					return;
				}
				index = suggestions.value.length - 1;
			}
			if (index >= suggestions.value.length) index = props.loopNavigation ? 0 : suggestions.value.length - 1;
			const [suggestion, suggestionList] = getSuggestionContext();
			const highlightItem = suggestionList[index];
			const scrollTop = suggestion.scrollTop;
			const { offsetTop, scrollHeight } = highlightItem;
			if (offsetTop + scrollHeight > scrollTop + suggestion.clientHeight) suggestion.scrollTop = offsetTop + scrollHeight - suggestion.clientHeight;
			if (offsetTop < scrollTop) suggestion.scrollTop = offsetTop;
			highlightedIndex.value = index;
			inputRef.value?.ref?.setAttribute("aria-activedescendant", `${listboxId.value}-item-${highlightedIndex.value}`);
		};
		const getSuggestionContext = () => {
			const suggestion = regionRef.value.querySelector(`.${ns.be("suggestion", "wrap")}`);
			return [suggestion, suggestion.querySelectorAll(`.${ns.be("suggestion", "list")} li`)];
		};
		const stopHandle = (0, _vueuse_core.onClickOutside)(listboxRef, (event) => {
			if (popperRef.value?.isFocusInsideContent()) return;
			const hadIgnoredFocus = ignoreFocusEvent;
			ignoreFocusEvent = false;
			if (!suggestionVisible.value) return;
			if (hadIgnoredFocus) handleBlur(new FocusEvent("blur", event));
			else close();
		});
		const handleKeydown = (e) => {
			switch (require_event$1.getEventCode(e)) {
				case require_aria.EVENT_CODE.up:
					e.preventDefault();
					highlight(highlightedIndex.value - 1);
					break;
				case require_aria.EVENT_CODE.down:
					e.preventDefault();
					highlight(highlightedIndex.value + 1);
					break;
				case require_aria.EVENT_CODE.enter:
				case require_aria.EVENT_CODE.numpadEnter:
					e.preventDefault();
					handleKeyEnter();
					break;
				case require_aria.EVENT_CODE.tab:
					close();
					break;
				case require_aria.EVENT_CODE.esc:
					handleKeyEscape(e);
					break;
				case require_aria.EVENT_CODE.home:
					e.preventDefault();
					highlight(0);
					break;
				case require_aria.EVENT_CODE.end:
					e.preventDefault();
					highlight(suggestions.value.length - 1);
					break;
				case require_aria.EVENT_CODE.pageUp:
					e.preventDefault();
					highlight(Math.max(0, highlightedIndex.value - 10));
					break;
				case require_aria.EVENT_CODE.pageDown:
					e.preventDefault();
					highlight(Math.min(suggestions.value.length - 1, highlightedIndex.value + 10));
					break;
			}
		};
		(0, vue.onBeforeUnmount)(() => {
			stopHandle?.();
		});
		(0, vue.onMounted)(() => {
			const inputElement = inputRef.value?.ref;
			if (!inputElement) return;
			[
				{
					key: "role",
					value: "textbox"
				},
				{
					key: "aria-autocomplete",
					value: "list"
				},
				{
					key: "aria-controls",
					value: listboxId.value
				},
				{
					key: "aria-activedescendant",
					value: `${listboxId.value}-item-${highlightedIndex.value}`
				}
			].forEach(({ key, value }) => inputElement.setAttribute(key, value));
			readonly = inputElement.hasAttribute("readonly");
		});
		__expose({
			highlightedIndex,
			activated,
			loading,
			inputRef,
			popperRef,
			suggestions,
			handleSelect,
			handleKeyEnter,
			focus,
			blur,
			close,
			highlight,
			getData
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$3.ElTooltip), {
				ref_key: "popperRef",
				ref: popperRef,
				visible: suggestionVisible.value,
				placement: __props.placement,
				"fallback-placements": ["bottom-start", "top-start"],
				"popper-class": [(0, vue.unref)(ns).e("popper"), __props.popperClass],
				"popper-style": __props.popperStyle,
				teleported: __props.teleported,
				"append-to": __props.appendTo,
				"gpu-acceleration": false,
				pure: "",
				"manual-mode": "",
				effect: "light",
				trigger: "click",
				transition: `${(0, vue.unref)(ns).namespace.value}-zoom-in-top`,
				persistent: "",
				role: "listbox",
				onBeforeShow: onSuggestionShow,
				onHide
			}, {
				content: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("div", {
					ref_key: "regionRef",
					ref: regionRef,
					class: (0, vue.normalizeClass)([(0, vue.unref)(ns).b("suggestion"), (0, vue.unref)(ns).is("loading", suggestionLoading.value)]),
					style: (0, vue.normalizeStyle)({
						[__props.fitInputWidth ? "width" : "minWidth"]: dropdownWidth.value,
						outline: "none"
					}),
					role: "region"
				}, [
					_ctx.$slots.header ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
						key: 0,
						class: (0, vue.normalizeClass)((0, vue.unref)(ns).be("suggestion", "header")),
						onClick: _cache[0] || (_cache[0] = (0, vue.withModifiers)(() => {}, ["stop"]))
					}, [(0, vue.renderSlot)(_ctx.$slots, "header")], 2)) : (0, vue.createCommentVNode)("v-if", true),
					(0, vue.createVNode)((0, vue.unref)(require_index$5.ElScrollbar), {
						id: (0, vue.unref)(listboxId),
						tag: "ul",
						"wrap-class": (0, vue.unref)(ns).be("suggestion", "wrap"),
						"view-class": (0, vue.unref)(ns).be("suggestion", "list"),
						role: "listbox"
					}, {
						default: (0, vue.withCtx)(() => [suggestionLoading.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("li", _hoisted_2, [(0, vue.renderSlot)(_ctx.$slots, "loading", {}, () => [(0, vue.createVNode)((0, vue.unref)(require_index$2.ElIcon), { class: (0, vue.normalizeClass)((0, vue.unref)(ns).is("loading")) }, {
							default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.Loading))]),
							_: 1
						}, 8, ["class"])])])) : ((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, { key: 1 }, (0, vue.renderList)(suggestions.value, (item, index) => {
							return (0, vue.openBlock)(), (0, vue.createElementBlock)("li", {
								id: `${(0, vue.unref)(listboxId)}-item-${index}`,
								key: index,
								class: (0, vue.normalizeClass)({ highlighted: highlightedIndex.value === index }),
								role: "option",
								"aria-selected": highlightedIndex.value === index,
								onClick: ($event) => handleSelect(item)
							}, [(0, vue.renderSlot)(_ctx.$slots, "default", { item }, () => [(0, vue.createTextVNode)((0, vue.toDisplayString)(item[__props.valueKey]), 1)])], 10, _hoisted_3);
						}), 128))]),
						_: 3
					}, 8, [
						"id",
						"wrap-class",
						"view-class"
					]),
					_ctx.$slots.footer ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
						key: 1,
						class: (0, vue.normalizeClass)((0, vue.unref)(ns).be("suggestion", "footer")),
						onClick: _cache[1] || (_cache[1] = (0, vue.withModifiers)(() => {}, ["stop"]))
					}, [(0, vue.renderSlot)(_ctx.$slots, "footer")], 2)) : (0, vue.createCommentVNode)("v-if", true)
				], 6)]),
				default: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("div", {
					ref_key: "listboxRef",
					ref: listboxRef,
					class: (0, vue.normalizeClass)([(0, vue.unref)(ns).b(), _ctx.$attrs.class]),
					style: (0, vue.normalizeStyle)(styles.value),
					role: "combobox",
					"aria-haspopup": "listbox",
					"aria-expanded": suggestionVisible.value,
					"aria-owns": (0, vue.unref)(listboxId)
				}, [(0, vue.createVNode)((0, vue.unref)(require_index$4.ElInput), (0, vue.mergeProps)({
					ref_key: "inputRef",
					ref: inputRef
				}, (0, vue.mergeProps)(passInputProps.value, _ctx.$attrs), {
					"model-value": __props.modelValue,
					disabled: (0, vue.unref)(disabled),
					onInput: handleInput,
					onChange: handleChange,
					onFocus: handleFocus,
					onBlur: handleBlur,
					onClear: handleClear,
					onKeydown: handleKeydown,
					onMousedown: handleMouseDown
				}), (0, vue.createSlots)({ _: 2 }, [
					_ctx.$slots.prepend ? {
						name: "prepend",
						fn: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "prepend")]),
						key: "0"
					} : void 0,
					_ctx.$slots.append ? {
						name: "append",
						fn: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "append")]),
						key: "1"
					} : void 0,
					_ctx.$slots.prefix ? {
						name: "prefix",
						fn: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "prefix")]),
						key: "2"
					} : void 0,
					_ctx.$slots.suffix ? {
						name: "suffix",
						fn: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "suffix")]),
						key: "3"
					} : void 0
				]), 1040, ["model-value", "disabled"])], 14, _hoisted_1)]),
				_: 3
			}, 8, [
				"visible",
				"placement",
				"popper-class",
				"popper-style",
				"teleported",
				"append-to",
				"transition"
			]);
		};
	}
});

//#endregion
exports.default = autocomplete_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=autocomplete.vue_vue_type_script_setup_true_lang.js.map