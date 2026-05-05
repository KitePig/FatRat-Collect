const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_aria = require('../../../constants/aria.js');
const require_event = require('../../../constants/event.js');
const require_aria$1 = require('../../../utils/dom/aria.js');
const require_event$1 = require('../../../utils/dom/event.js');
const require_error = require('../../../utils/error.js');
const require_index = require('../../../directives/click-outside/index.js');
const require_index$1 = require('../../../hooks/use-locale/index.js');
const require_index$2 = require('../../../hooks/use-namespace/index.js');
const require_index$3 = require('../../../hooks/use-focus-controller/index.js');
const require_index$4 = require('../../../hooks/use-composition/index.js');
const require_index$5 = require('../../../hooks/use-empty-values/index.js');
const require_index$6 = require('../../icon/index.js');
const require_use_form_common_props = require('../../form/src/hooks/use-form-common-props.js');
const require_use_form_item = require('../../form/src/hooks/use-form-item.js');
const require_index$7 = require('../../tooltip/index.js');
const require_index$8 = require('../../input/index.js');
const require_index$9 = require('../../scrollbar/index.js');
const require_index$10 = require('../../tag/index.js');
const require_index$11 = require('../../cascader-panel/index.js');
const require_cascader = require('./cascader.js');
let _vueuse_core = require("@vueuse/core");
let lodash_unified = require("lodash-unified");
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/cascader/src/cascader.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = ["placeholder"];
const _hoisted_2 = ["onClick"];
var cascader_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElCascader",
	__name: "cascader",
	props: require_cascader.cascaderProps,
	emits: require_cascader.cascaderEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const popperOptions = { modifiers: [{
			name: "arrowPosition",
			enabled: true,
			phase: "main",
			fn: ({ state }) => {
				const { modifiersData, placement } = state;
				if ([
					"right",
					"left",
					"bottom",
					"top"
				].includes(placement)) return;
				if (modifiersData.arrow) modifiersData.arrow.x = 35;
			},
			requires: ["arrow"]
		}] };
		const props = __props;
		const emit = __emit;
		const attrs = (0, vue.useAttrs)();
		const slots = (0, vue.useSlots)();
		let inputInitialHeight = 0;
		let pressDeleteCount = 0;
		const nsCascader = require_index$2.useNamespace("cascader");
		const nsInput = require_index$2.useNamespace("input");
		const sizeMapPadding = {
			small: 7,
			default: 11,
			large: 15
		};
		const { t } = require_index$1.useLocale();
		const { formItem } = require_use_form_item.useFormItem();
		const isDisabled = require_use_form_common_props.useFormDisabled();
		const { valueOnClear } = require_index$5.useEmptyValues(props);
		const { isComposing, handleComposition } = require_index$4.useComposition({ afterComposition(event) {
			const text = event.target?.value;
			handleInput(text);
		} });
		const tooltipRef = (0, vue.ref)();
		const tagTooltipRef = (0, vue.ref)();
		const inputRef = (0, vue.ref)();
		const tagWrapper = (0, vue.ref)();
		const cascaderPanelRef = (0, vue.ref)();
		const suggestionPanel = (0, vue.ref)();
		const popperVisible = (0, vue.ref)(false);
		const inputHover = (0, vue.ref)(false);
		const filtering = (0, vue.ref)(false);
		const inputValue = (0, vue.ref)("");
		const searchInputValue = (0, vue.ref)("");
		const tags = (0, vue.ref)([]);
		const suggestions = (0, vue.ref)([]);
		const showTagList = (0, vue.computed)(() => {
			if (!props.props.multiple) return [];
			return props.collapseTags ? tags.value.slice(0, props.maxCollapseTags) : tags.value;
		});
		const collapseTagList = (0, vue.computed)(() => {
			if (!props.props.multiple) return [];
			return props.collapseTags ? tags.value.slice(props.maxCollapseTags) : [];
		});
		const cascaderStyle = (0, vue.computed)(() => {
			return attrs.style;
		});
		const inputPlaceholder = (0, vue.computed)(() => props.placeholder ?? t("el.cascader.placeholder"));
		const currentPlaceholder = (0, vue.computed)(() => searchInputValue.value || tags.value.length > 0 || isComposing.value ? "" : inputPlaceholder.value);
		const realSize = require_use_form_common_props.useFormSize();
		const tagSize = (0, vue.computed)(() => realSize.value === "small" ? "small" : "default");
		const multiple = (0, vue.computed)(() => !!props.props.multiple);
		const readonly = (0, vue.computed)(() => !props.filterable || multiple.value);
		const searchKeyword = (0, vue.computed)(() => multiple.value ? searchInputValue.value : inputValue.value);
		const checkedNodes = (0, vue.computed)(() => cascaderPanelRef.value?.checkedNodes || []);
		const { wrapperRef, isFocused, handleBlur } = require_index$3.useFocusController(inputRef, {
			disabled: isDisabled,
			beforeBlur(event) {
				return tooltipRef.value?.isFocusInsideContent(event) || tagTooltipRef.value?.isFocusInsideContent(event);
			},
			afterBlur() {
				if (props.validateEvent) formItem?.validate?.("blur").catch((err) => require_error.debugWarn(err));
			}
		});
		const clearBtnVisible = (0, vue.computed)(() => {
			if (!props.clearable || isDisabled.value || filtering.value || !inputHover.value && !isFocused.value) return false;
			return !!checkedNodes.value.length;
		});
		const presentText = (0, vue.computed)(() => {
			const { showAllLevels, separator } = props;
			const nodes = checkedNodes.value;
			return nodes.length ? multiple.value ? "" : nodes[0].calcText(showAllLevels, separator) : "";
		});
		const validateState = (0, vue.computed)(() => formItem?.validateState || "");
		const checkedValue = (0, vue.computed)({
			get() {
				return (0, lodash_unified.cloneDeep)(props.modelValue);
			},
			set(val) {
				const value = val ?? valueOnClear.value;
				emit(require_event.UPDATE_MODEL_EVENT, value);
				emit(require_event.CHANGE_EVENT, value);
				if (props.validateEvent) formItem?.validate("change").catch((err) => require_error.debugWarn(err));
			}
		});
		const cascaderKls = (0, vue.computed)(() => {
			return [
				nsCascader.b(),
				nsCascader.m(realSize.value),
				nsCascader.is("disabled", isDisabled.value),
				attrs.class
			];
		});
		const cascaderIconKls = (0, vue.computed)(() => {
			return [
				nsInput.e("icon"),
				"icon-arrow-down",
				nsCascader.is("reverse", popperVisible.value)
			];
		});
		const inputClass = (0, vue.computed)(() => nsCascader.is("focus", isFocused.value));
		const contentRef = (0, vue.computed)(() => {
			return tooltipRef.value?.popperRef?.contentRef;
		});
		const handleClickOutside = (event) => {
			if (isFocused.value) handleBlur(new FocusEvent("blur", event));
			togglePopperVisible(false);
		};
		const togglePopperVisible = (visible) => {
			if (isDisabled.value) return;
			visible = visible ?? !popperVisible.value;
			if (visible !== popperVisible.value) {
				popperVisible.value = visible;
				inputRef.value?.input?.setAttribute("aria-expanded", `${visible}`);
				if (visible) {
					updatePopperPosition();
					cascaderPanelRef.value && (0, vue.nextTick)(cascaderPanelRef.value.scrollToExpandingNode);
				} else if (props.filterable) syncPresentTextValue();
				emit("visibleChange", visible);
			}
		};
		const updatePopperPosition = () => {
			(0, vue.nextTick)(() => {
				tooltipRef.value?.updatePopper();
			});
		};
		const hideSuggestionPanel = () => {
			filtering.value = false;
		};
		const genTag = (node) => {
			const { showAllLevels, separator } = props;
			return {
				node,
				key: node.uid,
				text: node.calcText(showAllLevels, separator),
				hitState: false,
				closable: !isDisabled.value && !node.isDisabled
			};
		};
		const deleteTag = (tag) => {
			const node = tag.node;
			node.doCheck(false);
			cascaderPanelRef.value?.calculateCheckedValue();
			emit("removeTag", node.valueByOption);
		};
		const getStrategyCheckedNodes = () => {
			switch (props.showCheckedStrategy) {
				case "child": return checkedNodes.value;
				case "parent": {
					const clickedNodes = getCheckedNodes(false);
					const clickedNodesValue = clickedNodes.map((o) => o.value);
					return clickedNodes.filter((o) => !o.parent || !clickedNodesValue.includes(o.parent.value));
				}
				default: return [];
			}
		};
		const calculatePresentTags = () => {
			if (!multiple.value) return;
			const nodes = getStrategyCheckedNodes();
			const allTags = [];
			nodes.forEach((node) => allTags.push(genTag(node)));
			tags.value = allTags;
		};
		const calculateSuggestions = () => {
			const { filterMethod, showAllLevels, separator } = props;
			const res = cascaderPanelRef.value?.getFlattedNodes(!props.props.checkStrictly)?.filter((node) => {
				if (node.isDisabled) return false;
				node.calcText(showAllLevels, separator);
				return filterMethod(node, searchKeyword.value);
			});
			if (multiple.value) tags.value.forEach((tag) => {
				tag.hitState = false;
			});
			filtering.value = true;
			suggestions.value = res;
			updatePopperPosition();
		};
		const focusFirstNode = () => {
			let firstNode;
			if (filtering.value && suggestionPanel.value) firstNode = suggestionPanel.value.$el.querySelector(`.${nsCascader.e("suggestion-item")}`);
			else firstNode = cascaderPanelRef.value?.$el.querySelector(`.${nsCascader.b("node")}[tabindex="-1"]`);
			if (firstNode) {
				firstNode.focus();
				if (!filtering.value && firstNode.getAttribute("aria-haspopup") === "true") firstNode.click();
			}
		};
		const updateStyle = () => {
			const inputInner = inputRef.value?.input;
			const tagWrapperEl = tagWrapper.value;
			const suggestionPanelEl = suggestionPanel.value?.$el;
			if (!_vueuse_core.isClient || !inputInner) return;
			if (suggestionPanelEl) {
				const suggestionList = suggestionPanelEl.querySelector(`.${nsCascader.e("suggestion-list")}`);
				suggestionList.style.minWidth = `${inputInner.offsetWidth}px`;
			}
			if (tagWrapperEl) {
				const { offsetHeight } = tagWrapperEl;
				const height = tags.value.length > 0 ? `${Math.max(offsetHeight, inputInitialHeight) - 2}px` : `${inputInitialHeight}px`;
				inputInner.style.height = height;
				if (slots.prefix) {
					const prefix = inputRef.value?.$el.querySelector(`.${nsInput.e("prefix")}`);
					let left = 0;
					if (prefix) {
						left = prefix.offsetWidth;
						if (left > 0) left += sizeMapPadding[realSize.value || "default"];
					}
					tagWrapperEl.style.left = `${left}px`;
				} else tagWrapperEl.style.left = `0`;
				updatePopperPosition();
			}
		};
		const getCheckedNodes = (leafOnly) => {
			return cascaderPanelRef.value?.getCheckedNodes(leafOnly);
		};
		const handleExpandChange = (value) => {
			updatePopperPosition();
			emit("expandChange", value);
		};
		const handleKeyDown = (e) => {
			if (isComposing.value) return;
			switch (require_event$1.getEventCode(e)) {
				case require_aria.EVENT_CODE.enter:
				case require_aria.EVENT_CODE.numpadEnter:
					togglePopperVisible();
					break;
				case require_aria.EVENT_CODE.down:
					togglePopperVisible(true);
					(0, vue.nextTick)(focusFirstNode);
					e.preventDefault();
					break;
				case require_aria.EVENT_CODE.esc:
					if (popperVisible.value === true) {
						e.preventDefault();
						e.stopPropagation();
						togglePopperVisible(false);
					}
					break;
				case require_aria.EVENT_CODE.tab:
					togglePopperVisible(false);
					break;
			}
		};
		const handleClear = () => {
			cascaderPanelRef.value?.clearCheckedNodes();
			if (!popperVisible.value && props.filterable) syncPresentTextValue();
			togglePopperVisible(false);
			emit("clear");
		};
		const syncPresentTextValue = () => {
			const { value } = presentText;
			inputValue.value = value;
			searchInputValue.value = value;
		};
		const handleSuggestionClick = (node) => {
			const { checked } = node;
			if (multiple.value) cascaderPanelRef.value?.handleCheckChange(node, !checked, false);
			else {
				!checked && cascaderPanelRef.value?.handleCheckChange(node, true, false);
				togglePopperVisible(false);
			}
		};
		const handleSuggestionKeyDown = (e) => {
			const target = e.target;
			const code = require_event$1.getEventCode(e);
			switch (code) {
				case require_aria.EVENT_CODE.up:
				case require_aria.EVENT_CODE.down:
					e.preventDefault();
					require_aria$1.focusNode(require_aria$1.getSibling(target, code === require_aria.EVENT_CODE.up ? -1 : 1, `.${nsCascader.e("suggestion-item")}[tabindex="-1"]`));
					break;
				case require_aria.EVENT_CODE.enter:
				case require_aria.EVENT_CODE.numpadEnter:
					target.click();
					break;
			}
		};
		const handleDelete = () => {
			const lastTag = tags.value[tags.value.length - 1];
			pressDeleteCount = searchInputValue.value ? 0 : pressDeleteCount + 1;
			if (!lastTag || !pressDeleteCount || props.collapseTags && tags.value.length > 1) return;
			if (lastTag.hitState) deleteTag(lastTag);
			else lastTag.hitState = true;
		};
		const handleFilter = (0, _vueuse_core.useDebounceFn)(() => {
			const { value } = searchKeyword;
			if (!value) return;
			const passed = props.beforeFilter(value);
			if ((0, _vue_shared.isPromise)(passed)) passed.then(calculateSuggestions).catch(() => {});
			else if (passed !== false) calculateSuggestions();
			else hideSuggestionPanel();
		}, (0, vue.computed)(() => props.debounce));
		const handleInput = (val, e) => {
			!popperVisible.value && togglePopperVisible(true);
			if (e?.isComposing) return;
			if (val) handleFilter();
			else {
				const passed = props.beforeFilter("");
				if ((0, _vue_shared.isPromise)(passed)) passed.catch(() => {});
				hideSuggestionPanel();
			}
		};
		const getInputInnerHeight = (inputInner) => Number.parseFloat((0, _vueuse_core.useCssVar)(nsInput.cssVarName("input-height"), inputInner).value) - 2;
		const focus = () => {
			inputRef.value?.focus();
		};
		const blur = () => {
			inputRef.value?.blur();
		};
		(0, vue.watch)(filtering, updatePopperPosition);
		(0, vue.watch)([
			checkedNodes,
			isDisabled,
			() => props.collapseTags,
			() => props.maxCollapseTags
		], calculatePresentTags);
		(0, vue.watch)(tags, () => {
			(0, vue.nextTick)(() => updateStyle());
		});
		(0, vue.watch)(realSize, async () => {
			await (0, vue.nextTick)();
			const inputInner = inputRef.value.input;
			inputInitialHeight = getInputInnerHeight(inputInner) || inputInitialHeight;
			updateStyle();
		});
		(0, vue.watch)(presentText, syncPresentTextValue, { immediate: true });
		(0, vue.watch)(() => popperVisible.value, (val) => {
			if (val && props.props.lazy && props.props.lazyLoad) cascaderPanelRef.value?.loadLazyRootNodes();
		});
		(0, vue.onMounted)(() => {
			const inputInner = inputRef.value.input;
			const inputInnerHeight = getInputInnerHeight(inputInner);
			inputInitialHeight = inputInner.offsetHeight || inputInnerHeight;
			(0, _vueuse_core.useResizeObserver)(inputInner, updateStyle);
		});
		__expose({
			getCheckedNodes,
			cascaderPanelRef,
			togglePopperVisible,
			contentRef,
			presentText,
			focus,
			blur
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$7.ElTooltip), {
				ref_key: "tooltipRef",
				ref: tooltipRef,
				visible: popperVisible.value,
				teleported: __props.teleported,
				"popper-class": [(0, vue.unref)(nsCascader).e("dropdown"), __props.popperClass],
				"popper-style": __props.popperStyle,
				"popper-options": popperOptions,
				"fallback-placements": __props.fallbackPlacements,
				"stop-popper-mouse-event": false,
				"gpu-acceleration": false,
				placement: __props.placement,
				transition: `${(0, vue.unref)(nsCascader).namespace.value}-zoom-in-top`,
				effect: __props.effect,
				pure: "",
				persistent: __props.persistent,
				onHide: hideSuggestionPanel
			}, {
				default: (0, vue.withCtx)(() => [(0, vue.withDirectives)(((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					ref_key: "wrapperRef",
					ref: wrapperRef,
					class: (0, vue.normalizeClass)(cascaderKls.value),
					style: (0, vue.normalizeStyle)(cascaderStyle.value),
					onClick: _cache[8] || (_cache[8] = () => togglePopperVisible(readonly.value ? void 0 : true)),
					onKeydown: handleKeyDown,
					onMouseenter: _cache[9] || (_cache[9] = ($event) => inputHover.value = true),
					onMouseleave: _cache[10] || (_cache[10] = ($event) => inputHover.value = false)
				}, [(0, vue.createVNode)((0, vue.unref)(require_index$8.ElInput), {
					ref_key: "inputRef",
					ref: inputRef,
					modelValue: inputValue.value,
					"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => inputValue.value = $event),
					placeholder: currentPlaceholder.value,
					readonly: readonly.value,
					disabled: (0, vue.unref)(isDisabled),
					"validate-event": false,
					size: (0, vue.unref)(realSize),
					class: (0, vue.normalizeClass)(inputClass.value),
					tabindex: multiple.value && __props.filterable && !(0, vue.unref)(isDisabled) ? -1 : void 0,
					onCompositionstart: (0, vue.unref)(handleComposition),
					onCompositionupdate: (0, vue.unref)(handleComposition),
					onCompositionend: (0, vue.unref)(handleComposition),
					onInput: handleInput
				}, (0, vue.createSlots)({
					suffix: (0, vue.withCtx)(() => [clearBtnVisible.value ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$6.ElIcon), {
						key: "clear",
						class: (0, vue.normalizeClass)([(0, vue.unref)(nsInput).e("icon"), "icon-circle-close"]),
						onClick: (0, vue.withModifiers)(handleClear, ["stop"])
					}, {
						default: (0, vue.withCtx)(() => [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.resolveDynamicComponent)(__props.clearIcon)))]),
						_: 1
					}, 8, ["class"])) : ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$6.ElIcon), {
						key: "arrow-down",
						class: (0, vue.normalizeClass)(cascaderIconKls.value),
						onClick: _cache[0] || (_cache[0] = (0, vue.withModifiers)(($event) => togglePopperVisible(), ["stop"]))
					}, {
						default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.ArrowDown))]),
						_: 1
					}, 8, ["class"]))]),
					_: 2
				}, [_ctx.$slots.prefix ? {
					name: "prefix",
					fn: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "prefix")]),
					key: "0"
				} : void 0]), 1032, [
					"modelValue",
					"placeholder",
					"readonly",
					"disabled",
					"size",
					"class",
					"tabindex",
					"onCompositionstart",
					"onCompositionupdate",
					"onCompositionend"
				]), multiple.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 0,
					ref_key: "tagWrapper",
					ref: tagWrapper,
					class: (0, vue.normalizeClass)([(0, vue.unref)(nsCascader).e("tags"), (0, vue.unref)(nsCascader).is("validate", Boolean(validateState.value))])
				}, [
					(0, vue.renderSlot)(_ctx.$slots, "tag", {
						data: tags.value,
						deleteTag
					}, () => [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(showTagList.value, (tag) => {
						return (0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$10.ElTag), {
							key: tag.key,
							type: __props.tagType,
							size: tagSize.value,
							effect: __props.tagEffect,
							hit: tag.hitState,
							closable: tag.closable,
							"disable-transitions": "",
							onClose: ($event) => deleteTag(tag)
						}, {
							default: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("span", null, (0, vue.toDisplayString)(tag.text), 1)]),
							_: 2
						}, 1032, [
							"type",
							"size",
							"effect",
							"hit",
							"closable",
							"onClose"
						]);
					}), 128))]),
					__props.collapseTags && tags.value.length > __props.maxCollapseTags ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$7.ElTooltip), {
						key: 0,
						ref_key: "tagTooltipRef",
						ref: tagTooltipRef,
						disabled: popperVisible.value || !__props.collapseTagsTooltip,
						"fallback-placements": [
							"bottom",
							"top",
							"right",
							"left"
						],
						placement: "bottom",
						"popper-class": __props.popperClass,
						"popper-style": __props.popperStyle,
						effect: __props.effect,
						persistent: __props.persistent
					}, {
						default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(require_index$10.ElTag), {
							closable: false,
							size: tagSize.value,
							type: __props.tagType,
							effect: __props.tagEffect,
							"disable-transitions": ""
						}, {
							default: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("span", { class: (0, vue.normalizeClass)((0, vue.unref)(nsCascader).e("tags-text")) }, " + " + (0, vue.toDisplayString)(tags.value.length - __props.maxCollapseTags), 3)]),
							_: 1
						}, 8, [
							"size",
							"type",
							"effect"
						])]),
						content: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(require_index$9.ElScrollbar), { "max-height": __props.maxCollapseTagsTooltipHeight }, {
							default: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(nsCascader).e("collapse-tags")) }, [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(collapseTagList.value, (tag, idx) => {
								return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
									key: idx,
									class: (0, vue.normalizeClass)((0, vue.unref)(nsCascader).e("collapse-tag"))
								}, [((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$10.ElTag), {
									key: tag.key,
									class: "in-tooltip",
									type: __props.tagType,
									size: tagSize.value,
									effect: __props.tagEffect,
									hit: tag.hitState,
									closable: tag.closable,
									"disable-transitions": "",
									onClose: ($event) => deleteTag(tag)
								}, {
									default: (0, vue.withCtx)(() => [(0, vue.createElementVNode)("span", null, (0, vue.toDisplayString)(tag.text), 1)]),
									_: 2
								}, 1032, [
									"type",
									"size",
									"effect",
									"hit",
									"closable",
									"onClose"
								]))], 2);
							}), 128))], 2)]),
							_: 1
						}, 8, ["max-height"])]),
						_: 1
					}, 8, [
						"disabled",
						"popper-class",
						"popper-style",
						"effect",
						"persistent"
					])) : (0, vue.createCommentVNode)("v-if", true),
					__props.filterable && !(0, vue.unref)(isDisabled) ? (0, vue.withDirectives)(((0, vue.openBlock)(), (0, vue.createElementBlock)("input", {
						key: 1,
						"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => searchInputValue.value = $event),
						type: "text",
						class: (0, vue.normalizeClass)((0, vue.unref)(nsCascader).e("search-input")),
						placeholder: presentText.value ? "" : inputPlaceholder.value,
						onInput: _cache[3] || (_cache[3] = (e) => handleInput(searchInputValue.value, e)),
						onClick: _cache[4] || (_cache[4] = (0, vue.withModifiers)(($event) => togglePopperVisible(true), ["stop"])),
						onKeydown: (0, vue.withKeys)(handleDelete, ["delete"]),
						onCompositionstart: _cache[5] || (_cache[5] = (...args) => (0, vue.unref)(handleComposition) && (0, vue.unref)(handleComposition)(...args)),
						onCompositionupdate: _cache[6] || (_cache[6] = (...args) => (0, vue.unref)(handleComposition) && (0, vue.unref)(handleComposition)(...args)),
						onCompositionend: _cache[7] || (_cache[7] = (...args) => (0, vue.unref)(handleComposition) && (0, vue.unref)(handleComposition)(...args))
					}, null, 42, _hoisted_1)), [[vue.vModelText, searchInputValue.value]]) : (0, vue.createCommentVNode)("v-if", true)
				], 2)) : (0, vue.createCommentVNode)("v-if", true)], 38)), [[
					(0, vue.unref)(require_index.default),
					handleClickOutside,
					contentRef.value
				]])]),
				content: (0, vue.withCtx)(() => [
					_ctx.$slots.header ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
						key: 0,
						class: (0, vue.normalizeClass)((0, vue.unref)(nsCascader).e("header")),
						onClick: _cache[11] || (_cache[11] = (0, vue.withModifiers)(() => {}, ["stop"]))
					}, [(0, vue.renderSlot)(_ctx.$slots, "header")], 2)) : (0, vue.createCommentVNode)("v-if", true),
					(0, vue.withDirectives)((0, vue.createVNode)((0, vue.unref)(require_index$11.ElCascaderPanel), {
						ref_key: "cascaderPanelRef",
						ref: cascaderPanelRef,
						modelValue: checkedValue.value,
						"onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => checkedValue.value = $event),
						options: __props.options,
						props: props.props,
						border: false,
						"render-label": _ctx.$slots.default,
						onExpandChange: handleExpandChange,
						onClose: _cache[13] || (_cache[13] = ($event) => _ctx.$nextTick(() => togglePopperVisible(false)))
					}, {
						empty: (0, vue.withCtx)(() => [(0, vue.renderSlot)(_ctx.$slots, "empty")]),
						_: 3
					}, 8, [
						"modelValue",
						"options",
						"props",
						"render-label"
					]), [[vue.vShow, !filtering.value]]),
					__props.filterable ? (0, vue.withDirectives)(((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$9.ElScrollbar), {
						key: 1,
						ref_key: "suggestionPanel",
						ref: suggestionPanel,
						tag: "ul",
						class: (0, vue.normalizeClass)((0, vue.unref)(nsCascader).e("suggestion-panel")),
						"view-class": (0, vue.unref)(nsCascader).e("suggestion-list"),
						onKeydown: handleSuggestionKeyDown
					}, {
						default: (0, vue.withCtx)(() => [suggestions.value.length ? ((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, { key: 0 }, (0, vue.renderList)(suggestions.value, (item) => {
							return (0, vue.openBlock)(), (0, vue.createElementBlock)("li", {
								key: item.uid,
								class: (0, vue.normalizeClass)([(0, vue.unref)(nsCascader).e("suggestion-item"), (0, vue.unref)(nsCascader).is("checked", item.checked)]),
								tabindex: -1,
								onClick: ($event) => handleSuggestionClick(item)
							}, [(0, vue.renderSlot)(_ctx.$slots, "suggestion-item", { item }, () => [(0, vue.createElementVNode)("span", null, (0, vue.toDisplayString)(item.text), 1), item.checked ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(require_index$6.ElIcon), { key: 0 }, {
								default: (0, vue.withCtx)(() => [(0, vue.createVNode)((0, vue.unref)(_element_plus_icons_vue.Check))]),
								_: 1
							})) : (0, vue.createCommentVNode)("v-if", true)])], 10, _hoisted_2);
						}), 128)) : (0, vue.renderSlot)(_ctx.$slots, "empty", { key: 1 }, () => [(0, vue.createElementVNode)("li", { class: (0, vue.normalizeClass)((0, vue.unref)(nsCascader).e("empty-text")) }, (0, vue.toDisplayString)((0, vue.unref)(t)("el.cascader.noMatch")), 3)])]),
						_: 3
					}, 8, ["class", "view-class"])), [[vue.vShow, filtering.value]]) : (0, vue.createCommentVNode)("v-if", true),
					_ctx.$slots.footer ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
						key: 2,
						class: (0, vue.normalizeClass)((0, vue.unref)(nsCascader).e("footer")),
						onClick: _cache[14] || (_cache[14] = (0, vue.withModifiers)(() => {}, ["stop"]))
					}, [(0, vue.renderSlot)(_ctx.$slots, "footer")], 2)) : (0, vue.createCommentVNode)("v-if", true)
				]),
				_: 3
			}, 8, [
				"visible",
				"teleported",
				"popper-class",
				"popper-style",
				"fallback-placements",
				"placement",
				"transition",
				"effect",
				"persistent"
			]);
		};
	}
});

//#endregion
exports.default = cascader_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=cascader.vue_vue_type_script_setup_true_lang.js.map