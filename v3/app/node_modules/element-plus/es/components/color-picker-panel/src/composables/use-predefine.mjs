import { useNamespace } from "../../../../hooks/use-namespace/index.mjs";
import { colorPickerPanelContextKey } from "../color-picker-panel.mjs";
import Color from "../utils/color.mjs";
import { computed, inject, ref, watch, watchEffect } from "vue";

//#region ../../packages/components/color-picker-panel/src/composables/use-predefine.ts
const usePredefine = (props) => {
	const { currentColor } = inject(colorPickerPanelContextKey);
	const rgbaColors = ref(parseColors(props.colors, props.color));
	watch(() => currentColor.value, (val) => {
		const color = new Color({
			value: val,
			enableAlpha: props.enableAlpha
		});
		rgbaColors.value.forEach((item) => {
			item.selected = color.compare(item);
		});
	});
	watchEffect(() => {
		rgbaColors.value = parseColors(props.colors, props.color);
	});
	function handleSelect(index) {
		props.color.fromString(props.colors[index]);
	}
	function parseColors(colors, color) {
		return colors.map((value) => {
			const c = new Color({
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
	const ns = useNamespace("color-predefine");
	const rootKls = computed(() => [ns.b(), ns.is("disabled", props.disabled)]);
	const colorsKls = computed(() => ns.e("colors"));
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
export { usePredefine, usePredefineDOM };
//# sourceMappingURL=use-predefine.mjs.map