Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_runtime = require('../../../../_virtual/_rolldown/runtime.js');
const require_index = require('../../../../hooks/use-namespace/index.js');
const require_color_picker_panel = require('../color-picker-panel.js');
const require_color = require('../utils/color.js');
let vue = require("vue");

//#region ../../packages/components/color-picker-panel/src/composables/use-predefine.ts
const usePredefine = (props) => {
	const { currentColor } = (0, vue.inject)(require_color_picker_panel.colorPickerPanelContextKey);
	const rgbaColors = (0, vue.ref)(parseColors(props.colors, props.color));
	(0, vue.watch)(() => currentColor.value, (val) => {
		const color = new require_color.default({
			value: val,
			enableAlpha: props.enableAlpha
		});
		rgbaColors.value.forEach((item) => {
			item.selected = color.compare(item);
		});
	});
	(0, vue.watchEffect)(() => {
		rgbaColors.value = parseColors(props.colors, props.color);
	});
	function handleSelect(index) {
		props.color.fromString(props.colors[index]);
	}
	function parseColors(colors, color) {
		return colors.map((value) => {
			const c = new require_color.default({
				value,
				enableAlpha: props.enableAlpha
			});
			c.selected = c.compare(color);
			return c;
		});
	}
	return {
		rgbaColors,
		handleSelect
	};
};
const usePredefineDOM = (props) => {
	const ns = require_index.useNamespace("color-predefine");
	const rootKls = (0, vue.computed)(() => [ns.b(), ns.is("disabled", props.disabled)]);
	const colorsKls = (0, vue.computed)(() => ns.e("colors"));
	function colorSelectorKls(item) {
		return [
			ns.e("color-selector"),
			ns.is("alpha", item.get("alpha") < 100),
			{ selected: item.selected }
		];
	}
	return {
		rootKls,
		colorsKls,
		colorSelectorKls
	};
};

//#endregion
exports.usePredefine = usePredefine;
exports.usePredefineDOM = usePredefineDOM;
//# sourceMappingURL=use-predefine.js.map