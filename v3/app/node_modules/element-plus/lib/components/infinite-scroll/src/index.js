Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_position = require('../../../utils/dom/position.js');
const require_error = require('../../../utils/error.js');
const require_scroll = require('../../../utils/dom/scroll.js');
const require_index = require('../../../hooks/use-deprecated/index.js');
let lodash_unified = require("lodash-unified");
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/infinite-scroll/src/index.ts
const SCOPE = "ElInfiniteScroll";
const CHECK_INTERVAL = 50;
const DEFAULT_DELAY = 200;
const DEFAULT_DISTANCE = 0;
const attributes = {
	delay: {
		type: Number,
		default: DEFAULT_DELAY
	},
	distance: {
		type: Number,
		default: DEFAULT_DISTANCE
	},
	disabled: {
		type: Boolean,
		default: false
	},
	immediate: {
		type: Boolean,
		default: true
	}
};
const getScrollOptions = (el, instance) => {
	return Object.entries(attributes).reduce((acm, [name, option]) => {
		const { type, default: defaultValue } = option;
		const attrVal = el.getAttribute(`infinite-scroll-${name}`);
		let value = instance[attrVal] ?? attrVal ?? defaultValue;
		value = value === "false" ? false : value;
		value = type(value);
		acm[name] = Number.isNaN(value) ? defaultValue : value;
		return acm;
	}, {});
};
const destroyObserver = (el) => {
	const { observer } = el[SCOPE];
	if (observer) {
		observer.disconnect();
		delete el[SCOPE].observer;
	}
};
const handleScroll = (el, cb) => {
	const { container, containerEl, instance, observer, lastScrollTop } = el[SCOPE];
	const { disabled, distance } = getScrollOptions(el, instance);
	const { clientHeight, scrollHeight, scrollTop } = containerEl;
	const delta = scrollTop - lastScrollTop;
	el[SCOPE].lastScrollTop = scrollTop;
	if (observer || disabled || delta < 0) return;
	let shouldTrigger = false;
	if (container === el) shouldTrigger = scrollHeight - (clientHeight + scrollTop) <= distance;
	else {
		const { clientTop, scrollHeight: height } = el;
		const offsetTop = require_position.getOffsetTopDistance(el, containerEl);
		shouldTrigger = scrollTop + clientHeight >= offsetTop + clientTop + height - distance;
	}
	if (shouldTrigger) cb.call(instance);
};
function checkFull(el, cb) {
	const { containerEl, instance } = el[SCOPE];
	const { disabled } = getScrollOptions(el, instance);
	if (disabled || containerEl.clientHeight === 0) return;
	if (containerEl.scrollHeight <= containerEl.clientHeight) cb.call(instance);
	else destroyObserver(el);
}
const InfiniteScroll = {
	async mounted(el, binding) {
		const { instance, value: cb } = binding;
		require_index.useDeprecated({
			scope: SCOPE,
			from: "the directive v-infinite-scroll",
			replacement: "the el-scrollbar infinite scroll",
			version: "3.0.0",
			ref: "https://element-plus.org/en-US/component/scrollbar#infinite-scroll"
		}, true);
		if (!(0, _vue_shared.isFunction)(cb)) require_error.throwError(SCOPE, "'v-infinite-scroll' binding value must be a function");
		await (0, vue.nextTick)();
		const { delay, immediate } = getScrollOptions(el, instance);
		const container = require_scroll.getScrollContainer(el, true);
		const containerEl = container === window ? document.documentElement : container;
		const onScroll = (0, lodash_unified.throttle)(handleScroll.bind(null, el, cb), delay);
		if (!container) return;
		el[SCOPE] = {
			instance,
			container,
			containerEl,
			delay,
			cb,
			onScroll,
			lastScrollTop: containerEl.scrollTop
		};
		if (immediate) {
			const observer = new MutationObserver((0, lodash_unified.throttle)(checkFull.bind(null, el, cb), CHECK_INTERVAL));
			el[SCOPE].observer = observer;
			observer.observe(el, {
				childList: true,
				subtree: true
			});
			checkFull(el, cb);
		}
		container.addEventListener("scroll", onScroll);
	},
	unmounted(el) {
		if (!el[SCOPE]) return;
		const { container, onScroll } = el[SCOPE];
		container?.removeEventListener("scroll", onScroll);
		destroyObserver(el);
	},
	async updated(el) {
		if (!el[SCOPE]) await (0, vue.nextTick)();
		else {
			const { containerEl, cb, observer } = el[SCOPE];
			if (containerEl.clientHeight && observer) checkFull(el, cb);
		}
	}
};

//#endregion
exports.CHECK_INTERVAL = CHECK_INTERVAL;
exports.DEFAULT_DELAY = DEFAULT_DELAY;
exports.DEFAULT_DISTANCE = DEFAULT_DISTANCE;
exports.SCOPE = SCOPE;
exports.default = InfiniteScroll;
//# sourceMappingURL=index.js.map