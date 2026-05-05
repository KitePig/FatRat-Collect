const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_scroll = require('../../../utils/dom/scroll.js');
const require_index = require('../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../hooks/use-namespace/index.js');
const require_index$2 = require('../../scrollbar/index.js');
const require_mention_dropdown = require('./mention-dropdown.js');
let vue = require("vue");

//#region ../../packages/components/mention/src/mention-dropdown.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"id",
	"aria-disabled",
	"aria-selected",
	"onMousemove",
	"onClick"
];
var mention_dropdown_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElMentionDropdown",
	__name: "mention-dropdown",
	props: require_mention_dropdown.mentionDropdownProps,
	emits: require_mention_dropdown.mentionDropdownEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const ns = require_index$1.useNamespace("mention");
		const { t } = require_index.useLocale();
		const hoveringIndex = (0, vue.ref)(-1);
		const scrollbarRef = (0, vue.ref)();
		const optionRefs = (0, vue.ref)();
		const dropdownRef = (0, vue.ref)();
		const optionkls = (item, index) => [
			ns.be("dropdown", "item"),
			ns.is("hovering", hoveringIndex.value === index),
			ns.is("disabled", item.disabled || props.disabled)
		];
		const handleSelect = (item) => {
			if (item.disabled || props.disabled) return;
			emit("select", item);
		};
		const handleMouseEnter = (index) => {
			hoveringIndex.value = index;
		};
		const filteredAllDisabled = (0, vue.computed)(() => props.disabled || props.options.every((item) => item.disabled));
		const hoverOption = (0, vue.computed)(() => props.options[hoveringIndex.value]);
		const selectHoverOption = () => {
			if (!hoverOption.value || hoverOption.value.disabled || props.disabled) return;
			emit("select", hoverOption.value);
		};
		const navigateOptions = (direction) => {
			const { options } = props;
			if (options.length === 0 || filteredAllDisabled.value) return;
			if (direction === "next") {
				hoveringIndex.value++;
				if (hoveringIndex.value === options.length) hoveringIndex.value = 0;
			} else if (direction === "prev") {
				hoveringIndex.value--;
				if (hoveringIndex.value < 0) hoveringIndex.value = options.length - 1;
			}
			const option = options[hoveringIndex.value];
			if (option.disabled) {
				navigateOptions(direction);
				return;
			}
			(0, vue.nextTick)(() => scrollToOption(option));
		};
		const scrollToOption = (option) => {
			const { options } = props;
			const index = options.findIndex((item) => item.value === option.value);
			const target = optionRefs.value?.[index];
			if (target) {
				const menu = dropdownRef.value?.querySelector?.(`.${ns.be("dropdown", "wrap")}`);
				if (menu) require_scroll.scrollIntoView(menu, target);
			}
			scrollbarRef.value?.handleScroll();
		};
		const resetHoveringIndex = () => {
			if (filteredAllDisabled.value || props.options.length === 0) hoveringIndex.value = -1;
			else hoveringIndex.value = props.options.findIndex((item) => !item.disabled);
		};
		(0, vue.watch)(() => props.options, resetHoveringIndex, { immediate: true });
		__expose({
			hoveringIndex,
			navigateOptions,
			selectHoverOption,
			hoverOption
		});
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				ref_key: "dropdownRef",
				ref: dropdownRef,
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).b("dropdown"))
			}, [
				_ctx.$slots.header ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 0,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).be("dropdown", "header"))
				}, [(0, vue.renderSlot)(_ctx.$slots, "header")], 2)) : (0, vue.createCommentVNode)("v-if", true),
				(0, vue.withDirectives)((0, vue.createVNode)((0, vue.unref)(require_index$2.ElScrollbar), {
					id: __props.contentId,
					ref_key: "scrollbarRef",
					ref: scrollbarRef,
					tag: "ul",
					"wrap-class": (0, vue.unref)(ns).be("dropdown", "wrap"),
					"view-class": (0, vue.unref)(ns).be("dropdown", "list"),
					role: "listbox",
					"aria-label": __props.ariaLabel,
					"aria-orientation": "vertical"
				}, {
					default: (0, vue.withCtx)(() => [((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(__props.options, (item, index) => {
						return (0, vue.openBlock)(), (0, vue.createElementBlock)("li", {
							id: `${__props.contentId}-${index}`,
							ref_for: true,
							ref_key: "optionRefs",
							ref: optionRefs,
							key: index,
							class: (0, vue.normalizeClass)(optionkls(item, index)),
							role: "option",
							"aria-disabled": item.disabled || __props.disabled || void 0,
							"aria-selected": hoveringIndex.value === index,
							onMousemove: ($event) => handleMouseEnter(index),
							onClick: (0, vue.withModifiers)(($event) => handleSelect(item), ["stop"])
						}, [(0, vue.renderSlot)(_ctx.$slots, "label", {
							item,
							index
						}, () => [(0, vue.createElementVNode)("span", null, (0, vue.toDisplayString)(item.label ?? item.value), 1)])], 42, _hoisted_1);
					}), 128))]),
					_: 3
				}, 8, [
					"id",
					"wrap-class",
					"view-class",
					"aria-label"
				]), [[vue.vShow, __props.options.length > 0 && !__props.loading]]),
				__props.loading ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 1,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).be("dropdown", "loading"))
				}, [(0, vue.renderSlot)(_ctx.$slots, "loading", {}, () => [(0, vue.createTextVNode)((0, vue.toDisplayString)((0, vue.unref)(t)("el.mention.loading")), 1)])], 2)) : (0, vue.createCommentVNode)("v-if", true),
				_ctx.$slots.footer ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
					key: 2,
					class: (0, vue.normalizeClass)((0, vue.unref)(ns).be("dropdown", "footer"))
				}, [(0, vue.renderSlot)(_ctx.$slots, "footer")], 2)) : (0, vue.createCommentVNode)("v-if", true)
			], 2);
		};
	}
});

//#endregion
exports.default = mention_dropdown_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=mention-dropdown.vue_vue_type_script_setup_true_lang.js.map