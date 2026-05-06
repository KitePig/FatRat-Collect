Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_event = require('../../../constants/event.js');
const require_types = require('../../../utils/types.js');
const require_error = require('../../../utils/error.js');
const require_runtime$1 = require('../../../utils/vue/props/runtime.js');
const require_icon = require('../../../utils/vue/icon.js');
const require_typescript = require('../../../utils/typescript.js');
const require_index = require('../../../hooks/use-deprecated/index.js');
const require_index$1 = require('../../../hooks/use-locale/index.js');
const require_index$2 = require('../../../hooks/use-namespace/index.js');
const require_index$3 = require('../../../hooks/use-size/index.js');
const require_constants = require('./constants.js');
const require_prev = require('./components/prev2.js');
const require_next = require('./components/next2.js');
const require_sizes = require('./components/sizes2.js');
const require_jumper = require('./components/jumper2.js');
const require_total = require('./components/total2.js');
const require_pager = require('./components/pager2.js');
let _element_plus_icons_vue = require("@element-plus/icons-vue");
let vue = require("vue");

//#region ../../packages/components/pagination/src/pagination.ts
/**
* It it user's responsibility to guarantee that the value of props.total... is number
* (same as pageSize, defaultPageSize, currentPage, defaultCurrentPage, pageCount)
* Otherwise we can reasonable infer that the corresponding field is absent
*/
const isAbsent = (v) => typeof v !== "number";
const paginationProps = require_runtime$1.buildProps({
	pageSize: Number,
	defaultPageSize: Number,
	total: Number,
	pageCount: Number,
	pagerCount: {
		type: Number,
		validator: (value) => {
			return require_types.isNumber(value) && Math.trunc(value) === value && value > 4 && value < 22 && value % 2 === 1;
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
		type: require_runtime$1.definePropType(Array),
		default: () => require_typescript.mutable([
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
	popperStyle: { type: require_runtime$1.definePropType([String, Object]) },
	prevText: {
		type: String,
		default: ""
	},
	prevIcon: {
		type: require_icon.iconPropType,
		default: () => _element_plus_icons_vue.ArrowLeft
	},
	nextText: {
		type: String,
		default: ""
	},
	nextIcon: {
		type: require_icon.iconPropType,
		default: () => _element_plus_icons_vue.ArrowRight
	},
	teleported: {
		type: Boolean,
		default: true
	},
	small: Boolean,
	size: require_index$3.useSizeProp,
	background: Boolean,
	disabled: Boolean,
	hideOnSinglePage: Boolean,
	appendSizeTo: String
});
const paginationEmits = {
	"update:current-page": (val) => require_types.isNumber(val),
	"update:page-size": (val) => require_types.isNumber(val),
	"size-change": (val) => require_types.isNumber(val),
	change: (currentPage, pageSize) => require_types.isNumber(currentPage) && require_types.isNumber(pageSize),
	"current-change": (val) => require_types.isNumber(val),
	"prev-click": (val) => require_types.isNumber(val),
	"next-click": (val) => require_types.isNumber(val)
};
const componentName = "ElPagination";
var pagination_default = (0, vue.defineComponent)({
	name: componentName,
	props: paginationProps,
	emits: paginationEmits,
	setup(props, { emit, slots }) {
		const { t } = require_index$1.useLocale();
		const ns = require_index$2.useNamespace("pagination");
		const vnodeProps = (0, vue.getCurrentInstance)().vnode.props || {};
		const _globalSize = require_index$3.useGlobalSize();
		const _size = (0, vue.computed)(() => props.small ? "small" : props.size ?? _globalSize.value);
		require_index.useDeprecated({
			from: "small",
			replacement: "size",
			version: "3.0.0",
			scope: "el-pagination",
			ref: "https://element-plus.org/zh-CN/component/pagination.html"
		}, (0, vue.computed)(() => !!props.small));
		const hasCurrentPageListener = "onUpdate:currentPage" in vnodeProps || "onUpdate:current-page" in vnodeProps || "onCurrentChange" in vnodeProps;
		const hasPageSizeListener = "onUpdate:pageSize" in vnodeProps || "onUpdate:page-size" in vnodeProps || "onSizeChange" in vnodeProps;
		const assertValidUsage = (0, vue.computed)(() => {
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
		const innerPageSize = (0, vue.ref)(isAbsent(props.defaultPageSize) ? 10 : props.defaultPageSize);
		const innerCurrentPage = (0, vue.ref)(isAbsent(props.defaultCurrentPage) ? 1 : props.defaultCurrentPage);
		const pageSizeBridge = (0, vue.computed)({
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
		const pageCountBridge = (0, vue.computed)(() => {
			let pageCount = 0;
			if (!isAbsent(props.pageCount)) pageCount = props.pageCount;
			else if (!isAbsent(props.total)) pageCount = Math.max(1, Math.ceil(props.total / pageSizeBridge.value));
			return pageCount;
		});
		const currentPageBridge = (0, vue.computed)({
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
		(0, vue.watch)(pageCountBridge, (val) => {
			if (currentPageBridge.value > val) currentPageBridge.value = val;
		});
		(0, vue.watch)([currentPageBridge, pageSizeBridge], (value) => {
			emit(require_event.CHANGE_EVENT, ...value);
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
		(0, vue.provide)(require_constants.elPaginationKey, {
			pageCount: pageCountBridge,
			disabled: (0, vue.computed)(() => props.disabled),
			currentPage: currentPageBridge,
			changeEvent: handleCurrentChange,
			handleSizeChange
		});
		return () => {
			if (!assertValidUsage.value) {
				require_error.debugWarn(componentName, t("el.pagination.deprecationWarning"));
				return null;
			}
			if (!props.layout) return null;
			if (props.hideOnSinglePage && pageCountBridge.value <= 1) return null;
			const rootChildren = [];
			const rightWrapperChildren = [];
			const rightWrapperRoot = (0, vue.h)("div", { class: ns.e("rightwrapper") }, rightWrapperChildren);
			const TEMPLATE_MAP = {
				prev: (0, vue.h)(require_prev.default, {
					disabled: props.disabled,
					currentPage: currentPageBridge.value,
					prevText: props.prevText,
					prevIcon: props.prevIcon,
					onClick: prev
				}),
				jumper: (0, vue.h)(require_jumper.default, { size: _size.value }),
				pager: (0, vue.h)(require_pager.default, {
					currentPage: currentPageBridge.value,
					pageCount: pageCountBridge.value,
					pagerCount: props.pagerCount,
					onChange: handleCurrentChange,
					disabled: props.disabled
				}),
				next: (0, vue.h)(require_next.default, {
					disabled: props.disabled,
					currentPage: currentPageBridge.value,
					pageCount: pageCountBridge.value,
					nextText: props.nextText,
					nextIcon: props.nextIcon,
					onClick: next
				}),
				sizes: (0, vue.h)(require_sizes.default, {
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
				total: (0, vue.h)(require_total.default, { total: isAbsent(props.total) ? 0 : props.total })
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
			return (0, vue.h)("div", { class: [
				ns.b(),
				ns.is("background", props.background),
				ns.m(_size.value)
			] }, rootChildren);
		};
	}
});

//#endregion
exports.default = pagination_default;
exports.paginationEmits = paginationEmits;
exports.paginationProps = paginationProps;
//# sourceMappingURL=pagination.js.map