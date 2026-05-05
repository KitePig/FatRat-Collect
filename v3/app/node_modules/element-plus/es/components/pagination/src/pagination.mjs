import { CHANGE_EVENT } from "../../../constants/event.mjs";
import { isNumber } from "../../../utils/types.mjs";
import { debugWarn } from "../../../utils/error.mjs";
import { buildProps, definePropType } from "../../../utils/vue/props/runtime.mjs";
import { iconPropType } from "../../../utils/vue/icon.mjs";
import { mutable } from "../../../utils/typescript.mjs";
import { useDeprecated } from "../../../hooks/use-deprecated/index.mjs";
import { useLocale } from "../../../hooks/use-locale/index.mjs";
import { useNamespace } from "../../../hooks/use-namespace/index.mjs";
import { useGlobalSize, useSizeProp } from "../../../hooks/use-size/index.mjs";
import { elPaginationKey } from "./constants.mjs";
import prev_default from "./components/prev2.mjs";
import next_default from "./components/next2.mjs";
import sizes_default from "./components/sizes2.mjs";
import jumper_default from "./components/jumper2.mjs";
import total_default from "./components/total2.mjs";
import pager_default from "./components/pager2.mjs";
import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue";
import { computed, defineComponent, getCurrentInstance, h, provide, ref, watch } from "vue";

//#region ../../packages/components/pagination/src/pagination.ts
/**
* It it user's responsibility to guarantee that the value of props.total... is number
* (same as pageSize, defaultPageSize, currentPage, defaultCurrentPage, pageCount)
* Otherwise we can reasonable infer that the corresponding field is absent
*/
const isAbsent = (v) => typeof v !== "number";
const paginationProps = buildProps({
	pageSize: Number,
	defaultPageSize: Number,
	total: Number,
	pageCount: Number,
	pagerCount: {
		type: Number,
		validator: (value) => {
			return isNumber(value) && Math.trunc(value) === value && value > 4 && value < 22 && value % 2 === 1;
		},
		default: 7
	},
	currentPage: Number,
	defaultCurrentPage: Number,
	layout: {
		type: String,
		default: [
			"prev",
			"pager",
			"next",
			"jumper",
			"->",
			"total"
		].join(", ")
	},
	pageSizes: {
		type: definePropType(Array),
		default: () => mutable([
			10,
			20,
			30,
			40,
			50,
			100
		])
	},
	popperClass: {
		type: String,
		default: ""
	},
	popperStyle: { type: definePropType([String, Object]) },
	prevText: {
		type: String,
		default: ""
	},
	prevIcon: {
		type: iconPropType,
		default: () => ArrowLeft
	},
	nextText: {
		type: String,
		default: ""
	},
	nextIcon: {
		type: iconPropType,
		default: () => ArrowRight
	},
	teleported: {
		type: Boolean,
		default: true
	},
	small: Boolean,
	size: useSizeProp,
	background: Boolean,
	disabled: Boolean,
	hideOnSinglePage: Boolean,
	appendSizeTo: String
});
const paginationEmits = {
	"update:current-page": (val) => isNumber(val),
	"update:page-size": (val) => isNumber(val),
	"size-change": (val) => isNumber(val),
	change: (currentPage, pageSize) => isNumber(currentPage) && isNumber(pageSize),
	"current-change": (val) => isNumber(val),
	"prev-click": (val) => isNumber(val),
	"next-click": (val) => isNumber(val)
};
const componentName = "ElPagination";
var pagination_default = defineComponent({
	name: componentName,
	props: paginationProps,
	emits: paginationEmits,
	setup(props, { emit, slots }) {
		const { t } = useLocale();
		const ns = useNamespace("pagination");
		const vnodeProps = getCurrentInstance().vnode.props || {};
		const _globalSize = useGlobalSize();
		const _size = computed(() => props.small ? "small" : props.size ?? _globalSize.value);
		useDeprecated({
			from: "small",
			replacement: "size",
			version: "3.0.0",
			scope: "el-pagination",
			ref: "https://element-plus.org/zh-CN/component/pagination.html"
		}, computed(() => !!props.small));
		const hasCurrentPageListener = "onUpdate:currentPage" in vnodeProps || "onUpdate:current-page" in vnodeProps || "onCurrentChange" in vnodeProps;
		const hasPageSizeListener = "onUpdate:pageSize" in vnodeProps || "onUpdate:page-size" in vnodeProps || "onSizeChange" in vnodeProps;
		const assertValidUsage = computed(() => {
			if (isAbsent(props.total) && isAbsent(props.pageCount)) return false;
			if (!isAbsent(props.currentPage) && !hasCurrentPageListener) return false;
			if (props.layout.includes("sizes")) {
				if (!isAbsent(props.pageCount)) {
					if (!hasPageSizeListener) return false;
				} else if (!isAbsent(props.total)) {
					if (!isAbsent(props.pageSize)) {
						if (!hasPageSizeListener) return false;
					}
				}
			}
			return true;
		});
		const innerPageSize = ref(isAbsent(props.defaultPageSize) ? 10 : props.defaultPageSize);
		const innerCurrentPage = ref(isAbsent(props.defaultCurrentPage) ? 1 : props.defaultCurrentPage);
		const pageSizeBridge = computed({
			get() {
				return isAbsent(props.pageSize) ? innerPageSize.value : props.pageSize;
			},
			set(v) {
				if (isAbsent(props.pageSize)) innerPageSize.value = v;
				if (hasPageSizeListener) {
					emit("update:page-size", v);
					emit("size-change", v);
				}
			}
		});
		const pageCountBridge = computed(() => {
			let pageCount = 0;
			if (!isAbsent(props.pageCount)) pageCount = props.pageCount;
			else if (!isAbsent(props.total)) pageCount = Math.max(1, Math.ceil(props.total / pageSizeBridge.value));
			return pageCount;
		});
		const currentPageBridge = computed({
			get() {
				return isAbsent(props.currentPage) ? innerCurrentPage.value : props.currentPage;
			},
			set(v) {
				let newCurrentPage = v;
				if (v < 1) newCurrentPage = 1;
				else if (v > pageCountBridge.value) newCurrentPage = pageCountBridge.value;
				if (isAbsent(props.currentPage)) innerCurrentPage.value = newCurrentPage;
				if (hasCurrentPageListener) {
					emit("update:current-page", newCurrentPage);
					emit("current-change", newCurrentPage);
				}
			}
		});
		watch(pageCountBridge, (val) => {
			if (currentPageBridge.value > val) currentPageBridge.value = val;
		});
		watch([currentPageBridge, pageSizeBridge], (value) => {
			emit(CHANGE_EVENT, ...value);
		}, { flush: "post" });
		function handleCurrentChange(val) {
			currentPageBridge.value = val;
		}
		function handleSizeChange(val) {
			pageSizeBridge.value = val;
			const newPageCount = pageCountBridge.value;
			if (currentPageBridge.value > newPageCount) currentPageBridge.value = newPageCount;
		}
		function prev() {
			if (props.disabled) return;
			currentPageBridge.value -= 1;
			emit("prev-click", currentPageBridge.value);
		}
		function next() {
			if (props.disabled) return;
			currentPageBridge.value += 1;
			emit("next-click", currentPageBridge.value);
		}
		function addClass(element, cls) {
			if (element) {
				if (!element.props) element.props = {};
				element.props.class = [element.props.class, cls].join(" ");
			}
		}
		provide(elPaginationKey, {
			pageCount: pageCountBridge,
			disabled: computed(() => props.disabled),
			currentPage: currentPageBridge,
			changeEvent: handleCurrentChange,
			handleSizeChange
		});
		return () => {
			if (!assertValidUsage.value) {
				debugWarn(componentName, t("el.pagination.deprecationWarning"));
				return null;
			}
			if (!props.layout) return null;
			if (props.hideOnSinglePage && pageCountBridge.value <= 1) return null;
			const rootChildren = [];
			const rightWrapperChildren = [];
			const rightWrapperRoot = h("div", { class: ns.e("rightwrapper") }, rightWrapperChildren);
			const TEMPLATE_MAP = {
				prev: h(prev_default, {
					disabled: props.disabled,
					currentPage: currentPageBridge.value,
					prevText: props.prevText,
					prevIcon: props.prevIcon,
					onClick: prev
				}),
				jumper: h(jumper_default, { size: _size.value }),
				pager: h(pager_default, {
					currentPage: currentPageBridge.value,
					pageCount: pageCountBridge.value,
					pagerCount: props.pagerCount,
					onChange: handleCurrentChange,
					disabled: props.disabled
				}),
				next: h(next_default, {
					disabled: props.disabled,
					currentPage: currentPageBridge.value,
					pageCount: pageCountBridge.value,
					nextText: props.nextText,
					nextIcon: props.nextIcon,
					onClick: next
				}),
				sizes: h(sizes_default, {
					pageSize: pageSizeBridge.value,
					pageSizes: props.pageSizes,
					popperClass: props.popperClass,
					popperStyle: props.popperStyle,
					disabled: props.disabled,
					teleported: props.teleported,
					size: _size.value,
					appendSizeTo: props.appendSizeTo
				}),
				slot: slots?.default?.() ?? null,
				total: h(total_default, { total: isAbsent(props.total) ? 0 : props.total })
			};
			const components = props.layout.split(",").map((item) => item.trim());
			let haveRightWrapper = false;
			components.forEach((c) => {
				if (c === "->") {
					haveRightWrapper = true;
					return;
				}
				if (!haveRightWrapper) rootChildren.push(TEMPLATE_MAP[c]);
				else rightWrapperChildren.push(TEMPLATE_MAP[c]);
			});
			addClass(rootChildren[0], ns.is("first"));
			addClass(rootChildren[rootChildren.length - 1], ns.is("last"));
			if (haveRightWrapper && rightWrapperChildren.length > 0) {
				addClass(rightWrapperChildren[0], ns.is("first"));
				addClass(rightWrapperChildren[rightWrapperChildren.length - 1], ns.is("last"));
				rootChildren.push(rightWrapperRoot);
			}
			return h("div", { class: [
				ns.b(),
				ns.is("background", props.background),
				ns.m(_size.value)
			] }, rootChildren);
		};
	}
});

//#endregion
export { pagination_default as default, paginationEmits, paginationProps };
//# sourceMappingURL=pagination.mjs.map