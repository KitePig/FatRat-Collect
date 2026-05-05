Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_service = require('./service.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/loading/src/directive.ts
const INSTANCE_KEY = Symbol("ElLoading");
const getAttributeName = (name) => {
	return `element-loading-${(0, _vue_shared.hyphenate)(name)}`;
};
const createInstance = (el, binding) => {
	const vm = binding.instance;
	const getBindingProp = (key) => (0, _vue_shared.isObject)(binding.value) ? binding.value[key] : void 0;
	const resolveExpression = (key) => {
		return (0, vue.ref)((0, _vue_shared.isString)(key) && vm?.[key] || key);
	};
	const getProp = (name) => resolveExpression(getBindingProp(name) || el.getAttribute(getAttributeName(name)));
	const fullscreen = getBindingProp("fullscreen") ?? binding.modifiers.fullscreen;
	const options = {
		text: getProp("text"),
		svg: getProp("svg"),
		svgViewBox: getProp("svgViewBox"),
		spinner: getProp("spinner"),
		background: getProp("background"),
		customClass: getProp("customClass"),
		fullscreen,
		target: getBindingProp("target") ?? (fullscreen ? void 0 : el),
		body: getBindingProp("body") ?? binding.modifiers.body,
		lock: getBindingProp("lock") ?? binding.modifiers.lock
	};
	const instance = require_service.default(options);
	instance._context = vLoading._context;
	el[INSTANCE_KEY] = {
		options,
		instance
	};
};
const updateOptions = (originalOptions, newOptions) => {
	for (const key of Object.keys(originalOptions)) if ((0, vue.isRef)(originalOptions[key])) originalOptions[key].value = newOptions[key];
};
const vLoading = {
	mounted(el, binding) {
		if (binding.value) createInstance(el, binding);
	},
	updated(el, binding) {
		const instance = el[INSTANCE_KEY];
		if (!binding.value) {
			instance?.instance.close();
			el[INSTANCE_KEY] = null;
			return;
		}
		if (!instance) createInstance(el, binding);
		else updateOptions(instance.options, (0, _vue_shared.isObject)(binding.value) ? binding.value : {
			text: el.getAttribute(getAttributeName("text")),
			svg: el.getAttribute(getAttributeName("svg")),
			svgViewBox: el.getAttribute(getAttributeName("svgViewBox")),
			spinner: el.getAttribute(getAttributeName("spinner")),
			background: el.getAttribute(getAttributeName("background")),
			customClass: el.getAttribute(getAttributeName("customClass"))
		});
	},
	unmounted(el) {
		el[INSTANCE_KEY]?.instance.close();
		el[INSTANCE_KEY] = null;
	}
};
vLoading._context = null;

//#endregion
exports.default = vLoading;
//# sourceMappingURL=directive.js.map