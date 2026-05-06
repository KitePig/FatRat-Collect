Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../_virtual/_rolldown/runtime.js');
let vue = require("vue");

//#region ../../packages/hooks/use-forward-ref/index.ts
const FORWARD_REF_INJECTION_KEY = Symbol("elForwardRef");
const useForwardRef = (forwardRef) => {
	const setForwardRef = ((el) => {
		forwardRef.value = el;
	});
	(0, vue.provide)(FORWARD_REF_INJECTION_KEY, { setForwardRef });
};
const useForwardRefDirective = (setForwardRef) => {
	return {
		mounted(el) {
			setForwardRef(el);
		},
		updated(el) {
			setForwardRef(el);
		},
		unmounted() {
			setForwardRef(null);
		}
	};
};

//#endregion
exports.FORWARD_REF_INJECTION_KEY = FORWARD_REF_INJECTION_KEY;
exports.useForwardRef = useForwardRef;
exports.useForwardRefDirective = useForwardRefDirective;
//# sourceMappingURL=index.js.map