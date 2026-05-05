const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_position = require('../../../utils/dom/position.js');
const require_types = require('../../../utils/types.js');
const require_scroll = require('../../../utils/dom/scroll.js');
const require_element = require('../../../utils/dom/element.js');
const require_throttleByRaf = require('../../../utils/throttleByRaf.js');
const require_index = require('../../../hooks/use-namespace/index.js');
const require_anchor = require('./anchor.js');
const require_constants = require('./constants.js');
let _vueuse_core = require("@vueuse/core");
let vue = require("vue");

//#region ../../packages/components/anchor/src/anchor.vue?vue&type=script&setup=true&lang.ts
var anchor_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElAnchor",
	__name: "anchor",
	props: require_anchor.anchorProps,
	emits: require_anchor.anchorEmits,
	setup(__props, { expose: __expose, emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const slots = (0, vue.useSlots)();
		const currentAnchor = (0, vue.ref)("");
		const markerStyle = (0, vue.ref)({});
		const anchorRef = (0, vue.ref)(null);
		const markerRef = (0, vue.ref)(null);
		const containerEl = (0, vue.ref)();
		const links = {};
		let isScrolling = false;
		let currentScrollTop = 0;
		const ns = require_index.useNamespace("anchor");
		const cls = (0, vue.computed)(() => [
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
				emit(require_event.CHANGE_EVENT, href);
			}
		};
		let clearAnimate = null;
		let currentTargetHref = "";
		const scrollToAnchor = (href) => {
			if (!containerEl.value) return;
			const target = require_element.getElement(href);
			if (!target) return;
			if (clearAnimate) {
				if (currentTargetHref === href) return;
				clearAnimate();
			}
			currentTargetHref = href;
			isScrolling = true;
			const scrollEle = require_scroll.getScrollElement(target, containerEl.value);
			const distance = require_position.getOffsetTopDistance(target, scrollEle);
			const max = scrollEle.scrollHeight - scrollEle.clientHeight;
			const to = Math.min(distance - props.offset, max);
			clearAnimate = require_scroll.animateScrollTo(containerEl.value, currentScrollTop, to, props.duration, () => {
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
		const handleScroll = require_throttleByRaf.throttleByRaf(() => {
			if (containerEl.value) currentScrollTop = require_scroll.getScrollTop(containerEl.value);
			const currentHref = getCurrentHref();
			if (isScrolling || require_types.isUndefined(currentHref)) return;
			setCurrentAnchor(currentHref);
		});
		const getCurrentHref = () => {
			if (!containerEl.value) return;
			const scrollTop = require_scroll.getScrollTop(containerEl.value);
			const anchorTopList = [];
			for (const href of Object.keys(links)) {
				const target = require_element.getElement(href);
				if (!target) continue;
				const distance = require_position.getOffsetTopDistance(target, require_scroll.getScrollElement(target, containerEl.value));
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
			const el = require_element.getElement(props.container);
			if (!el || require_types.isWindow(el)) containerEl.value = window;
			else containerEl.value = el;
		};
		(0, _vueuse_core.useEventListener)(containerEl, "scroll", handleScroll);
		const updateMarkerStyle = () => {
			(0, vue.nextTick)(() => {
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
		(0, vue.watch)(currentAnchor, updateMarkerStyle);
		(0, vue.watch)(() => slots.default?.(), updateMarkerStyle);
		(0, vue.onMounted)(() => {
			getContainer();
			const hash = decodeURIComponent(window.location.hash);
			if (require_element.getElement(hash)) scrollTo(hash);
			else handleScroll();
		});
		(0, vue.watch)(() => props.container, () => {
			getContainer();
		});
		(0, vue.provide)(require_constants.anchorKey, {
			ns,
			direction: props.direction,
			currentAnchor,
			addLink,
			removeLink,
			handleClick
		});
		__expose({ scrollTo });
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				ref_key: "anchorRef",
				ref: anchorRef,
				class: (0, vue.normalizeClass)(cls.value)
			}, [__props.marker ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("div", {
				key: 0,
				ref_key: "markerRef",
				ref: markerRef,
				class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("marker")),
				style: (0, vue.normalizeStyle)(markerStyle.value)
			}, null, 6)) : (0, vue.createCommentVNode)("v-if", true), (0, vue.createElementVNode)("div", { class: (0, vue.normalizeClass)((0, vue.unref)(ns).e("list")) }, [(0, vue.renderSlot)(_ctx.$slots, "default")], 2)], 2);
		};
	}
});

//#endregion
exports.default = anchor_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=anchor.vue_vue_type_script_setup_true_lang.js.map