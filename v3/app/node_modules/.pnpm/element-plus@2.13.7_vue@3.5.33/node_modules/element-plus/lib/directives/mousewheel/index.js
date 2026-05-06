Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: 'Module' } });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
let normalize_wheel_es = require("normalize-wheel-es");
normalize_wheel_es = require_runtime.__toESM(normalize_wheel_es);

//#region ../../packages/directives/mousewheel/index.ts
const SCOPE = "_Mousewheel";
const mousewheel = function(element, callback) {
	if (element && element.addEventListener) {
		removeWheelHandler(element);
		const fn = function(event) {
			const normalized = (0, normalize_wheel_es.default)(event);
			callback && Reflect.apply(callback, this, [event, normalized]);
		};
		element[SCOPE] = { wheelHandler: fn };
		element.addEventListener("wheel", fn, { passive: true });
	}
};
const removeWheelHandler = (element) => {
	if (element[SCOPE]?.wheelHandler) {
		element.removeEventListener("wheel", element[SCOPE].wheelHandler);
		element[SCOPE] = null;
	}
};
const Mousewheel = {
	beforeMount(el, binding) {
		mousewheel(el, binding.value);
	},
	unmounted(el) {
		removeWheelHandler(el);
	},
	updated(el, binding) {
		if (binding.value !== binding.oldValue) mousewheel(el, binding.value);
	}
};

//#endregion
exports.SCOPE = SCOPE;
exports.default = Mousewheel;
//# sourceMappingURL=index.js.map