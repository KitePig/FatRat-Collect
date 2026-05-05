const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../../constants/event.js');
const require_index = require('../../../../hooks/use-locale/index.js');
const require_index$1 = require('../../../../hooks/use-namespace/index.js');
const require_pager = require('./pager.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");

//#region ../../packages/components/pagination/src/components/pager.vue?vue&type=script&setup=true&lang.ts
const _hoisted_1 = [
	"aria-current",
	"aria-label",
	"tabindex"
];
const _hoisted_2 = ["tabindex", "aria-label"];
const _hoisted_3 = [
	"aria-current",
	"aria-label",
	"tabindex"
];
const _hoisted_4 = ["tabindex", "aria-label"];
const _hoisted_5 = [
	"aria-current",
	"aria-label",
	"tabindex"
];
var pager_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ (0, vue.defineComponent)({
	name: "ElPaginationPager",
	__name: "pager",
	props: require_pager.paginationPagerProps,
	emits: [require_event.CHANGE_EVENT],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const nsPager = require_index$1.useNamespace("pager");
		const nsIcon = require_index$1.useNamespace("icon");
		const { t } = require_index.useLocale();
		const showPrevMore = (0, vue.ref)(false);
		const showNextMore = (0, vue.ref)(false);
		const quickPrevHover = (0, vue.ref)(false);
		const quickNextHover = (0, vue.ref)(false);
		const quickPrevFocus = (0, vue.ref)(false);
		const quickNextFocus = (0, vue.ref)(false);
		const pagers = (0, vue.computed)(() => {
			const pagerCount = props.pagerCount;
			const halfPagerCount = (pagerCount - 1) / 2;
			const currentPage = Number(props.currentPage);
			const pageCount = Number(props.pageCount);
			let showPrevMore = false;
			let showNextMore = false;
			if (pageCount > pagerCount) {
				if (currentPage > pagerCount - halfPagerCount) showPrevMore = true;
				if (currentPage < pageCount - halfPagerCount) showNextMore = true;
			}
			const array = [];
			if (showPrevMore && !showNextMore) {
				const startPage = pageCount - (pagerCount - 2);
				for (let i = startPage; i < pageCount; i++) array.push(i);
			} else if (!showPrevMore && showNextMore) for (let i = 2; i < pagerCount; i++) array.push(i);
			else if (showPrevMore && showNextMore) {
				const offset = Math.floor(pagerCount / 2) - 1;
				for (let i = currentPage - offset; i <= currentPage + offset; i++) array.push(i);
			} else for (let i = 2; i < pageCount; i++) array.push(i);
			return array;
		});
		const prevMoreKls = (0, vue.computed)(() => [
			"more",
			"btn-quickprev",
			nsIcon.b(),
			nsPager.is("disabled", props.disabled)
		]);
		const nextMoreKls = (0, vue.computed)(() => [
			"more",
			"btn-quicknext",
			nsIcon.b(),
			nsPager.is("disabled", props.disabled)
		]);
		const tabindex = (0, vue.computed)(() => props.disabled ? -1 : 0);
		(0, vue.watch)(() => [
			props.pageCount,
			props.pagerCount,
			props.currentPage
		], ([pageCount, pagerCount, currentPage]) => {
			const halfPagerCount = (pagerCount - 1) / 2;
			let showPrev = false;
			let showNext = false;
			if (pageCount > pagerCount) {
				showPrev = currentPage > pagerCount - halfPagerCount;
				showNext = currentPage < pageCount - halfPagerCount;
			}
			quickPrevHover.value &&= showPrev;
			quickNextHover.value &&= showNext;
			showPrevMore.value = showPrev;
			showNextMore.value = showNext;
		}, { immediate: true });
		function onMouseEnter(forward = false) {
			if (props.disabled) return;
			if (forward) quickPrevHover.value = true;
			else quickNextHover.value = true;
		}
		function onFocus(forward = false) {
			if (forward) quickPrevFocus.value = true;
			else quickNextFocus.value = true;
		}
		function onEnter(e) {
			const target = e.target;
			if (target.tagName.toLowerCase() === "li" && Array.from(target.classList).includes("number")) {
				const newPage = Number(target.textContent);
				if (newPage !== props.currentPage) emit(require_event.CHANGE_EVENT, newPage);
			} else if (target.tagName.toLowerCase() === "li" && Array.from(target.classList).includes("more")) onPagerClick(e);
		}
		function onPagerClick(event) {
			const target = event.target;
			if (target.tagName.toLowerCase() === "ul" || props.disabled) return;
			let newPage = Number(target.textContent);
			const pageCount = props.pageCount;
			const currentPage = props.currentPage;
			const pagerCountOffset = props.pagerCount - 2;
			if (target.className.includes("more")) {
				if (target.className.includes("quickprev")) newPage = currentPage - pagerCountOffset;
				else if (target.className.includes("quicknext")) newPage = currentPage + pagerCountOffset;
			}
			if (!Number.isNaN(+newPage)) {
				if (newPage < 1) newPage = 1;
				if (newPage > pageCount) newPage = pageCount;
			}
			if (newPage !== currentPage) emit(require_event.CHANGE_EVENT, newPage);
		}
		return (_ctx, _cache) => {
			return (0, vue.openBlock)(), (0, vue.createElementBlock)("ul", {
				class: (0, vue.normalizeClass)((0, vue.unref)(nsPager).b()),
				onClick: onPagerClick,
				onKeyup: (0, vue.withKeys)(onEnter, ["enter"])
			}, [
				_ctx.pageCount > 0 ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("li", {
					key: 0,
					class: (0, vue.normalizeClass)([[(0, vue.unref)(nsPager).is("active", _ctx.currentPage === 1), (0, vue.unref)(nsPager).is("disabled", _ctx.disabled)], "number"]),
					"aria-current": _ctx.currentPage === 1,
					"aria-label": (0, vue.unref)(t)("el.pagination.currentPage", { pager: 1 }),
					tabindex: tabindex.value
				}, " 1 ", 10, _hoisted_1)) : (0, vue.createCommentVNode)("v-if", true),
				showPrevMore.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("li", {
					key: 1,
					class: (0, vue.normalizeClass)(prevMoreKls.value),
					tabindex: tabindex.value,
					"aria-label": (0, vue.unref)(t)("el.pagination.prevPages", { pager: _ctx.pagerCount - 2 }),
					onMouseenter: _cache[0] || (_cache[0] = ($event) => onMouseEnter(true)),
					onMouseleave: _cache[1] || (_cache[1] = ($event) => quickPrevHover.value = false),
					onFocus: _cache[2] || (_cache[2] = ($event) => onFocus(true)),
					onBlur: _cache[3] || (_cache[3] = ($event) => quickPrevFocus.value = false)
				}, [(quickPrevHover.value || quickPrevFocus.value) && !_ctx.disabled ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(_element_plus_icons_vue.DArrowLeft), { key: 0 })) : ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(_element_plus_icons_vue.MoreFilled), { key: 1 }))], 42, _hoisted_2)) : (0, vue.createCommentVNode)("v-if", true),
				((0, vue.openBlock)(true), (0, vue.createElementBlock)(vue.Fragment, null, (0, vue.renderList)(pagers.value, (pager) => {
					return (0, vue.openBlock)(), (0, vue.createElementBlock)("li", {
						key: pager,
						class: (0, vue.normalizeClass)([[(0, vue.unref)(nsPager).is("active", _ctx.currentPage === pager), (0, vue.unref)(nsPager).is("disabled", _ctx.disabled)], "number"]),
						"aria-current": _ctx.currentPage === pager,
						"aria-label": (0, vue.unref)(t)("el.pagination.currentPage", { pager }),
						tabindex: tabindex.value
					}, (0, vue.toDisplayString)(pager), 11, _hoisted_3);
				}), 128)),
				showNextMore.value ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("li", {
					key: 2,
					class: (0, vue.normalizeClass)(nextMoreKls.value),
					tabindex: tabindex.value,
					"aria-label": (0, vue.unref)(t)("el.pagination.nextPages", { pager: _ctx.pagerCount - 2 }),
					onMouseenter: _cache[4] || (_cache[4] = ($event) => onMouseEnter()),
					onMouseleave: _cache[5] || (_cache[5] = ($event) => quickNextHover.value = false),
					onFocus: _cache[6] || (_cache[6] = ($event) => onFocus()),
					onBlur: _cache[7] || (_cache[7] = ($event) => quickNextFocus.value = false)
				}, [(quickNextHover.value || quickNextFocus.value) && !_ctx.disabled ? ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(_element_plus_icons_vue.DArrowRight), { key: 0 })) : ((0, vue.openBlock)(), (0, vue.createBlock)((0, vue.unref)(_element_plus_icons_vue.MoreFilled), { key: 1 }))], 42, _hoisted_4)) : (0, vue.createCommentVNode)("v-if", true),
				_ctx.pageCount > 1 ? ((0, vue.openBlock)(), (0, vue.createElementBlock)("li", {
					key: 3,
					class: (0, vue.normalizeClass)([[(0, vue.unref)(nsPager).is("active", _ctx.currentPage === _ctx.pageCount), (0, vue.unref)(nsPager).is("disabled", _ctx.disabled)], "number"]),
					"aria-current": _ctx.currentPage === _ctx.pageCount,
					"aria-label": (0, vue.unref)(t)("el.pagination.currentPage", { pager: _ctx.pageCount }),
					tabindex: tabindex.value
				}, (0, vue.toDisplayString)(_ctx.pageCount), 11, _hoisted_5)) : (0, vue.createCommentVNode)("v-if", true)
			], 34);
		};
	}
});

//#endregion
exports.default = pager_vue_vue_type_script_setup_true_lang_default;
//# sourceMappingURL=pager.vue_vue_type_script_setup_true_lang.js.map