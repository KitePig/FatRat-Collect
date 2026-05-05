import { CHANGE_EVENT } from "../../../../constants/event.mjs";
import { useLocale } from "../../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../../hooks/use-namespace/index.mjs";
import { paginationPagerProps } from "./pager.mjs";
import { DArrowLeft, DArrowRight, MoreFilled } from "@element-plus/icons-vue";
import { Fragment, computed, createBlock, createCommentVNode, createElementBlock, defineComponent, normalizeClass, openBlock, ref, renderList, toDisplayString, unref, watch, withKeys } from "vue";

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
var pager_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	name: "ElPaginationPager",
	__name: "pager",
	props: paginationPagerProps,
	emits: [CHANGE_EVENT],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const nsPager = useNamespace("pager");
		const nsIcon = useNamespace("icon");
		const { t } = useLocale();
		const showPrevMore = ref(false);
		const showNextMore = ref(false);
		const quickPrevHover = ref(false);
		const quickNextHover = ref(false);
		const quickPrevFocus = ref(false);
		const quickNextFocus = ref(false);
		const pagers = computed(() => {
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
		const prevMoreKls = computed(() => [
			"more",
			"btn-quickprev",
			nsIcon.b(),
			nsPager.is("disabled", props.disabled)
		]);
		const nextMoreKls = computed(() => [
			"more",
			"btn-quicknext",
			nsIcon.b(),
			nsPager.is("disabled", props.disabled)
		]);
		const tabindex = computed(() => props.disabled ? -1 : 0);
		watch(() => [
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
				if (newPage !== props.currentPage) emit(CHANGE_EVENT, newPage);
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
			if (newPage !== currentPage) emit(CHANGE_EVENT, newPage);
		}
		return (_ctx, _cache) => {
			return openBlock(), createElementBlock("ul", {
				class: normalizeClass(unref(nsPager).b()),
				onClick: onPagerClick,
				onKeyup: withKeys(onEnter, ["enter"])
			}, [
				_ctx.pageCount > 0 ? (openBlock(), createElementBlock("li", {
					key: 0,
					class: normalizeClass([[unref(nsPager).is("active", _ctx.currentPage === 1), unref(nsPager).is("disabled", _ctx.disabled)], "number"]),
					"aria-current": _ctx.currentPage === 1,
					"aria-label": unref(t)("el.pagination.currentPage", { pager: 1 }),
					tabindex: tabindex.value
				}, " 1 ", 10, _hoisted_1)) : createCommentVNode("v-if", true),
				showPrevMore.value ? (openBlock(), createElementBlock("li", {
					key: 1,
					class: normalizeClass(prevMoreKls.value),
					tabindex: tabindex.value,
					"aria-label": unref(t)("el.pagination.prevPages", { pager: _ctx.pagerCount - 2 }),
					onMouseenter: _cache[0] || (_cache[0] = ($event) => onMouseEnter(true)),
					onMouseleave: _cache[1] || (_cache[1] = ($event) => quickPrevHover.value = false),
					onFocus: _cache[2] || (_cache[2] = ($event) => onFocus(true)),
					onBlur: _cache[3] || (_cache[3] = ($event) => quickPrevFocus.value = false)
				}, [(quickPrevHover.value || quickPrevFocus.value) && !_ctx.disabled ? (openBlock(), createBlock(unref(DArrowLeft), { key: 0 })) : (openBlock(), createBlock(unref(MoreFilled), { key: 1 }))], 42, _hoisted_2)) : createCommentVNode("v-if", true),
				(openBlock(true), createElementBlock(Fragment, null, renderList(pagers.value, (pager) => {
					return openBlock(), createElementBlock("li", {
						key: pager,
						class: normalizeClass([[unref(nsPager).is("active", _ctx.currentPage === pager), unref(nsPager).is("disabled", _ctx.disabled)], "number"]),
						"aria-current": _ctx.currentPage === pager,
						"aria-label": unref(t)("el.pagination.currentPage", { pager }),
						tabindex: tabindex.value
					}, toDisplayString(pager), 11, _hoisted_3);
				}), 128)),
				showNextMore.value ? (openBlock(), createElementBlock("li", {
					key: 2,
					class: normalizeClass(nextMoreKls.value),
					tabindex: tabindex.value,
					"aria-label": unref(t)("el.pagination.nextPages", { pager: _ctx.pagerCount - 2 }),
					onMouseenter: _cache[4] || (_cache[4] = ($event) => onMouseEnter()),
					onMouseleave: _cache[5] || (_cache[5] = ($event) => quickNextHover.value = false),
					onFocus: _cache[6] || (_cache[6] = ($event) => onFocus()),
					onBlur: _cache[7] || (_cache[7] = ($event) => quickNextFocus.value = false)
				}, [(quickNextHover.value || quickNextFocus.value) && !_ctx.disabled ? (openBlock(), createBlock(unref(DArrowRight), { key: 0 })) : (openBlock(), createBlock(unref(MoreFilled), { key: 1 }))], 42, _hoisted_4)) : createCommentVNode("v-if", true),
				_ctx.pageCount > 1 ? (openBlock(), createElementBlock("li", {
					key: 3,
					class: normalizeClass([[unref(nsPager).is("active", _ctx.currentPage === _ctx.pageCount), unref(nsPager).is("disabled", _ctx.disabled)], "number"]),
					"aria-current": _ctx.currentPage === _ctx.pageCount,
					"aria-label": unref(t)("el.pagination.currentPage", { pager: _ctx.pageCount }),
					tabindex: tabindex.value
				}, toDisplayString(_ctx.pageCount), 11, _hoisted_5)) : createCommentVNode("v-if", true)
			], 34);
		};
	}
});

//#endregion
export { pager_vue_vue_type_script_setup_true_lang_default as default };
//# sourceMappingURL=pager.vue_vue_type_script_setup_true_lang.mjs.map