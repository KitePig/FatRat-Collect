import { scrollIntoView } from "../../../utils/dom/scroll.mjs";
import { useLocale } from "../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { ElScrollbar } from "../../scrollbar/index.mjs";
import { mentionDropdownEmits, mentionDropdownProps } from "./mention-dropdown.mjs";
import { Fragment, computed, createCommentVNode, createElementBlock, createElementVNode, createTextVNode, createVNode, defineComponent, nextTick, normalizeClass, openBlock, ref, renderList, renderSlot, toDisplayString, unref, vShow, watch, withCtx, withDirectives, withModifiers } from "vue";

//#region ../../packages/components/mention/src/mention-dropdown.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"id",
	"aria-disabled",
	"aria-selected",
	"onMousemove",
	"onClick"
];
var mention_dropdown_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElMentionDropdown",
	__name: "mention-dropdown",
	props: mentionDropdownProps,
	emits: mentionDropdownEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const ns = useNamespace("mention");
		const { t } = useLocale();
		const hoveringIndex = ref(-1);
		const scrollbarRef = ref();
		const optionRefs = ref();
		const dropdownRef = ref();
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
		const filteredAllDisabled = computed(() => props.disabled || props.options.every((item) => item.disabled));
		const hoverOption = computed(() => props.options[hoveringIndex.value]);
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
			nextTick(() => scrollToOption(option));
		};
		const scrollToOption = (option) => {
			const { options } = props;
			const index = options.findIndex((item) => item.value === option.value);
			const target = optionRefs.value?.[index];
			if (target) {
				const menu = dropdownRef.value?.querySelector?.(`.${ns.be("dropdown", "wrap")}`);
				if (menu) scrollIntoView(menu, target);
			}
			scrollbarRef.value?.handleScroll();
		};
		const resetHoveringIndex = () => {
			if (filteredAllDisabled.value || props.options.length === 0) hoveringIndex.value = -1;
			else hoveringIndex.value = props.options.findIndex((item) => !item.disabled);
		};
		watch(() => props.options, resetHoveringIndex, { immediate: true });
		__expose({
			hoveringIndex,
			navigateOptions,
			selectHoverOption,
			hoverOption
		});
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				ref_key: "dropdownRef",
				ref: dropdownRef,
				class: normalizeClass(unref(ns).b("dropdown"))
			}, [
				_ctx.$slots.header ? (openBlock(), createElementBlock("div", {
					key: 0,
					class: normalizeClass(unref(ns).be("dropdown", "header"))
				}, [renderSlot(_ctx.$slots, "header")], 2)) : createCommentVNode("v-if", true),
				withDirectives(createVNode(unref(ElScrollbar), {
					id: __props.contentId,
					ref_key: "scrollbarRef",
					ref: scrollbarRef,
					tag: "ul",
					"wrap-class": unref(ns).be("dropdown", "wrap"),
					"view-class": unref(ns).be("dropdown", "list"),
					role: "listbox",
					"aria-label": __props.ariaLabel,
					"aria-orientation": "vertical"
				}, {
					default: withCtx(() => [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.options, (item, index) => {
						return openBlock(), createElementBlock("li", {
							id: `${__props.contentId}-${index}`,
							ref_for: true,
							ref_key: "optionRefs",
							ref: optionRefs,
							key: index,
							class: normalizeClass(optionkls(item, index)),
							role: "option",
							"aria-disabled": item.disabled || __props.disabled || void 0,
							"aria-selected": hoveringIndex.value === index,
							onMousemove: ($event) => handleMouseEnter(index),
							onClick: withModifiers(($event) => handleSelect(item), ["stop"])
						}, [renderSlot(_ctx.$slots, "label", {
							item,
							index
						}, () => [createElementVNode("span", null, toDisplayString(item.label ?? item.value), 1)])], 42, _hoisted_1);
					}), 128))]),
					_: 3
				}, 8, [
					"id",
					"wrap-class",
					"view-class",
					"aria-label"
				]), [[vShow, __props.options.length > 0 && !__props.loading]]),
				__props.loading ? (openBlock(), createElementBlock("div", {
					key: 1,
					class: normalizeClass(unref(ns).be("dropdown", "loading"))
				}, [renderSlot(_ctx.$slots, "loading", {}, () => [createTextVNode(toDisplayString(unref(t)("el.mention.loading")), 1)])], 2)) : createCommentVNode("v-if", true),
				_ctx.$slots.footer ? (openBlock(), createElementBlock("div", {
					key: 2,
					class: normalizeClass(unref(ns).be("dropdown", "footer"))
				}, [renderSlot(_ctx.$slots, "footer")], 2)) : createCommentVNode("v-if", true)
			], 2);
		};
	}
});

//#endregion
export { mention_dropdown_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=mention-dropdown.vue_vue_type_script_setup_true_lang.mjs.map