import normalizeWheel from "normalize-wheel-es";

//#region ../../packages/directives/mousewheel/index.ts
const SCOPE = "_Mousewheel";
const mousewheel = function(element, callback) {
	if (element && element.addEventListener) {
		removeWheelHandler(element);
		const fn = function(event) {
			const normalized = normalizeWheel(event);
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
export { SCOPE, Mousewheel as default };
//# sourceMappingURL=index.mjs.map