import { isClient as isClient$1 } from "../../utils/browser.mjs";
import { keysOf } from "../../utils/objects.mjs";
import { buildProps } from "../../utils/vue/props/runtime.mjs";
import { unrefElement } from "@vueuse/core";
import { isNil } from "lodash-unified";
import { isRef, onMounted, ref, unref, watchEffect } from "vue";
import { arrow, computePosition } from "@floating-ui/dom";

//#region ../../packages/hooks/use-floating/index.ts
const useFloatingProps = buildProps({});
const unrefReference = (elRef) => {
	if (!isClient$1) return;
	if (!elRef) return elRef;
	const unrefEl = unrefElement(elRef);
	if (unrefEl) return unrefEl;
	return isRef(elRef) ? unrefEl : elRef;
};
const getPositionDataWithUnit = (record, key) => {
	const value = record?.[key];
	return isNil(value) ? "" : `${value}px`;
};
const useFloating = ({ middleware, placement, strategy }) => {
	const referenceRef = ref();
	const contentRef = ref();
	const states = {
		x: ref(),
		y: ref(),
		placement,
		strategy,
		middlewareData: ref({})
	};
	const update = async () => {
		if (!isClient$1) return;
		const referenceEl = unrefReference(referenceRef);
		const contentEl = unrefElement(contentRef);
		if (!referenceEl || !contentEl) return;
		const data = await computePosition(referenceEl, contentEl, {
			placement: unref(placement),
			strategy: unref(strategy),
			middleware: unref(middleware)
		});
		keysOf(states).forEach((key) => {
			states[key].value = data[key];
		});
	};
	onMounted(() => {
		watchEffect(() => {
			update();
		});
	});
	return {
		...states,
		update,
		referenceRef,
		contentRef
	};
};
const arrowMiddleware = ({ arrowRef, padding }) => {
	return {
		name: "arrow",
		options: {
			element: arrowRef,
			padding
		},
		fn(args) {
			const arrowEl = unref(arrowRef);
			if (!arrowEl) return {};
			return arrow({
				element: arrowEl,
				padding
			}).fn(args);
		}
	};
};

//#endregion
export { arrowMiddleware, getPositionDataWithUnit, useFloating, useFloatingProps };
//# sourceMappingURL=index.mjs.map