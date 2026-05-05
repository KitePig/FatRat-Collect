import { isClient as isClient$1 } from "../../../utils/browser.mjs";
import { unrefElement } from "@vueuse/core";

//#region ../../packages/components/popper/src/utils.ts
const buildPopperOptions = (props, modifiers = []) => {
	const { placement, strategy, popperOptions } = props;
	const options = {
		placement,
		strategy,
		...popperOptions,
		modifiers: [...genModifiers(props), ...modifiers]
	};
	deriveExtraModifiers(options, popperOptions?.modifiers);
	return options;
};
const unwrapMeasurableEl = ($el) => {
	if (!isClient$1) return;
	return unrefElement($el);
};
function genModifiers(options) {
	const { offset, gpuAcceleration, fallbackPlacements } = options;
	return [
		{
			name: "offset",
			options: { offset: [0, offset ?? 12] }
		},
		{
			name: "preventOverflow",
			options: { padding: {
				top: 0,
				bottom: 0,
				left: 0,
				right: 0
			} }
		},
		{
			name: "flip",
			options: {
				padding: 5,
				fallbackPlacements
			}
		},
		{
			name: "computeStyles",
			options: { gpuAcceleration }
		}
	];
}
function deriveExtraModifiers(options, modifiers) {
	if (modifiers) options.modifiers = [...options.modifiers, ...modifiers ?? []];
}

//#endregion
export { buildPopperOptions, unwrapMeasurableEl };
//# sourceMappingURL=utils.mjs.map