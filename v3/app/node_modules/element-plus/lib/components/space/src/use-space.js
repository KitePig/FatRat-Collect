Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../_virtual/_rolldown/runtime.js');
const require_types = require('../../../utils/types.js');
const require_index = require('../../../hooks/use-namespace/index.js');
let vue = require("vue");
let _vue_shared = require("@vue/shared");

//#region ../../packages/components/space/src/use-space.ts
const SIZE_MAP = {
	small: 8,
	default: 12,
	large: 16
};
function useSpace(props) {
	const ns = require_index.useNamespace("space");
	const classes = (0, vue.computed)(() => [
		ns.b(),
		ns.m(props.direction),
		props.class
	]);
	const horizontalSize = (0, vue.ref)(0);
	const verticalSize = (0, vue.ref)(0);
	const containerStyle = (0, vue.computed)(() => {
		return [
			props.wrap || props.fill ? { flexWrap: "wrap" } : {},
			{ alignItems: props.alignment },
			{
				rowGap: `${verticalSize.value}px`,
				columnGap: `${horizontalSize.value}px`
			},
			props.style
		];
	});
	const itemStyle = (0, vue.computed)(() => {
		return props.fill ? {
			flexGrow: 1,
			minWidth: `${props.fillRatio}%`
		} : {};
	});
	(0, vue.watchEffect)(() => {
		const { size = "small", wrap, direction: dir, fill } = props;
		if ((0, _vue_shared.isArray)(size)) {
			const [h = 0, v = 0] = size;
			horizontalSize.value = h;
			verticalSize.value = v;
		} else {
			let val;
			if (require_types.isNumber(size)) val = size;
			else val = SIZE_MAP[size || "small"] || SIZE_MAP.small;
			if ((wrap || fill) && dir === "horizontal") horizontalSize.value = verticalSize.value = val;
			else if (dir === "horizontal") {
				horizontalSize.value = val;
				verticalSize.value = 0;
			} else {
				verticalSize.value = val;
				horizontalSize.value = 0;
			}
		}
	});
	return {
		classes,
		containerStyle,
		itemStyle
	};
}

//#endregion
exports.useSpace = useSpace;
//# sourceMappingURL=use-space.js.map