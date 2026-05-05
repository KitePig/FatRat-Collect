Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
let _vueuse_core = require("@vueuse/core");

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
	if (!_vueuse_core.isClient) return;
	return (0, _vueuse_core.unrefElement)($el);
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
exports.buildPopperOptions = buildPopperOptions;
exports.unwrapMeasurableEl = unwrapMeasurableEl;
//# sourceMappingURL=utils.js.map