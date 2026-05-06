import { CHANGE_EVENT } from "../../../constants/event.mjs";
import { getOffsetTopDistance } from "../../../utils/dom/position.mjs";
import { isUndefined, isWindow } from "../../../utils/types.mjs";
import { animateScrollTo, getScrollElement, getScrollTop } from "../../../utils/dom/scroll.mjs";
import { getElement } from "../../../utils/dom/element.mjs";
import { throttleByRaf } from "../../../utils/throttleByRaf.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { anchorEmits, anchorProps } from "./anchor.mjs";
import { anchorKey } from "./constants.mjs";
import { useEventListener } from "@vueuse/core";
import { computed, createCommentVNode, createElementBlock, createElementVNode, defineComponent, nextTick, normalizeClass, normalizeStyle, onMounted, openBlock, provide, ref, renderSlot, unref, useSlots, watch } from "vue";

//#region ../../packages/components/anchor/src/anchor.vue?vue&type=script&setup=true&lang.ts
var anchor_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElAnchor",
	__name: "anchor",
	props: anchorProps,
	emits: anchorEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const slots = useSlots();
		const currentAnchor = ref("");
		const markerStyle = ref({});
		const anchorRef = ref(null);
		const markerRef = ref(null);
		const containerEl = ref();
		const links = {};
		let isScrolling = false;
		let currentScrollTop = 0;
		const ns = useNamespace("anchor");
		const cls = computed(() => [
			ns.b(),
			props.type === "underline" ? ns.m("underline") : "",
			ns.m(props.direction)
		]);
		const addLink = (state) => {
			links[state.href] = state.el;
		};
		const removeLink = (href) => {
			delete links[href];
		};
		const setCurrentAnchor = (href) => {
			if (currentAnchor.value !== href) {
				currentAnchor.value = href;
				emit(CHANGE_EVENT, href);
			}
		};
		let clearAnimate = null;
		let currentTargetHref = "";
		const scrollToAnchor = (href) => {
			if (!containerEl.value) return;
			const target = getElement(href);
			if (!target) return;
			if (clearAnimate) {
				if (currentTargetHref === href) return;
				clearAnimate();
			}
			currentTargetHref = href;
			isScrolling = true;
			const scrollEle = getScrollElement(target, containerEl.value);
			const distance = getOffsetTopDistance(target, scrollEle);
			const max = scrollEle.scrollHeight - scrollEle.clientHeight;
			const to = Math.min(distance - props.offset, max);
			clearAnimate = animateScrollTo(containerEl.value, currentScrollTop, to, props.duration, () => {
				setTimeout(() => {
					isScrolling = false;
					currentTargetHref = "";
				}, 20);
			});
		};
		const scrollTo = (href) => {
			if (href) {
				setCurrentAnchor(href);
				scrollToAnchor(href);
			}
		};
		const handleClick = (e, href) => {
			emit("click", e, href);
			scrollTo(href);
		};
		const handleScroll = throttleByRaf(() => {
			if (containerEl.value) currentScrollTop = getScrollTop(containerEl.value);
			const currentHref = getCurrentHref();
			if (isScrolling || isUndefined(currentHref)) return;
			setCurrentAnchor(currentHref);
		});
		const getCurrentHref = () => {
			if (!containerEl.value) return;
			const scrollTop = getScrollTop(containerEl.value);
			const anchorTopList = [];
			for (const href of Object.keys(links)) {
				const target = getElement(href);
				if (!target) continue;
				const distance = getOffsetTopDistance(target, getScrollElement(target, containerEl.value));
				anchorTopList.push({
					top: distance - props.offset - props.bound,
					href
				});
			}
			anchorTopList.sort((prev, next) => prev.top - next.top);
			for (let i = 0; i < anchorTopList.length; i++) {
				const item = anchorTopList[i];
				const next = anchorTopList[i + 1];
				if (i === 0 && scrollTop === 0) return props.selectScrollTop ? item.href : "";
				if (item.top <= scrollTop && (!next || next.top > scrollTop)) return item.href;
			}
		};
		const getContainer = () => {
			const el = getElement(props.container);
			if (!el || isWindow(el)) containerEl.value = window;
			else containerEl.value = el;
		};
		useEventListener(containerEl, "scroll", handleScroll);
		const updateMarkerStyle = () => {
			nextTick(() => {
				if (!anchorRef.value || !markerRef.value || !currentAnchor.value) {
					markerStyle.value = {};
					return;
				}
				const currentLinkEl = links[currentAnchor.value];
				if (!currentLinkEl) {
					markerStyle.value = {};
					return;
				}
				const anchorRect = anchorRef.value.getBoundingClientRect();
				const markerRect = markerRef.value.getBoundingClientRect();
				const linkRect = currentLinkEl.getBoundingClientRect();
				if (props.direction === "horizontal") markerStyle.value = {
					left: `${linkRect.left - anchorRect.left}px`,
					width: `${linkRect.width}px`,
					opacity: 1
				};
				else markerStyle.value = {
					top: `${linkRect.top - anchorRect.top + (linkRect.height - markerRect.height) / 2}px`,
					opacity: 1
				};
			});
		};
		watch(currentAnchor, updateMarkerStyle);
		watch(() => slots.default?.(), updateMarkerStyle);
		onMounted(() => {
			getContainer();
			const hash = decodeURIComponent(window.location.hash);
			if (getElement(hash)) scrollTo(hash);
			else handleScroll();
		});
		watch(() => props.container, () => {
			getContainer();
		});
		provide(anchorKey, {
			ns,
			direction: props.direction,
			currentAnchor,
			addLink,
			removeLink,
			handleClick
		});
		__expose({ scrollTo });
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("div", {
				ref_key: "anchorRef",
				ref: anchorRef,
				class: normalizeClass(cls.value)
			}, [__props.marker ? (openBlock(), createElementBlock("div", {
				key: 0,
				ref_key: "markerRef",
				ref: markerRef,
				class: normalizeClass(unref(ns).e("marker")),
				style: normalizeStyle(markerStyle.value)
			}, null, 6)) : createCommentVNode("v-if", true), createElementVNode("div", { class: normalizeClass(unref(ns).e("list")) }, [renderSlot(_ctx.$slots, "default")], 2)], 2);
		};
	}
});

//#endregion
export { anchor_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=anchor.vue_vue_type_script_setup_true_lang.mjs.map