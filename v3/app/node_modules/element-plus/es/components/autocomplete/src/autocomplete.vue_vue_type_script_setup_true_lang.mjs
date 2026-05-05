import { EVENT_CODE } from "../../../constants/aria.mjs";
import { CHANGE_EVENT, INPUT_EVENT, UPDATE_MODEL_EVENT } from "../../../constants/event.mjs";
import { getEventCode } from "../../../utils/dom/event.mjs";
import { isArray } from "../../../utils/types.mjs";
import { throwError } from "../../../utils/error.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { useId } from "../../../hooks/use-id/index.mjs";
import { ElIcon } from "../../icon/index.mjs";
import { useFormDisabled } from "../../form/src/hooks/use-form-common-props.mjs";
import { ElTooltip } from "../../tooltip/index.mjs";
import { ElInput } from "../../input/index.mjs";
import { autocompleteEmits, autocompleteProps } from "./autocomplete.mjs";
import { ElScrollbar } from "../../scrollbar/index.mjs";
import { onClickOutside, useDebounceFn } from "@vueuse/core";
import { pick } from "lodash-unified";
import { Loading } from "@element-plus/icons-vue";
import { Fragment, computed, createBlock, createCommentVNode, createElementBlock, createElementVNode, createSlots, createTextVNode, createVNode, defineComponent, mergeProps, normalizeClass, normalizeStyle, onBeforeUnmount, onMounted, openBlock, ref, renderList, renderSlot, toDisplayString, unref, useAttrs, withCtx, withModifiers } from "vue";

//#region ../../packages/components/autocomplete/src/autocomplete.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["aria-expanded", "aria-owns"];
const _hoisted_2 = { key: 0 };
const _hoisted_3 = [
	"id",
	"aria-selected",
	"onClick"
];
const COMPONENT_NAME = "ElAutocomplete";
var autocomplete_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: COMPONENT_NAME,
	inheritAttrs: false,
	__name: "autocomplete",
	props: autocompleteProps,
	emits: autocompleteEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const passInputProps = computed(() => {
			const inputProps = ElInput.props ?? [];
			return pick(props, isArray(inputProps) ? inputProps : Object.keys(inputProps));
		});
		const rawAttrs = useAttrs();
		const disabled = useFormDisabled();
		const ns = useNamespace("autocomplete");
		const inputRef = ref();
		const regionRef = ref();
		const popperRef = ref();
		const listboxRef = ref();
		let readonly = false;
		let ignoreFocusEvent = false;
		const suggestions = ref([]);
		const highlightedIndex = ref(-1);
		const dropdownWidth = ref("");
		const activated = ref(false);
		const suggestionDisabled = ref(false);
		const loading = ref(false);
		const listboxId = useId();
		const styles = computed(() => rawAttrs.style);
		const suggestionVisible = computed(() => {
			return (suggestions.value.length > 0 || loading.value) && activated.value;
		});
		const suggestionLoading = computed(() => !props.hideLoading && loading.value);
		const refInput = computed(() => {
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
				if (isArray(suggestionList)) {
					suggestions.value = suggestionList;
					highlightedIndex.value = props.highlightFirstItem ? 0 : -1;
				} else throwError(COMPONENT_NAME, "autocomplete suggestions must be an array");
			};
			loading.value = true;
			if (isArray(props.fetchSuggestions)) cb(props.fetchSuggestions);
			else {
				const result = await props.fetchSuggestions(queryString, cb);
				if (isArray(result)) cb(result);
			}
		};
		const debouncedGetData = useDebounceFn(getData, computed(() => props.debounce));
		const handleInput = (value) => {
			const valuePresented = !!value;
			emit(INPUT_EVENT, value);
			emit(UPDATE_MODEL_EVENT, value);
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
			emit(CHANGE_EVENT, value);
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
			emit(UPDATE_MODEL_EVENT, "");
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
			emit(INPUT_EVENT, item[props.valueKey]);
			emit(UPDATE_MODEL_EVENT, item[props.valueKey]);
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
		const stopHandle = onClickOutside(listboxRef, (event) => {
			if (popperRef.value?.isFocusInsideContent()) return;
			const hadIgnoredFocus = ignoreFocusEvent;
			ignoreFocusEvent = false;
			if (!suggestionVisible.value) return;
			if (hadIgnoredFocus) handleBlur(new FocusEvent("blur", event));
			else close();
		});
		const handleKeydown = (e) => {
			switch (getEventCode(e)) {
				case EVENT_CODE.up:
					e.preventDefault();
					highlight(highlightedIndex.value - 1);
					break;
				case EVENT_CODE.down:
					e.preventDefault();
					highlight(highlightedIndex.value + 1);
					break;
				case EVENT_CODE.enter:
				case EVENT_CODE.numpadEnter:
					e.preventDefault();
					handleKeyEnter();
					break;
				case EVENT_CODE.tab:
					close();
					break;
				case EVENT_CODE.esc:
					handleKeyEscape(e);
					break;
				case EVENT_CODE.home:
					e.preventDefault();
					highlight(0);
					break;
				case EVENT_CODE.end:
					e.preventDefault();
					highlight(suggestions.value.length - 1);
					break;
				case EVENT_CODE.pageUp:
					e.preventDefault();
					highlight(Math.max(0, highlightedIndex.value - 10));
					break;
				case EVENT_CODE.pageDown:
					e.preventDefault();
					highlight(Math.min(suggestions.value.length - 1, highlightedIndex.value + 10));
					break;
			}
		};
		onBeforeUnmount(() => {
			stopHandle?.();
		});
		onMounted(() => {
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
			return openBlock(), createBlock(unref(ElTooltip), {
				ref_key: "popperRef",
				ref: popperRef,
				visible: suggestionVisible.value,
				placement: __props.placement,
				"fallback-placements": ["bottom-start", "top-start"],
				"popper-class": [unref(ns).e("popper"), __props.popperClass],
				"popper-style": __props.popperStyle,
				teleported: __props.teleported,
				"append-to": __props.appendTo,
				"gpu-acceleration": false,
				pure: "",
				"manual-mode": "",
				effect: "light",
				trigger: "click",
				transition: `${unref(ns).namespace.value}-zoom-in-top`,
				persistent: "",
				role: "listbox",
				onBeforeShow: onSuggestionShow,
				onHide
			}, {
				content: withCtx(() => [createElementVNode("div", {
					ref_key: "regionRef",
					ref: regionRef,
					class: normalizeClass([unref(ns).b("suggestion"), unref(ns).is("loading", suggestionLoading.value)]),
					style: normalizeStyle({
						[__props.fitInputWidth ? "width" : "minWidth"]: dropdownWidth.value,
						outline: "none"
					}),
					role: "region"
				}, [
					_ctx.$slots.header ? (openBlock(), createElementBlock("div", {
						key: 0,
						class: normalizeClass(unref(ns).be("suggestion", "header")),
						onClick: _cache[0] || (_cache[0] = withModifiers(() => {}, ["stop"]))
					}, [renderSlot(_ctx.$slots, "header")], 2)) : createCommentVNode("v-if", true),
					createVNode(unref(ElScrollbar), {
						id: unref(listboxId),
						tag: "ul",
						"wrap-class": unref(ns).be("suggestion", "wrap"),
						"view-class": unref(ns).be("suggestion", "list"),
						role: "listbox"
					}, {
						default: withCtx(() => [suggestionLoading.value ? (openBlock(), createElementBlock("li", _hoisted_2, [renderSlot(_ctx.$slots, "loading", {}, () => [createVNode(unref(ElIcon), { class: normalizeClass(unref(ns).is("loading")) }, {
							default: withCtx(() => [createVNode(unref(Loading))]),
							_: 1
						}, 8, ["class"])])])) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(suggestions.value, (item, index) => {
							return openBlock(), createElementBlock("li", {
								id: `${unref(listboxId)}-item-${index}`,
								key: index,
								class: normalizeClass({ highlighted: highlightedIndex.value === index }),
								role: "option",
								"aria-selected": highlightedIndex.value === index,
								onClick: ($event) => handleSelect(item)
							}, [renderSlot(_ctx.$slots, "default", { item }, () => [createTextVNode(toDisplayString(item[__props.valueKey]), 1)])], 10, _hoisted_3);
						}), 128))]),
						_: 3
					}, 8, [
						"id",
						"wrap-class",
						"view-class"
					]),
					_ctx.$slots.footer ? (openBlock(), createElementBlock("div", {
						key: 1,
						class: normalizeClass(unref(ns).be("suggestion", "footer")),
						onClick: _cache[1] || (_cache[1] = withModifiers(() => {}, ["stop"]))
					}, [renderSlot(_ctx.$slots, "footer")], 2)) : createCommentVNode("v-if", true)
				], 6)]),
				default: withCtx(() => [createElementVNode("div", {
					ref_key: "listboxRef",
					ref: listboxRef,
					class: normalizeClass([unref(ns).b(), _ctx.$attrs.class]),
					style: normalizeStyle(styles.value),
					role: "combobox",
					"aria-haspopup": "listbox",
					"aria-expanded": suggestionVisible.value,
					"aria-owns": unref(listboxId)
				}, [createVNode(unref(ElInput), mergeProps({
					ref_key: "inputRef",
					ref: inputRef
				}, mergeProps(passInputProps.value, _ctx.$attrs), {
					"model-value": __props.modelValue,
					disabled: unref(disabled),
					onInput: handleInput,
					onChange: handleChange,
					onFocus: handleFocus,
					onBlur: handleBlur,
					onClear: handleClear,
					onKeydown: handleKeydown,
					onMousedown: handleMouseDown
				}), createSlots({ _: 2 }, [
					_ctx.$slots.prepend ? {
						name: "prepend",
						fn: withCtx(() => [renderSlot(_ctx.$slots, "prepend")]),
						key: "0"
					} : void 0,
					_ctx.$slots.append ? {
						name: "append",
						fn: withCtx(() => [renderSlot(_ctx.$slots, "append")]),
						key: "1"
					} : void 0,
					_ctx.$slots.prefix ? {
						name: "prefix",
						fn: withCtx(() => [renderSlot(_ctx.$slots, "prefix")]),
						key: "2"
					} : void 0,
					_ctx.$slots.suffix ? {
						name: "suffix",
						fn: withCtx(() => [renderSlot(_ctx.$slots, "suffix")]),
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
export { autocomplete_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=autocomplete.vue_vue_type_script_setup_true_lang.mjs.map