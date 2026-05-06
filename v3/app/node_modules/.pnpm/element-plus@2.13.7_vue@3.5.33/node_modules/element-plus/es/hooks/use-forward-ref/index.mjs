import { provide } from "vue";

//#region ../../packages/hooks/use-forward-ref/index.ts
const FORWARD_REF_INJECTION_KEY = Symbol("elForwardRef");
const useForwardRef = (forwardRef) => {
	const setForwardRef = ((el) => {
		forwardRef.value = el;
	});
	provide(FORWARD_REF_INJECTION_KEY, { setForwardRef });
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
export { FORWARD_REF_INJECTION_KEY, useForwardRef, useForwardRefDirective };
//# sourceMappingURL=index.mjs.map